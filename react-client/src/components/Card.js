import { React, useState } from 'react';
import InfoModal from '../components/InfoModal';


function Card({content}) {
  const [ modalState, setModalState ] = useState(false)

  const handleClose = () => setModalState( false )

  const handleOpen = ( e ) => {
    setModalState( true );
  };
  
  const category = content.category

  return (
    <>
        <div className='card bg-light-gradient shadow mb-5 bg-body rounded-5' style={ { 'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);' } }>
            <img src={content.poster} className='card-img-top img-fluid p-2 rounded-5' alt='...'/>
            <div className='card-body '>
                <h5 className='card-title'>{ content.title }</h5>
                { category === 'movie' ?
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
                modalState={modalState}
                handleClose={ handleClose }
                id={content.id} 
                category={ category }
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
                poster={ content.poster }
            />
        </div>

    </>

  );
}

export default Card;