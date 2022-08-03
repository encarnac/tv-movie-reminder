import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function InfoModal( { modalState, handleClose, tmdbData } ) {

  return (
    <>
      <Modal show={ modalState } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{tmdbData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleClose }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModal;