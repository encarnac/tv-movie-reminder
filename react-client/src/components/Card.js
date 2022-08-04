import { React, useState } from 'react';
import Image from 'react-bootstrap/Image';
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
      <div class="card bg-light-gradient shadow mb-5 bg-body rounded-5" style={{'width': '18rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);'}}>
        {/* <img src={content.poster} class="card-img-top img-fluid p-2 rounded-5" alt="..."/> */}
                <Image src={content.poster} fluid='true'  rounded='true' class="card-img-top p-2 "/>

        <div class="card-body ">
          <h5 class="card-title">{content.title}</h5>
          { category === 'movie' ? 
            <p><i>{content.release.slice(0,4)}</i></p> :
            <p><i>{content.first_release.slice(0,4)}</i></p> 
          }
          <button type="button" class="btn shadow-sm btn-search-input" 
            onClick={ handleOpen }> Select </button>
        </div>
      </div>

      <div>
        < InfoModal modalState={ modalState } handleClose={ handleClose }
          category={ category }
          title={ content.title }
          overview={ content.overview }
          genres={ content.genres }
          popularity={ content.popularity }
          release={content.release}
          firstRelease={ content.first_release }
          latestRelease={ content.latest_release }
          nextRelease={content.upcoming_release}
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