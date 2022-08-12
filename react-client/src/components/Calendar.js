import { React, useEffect } from 'react';
import Axios from 'axios';

function Calendar( { token, watchlist } ) {
    const calendarId = watchlist.id

    const fetchUpcoming = async () => {
        console.log( 'CALENDAR_ID: ', calendarId );
        const events = await Axios.post( '/user/get-upcoming', { calendarId: calendarId } );
        console.log('RESPONSE: ', events.data)
        
    };

    useEffect( () => {
        fetchUpcoming();
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
                        : (<div className='container'>
                            <p>{ watchlist.summary }</p>
                            <p>{ watchlist.description }</p>
                            <p>{ watchlist.id }</p>
                        </div>)

                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

