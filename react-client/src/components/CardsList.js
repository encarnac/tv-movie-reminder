import React from 'react';
import Card from '../components/Card';


function CardsList({ results, handleItem }) {

  return (
    <div class="d-grid gap-5 ">

      <div class="row no-gutters d-flex gap-3 justify-content-center">
        {results.map((results, i) =>
          <div key={i} class="col col-xs-12 col-md-4 col-lg-3">
            <Card handleItem={handleItem} imageURL={results.image} title={results.title} rating={results.rating} contentRating={results['content rating']} imdbID={results['imdb id']} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CardsList;