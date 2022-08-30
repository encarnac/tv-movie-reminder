import { React, useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
// import EventsList from './EventsList';
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

function Calendar( { calendarId, events, fetchEvents } ) {

    const [ selectedEvents, setSelectedEvents ] = useState([])

    const selectEvent = (e) => {
        e.jsEvent.preventDefault();
        const find = selectedEvents.some(selection => selection.id === e.event.id)
        console.log(find)
        if (find) {
            e.el.style.backgroundColor = '#F8F8F8';
            e.el.style.fontWeight = '400';
            const unselect = selectedEvents.filter(selection => selection.id !== e.event.id)
            setSelectedEvents(unselect)
        } else {
            e.el.style.backgroundColor = '#F1F1F1';
            e.el.style.fontWeight = '600';
            setSelectedEvents(list => [...list, e.event])
        }
    }
    
    const deleteEvents = async() => {
        try {
            for (const event of selectedEvents) {
                const eventId = event.id
                const deleteRes = await Axios.delete( '/delete-event', { 
                    data: {   
                        calendarId: calendarId,
                        eventId: eventId
                    }
                }); 
                event.remove() 
            }
            setSelectedEvents([])
        } catch (error) {
            console.error(error)
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

