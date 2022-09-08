import React from 'react';
import Axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../assets/GoogleLogo';
import ProfileIcon from '../assets/ProfileIcon.png';


function Account( { user,
    handleUserData,
    calendarId,
    handleCalendarId,
    handleCalendarCookie,
    removeCalendarCookie } ) {

    const calendarUrl = `https://calendar.google.com/calendar/u/0?cid=${ calendarId }`;

    const loginSuccess = async ( codeResponse ) => {
        try {
            const { code } = codeResponse;
            const loginRes = await Axios.post( '/login', { code } );
            const calId = loginRes.data;
            handleCalendarCookie( calId );
            handleCalendarId( calId );
        } catch ( error ) {
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
            handleCalendarId( null );
            removeCalendarCookie();
            handleUserData( {} );
            const logoutRes = await Axios.post( '/logout' );
        } catch ( error ) {
            console.log( error );
        }
    };


    return (
        <div className='offcanvas offcanvas-end' id='offcanvasAccount'>

            <div className='offcanvas-header d-flex justify-content-end'>
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
            </div>

            { calendarId
                ? <div className='offcanvas-body px-5 py-3 mx-1 '>
                    <div className='row d-flex justify-content-start'>
                        <div className='col-12 d-flex justify-content-start flex-column'>
                            <h3 className='offcanvas-title text-start text-wrap my-3 pb-4'>
                                <strong>Welcome back! </strong> 
                            </h3>   
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center align-content-center '>
                        <div className='col-5 d-flex justify-content-center align-content-center text-start flex-column px-1'>
                            <img src={ user?.image } className='round-edge img-thumbnail mb-4' style={ { width: 100, height: 100 } } alt='google-prof-pic' />
                        </div>
                        <div className='col-7 d-flex justify-content-center align-content-center text-start flex-column px-1'>
                            <h5>{user?.displayName}</h5>
                            <p className='fs-6'>{ user?.email }</p>

                        </div>
                    </div>

                    <div className='row d-flex justify-content-center mx-auto my-4 gy-1 ' >
                        <button id='' className='btn btn-search-input d-flex justify-content-between align-items-center flex-fill px-5 py-2' onClick={ () => window.open( calendarUrl, '_blank' ) } >
                            <h4 class="bi bi-calendar"> </h4> Google Calendar
                        </button>
                        <button id='btn-group' className='btn d-flex justify-content-between align-items-center flex-fill px-5' onClick={ () => handleLogout() } >
                            <h4 class="bi bi-box-arrow-in-right"> </h4> Logout
                        </button>
                    </div>
                </div>

                : <div className='offcanvas-body px-5 py-3 mx-1 '>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-12'>
                            <h3 className='offcanvas-title text-start text-wrap mt-3 mb-3 pb-4'>
                                <strong>Welcome!</strong><br /> 
                                Let's Get Started 
                            </h3>
                            <img src={ ProfileIcon } className='round-edge img-thumbnail shadow-sm opacity-50 mx-auto mb-4' style={ { width: 80, height: 80, 'border-color': 'black', 'border-width': '2.4px' } } alt='user-prof-pic' />
                            <div className='row px-5 me-1'>
                                <button id='googleButton' onClick={ () => handleLogin() }>
                                    <GoogleLogo /> Sign In With Google
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



