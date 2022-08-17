import React from 'react';
import Card from '../components/Card';

function CardsList({ tmdbData, token, calendarId }) {

  return (
    <>
        {tmdbData.map((content, i) =>
          <div key={i} className='col col-xs-12 col-md-4 col-lg-3'>
            <Card content={content} token={ token } calendarId={ calendarId } />
          </div>
        )}
    </>
  );
}

export default CardsList;