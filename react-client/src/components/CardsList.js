import React from 'react';
import Card from '../components/Card';

function CardsList({ tmdbData }) {

  return (
    <div className='d-grid gap-5 '>
      <div className='row no-gutters d-flex gap-3 justify-content-center'>
        {tmdbData.map((content, i) =>
          <div key={i} className='col col-xs-12 col-md-4 col-lg-3'>
            <Card  content={content} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CardsList;