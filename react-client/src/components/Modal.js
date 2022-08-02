import { React, useEffect, useState } from 'react';
import Axios from 'axios';

function Modal( { server, category, imdbID} ) {
  const [tmdbData, setTmdbData] = useState([])


  useEffect( () => {
    Axios.get( `${ server }/details?category=${ category }&imdb_id=${ imdbID }`)
      .then( response => {
      setTmdbData( response.data );
    } ).catch( error => {
      console.log( error );
    } );
  }, [])

  return (
    <>
    <p>{tmdbData}</p>
      <div class="modal fade" id="selectionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn shadow-sm btn-search-input">Get Reminders</button>
            </div>
          </div>
        </div>
      </div>
    </>  
  );
}

export default Modal;