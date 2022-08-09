import React from 'react';
import SearchBar from './SearchBar';
import TypeButtons from './TypeButtons';
import LoadingSpinner from './LoadingSpinner';


function SearchForm( { props } ) {

    return (

        <div className='container d-grid justify-content-center '>

            <TypeButtons category={ props.category } selectMovie={ props.selectMovie } selectSeries={ props.selectSeries } />
            
            <div className='input-group px-5 my-2'>
                <SearchBar inputState={ props.inputState } handleTitle={ props.handleTitle } />
                { !props.display && !props.loading &&
                    <button className='btn shadow btn-outline-secondary btn-search-input' type='button' id='button-addon2' onClick={ props.handleURL } >Search</button> }
                { !props.display && props.loading &&
                    <button className='btn shadow btn-outline-secondary btn-search-input' type='button' id='button-addon2'> <LoadingSpinner /> </button> }
                { props.display && !props.loading &&
                    <button className='btn shadow btn-outline-secondary btn-search-input opacity-25' disabled type='button' id='button-addon2' >Search</button> }
            </div>
            
        </div>

    );
}

export default SearchForm;

