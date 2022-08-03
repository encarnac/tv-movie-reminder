import React from 'react';
import Card from '../components/Card';


function CardsList({ imdbData, handleImdbID }) {

  return (
    <div class="d-grid gap-5 ">
      <div class="row no-gutters d-flex gap-3 justify-content-center">
        {imdbData.map((content, i) =>
          <div key={i} class="col col-xs-12 col-md-4 col-lg-3">
            <Card  content={content} handleImdbID={handleImdbID} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CardsList;