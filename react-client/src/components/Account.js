import React from 'react';
import Axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../assets/GoogleLogo';
import ProfileIcon from '../assets/ProfileIcon.png'


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
            const calId = loginRes.data;
            handleCalendarCookie( calId );
            handleCalendarId( calId );
        } catch (error) {
            console.error( error );
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
            handleCalendarId(null);
            removeCalendarCookie();
            handleUserData( {} );
            const logoutRes = await Axios.post( '/logout' );
        } catch( error ) {
            console.log( error );
        }
    };
    
    return (
        <div className='offcanvas offcanvas-end' id='offcanvasAccount'>

            <div className='offcanvas-header'>
                 <h5 className='offcanvas-title' id='offcanvasAccountLabel'>
                   Your Account </h5>
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
            </div>
        
            { calendarId
                ?   <div className='offcanvas-body container position-absolute top-50 start-50 translate-middle px-5 pb-5'>         
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 flex-fill'>
                                <img src={user?.image} className='round-edge img-thumbnail mb-2' alt='google-prof-pic'/>
                                <h4>{user?.displayName}</h4>
                                <p className='fs-5'>{user?.email}</p>
                                
                                <div className='flex-fill'>
                                    <button id='googleButton' onClick={ () => handleLogout() }>
                                        <GoogleLogo/> Disconnect Your Google Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                :   <div className='offcanvas-body d-flex align-items-center pb-5'>         
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 flex-fill mb-4'>
                                <img src={ProfileIcon} className='round-edge img-thumbnail mb-3' style={{width:50, height:50, 'border-color':'black'}}  alt='user-prof-pic'/>
                                <p>Allow access to your Google account to create Google Calendar reminders and receive notifications.</p>
                                <button id='googleButton' onClick={ () => handleLogin() }>
                                    <GoogleLogo/> Sign In With Google 
                                </button>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Account;



