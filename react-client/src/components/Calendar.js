import React from 'react';

function Calendar({ token }) {

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
                        <p>CALL GOOGLE CALENDAR API TO DISPLAY </p>
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

