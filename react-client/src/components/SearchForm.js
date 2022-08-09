import React from 'react';
import SearchBar from './SearchBar';
import TypeButtons from './TypeButtons';
import LoadingSpinner from './LoadingSpinner';


function SearchForm( { props } ) {

    return (
        <>
            <div className='row px-5 mx-5'>
                <TypeButtons category={ props.category } selectMovie={ props.selectMovie } selectSeries={ props.selectSeries } />
            </div>

            <div className='input-group my-2'>
                <SearchBar inputState={ props.inputState } handleTitle={ props.handleTitle } />
                { !props.display && !props.loading &&
                    <button className='btn shadow btn-outline-secondary btn-search-input' type='button' id='button-addon2' onClick={ props.handleURL } >search</button> }
                { !props.display && props.loading &&
                    <button className='btn shadow btn-outline-secondary btn-search-input' type='button' id='button-addon2'> <LoadingSpinner /> </button> }
                { props.display && !props.loading &&
                    <button className='btn shadow btn-outline-secondary btn-search-input opacity-25' disabled type='button' id='button-addon2' >search</button> }
            </div>
        </>

    );
}

export default SearchForm;

