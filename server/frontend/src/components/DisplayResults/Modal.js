import { React, useState } from 'react';
import Axios from 'axios';
import LoadingSpinner from 'assets/LoadingSpinner';
import AddButton from 'assets/AddButton';

function Modal( { modalState,
    handleClose,
    calendarId,
    fetchEvents,
    handleAlert,
    poster,
    content } ) {
    
    const addConfirm = 'Successfully added reminders!';
    const addFail = 'ERROR! You must login with your Google account to add reminders!';

    const [ loading, setLoading ] = useState( false );

    const handleReminder = (contentInfo) => {
        if (!calendarId) {
            handleAlert( 'alert-warning', addFail );
            return;
        };
        setLoading( true );
        Axios.post( '/google/add-event', {
            calendarId: calendarId,
            content: contentInfo
        } )
            .then( response => {
                console.log( response.data );
                fetchEvents();
                setLoading( false );
                handleAlert( 'alert-success', addConfirm );
                handleClose();
            } )
            .catch( error => {
                console.log( error );
            } );
    };

    const [ selectedEpisodes, setSelectedEpisodes ] = useState([])
    const [ selectedCount, setSelectedCount ] = useState( 0 );

    const handleSelect = async(e) => {
        // console.log(e)
        const find = selectedEpisodes.some(selection => selection.episodeNumber === e.episodeNumber)
        if (find) {
            const filteredEpisodes = selectedEpisodes.filter( selection => selection.episodeNumber !== e.episodeNumber);
            setSelectedCount( selectedCount - 1 );
            setSelectedEpisodes( filteredEpisodes );
        } else {
            setSelectedEpisodes( list => [...list, e]);
            setSelectedCount( selectedCount + 1 );
        }
        console.log(selectedEpisodes)
    } 

    const handleSelectedReminders = () => {
        const selectedContent = {
            category : content.category,
            title: content.title, 
            overview: content.overview, 
            seasonCount: content.seasonCount,
            seasonEpisodes: selectedEpisodes 
        }
        console.log(selectedContent)
        handleReminder(selectedContent)
        setSelectedCount(0)
        setSelectedEpisodes([])
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

                                        <div className='col-6 col-md-5 mx-auto my-2 pb-2 '>
                                            <img src={ poster } className='img-fluid rounded img-thumbnail rounded-4' alt='' />
                                        </div>

                                        <div className='col-12 col-md-7'>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-bold'>Overview:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.overview }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-bold'>Genres:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.genres?.map( ( genre, i, genres ) => {
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
                                                    <h6 className='fw-bold'>Language:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.language }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-bold'>Popularity:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.popularity }</p>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-4'>
                                                    <h6 className='fw-bold'>Status:</h6>
                                                </div>
                                                <div className='col-8'>
                                                    <p>{ content.status }</p>
                                                </div>
                                            </div>

                                            { content.category === 'movie' ?
                                                <div className='row'>
                                                    <div className='col-4'>
                                                        <h6 className='fw-bold'>Release Date:</h6>
                                                    </div>
                                                    <div className='col-8'>
                                                        <p>{ content.release }</p>
                                                    </div>
                                                </div> :

                                                <>
                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-bold'>First Release:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.firstRelease }</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-bold'>Latest Release:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.latestRelease }</p>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-bold'># Seasons:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.seasonCount }</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <h6 className='fw-bold'># Episodes:</h6>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{ content.episodeCount }</p>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col-md-12 px-1'>
                                                            <a className='btn-sm text-dark text-decoration-none' data-bs-toggle='collapse' href='#episodeDetails' role='button'>
                                                                <span className='fw-bold'>View Season { content.seasonCount } Episodes &nbsp; ▼ </span>
                                                            </a>


                                                            <div className='collapse' id='episodeDetails'>
                                                                <table className='table table-hover'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Title</th>
                                                                            <th>Date</th>
                                                                            <th><i className='bi bi-check-circle'></i></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        { content.seasonEpisodes?.map( ( episode ) => (
                                                                            <tr>
                                                                                <td>{ episode.episodeNumber }</td>
                                                                                <td>{ episode.name }</td>
                                                                                <td>{ episode.airDate }</td>
                                                                                <td>
                                                                                    <AddButton  content={ content } 
                                                                                                episode={ episode }
                                                                                                handleSelect={ handleSelect } />
                                                                                </td>
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

                            <div className='modal-footer container px-0'>
                                { content.category === 'tv' 
                                    ?   <div className='row d-flex justify-content-end'>
                                            <div className='col-6 col-md-2 px-md-0 mt-2 d-flex justify-content-end'>
                                                <p className='fw-bold text-nowrap'>Selected: <span className='fw-normal'>{selectedCount}</span></p>
                                            </div>

                                            <div className='col-6 col-md-10'>
                                            {   loading 
                                                ?       <button type='button' className='btn btn-search-input px-3 px-md-3 mx-1 active' onClick={ ()=> handleReminder(content) }>
                                                           <LoadingSpinner />
                                                        </button>
                                                :   <>
                                                        <button type='button' className='btn btn-search2-input rounded-edge px-5 px-md-3 mx-1 mb-1 mb-md-0' onClick={ ()=> handleSelectedReminders() }>
                                                            Add
                                                        </button>
                                                        <button type='button' className='btn btn-search-input px-3 px-md-3 mx-1' onClick={ ()=> handleReminder(content) }>
                                                            Add All Episodes
                                                        </button>
                                                    </>                                          
                                            }
                                            </div>




                                        </div>
                                    :   <div className='row d-flex justify-content-end'>
                                            <button type='button' className='btn btn-search-input px-3 px-md-3 mx-1' onClick={ ()=> handleReminder(content) }>
                                                { loading ? <LoadingSpinner /> : 'Add Movie' }
                                            </button>
                                        </div>
                                }
                                    

                            </div>

                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
};

export default Modal;