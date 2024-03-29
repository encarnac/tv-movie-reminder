import { React, useState } from 'react';
import Modal from './Modal';
import FallbackImage from '../../assets/FallbackImage.png';


function Card( { content, calendarId, fetchEvents, handleAlert } ) {
    const [ modalState, setModalState ] = useState( false );

    function handleClose(){            
        document.getElementById('infoModal').classList.remove('show', 'd-block');
        document.querySelectorAll('.modal-backdrop')
                .forEach(el => el.classList.remove('modal-backdrop'));
        setModalState(false)
    };

    const handleOpen = ( e ) => {
        setModalState( true );
    };

    const [imgSrc, setImgSrc] = useState(content.poster);
    
    const onError = () => setImgSrc(FallbackImage);

    return (
        <>
            <div className='card bg-light-gradient mb-5 rounded-edge' style={ { 'width': '20rem;', 'background-image': 'linear-gradient(to left, #607076, #253B40);' } }>
                <img src={ imgSrc ? imgSrc : FallbackImage } className='card-img-top img-fluid p-3 rounded-5' onError={ onError } alt='...' />
                <div className='card-body '>
                    <h5 className='card-title'>{ content.title }</h5>
                    { content.category === 'movie' ?
                        <p><i>{ content.release.slice( 0, 4 ) }</i></p> :
                        <p><i>{ content.firstRelease.slice( 0, 4 ) }</i></p>
                    }
                    <button type='button' className='btn shadow-sm btn-search-input'
                        onClick={ handleOpen }
                        data-bs-toggle='modal'
                        data-bs-target='#infoModal'
                        > Select </button>
                </div>
            </div>

            <div >
                < Modal
                    modalState={ modalState }
                    handleClose={ handleClose }
                    calendarId={ calendarId }
                    fetchEvents={ fetchEvents }
                    handleAlert= { handleAlert }
                    poster={ imgSrc }
                    content={ content }  />
            </div>

        </>

    );
};

export default Card;