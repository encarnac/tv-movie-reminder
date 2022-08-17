import { React } from 'react';
import Axios from 'axios';
import { BiLinkExternal, BiTrash } from "react-icons/bi";

function EventsList( { calendarId, events, token, fetchEvents } ) {

    const deleteEvent = async(eventId) => {
        try {
           await Axios.post( '/user/delete-event', {
            calendarId: calendarId,
            eventId: eventId,
            token: token
        }); 
        } catch (error) {
            console.error(error)
        } finally {
            fetchEvents()
        }
    }


    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { events.map( ( event ) => (
                    <tr>
                        <td>{ event.start.date}</td>
                        <td>{ event.summary }</td>
                        <td><BiLinkExternal 
                            onClick={() => window.open(event.htmlLink)}  
                            style={{cursor:'pointer'}}/>
                        </td>
                        <td><BiTrash 
                                onClick={()=>{deleteEvent(event.id)}}
                                style={{cursor:'pointer'}} /></td>
                    </tr>
                ) ) }
            </tbody>
        </table>
    );
}

export default EventsList;

