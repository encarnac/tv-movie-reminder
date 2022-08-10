import React from 'react';
import Axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

function Account({ token, saveToken, clearToken, handleWatchlist }) {

    const handleLogin = useGoogleLogin( {
        flow: 'implicit',
        scope: 'https://www.googleapis.com/auth/calendar openid email profile',
        onSuccess: async tokenResponse => {
            console.log( tokenResponse.access_token );
            saveToken( tokenResponse.access_token );
            const calendarList = await Axios({
                method: 'get',
                url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
                headers: { Authorization: `Bearer ${ tokenResponse.access_token }` }
                })
            handleWatchlist(calendarList)
            },
        onError: errorResponse => console.log( errorResponse )
    });

    return (
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
                                Sign In With Google</button>
                            }
                    </div>

                </div>

            </div>
    );
}
export default Account;



