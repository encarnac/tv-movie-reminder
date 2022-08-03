import React from 'react';
import NONE from '../photos/NONE.png'

function Card({content, handleImdbID }) {
  
  const imdbID = content.imdb_id
  const title = content.title
  const year = content.year
  const genres = content.genres
  const score = content.score
  const imageUrl = content.image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

    return (
      <div class="card bg-light bg-gradient bg-opacity-50 shadow mb-5 bg-body rounded-4 " style={{'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);'}}>
        {(imageUrl === '') ? 
          <img src={NONE} class="card-img-top img-fluid" alt="..."/> :
          <img src={imageUrl} class="card-img-top img-fluid" alt="..."/>
         }
        <div class="card-body ">
          <h5 class="card-title">{title}</h5>
          <p><b>Year:</b> {year}</p>
          <p><b>Genre: </b> 
            {genres.map((genre, i, genres) => {
              if (i + 1 === genres.length) {
                return (<span>{ genre }</span>)
              } else {
                return (<span>{ genre }, </span>)
                }
              })}
          </p>
          <p><b>IMDB Score: </b> {score}</p>
          <button type="button" class="btn shadow-sm btn-search-input" value={imdbID}
            onClick={ handleImdbID }>Select</button>
        </div>
      </div>

    );
  }

export default Card;