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
        const find = selectedEvents.some(selection => selection.id === e.event.id)
        console.log(find)
        if (find) {
            e.el.style.backgroundColor = '#F8F8F8';
            e.el.style.fontWeight = '400';
            e.el.style.color='rgb(33,37,41)'
            const unselect = selectedEvents.filter(selection => selection.id !== e.event.id)
            setSelectedCount(selectedCount-1)
            setSelectedEvents(unselect)
            
        } else {
            e.el.style.backgroundColor = '#G1G1G1';
            e.el.style.fontWeight = '600';
            e.el.style.color='#69A6E2';
            const update = await setSelectedEvents(list => [...list, e.event])
            setSelectedCount(selectedCount+1)
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
            setSelectedCount(0)
            setSelectedEvents([])
        } catch (error) {
            console.error(error)
        } 
    }

    const clearSelection = () => {
        setSelectedCount(0)
        setSelectedEvents([])
        fetchEvents()
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
                                    initialView="listMonth"
                                    themeSystem= 'bootstrap5'
                                    aspectRatio='0.68'
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
                                    buttonIcons={{ 
                                        prev: 'arrow-left-short', 
                                        next: 'arrow-right-short'
                                    }}
                                    displayEventTime={false}
                                    eventInteractive={true}
                                    selectable={true}
                                    events={ events }
                                    eventClick={(e) => selectEvent(e)}
                                    />
                                <div className='row mt-3'>
                                    <div className='col-4 my-2 ps-3'>
                                        <h6>Selected:</h6>
                                    </div>
                                    <div className='col-1 my-2 pe-2'>
                                        <span>{selectedCount}</span>
                                    </div>
                                    <div className='col-7 pe-3'>
                                        <button className='btn btn-clear-input ms-3' onClick={ ()=> clearSelection() }>
                                            clear</button>
                                        <button className='btn btn-delete-input ms-2' onClick={ ()=>deleteEvents() }>
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

