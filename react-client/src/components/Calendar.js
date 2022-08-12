import { React, useEffect, useState } from 'react';
import Axios from 'axios';

function Calendar( { token, watchlist } ) {
    const calendarId = watchlist.id;
    const [ events, setEvents ] = useState( [] );

    const fetchEvents = async () => {
        const eventsRes = await Axios.post( '/user/get-upcoming', { 
            calendarId: calendarId,
            token: token 
            }
        );
        console.log( 'RESPONSE: ', eventsRes);
        // setEvents( eventsRes.data );
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
                <div className='offcanvas-body opacity-75'>
                    { !token
                        ? <p>No Google Calendar found</p>
                        :
                        events.map(( event ) => (
                            <div className='container'>
                                <p>{event.summary}</p>
                                <p>{event.id}</p>
                                <p>{event.description}</p>
                                <p>{event.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

