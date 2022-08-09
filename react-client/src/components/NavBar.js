/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import Axios from 'axios';



function NavBar( ) {
    const [ authorized, setAuthorized ] = useState( false );

    const handleAuthorization = () => {
        Axios.get( `http://localhost:5000/authorize`, {
            headers: {
                'Access-Control-Allow-Origin': '* ',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        } )
            .then( ( res ) => {
                window.location.assign( res.data.authorization_url );
            } )
            .catch( ( err ) => console.log( err ) );
    };

    const handleRemoveAuth = () => {
        setAuthorized(false)
    }


    return (
        <>
            <nav className='navbar navbar-expand navbar-light bg-light' >
                <div className='container-fluid '>

                    <a className='navbar-brand h1' href='/'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-hexagon-half mx-2' viewBox='0 0 16 16'>
                            <path d='M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z' />
                        </svg>
                        watch-soon
                    </a>

                    <ul className='navbar-nav gap-2'>
                            <li className='nav-item'> {/* // Reminders Button // */ }
                                <a className='nav-link' data-bs-toggle='offcanvas' href='#offcanvasReminders' role='button'>
                                    < IoNotifications />
                                </a>
                            </li>

                            <li className='nav-item'> {/* // Settings Button // */ }
                                <a className='nav-link' data-bs-toggle='offcanvas' href='#offcanvasAccount' role='button'>
                                    <FaUser />
                                </a>
                            </li>
                    </ul>

                </div>
            </nav>



        {/* 
        // Offcanvas for Account Settings
        */}
            <div className='offcanvas offcanvas-end' id='offcanvasAccount'>
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasAccountLabel'>
                        Account Settings</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body opacity-75'>
                    { authorized ? 
                        <button className='btn shadow btn-search-input' type='button' onClick={ handleRemoveAuth }>
                            Remove Google Calendar</button> :
                        <button className='btn shadow btn-search-input' type='button' onClick={ handleAuthorization }> 
                            Connect Google Calendar </button>
                    }

                    <p className='mt-2'>Allow access to your Google account to create Google Calendar reminders and receive notifications.</p>
                </div>
            </div>


        {/* 
        // Offcanvas for Reminders
        */}
            <div className='offcanvas offcanvas-end' id='offcanvasReminders'>
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasReminders'>
                        Upcoming Releases</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body opacity-75'>
                    { !authorized && (
                        <p>No Google Calendar found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default NavBar;