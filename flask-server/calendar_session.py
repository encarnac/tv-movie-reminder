import flask
import google_auth_oauthlib.flow


SCOPES = ['https://www.googleapis.com/auth/calendar', 
            'https://www.googleapis.com/auth/calendar.readonly', 
            'https://www.googleapis.com/auth/calendar.app.created']

def authorize():
    # Idetify the application requesting information
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        'client_secret.json', scopes=SCOPES)

    # Redirect path after authorization
    flow.redirect_uri = 'https://localhost:5000/oauth2callback'

    # Generate URL to access Google's OAuth2 server
    authorization_url, state = flow.authorization_url(
        access_type='offline', # refreshes token without re-prompting permission
        prompt='consent', # prompt user for consent even after first time
        include_granted_scopes='true') #incremental authorization

    return flask.redirect(authorization_url)


def oauth2callback():
    # Set state to verify OAuth2 server response
    state = flask.session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        'client_secret.json',
        scopes=SCOPES,
        state=state)
    flow.redirect_uri = 'https://localhost:5000/oauth2callback'

    # Saves the parameters applied to the redirect URI after authentication
    authorization_response = flask.request.url

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
        