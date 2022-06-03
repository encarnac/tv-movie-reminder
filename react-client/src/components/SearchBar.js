import React from 'react';

function SearchBar({ inputState, handleTitle }) {
  
  return (
    <>
      { inputState ? <input type="text" class="form-control shadow" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" onChange={handleTitle} />
        : <input type="text" class="form-control shadow" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" disabled readOnly/>}
    </>
  );
}

export default SearchBar;

