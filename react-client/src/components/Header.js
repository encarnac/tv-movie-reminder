import React from 'react';
import SearchBar from './SearchBar';
import SubNavBar from './SubNavBar';
import LoadingSpinner from './LoadingSpinner';
import IMG3 from '../photos/IMG3.jpg';

function Header( props ) {

    return (
        <>
            <div className='card text-black d-flex'>
                <img src={ IMG3 } className='card-img vw-100 opacity-25' alt='header' />
                <div className='card-img-overlay position-absolute top-50 translate-middle-y '>
                    <h1 className='card-title d-flex justify-content-evenly text-black fw-bolder'>
                        watch-soon
                    </h1>
                    <p className='card-text d-flex justify-content-evenly'>
                        Search for shows/movies by exact title and get reminded when they come out!
                    </p>
                    <p className='card-text d-flex justify-content-evenly'>
                        <SubNavBar category={ props.category } selectMovie={ props.selectMovie } selectSeries={ props.selectSeries } />
                    </p>
                    <p className='card-text d-flex justify-content-evenly' >
                        <div className='input-group w-50 shadow-lg'>
                            {/* <span className='input-group-text'>Title</span> */ }
                            <SearchBar inputState={ props.inputState } handleTitle={ props.handleTitle } />
                            { !props.display && !props.loading &&
                                <button className='btn shadow btn-outline-secondary btn-search-input' type='button' id='button-addon2' onClick={ props.handleURL } >Search</button> }
                            { !props.display && props.loading &&
                                <button className='btn shadow btn-outline-secondary btn-search-input' type='button' id='button-addon2'> <LoadingSpinner /> </button> }
                            { props.display && !props.loading &&
                                <button className='btn shadow btn-outline-secondary btn-search-input opacity-25' disabled type='button' id='button-addon2' >Search</button> }
                        </div>
                    </p>

                    { !props.loading && props.display &&
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-down-square' viewBox='0 0 16 16'>
                            <path fill-rule='evenodd' d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z' />
                        </svg>
                    }
                </div>
            </div>
        </>

    );
}

            export default Header;;