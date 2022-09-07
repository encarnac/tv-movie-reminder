import { React, useState, useRef } from 'react';
import Axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import LoadingSpinner from 'assets/LoadingSpinner';

function Calendar( { calendarId, events, handleAlert } ) {
    const deleteConfirm = 'Successfully deleted reminders!';
    const [ selectedEvents, setSelectedEvents ] = useState( [] );
    const [ selectedCount, setSelectedCount ] = useState( 0 );

    const selectEvent = async ( e ) => {
        e.jsEvent.preventDefault();
        const find = selectedEvents.some( selection => selection.event.id === e.event.id );
        if ( find ) {
            e.el.style.backgroundColor = '#F8F8F8';
            e.el.style.fontWeight = '400';
            e.el.style.color = 'rgb(33,37,41)';
            const filteredEvents = selectedEvents.filter( selection => selection.event.id !== e.event.id );
            setSelectedCount( selectedCount - 1 );
            setSelectedEvents( filteredEvents );
        } else {
            e.el.style.backgroundColor = '#dedee1';
            e.el.style.fontWeight = '500';
            e.el.style.color = '#69A6E2';
            const update = await setSelectedEvents( list => [ ...list, e ] );
            setSelectedCount( selectedCount + 1 );
        }

    };

    const [ loading, setLoading ] = useState( false );

    const deleteEvents = async () => {
        try {
            setLoading( true );
            for ( const selection of selectedEvents ) {
                const eventId = selection.event.id;
                const deleteRes = await Axios.delete( '/delete-event', {
                    data: {
                        calendarId: calendarId,
                        eventId: eventId
                    }
                } );
                selection.event.remove();
                setSelectedCount( selectedCount - 1 );
            }
            setSelectedCount( 0 );
            setSelectedEvents( [] );
            handleAlert( deleteConfirm );
            setLoading( false );
        } catch ( error ) {
            console.error( error );
        }
    };

    const clearSelection = () => {
        selectedEvents.map( ( event => selectEvent( event ) ) );
        setSelectedEvents( [] );
        setSelectedCount( 0 );
    };
    
    let calendarRef = useRef(null)


    return (
        <>
            <div className='offcanvas offcanvas-end' id='offcanvasReminders'>

                <div className='offcanvas-header d-flex justify-content-end'>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas'></button>
                </div>

                <div className='offcanvas-body px-4 mx-1'>
                    <div className='row d-flex justify-content-start'>
                        <div className='col-12 d-flex justify-content-start flex-column'>
                            <h3 className='offcanvas-title text-start text-wrap mt-1 ms-2'>
                                <strong>Your Watchlist </strong> 
                            </h3>   
                        </div>
                    </div>
                    { calendarId && Array.isArray( events )
                        ?   <div className='container mt-1 pb-2'>
                                <FullCalendar
                                    ref={calendarRef}
                                    plugins={ [ listPlugin, bootstrap5Plugin, interactionPlugin ] }
                                    initialView='listMonth'
                                    themeSystem='bootstrap5'
                                    aspectRatio='.56'
                                    titleFormat={ {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit'
                                    } }
                                    headerToolbar={ {
                                        left: 'title',
                                        center: 'today',
                                        right: 'prevCustom,nextCustom'
                                    } }
                                    buttonIcons={ {
                                        prevCustom: 'arrow-left-short',
                                        nextCustom: 'arrow-right-short'
                                    } }
                                    customButtons={{
                                        prevCustom: {
                                            text: 'prev',
                                            click: function() {
                                                clearSelection()
                                                let calendar = calendarRef.current.getApi()
                                                calendar.prev()
                                            }
                                        }, 
                                        nextCustom: {
                                            text: 'next',
                                            click: function() {
                                                clearSelection()
                                                let calendar = calendarRef.current.getApi()
                                                calendar.next()
                                            }
                                        }, 
                                    }}
                                    stickyHeaderDates={ false }
                                    displayEventTime={ false }
                                    eventInteractive={ true }
                                    selectable={ true }
                                    events={ events }
                                    eventClick={ ( e ) => selectEvent( e ) } />


                                <div className='row'>
                                    <div className='col-6 col-sm-4 mt-3 px-1'>
                                        <h5>Selected: <small className='text-muted'>
                                            { selectedCount }</small>
                                        </h5>
                                    </div>
                                    
                                    <div className='col-5 col-sm-8 mt-3  d-flex flex-column flex-sm-row justify-content-end gap-1'>
                                        <button className='btn btn-secondary rounded-edge px-2 px-sm-4' onClick={ () => clearSelection() }>
                                            clear</button>
                                        <button className='btn btn-delete-input px-4' onClick={ () => deleteEvents() }>
                                            { loading ? <LoadingSpinner /> : 'delete' }
                                        </button>
                                    </div>
                                </div>
                            </div>

                        :   <div className='row d-flex justify-content-center'>
                                <div className='col-12 mt-5 '>
                                    <p className='fs-5'>No upcoming releases found. <br /> You must link a Google Account.</p> 
                                </div>
                            </div>
                        
                    }
                </div>

            </div>
        </>
    );
};

export default Calendar;

