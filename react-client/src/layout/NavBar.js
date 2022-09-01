import { React } from 'react';

import Account from '../components/Account';
import Calendar from '../components/Calendar';

import { FaUser } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';


function NavBar( props ) {

    return (
        <>
            <nav className='navbar navbar-expand bg-light px-2 fixed-top' >
                <div className='container-fluid'>

                    <a className='navbar-brand h1' href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm-fill mx-2" viewBox="0 0 16 16">
                            <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"/>
                        </svg>
                        watch-soon
                    </a>

                    <ul className='navbar-nav gap-3'>
                            <li className='nav-item'> {/* // Reminders Button // */ }
                                <a className='nav-link' data-bs-toggle='offcanvas' href='#offcanvasReminders' role='button'>
                                    <h5 class="bi bi-calendar-heart-fill"></h5>
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
            < Account 
                user = { props.user }
                handleUserData = { props.handleUserData }
                calendarId={ props.calendarId }
                handleCalendarId = { props.handleCalendarId } 
                handleCalendarCookie = { props.handleCalendarCookie }
                removeCalendarCookie = { props.removeCalendarCookie } />
        </div>

        <div className='container'>
            < Calendar 
                calendarId={ props.calendarId } 
                events={props.events} 
                fetchEvents={props.fetchEvents} />
        </div>

        </>
    );
}

export default NavBar;