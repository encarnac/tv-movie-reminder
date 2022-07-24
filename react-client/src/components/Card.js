import React from 'react';
// import NONE from '../photos/NONE.png'

function Card({handleItem, item}) {
  const title = item.title
  const score = item.score
  const genres = item.genres
  const imdb_id = item.imdb_id

  // if (imageURL === "") {
  //   imageURL = NONE;
  // }
    return (
      <div class="card bg-light bg-gradient bg-opacity-50 shadow mb-5 bg-body rounded-4 " style={{'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);'}}>
        {/* <img src={imageURL} class="card-img-top img-fluid" alt="..."/> */}
        <div class="card-body ">
          <h5 class="card-title">{title}</h5>
          <p><b>IMDB Score: </b> {score}</p>
          <p><b>Genre: </b> 
            {genres.map((genre, i, genres) => {
              if (i + 1 === genres.length) {
                return (<span>{ genre }</span>)
              } else {
                return (<span>{ genre }, </span>)
                }
              })}
          </p>
          <button class="btn shadow-sm btn-search-input" value={item.imdb_id} onClick={(e)=> {handleItem(e.target.value)}} >Select</button>
        </div>
      </div>

    );
  }

export default Card;