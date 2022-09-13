import React from 'react';
import SearchInput from './SearchInput';
import CategoryButtons from './CategoryButtons';
import LoadingSpinner from '../../assets/LoadingSpinner';

function SearchForm( { props } ) {

    return (
        <>
            <div className='row px-0 px-md-5 mx-0 mx-md-5'>
                <CategoryButtons {...{ props }} />
            </div>

            <div className='input-group my-2 mb-md-5 mt-md-1'>
                <SearchInput inputState={ props.inputState } handleTitle={ props.handleTitle } clearResults={ props.clearResults } />
                { !props.display && !props.loading &&
                    <button className='btn btn-outline-secondary btn-search-input' type='button' id='button-addon2' onClick={ props.handleURL } >search</button> }
                { !props.display && props.loading &&
                    <button className='btn btn-outline-secondary btn-search-input' type='button' id='button-addon2'> <LoadingSpinner /> </button> }
                { props.display && !props.loading &&
                    <button className='btn btn-outline-secondary btn-search-input opacity-50' type='button' id='button-addon2'disabled  >search</button> }
            </div>
        </>

    );
};

export default SearchForm;

