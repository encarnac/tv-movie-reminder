import React from 'react';
import Axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '../photos/GoogleIcon';

function Account( { token, saveToken, clearToken, handleCalendars } ) {

    const loginSuccess = async ( codeResponse ) => {
        try {
            const { code } = codeResponse;
            const tokenRes = await Axios.post( '/user/login', { code } );
            const { data } = tokenRes 
            saveToken( data ) 
            const calendarsRes = await Axios({
                method: 'get',
                url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
                headers: { Authorization: `Bearer ${ data }` }
                })
            handleCalendars(calendarsRes.data.items)
        } catch (error) {
            console.error(error)
        }
    };

    const handleLogin = useGoogleLogin( {
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar openid email profile',
        onSuccess: codeResponse => loginSuccess( codeResponse ),
        onError: errorResponse => console.log( errorResponse )
    } );
    

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
                    { token 
                        ? <button id='googleButton' onClick={ clearToken }>
                            <GoogleIcon/> Disconnect Your Google Account</button>
                        : <button id='googleButton' onClick={ () => handleLogin() }>
                            <GoogleIcon/> Sign In With Google </button>
                    }
                </div>

            </div>

        </div>
    );
}
export default Account;



