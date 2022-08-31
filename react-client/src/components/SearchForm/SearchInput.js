import React from 'react';

function SearchInput({ inputState, handleTitle }) {
  
  return (
    <>
      { inputState ? <input type='text' className='form-control rounded-edge' placeholder='ex. Game of Thrones' aria-label='ex. Game of Thrones' aria-describedby='button-addon2' onChange={handleTitle} />
        : <input type='text' className='form-control rounded-edge opacity-50' placeholder='ex. Game of Thrones' aria-label='ex. Game of Thrones' aria-describedby='button-addon2' disabled readOnly/>}
    </>
  );
}

export default SearchInput;

