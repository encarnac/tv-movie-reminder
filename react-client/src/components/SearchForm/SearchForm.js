import React from 'react';
import SearchInput from './SearchInput';
import CategoryButtons from './CategoryButtons';
import LoadingSpinner from '../../assets/LoadingSpinner';


function SearchForm( { props } ) {

    return (
        <>
            <div className='row px-0 mx-0 px-md-5 mx-md-5'>
                <CategoryButtons {...{props}} />
            </div>

            <div className='input-group my-2'>
                <SearchInput inputState={ props.inputState } handleTitle={ props.handleTitle } />
                { !props.display && !props.loading &&
                    <button className='btn btn-outline-secondary btn-search-input' type='button' id='button-addon2' onClick={ props.handleURL } >search</button> }
                { !props.display && props.loading &&
                    <button className='btn btn-outline-secondary btn-search-input' type='button' id='button-addon2'> <LoadingSpinner /> </button> }
                { props.display && !props.loading &&
                    <button className='btn btn-outline-secondary btn-search-input opacity-50' type='button' id='button-addon2'disabled  >search</button> }
            </div>
        </>

    );
}

export default SearchForm;

