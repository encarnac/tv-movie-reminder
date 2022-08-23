import { React, useState } from 'react';
import Modal from './Modal';
import FallbackImage from '../../assets/FallbackImage.png';


function Card( { content, token, calendarId, fetchEvents } ) {
    const [ modalState, setModalState ] = useState( false );

    // const handleClose = () => setModalState( false );

    function handleClose(){            
        document.getElementById('infoModal').classList.remove('show', 'd-block');
        document.querySelectorAll('.modal-backdrop')
                .forEach(el => el.classList.remove('modal-backdrop'));
}

    const handleOpen = ( e ) => {
        setModalState( true );
    };

    const [imgSrc, setImgSrc] = useState(content.poster)
    
    const onError = () => setImgSrc(FallbackImage)

    return (
        <>
            <div className='card bg-light-gradient shadow-sm mb-5 rounded-4' style={ { 'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);' } }>
                <img src={ imgSrc ? imgSrc : FallbackImage } className='card-img-top img-fluid p-3 rounded-5' onError={onError} alt='...' />
                <div className='card-body '>
                    <h5 className='card-title'>{ content.title }</h5>
                    { content.category === 'movie' ?
                        <p><i>{ content.release.slice( 0, 4 ) }</i></p> :
                        <p><i>{ content.first_release.slice( 0, 4 ) }</i></p>
                    }
                    <button type='button' className='btn shadow-sm btn-search-input'
                        data-bs-toggle='modal'
                        data-bs-target='#infoModal'
                        onClick={ handleOpen }> Select </button>
                </div>
            </div>

            <div >
                < Modal
                    modalState={ modalState }
                    handleClose={ handleClose }
                    token={ token }
                    calendarId={ calendarId }
                    fetchEvents={ fetchEvents }
                    poster={ imgSrc }
                    content={ content }
                    id={ content.id }
                    category={ content.category }
                    title={ content.title }
                    overview={ content.overview }
                    genres={ content.genres }
                    popularity={ content.popularity }
                    release={ content.release }
                    firstRelease={ content.first_release }
                    latestRelease={ content.latest_release }
                    episodeCount={ content.episode_count }
                    seasonCount={ content.season_count }
                    seasonEpisodes={ content.season_episodes }
                    status={ content.status }
                    
                />
            </div>

        </>

    );
}

export default Card;