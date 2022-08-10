import { React, useState, useEffect } from 'react';
import Axios from 'axios';

const SERVER_URL = process.env.REACT_APP_URL
const CLIENT_ID = process.env.REACT_APP_GAPI_KEY

function Calendar({ token }) {

    async function fetchCalendars() {
        try {
            const res = await Axios({
                method: 'get',
                url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
                headers: { Authorization: `Bearer ${token}` }
                })
            console.log(res)
            setWaitlist(res)
        } catch (error) {
    console.error( error);
  }}

    useEffect( () => {
        fetchCalendars();
    }, [ token ] );
  
        

    const [ waitlist, setWaitlist] = useState([]) 


    return (
        <>
            <div className='offcanvas offcanvas-end' id='offcanvasReminders'>
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasReminders'>
                        Upcoming Releases</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body opacity-75'>
                    { !token ? <p>No Google Calendar found</p> :
                        <p>{waitlist} </p>
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

