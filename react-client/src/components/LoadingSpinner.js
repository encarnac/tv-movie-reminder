import React from 'react';

function LoadingSpinner({ handleClick }) {

  return (
    <div className='d-flex justify-content-center'>
      {/* <p className='text-light fs-5 fw-semibold'>Loading...</p> */}
      <div className='spinner-container'>
        <div className='loading-spinner'></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;