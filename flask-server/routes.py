import os 
import datetime
import requests
from dotenv import load_dotenv

from flask import Flask, request, jsonify, url_for, session, redirect
from flask_session import Session
import redis

from flask_cors import CORS, cross_origin
from werkzeug.utils import redirect

import google.auth.transport.requests
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from google.oauth2 import id_token
from googleapiclient.discovery import build

import tmdb_api.IMDB_handler as IMDB


app = Flask(__name__)
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
app.config["Access-Control-Allow-Headers"]="Content-Type"

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app.secret_key = os.getenv("SECRET_KEY")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = 'google_api\client_secret.json'
SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.app.created']
SERVER_URL = 'http://localhost:5000'
CLIENT_URL = 'http://localhost:3000'

# Idetify the application requesting information
flow = Flow.from_client_secrets_file(
    client_secrets_file = CLIENT_SECRET,
    scopes = SCOPES,
    redirect_uri = SERVER_URL + '/oauth2callback')

#--------------------------
# TV and Movie Database APIs 
# (IMDB & TMDB)
#--------------------------
@app.route('/')
# def check():
#     if 'credentials' in session:
#         print("-------------CURRENT SESSION CREDENTIALS---------", session.get('credentials'))
#         return jsonify(session.get('credentials'))

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
@app.route('/oauth2callback')
def oauth2callback():
    state = session['state']
    print("-------------CALL BACK SESSION STATE---------", session.get('state'))

    # Uses authentication response code to fetch access token
    flow.fetch_token(authorization_response = request.url.replace('http', 'https'))
    credentials = flow.credentials


    session['credentials'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes}
    
    print("-------------CALL BACK SESSION CREDENTIALS---------", session.get('credentials'))

    token = credentials.token
    return  redirect(f'{CLIENT_URL}/?auth={token}')
    return redirect(f'{CLIENT_URL}/?auth={token}')


@app.route('/authorize')
def authorize():
    # Generate URL to access Google's OAuth2 server
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        prompt='consent') 
    
    # Set state to verify OAuth2 server response
    session['state'] = state
    print("------------- REQUEST SESSION STATE---------", session['state'])
    if 'credentials' in session:
        print("-------------REQUEST SESSION CREDENTIALS---------", session.get('credentials'))

    # return redirect(authorization_url)

    return jsonify (authorization_url = authorization_url)

    

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
  return redirect(CLIENT_URL)



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

    # Prints the start and name of the next 10 events and saves it to a list[{dict}]
    events_data = [] 
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        data = {
            'start': start,
            'summary' : event['summary']
        }
        events_data.append(data)
    
    return jsonify(events_data)

if __name__ == '__main__':
    app.run('localhost', 5000, debug=True)