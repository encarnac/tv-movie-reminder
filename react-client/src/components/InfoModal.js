import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function InfoModal( { modalState, handleClose, tmdbData } ) {

  return (
    <>
      <Modal show={ modalState } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{tmdbData} Woohoo, you're reading this text in a modal!</Modal.Body>
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