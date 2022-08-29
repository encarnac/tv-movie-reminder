import { React, useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
// import EventsList from './EventsList';
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

function Calendar( { calendarId, events, fetchEvents } ) {

    const [ selection, setSelected ] = useState([])


    // Create CSS style and setstate toggle for select/unselect
    const selectEvent = (e) => {
        e.jsEvent.preventDefault();
        setSelected(list => [...list, e.event])
        e.el.style.backgroundColor = '#F1F1F1';
        console.log(selection)
    }
    
    const deleteEvents = async() => {
        try {
            for (const event of selection) {
                const eventId = event.id
                const delRes = await Axios.delete( '/delete-event', { 
                    data: {   
                        calendarId: calendarId,
                        eventId: eventId
                    }
                }); 
                event.remove()
                setSelected([])
            }
        } catch (error) {
            console.error(error)
        } finally {
            fetchEvents()
        }
    }


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
                                initialView="listMonth"
                                themeSystem= 'bootstrap5'
                                aspectRatio='0.8'
                                titleFormat= {{ 
                                    year: '2-digit', 
                                    month: 'short', 
                                    day: '2-digit' 
                                }}
                                headerToolbar={{
                                    left:'title',
                                    center:'today', 
                                    right:'prev,next'
                                }}
                                footerToolbar={{
                                    center: 'deleteButton'
                                }}
                                buttonIcons={{ 
                                    prev: 'arrow-left-short', 
                                    next: 'arrow-right-short'
                                }}
                                displayEventTime={false}
                                eventInteractive={true}
                                selectable={true}
                                events={ events }
                                eventClick={(e) => selectEvent(e)}
                                customButtons={{
                                    deleteButton: {
                                    text: 'Delete selected',
                                    click: () => deleteEvents()
                                    }
                                }}
                                />
                        : <p>No upcoming releases found. <br /> You must link a Google Account.</p>
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

