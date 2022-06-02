import os 
import datetime
import requests
import flask
from flask import Flask, request, jsonify
from flask_cors import CORS

import google.oauth2.credentials
import google_auth_oauthlib.flow
from googleapiclient.discovery import build

import IMDB_handler as IMDB

app = Flask(__name__)
CORS(app)

app.secret_key = 'RaV6sjBQcUJVU48TewbhJ'
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']


@app.route('/search')
def IMDB_search():
    title = request.args.get('title').replace(" ","+")
    category = request.args.get('category')
    results = IMDB.find_title([title,category])
    return jsonify(results)


@app.route('/select')
def TMDB_search():
    IMDB_ID = request.args.get('item')
    # details = IMDB.find_title([title,category])
    # return jsonify(results)


@app.route('/authorize')
def authorize():
    # Idetify the application requesting information
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        'client_secret.json', scopes=SCOPES)

    # Redirect path after authorization
    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    # Generate URL to access Google's OAuth2 server
    authorization_url, state = flow.authorization_url(
        access_type='offline', # refreshes token without re-prompting permission
        prompt='consent', # prompt user for consent even after first time
        include_granted_scopes='true') #incremental authorization
    
    # Set state to verify OAuth2 server response
    flask.session['state'] = state

    return flask.redirect(authorization_url)


@app.route('/oauth2callback')
def oauth2callback():
    # Set callback state so it is verified in OAuth2 server response
    state = flask.session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        'client_secret.json',
        scopes=SCOPES,
        state=state)
    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    # Saves the parameters applied to the redirect URI after authentication
    authorization_response = request.url.replace('http', 'https')

    # Trades the authentication params for a token
    flow.fetch_token(authorization_response=authorization_response)

    # Save the credential object to the session
    credentials = flow.credentials
    flask.session['credentials'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes}

    print("!!!------CREDENTIALS START-----!!!", flask.session['credentials'],"!!!------END-----!!!")
    return flask.session['credentials']
    return flask.redirect('test')
    
@app.route('/test')
def test_api_request():
    if 'credentials' not in flask.session:
        return flask.redirect('authorize')
    
    print(flask.session['credentials'])

    credentials = google.oauth2.credentials.Credentials(
        **flask.session['credentials'])

    service = build('calendar', 'v3', credentials=credentials)
    
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                            maxResults=10, singleEvents=True,
                                            orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        return('No upcoming events found.')

    events_data = [] 
    # Prints the start and name of the next 10 events
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        events_data.append(start, event['summary'])
    
    print("Upcoming Events = ", events_data)
    return events_data


@app.route('/revoke')
def revoke_credentials():
  if 'credentials' not in flask.session:
    return ('You need to <a href="/authorize">authorize</a> before ' +
            'testing the code to revoke credentials.')

  credentials = google.oauth2.credentials.Credentials(
    **flask.session['credentials'])

  revoke = requests.post('https://oauth2.googleapis.com/revoke',
      params={'token': credentials.token},
      headers = {'content-type': 'application/x-www-form-urlencoded'})

  status_code = getattr(revoke, 'status_code')
  if status_code == 200:
    return flask.redirect(flask.url_for('clear_credentials'))
  else:
    return("WARNING!: Error occured")

@app.route('/clear')
def clear_credentials():
  if 'credentials' in flask.session:
    del flask.session['credentials']
  return flask.redirect('/')

def flask_session():
    return str(flask.session['credentials'])

if __name__ == '__main__':
    # os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run('localhost', 5000, debug=True)