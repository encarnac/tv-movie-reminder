import React from 'react';
import Axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../assets/GoogleLogo';

function Account( { user,
                    handleUserData,
                    calendarId, 
                    handleCalendarId, 
                    handleCalendarCookie, 
                    removeCalendarCookie } ) {

    const loginSuccess = async ( codeResponse ) => {
        try {
            const { code } = codeResponse;
            const loginRes = await Axios.post( '/login', { code } );
            const calId = loginRes.data
            handleCalendarCookie( calId )
            handleCalendarId( calId )
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

    const handleLogout = async () => {
        try {
            handleCalendarId(null)
            removeCalendarCookie()
            handleUserData({})
            const logoutRes = await Axios.post( '/logout' )
        } catch( error ) {
            console.log( error )
        }
    }
    

    return (
        <div className='offcanvas offcanvas-end' id='offcanvasAccount'>

            <div className='offcanvas-header'>
                { calendarId 
                ? <h5 className='offcanvas-title' id='offcanvasAccountLabel'>
                   Signed in as </h5>
                : <h5 className='offcanvas-title' id='offcanvasAccountLabel'>
                    No Account Found </h5>
                }
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
            </div>
            <div className='offcanvas-body '>         
                <div className='d-flex justify-content-center'>
                    { calendarId
                        ?   <div>
                                <img src={user?.image} className='round-edge img-thumbnail' alt='google-prof-pic'/>
                                <h4>{user?.displayName}</h4>
                                <p class="fs-5">{user?.email}</p>
                                
                                <div className='m-4'>
                                    <button id='googleButton' onClick={ () => handleLogout() }>
                                        <GoogleLogo/> Disconnect Your Google Account
                                    </button>
                                </div>
                            </div>
                        :   <div>
                                <p className='mx-2'>
                                Allow access to your Google account to create Google Calendar reminders and receive notifications.</p>
                                <button id='googleButton' onClick={ () => handleLogin() }>
                                    <GoogleLogo/> Sign In With Google </button>
                            </div>
                    }
                </div>

            </div>

        </div>
    );
}
export default Account;



