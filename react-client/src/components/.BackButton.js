import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';


function BackButton() {
    let navigate = useNavigate();

    function handleClick() {
      navigate(-1)
    }

    return (
      <div class="mt-5" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
      </div>
    );
  }

  export default BackButton;