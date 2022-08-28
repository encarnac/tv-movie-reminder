import { React, useState, useMemo, useEffect } from 'react';
import EventsList from './EventsList';
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

function Calendar( { calendarId, events, fetchEvents } ) {

    return (
        <>
            <div className='offcanvas offcanvas-end' id='offcanvasReminders'>
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasReminders'>
                        Your Watchlist</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>
                <div className='offcanvas-body opacity-75 px-4'>
                    {calendarId && Array.isArray(events) 
                        ? <FullCalendar
                                plugins={[ listPlugin, bootstrap5Plugin, interactionPlugin ]}
                                initialView="listWeek"
                                themeSystem= 'bootstrap5'
                                aspectRatio='0.7'
                                events={ events } />
                        : <p>No upcoming releases found. <br /> You must link a Google Account.</p>
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

