import { React } from 'react';

function InfoModal( { modalState,
    handleClose,
    handleReminder,
    id,
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
    poster } ) {


    return (
        <div className='h-50 d-inline-block'>
            { modalState && (
                <div className='modal fade' id='infoModal' tabindex='-1'>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>

                            <div className='modal-header'>
                                <h5 className='modal-title'>{ title }</h5>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' onClick={ handleClose } ></button>
                            </div>

                            <div className='modal-body'>
                                <div className='container text-start'>
                                    <div className='row'>

                                        <div className='col-4 my-2'>
                                            <img src={ poster } className='img-fluid rounded img-thumbnail rounded-4' alt='' />
                                        </div>

                                        <div className='col-8'>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6>Overview:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ overview }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6>Genres:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ genres.map( ( genre, i, genres ) => {
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
                                                    <h6>Popularity:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ popularity }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6>Status:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ status }</p>
                                                </div>
                                            </div>

                                            { category === 'movie' ?
                                                <div className='row'>
                                                    <div className='col-4'>
                                                        <h6>Release Date:</h6>
                                                    </div>
                                                    <div className='col-8'>
                                                        <p>{ release }</p>
                                                    </div>
                                                </div> :

                                                <>
                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6>First Release:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ firstRelease }</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6>Latest Release:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ latestRelease }</p>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6># Seasons:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ seasonCount }</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6># Episodes:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ episodeCount }</p>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col'>
                                                            <a className='btn'  data-bs-toggle='collapse' href='#episodeDetails' role='button'>
                                                                <span className='fw-bolder'>View Season { seasonCount } Episodes</span>
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
                                                                        { seasonEpisodes.map( ( episode ) => (
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
                                                </>}
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

export default InfoModal;