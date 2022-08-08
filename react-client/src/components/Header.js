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


                </div>
            </div>
        </>

    );
}

            export default Header;;