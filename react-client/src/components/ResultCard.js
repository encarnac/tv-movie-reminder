import React from 'react';
import NONE from '../photos/NONE.png'

function ResultCard({imageURL, title, rating, contentRating}) {
  if (imageURL === "") {
    imageURL = NONE;
  }

    return (
      <div class="card bg-light bg-gradient bg-opacity-50 shadow mb-5 bg-body rounded-4 " style={{'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);'}}>
        <img src={imageURL} class="card-img-top img-fluid" alt="..."/>
        <div class="card-body ">
          <h5 class="card-title">{title}</h5>
          <p><b>IMDB Rating: </b> {rating}</p>
          <p><b>Content Rating: </b> {contentRating}</p>
          <button class="btn shadow-sm btn-search-input">Select</button>
        </div>
      </div>

    );
  }

  export default ResultCard;