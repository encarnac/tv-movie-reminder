import React from 'react';
import Card from './Card';

function DisplayResults({ tmdbData, token, calendarId, fetchEvents }) {

  return (
    <>
        {tmdbData.map((content, i) =>
          <div key={i} className='col col-xs-12 col-md-4 col-lg-3'>
            <Card content={content} token={ token } calendarId={ calendarId } fetchEvents={ fetchEvents } />
          </div>
        )}
    </>
  );
}

export default DisplayResults;