import { React } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

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
    <div class="h-50 d-inline-block">
      <Modal show={ modalState } onHide={ handleClose } size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={ 4 }>
                <Image src={poster} fluid='true' rounded='true' />
              </Col>
              <Col sm={ 8 }>
                <Row>
                  <Col sm={6}>
                    <h6>Overview:</h6>
                  </Col>
                  <Col sm={6}>
                     <p>{overview}</p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <h6>Genres:</h6>
                  </Col>
                  <Col sm={6}>
                     <p>{genres}</p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <h6>Popularity:</h6>
                  </Col>
                  <Col sm={6}>
                     <p>{popularity}</p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={ 6 }>
                    <h6>Status:</h6>
                  </Col>
                  <Col sm={ 6 }>
                    <p>{ status }</p>
                  </Col>
                </Row>

                { category === 'movie' ?
                  <Row>
                    <Col sm={ 6 }>
                      <h6>Release Date:</h6>
                    </Col>
                    <Col sm={ 6 }>
                      <p>{ release }</p>
                    </Col>
                  </Row> :

                  <>
                    <Row> 
                      <Col sm={ 6 }>
                        <h6>First Release:</h6>
                      </Col>
                      <Col sm={ 6 }>
                        <p>{ firstRelease }</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={ 6 }>
                        <h6>Latest Release:</h6>
                      </Col>
                      <Col sm={ 6 }>
                        <p>{ latestRelease }</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={ 6 }>
                        <h6>Episode Count:</h6>
                      </Col>
                      <Col sm={ 6 }>
                        <p>{ episodeCount }</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={ 6 }>
                        <h6>Season Count:</h6>
                      </Col>
                      <Col sm={ 6 }>
                        <p>{ seasonCount }</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={ 6 }>
                        <h6>New Episodes:</h6>
                      </Col>
                      <Col sm={ 6 }>
                        <p>{ seasonEpisodes }</p>
                      </Col>
                    </Row>
                  </> 
                }



              </Col>
            </Row>
          </Container>
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
    </div>
  );
}

export default InfoModal;