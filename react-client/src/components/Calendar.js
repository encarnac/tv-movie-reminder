import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import EventsList from './EventsList';

function Calendar( { token, watchlist } ) {
    const calendarId = watchlist.id;
    const [ events, setEvents ] = useState( [] );

    const fetchEvents = async () => {
        try {
            const eventsRes = await Axios.post( '/user/get-upcoming', {
                calendarId: calendarId,
                token: token
                }
            );
            console.log( 'EVENTS RESPONSE: ', eventsRes.data );
            setEvents( eventsRes.data );
        } catch(error) {
            console.log(error)
        }
    };

    useEffect( () => {
        fetchEvents();
    }, [ watchlist ] );


    return (
        <>
            <div className='offcanvas offcanvas-end' id='offcanvasReminders'>
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasReminders'>
                        Upcoming Releases</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body opacity-75 px-4'>
                    {token && Array.isArray(events) 
                    ? < EventsList calendarId={ calendarId } events={ events } token={ token } fetchEvents={fetchEvents} />
                    : <p>No upcoming releases found. <br /> You must link a Google Account.</p>
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

