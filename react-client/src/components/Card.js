import React from 'react';
import NONE from '../photos/NONE.png'

function Card({content, handleSelection }) {
  
  const title = content.title
  const year = content.release.slice(0,4)
  const poster = content.poster     

    return (
      <div class="card bg-light bg-gradient bg-opacity-50 shadow mb-5 bg-body rounded-4 " style={{'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);'}}>
          <img src={poster} class="card-img-top img-fluid" alt="..."/>
        <div class="card-body ">
          <h5 class="card-title">{title}</h5>
          <p><i>{year}</i></p>
          <button type="button" class="btn shadow-sm btn-search-input" value={content}
            onClick={ handleSelection }>Select</button>
        </div>
      </div>

    );
  }

export default Card;