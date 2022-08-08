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
                "Access-Control-Allow-Origin": "* ",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        } )
            .then( ( res ) => {
                window.location.assign( res.data.authorization_url );
            } )
            .catch( ( err ) => console.log( err ) );
    };




    return (
        <>
            <nav class="navbar navbar-expand navbar-light bg-light" >
                <div class="container-fluid ">
                    {/* // Icon and Name // */ }
                    <ul class="navbar-nav">
                        <li>
                            <a class="navbar-brand h1" href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hexagon-half mx-2" viewBox="0 0 16 16">
                                    <path d="M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />
                                </svg>
                                watch-soon
                            </a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                < IoNotifications />
                            </a>
                            <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                                <li class="px-2 ">
                                    { authorized ? <span>Insert Upcoming</span> : <span>No calendar found</span> }
                                </li>

                            </ul>
                        </li>

                        <li class="nav-item"> {/* // Settings Button // */ }
                            <a class="nav-link" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                <FaUser />
                            </a>
                        </li>
                    </ul>



                </div>
            </nav>



            {/* 
      //
      // Offcanvas pop-up on right 
      //
      */}
            <div class="offcanvas offcanvas-end text-dark " tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Settings</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body opacity-75">
                    { authorized ? <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2" >Remove Google Calendar</button>
                        : <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2" onClick={ handleAuthorization } >Connect Google Calendar</button>
                    }

                    <p class="mt-2">Allow access to your Google account to create Google Calendar reminders and receive notifications.</p>
                </div>
            </div>
        </>
    );
}

export default NavBar;