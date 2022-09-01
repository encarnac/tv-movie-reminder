import { React, useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
// import EventsList from './EventsList';
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

function Calendar( { calendarId, events, fetchEvents } ) {

    const [ selectedEvents, setSelectedEvents ] = useState([])
    const [ selectedCount, setSelectedCount ] = useState(0)

    const selectEvent = async (e) => {
        e.jsEvent.preventDefault();
        const find = selectedEvents.some(selection => selection.event.id === e.event.id)
        console.log('PREV SELECTION = ', selectedEvents)
        console.log(find)
        if (find) {
            e.el.style.backgroundColor = '#F8F8F8';
            e.el.style.fontWeight = '400';
            e.el.style.color='rgb(33,37,41)'
            const filteredEvents = selectedEvents.filter(selection => selection.event.id !== e.event.id)
            setSelectedCount(selectedCount-1)
            setSelectedEvents(filteredEvents)
        } else {
            e.el.style.backgroundColor = '#dedee1';
            e.el.style.fontWeight = '500';
            e.el.style.color='#69A6E2';
            const update = await setSelectedEvents(list => [...list, e])
            setSelectedCount(selectedCount+1)
        }
       
    }
    
    const deleteEvents = async() => {
        try {
            console.log('TO DELETE = ', selectedEvents)
            for (const selection of selectedEvents) {
                const eventId = selection.event.id
                console.log(eventId)
                const deleteRes = await Axios.delete( '/delete-event', { 
                    data: {   
                        calendarId: calendarId,
                        eventId: eventId
                    }
                }); 
                selection.event.remove() 
            }
            setSelectedCount(0)
            setSelectedEvents([])
        } catch (error) {
            console.error(error)
        } 
    }

    const clearSelection = () => {
        selectedEvents.map((event => selectEvent(event)))
        setSelectedEvents([])
        setSelectedCount(0)
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
                        ?   <div className='container'>
                                <FullCalendar
                                    plugins={[ listPlugin, bootstrap5Plugin, interactionPlugin ]}
                                    initialView='listMonth'
                                    themeSystem= 'bootstrap5'
                                    aspectRatio='0.65'
                                    titleFormat= {{ 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: '2-digit' 
                                    }}
                                    headerToolbar={{
                                        left:'title',
                                        center:'today', 
                                        right:'prev,next'
                                    }}
                                    buttonIcons={{ 
                                        prev: 'arrow-left-short', 
                                        next: 'arrow-right-short'
                                    }}
                                    stickyHeaderDates={false}
                                    displayEventTime={false}
                                    eventInteractive={true}
                                    selectable={true}
                                    events={ events }
                                    eventClick={(e) => selectEvent(e)}
                                    />
                                <div className='row'>
                                    <div className='col-6 col-sm-4 mt-3 px-1'>
                                        <h5>Selected: <small className='text-muted'>
                                                {selectedCount}</small>
                                        </h5>
                                    </div>
                                    <div className='col-5 col-sm-8 mt-3  d-flex flex-column flex-sm-row justify-content-end gap-1'>
                                        <button className='btn btn-secondary rounded-edge px-2 px-sm-4' onClick={ ()=> clearSelection() }>
                                            clear</button>
                                        <button className='btn btn-delete-input px-2' onClick={ ()=>deleteEvents() }>
                                            delete all</button>
                                    </div>
                                </div>
                              </div>
                        : <p>No upcoming releases found. <br /> You must link a Google Account.</p>
                    }
                </div>
            </div>

        </>
    );
}

export default Calendar;

