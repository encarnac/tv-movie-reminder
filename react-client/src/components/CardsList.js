import React from 'react';
import Card from '../components/Card';


function CardsList({ results, handleItem }) {

  return (
    <div class="d-grid gap-5 ">
      <div class="row no-gutters d-flex gap-3 justify-content-center">
        <p>{results.title}</p>
      </div>
    </div>
  );
}

export default CardsList;
