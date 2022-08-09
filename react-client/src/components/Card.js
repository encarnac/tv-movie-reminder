import { React, useState, ImgHTMLAttributes } from 'react';
import InfoModal from '../components/InfoModal'
import fallback from '../photos/NONE.png'


function Card( { content } ) {
    const [ modalState, setModalState ] = useState( false );

    const handleClose = () => setModalState( false );

    const handleOpen = ( e ) => {
        setModalState( true );
    };

    const [imgSrc, setImgSrc] = useState(content.poster)
    
    const onError = () => setImgSrc(fallback)

    return (
        <>
            <div className='card bg-light-gradient shadow mb-5 bg-body rounded-5' style={ { 'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);' } }>
                <img src={ imgSrc ? imgSrc : fallback } className='card-img-top img-fluid p-2 rounded-5' onError={onError} alt='...' />
                <div className='card-body '>
                    <h5 className='card-title'>{ content.title }</h5>
                    { content.category === 'movie' ?
                        <p><i>{ content.release.slice( 0, 4 ) }</i></p> :
                        <p><i>{ content.first_release.slice( 0, 4 ) }</i></p>
                    }
                    <button type='button' className='btn shadow-sm btn-search-input'
                        data-bs-toggle="modal"
                        data-bs-target='#infoModal'
                        onClick={ handleOpen }> Select </button>
                </div>
            </div>

            <div >
                < InfoModal
                    modalState={ modalState }
                    handleClose={ handleClose }
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
                    poster={ imgSrc }
                />
            </div>

        </>

    );
}

export default Card;