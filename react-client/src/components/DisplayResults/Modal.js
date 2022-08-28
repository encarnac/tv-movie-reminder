import { React } from 'react';
import Axios from 'axios';

function Modal( { modalState,
                    handleClose,
                    calendarId,
                    fetchEvents,
                    poster,
                    content } ) {

    const handleReminder = () => {
        Axios.post( '/add-event', {
            calendarId: calendarId,
            content: content
        }) 
        .then(response => {
            console.log(response.data);
            fetchEvents()
            handleClose()
        })
        .catch( error => {
            console.log( error );
        });
    }
    
    return (
        <div className='h-50 d-inline-block'>
            { modalState && (
                <div className='modal fade' id='infoModal' tabindex='-1'>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>

                            <div className='modal-header'>
                                <h5 className='modal-title'>{ content.title }</h5>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' onClick={ handleClose } ></button>
                            </div>

                            <div className='modal-body'>
                                <div className='container text-start'>
                                    <div className='row'>

                                        <div className='col-5 my-2'>
                                            <img src={ poster } className='img-fluid rounded img-thumbnail rounded-4' alt='' />
                                        </div>

                                        <div className='col-7'>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-semibold'>Overview:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.overview }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-semibold'>Genres:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.genres.map( ( genre, i, genres ) => {
                                                        if ( i + 1 === genres.length ) {
                                                            return ( <span>{ genre }</span> );
                                                        } else {
                                                            return ( <span>{ genre }, </span> );
                                                        }
                                                    } )
                                                    }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-semibold'>Popularity:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.popularity }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-semibold'>Status:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.status }</p>
                                                </div>
                                            </div>

                                            { content.category === 'movie' ?
                                                <div className='row'>
                                                    <div className='col-4'>
                                                        <h6 className='fw-semibold'>Release Date:</h6>
                                                    </div>
                                                    <div className='col-8'>
                                                        <p>{ content.release }</p>
                                                    </div>
                                                </div> :

                                                <>
                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-semibold'>First Release:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.first_release }</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-semibold'>Latest Release:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.latest_release }</p>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-semibold'># Seasons:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.season_count }</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-semibold'># Episodes:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.episode_count }</p>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col'>
                                                            <a className='btn-sm text-dark text-decoration-none' data-bs-toggle='collapse' href='#episodeDetails' role='button'>
                                                                <span className='fw-semibold'>View Season { content.season_count } Episodes &nbsp; ▼ </span>
                                                            </a>


                                                            <div className='collapse' id='episodeDetails'>
                                                                <table className='table table-hover'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Title</th>
                                                                            <th>Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        { content.season_episodes.map( ( episode ) => (
                                                                            <tr>
                                                                                <td>{ episode.episode_number }</td>
                                                                                <td>{ episode.name }</td>
                                                                                <td>{ episode.air_date }</td>
                                                                            </tr>
                                                                        ) ) }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> }
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary rounded-edge' data-bs-dismiss='modal' onClick={ handleClose }>Close</button>
                                <button type='button' className='btn btn-search-input' onClick={ handleReminder }>Get Reminders</button>
                            </div>

                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
}

export default Modal;