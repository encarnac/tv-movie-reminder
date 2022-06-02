import os 
import datetime
import requests

from flask import Flask, request, jsonify, url_for, session, redirect
from flask_cors import CORS

from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

import IMDB_handler as IMDB


app = Flask(__name__)
CORS(app)


#--------------------------
# TV and Movie Database APIs 
# (IMDB & TMDB)
#--------------------------
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



#--------------------------
# Connecting to Google API
#--------------------------
app.secret_key = 'RaV6sjBQcUJVU48TewbhJ'
SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.app.created']

@app.route('/authorize')
def authorize():
    # Idetify the application requesting information
    flow = Flow.from_client_secrets_file(
        'client_secret.json', scopes=SCOPES)

    # Redirect path after authorization
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    # Generate URL to access Google's OAuth2 server
    authorization_url, state = flow.authorization_url(
        access_type='offline', 
        prompt='consent', 
        include_granted_scopes='true') 
    
    # Set state to verify OAuth2 server response
    session['state'] = state

    return redirect(authorization_url)


@app.route('/oauth2callback')
def oauth2callback():
    # Set callback state so it is verified in OAuth2 server response
    state = session['state']

    flow = Flow.from_client_secrets_file(
        'client_secret.json',
        scopes=SCOPES,
        state=state)
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    # Saves the parameters applied to the redirect URI after authentication
    authorization_response = request.url.replace('http', 'https')

    # Gets token from authentication response
    flow.fetch_token(authorization_response=authorization_response)

    # Save the credential object to the session
    credentials = flow.credentials
    session['credentials'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes}

    return redirect(url_for('test_api_request'))
    

@app.route('/revoke')
def revoke_credentials():
  if 'credentials' not in session:
    return ('You need to <a href="/authorize">authorize</a> before ' +
            'testing the code to revoke credentials.')

  credentials = Credentials(
    **session['credentials'])

  revoke = requests.post('https://oauth2.googleapis.com/revoke',
      params={'token': credentials.token},
      headers = {'content-type': 'application/x-www-form-urlencoded'})

  status_code = getattr(revoke, 'status_code')
  if status_code == 200:
    print('---Successfully revoked credentials.')
    return redirect(url_for('clear_credentials'))
  else:
    return('---WARNING!: Error occured')


@app.route('/clear')
def clear_credentials():
  if 'credentials' in session:
    del session['credentials']
    print("---Successfully cleared credentials from the session.")
  return redirect('http://localhost:3000')



#--------------------------
# Google Calendar API
#--------------------------
@app.route('/test')
def test_api_request():
    if 'credentials' not in session:
        return redirect('authorize')
    
    credentials = Credentials(
        **session['credentials'])

    service = build('calendar', 'v3', credentials=credentials)
    
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    print('--- Getting the upcoming 10 events')
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
        data = {
            'start': start,
            'summary' : event['summary']
        }
        events_data.append(data)
    
    print('Upcoming Events = ', events_data)
    return jsonify(events_data)

if __name__ == '__main__':
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run('localhost', 5000, debug=True)