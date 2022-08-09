import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

function Account( { token, saveToken, clearToken } ) {

    const handleLogin = useGoogleLogin( {
        flow: 'implicit',
        scope: 'https://www.googleapis.com/auth/calendar openid email profile',
        onSuccess: tokenResponse => {
            saveToken( tokenResponse.access_token );
            console.log( tokenResponse.access_token ); },
        onError: errorResponse => console.log( errorResponse )
    } );

    return (
        <>
            <div className='offcanvas offcanvas-end' id='offcanvasAccount'>
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasAccountLabel'>
                        Account Settings</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body '>
                    <p className='mx-2'>
                        Allow access to your Google account to create Google Calendar reminders and receive notifications.</p>
                    <div className='d-flex justify-content-center'>
                        { token ?
                            <button className='btn-search-input' onClick={ clearToken }> 
                                Disconnect Your Google Account</button>
                            :
                            <button className='btn-search-input' onClick={ () => handleLogin() }>
                                Sign In With Google
                            </button>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Account;



