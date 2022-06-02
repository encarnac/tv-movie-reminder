import React from 'react';

function LoadingSpinner({ handleClick }) {

  return (
    <div class="d-flex justify-content-center">
      {/* <p className="text-light fs-5 fw-semibold">Loading...</p> */}
      <div class="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;