import React from 'react';
import Card from './Card';

function DisplayResults({ tmdbData, calendarId, fetchEvents }) {

  return (
    <>
        {tmdbData?.map((content, i) =>
          <div key={i} className='col col-8 col-md-4 col-lg-3'>
            <Card content={content} calendarId={ calendarId } fetchEvents={ fetchEvents } />
          </div>
        )}
    </>
  );
}

export default DisplayResults;