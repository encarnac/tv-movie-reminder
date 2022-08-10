import { React, useState } from 'react';

import Account from '../components/Account';
import Calendar from '../components/Calendar';

import { FaUser } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';


function NavBar( ) {
    const [ token, setToken ] = useState('')

    const saveToken = ( res ) => { 
        setToken( res );
        }

    const clearToken = () => {
        setToken('')
    }


    return (
        <>
            <nav className='navbar navbar-expand navbar-light bg-light p-3' >
                <div className='container-fluid'>

                    <a className='navbar-brand h1' href='/'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-hexagon-half mx-2' viewBox='0 0 16 16'>
                            <path d='M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z' />
                        </svg>
                        watch-soon
                    </a>

                    <ul className='navbar-nav gap-2'>
                            <li className='nav-item'> {/* // Reminders Button // */ }
                                <a className='nav-link' data-bs-toggle='offcanvas' href='#offcanvasReminders' role='button'>
                                    <IoNotifications />
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



        <div className='container'>
            < Account token={token} saveToken={saveToken} clearToken={clearToken} />
        </div>

        <div className='container'>
            < Calendar token={token} />
        </div>

        </>
    );
}

export default NavBar;