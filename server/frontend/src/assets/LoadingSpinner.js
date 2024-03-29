import React from 'react';

function LoadingSpinner({ handleClick }) {

  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-container'>
        <div className='loading-spinner'></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;