import { React, useEffect } from 'react';
import Axios from 'axios';

function Calendar({ token, watchlist}) {

    const fetchEvents = (watchlist) => {
        console.log('WATCHLIST: ', watchlist);
    } 
    
    useEffect( () => {
        fetchEvents(watchlist);
        }, [ watchlist ] );

    return (
        <>
            <div className='offcanvas offcanvas-end' id='offcanvasReminders'>
                {watchlist.summary}
                {watchlist.description}
                {watchlist.id}

                {/* <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasReminders'>
                        Upcoming Releases</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body opacity-75'>
                    { !token ? <p>No Google Calendar found</p> :
                        <p>{watchlist} </p>
                    }
                </div> */}
            </div>

        </>
    );
}

export default Calendar;

