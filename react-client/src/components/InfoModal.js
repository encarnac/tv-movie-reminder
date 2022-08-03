import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function InfoModal({ modalState, 
                      handleClose,
                      handleReminder,
                      category, 
                      title,
                      overview, 
                      genres, 
                      popularity, 
                      release,
                      firstRelease,
                      latestRelease,
                      episodeCount,
                      seasonCount,
                      seasonEpisodes,
                      status, 
                      poster }) {


  return (
    <>
      <Modal show={ modalState } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
          <img src={poster} class="card-img-top img-fluid" alt="..."/>
        </Modal.Header>
        <Modal.Body>
          <p><span>Overview: </span>{ overview }</p>
          <p><span>Genres: </span>{ genres }</p>
          <p><span>Popularity:</span>{ popularity }</p>
          { category === 'movie' ?
            <p><span>Release Date:</span>{ release }</p> :
            <>
              <p><span>First Release: </span>{ firstRelease }</p>
              <p><span>Latest Release: </span>{ latestRelease }</p>
              <p><span>Episode Count: </span>{ episodeCount }</p>
              <p><span>Season Count: </span>{ seasonCount }</p>
              <p><span>Newest Episodes: </span>{ seasonEpisodes }</p>
            </>
          }
          
          <p><span>Status: </span>{ status }</p>
          
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="btn shadow-sm btn-search-input" onClick={ handleReminder }>
            Get Reminders
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModal;