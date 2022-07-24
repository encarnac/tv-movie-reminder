import React from 'react';
import NONE from '../photos/NONE.png'

function Card({handleItem, item}) {
  const imdbID = item.imdb_id
  const title = item.title
  const year = item.year
  const genres = item.genres
  const score = item.score
  const imageUrl = item.image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

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
          <button class="btn shadow-sm btn-search-input" value={item.imdb_id} onClick={(e)=> {handleItem(e.target.value)}} >Select</button>
        </div>
      </div>

    );
  }

export default Card;