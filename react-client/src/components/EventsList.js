import { React, useEffect, useState } from 'react';

function EventsList( { events } ) {

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                { events.map( ( event ) => (
                    <tr>
                        <td>{ event.start.date}</td>
                        <td>{ event.summary }</td>
                    </tr>
                ) ) }
            </tbody>
        </table>
    );
}

export default EventsList;

