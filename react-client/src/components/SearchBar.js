import React from 'react';

function SearchBar({submitInput, handleInputChange}) {



    return (
    <>
        <div class="input-group mb-3 w-50 shadow-lg">
          {/* <span class="input-group-text" id="button-addon2">Movies</span> */}
          <input type="text" class="form-control" placeholder="Enter the title" aria-label="Search by Title" aria-describedby="button-addon2" onChange={handleInputChange} />
          <button class="btn btn-outline-secondary btn-search-input" type="button" id="button-addon2" onClick={submitInput} >Search</button>
        </div>
    </>
    );
}

export default SearchBar;

