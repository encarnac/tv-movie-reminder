import React from 'react';

function SearchBar({ display, handleTitle }) {



  return (
    <>
      {display ? 
        <input type="text" class="form-control shadow disabled" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" disabled readonly />
        : <input type="text" class="form-control shadow" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" onChange={handleTitle} />
        }
    </>
  );
}

export default SearchBar;

