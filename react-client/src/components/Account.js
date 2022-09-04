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

            <div className='offcanvas-header d-flex justify-content-end'>
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
            </div>
            {/* offcanvas-body container position-absolute top-50 start-50 translate-middle px-5 pb-5 */}
        
            { calendarId
                ?   <div className='offcanvas-body d-flex align-items-start my-1 py-4'>         
                        <div className='row d-flex justify-content-center align-items-center mx-3'>
                            <div className='col-12 px-3'>
                                <h3 className='offcanvas-title text-center text-wrap mb-4 pb-4 mt-0 pt-0'><strong>Welcome back, </strong><br/>{ user?.displayName }!</h3>
                                <img src={user?.image} className='round-edge img-thumbnail mb-2' style={{width:100, height:100}} alt='google-prof-pic'/>
                                <p className='fs-5'>{user?.email}</p>
                                <div className='row mx-5 gy-4' onClick={ () => handleLogout() } >
                                    <button id='googleButton' >
                                        <GoogleLogo/> Disconnect Your Google Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                :   <div className='offcanvas-body d-flex align-items-start my-1 py-4'>    
                        <div className='row d-flex justify-content-cnter align-items-center mx-3'>
                            <div className='col-12 px-3'>
                                <h3 className='offcanvas-title text-center text-wrap mb-4 pb-4 mt-0 pt-0'><strong>Welcome!</strong><br/> Let's Get Started </h3>
                                <img src={ProfileIcon} className='round-edge img-thumbnail shadow-sm opacity-50 mb-4' style={{width:80, height:80, 'border-color':'black', 'border-width':'3px' }}  alt='user-prof-pic'/>
                                <div className='row mx-5'>
                                    <button id='googleButton' onClick={ () => handleLogin() }>
                                        <GoogleLogo/> Sign In With Google 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Account;



