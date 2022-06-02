/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { RiSettings4Fill } from 'react-icons/ri';



function NavBar({selectMovie, selectSeries}) {


    return (
      <div>
        <nav class="navbar navbar-expand navbar-light bg-light" >
            <div class="container-fluid ">            
              <ul class="navbar-nav">
              {/* 
              // Icon and brand name 
              */}
                <li class="navbar-brand h1"><a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hexagon-half mx-2" viewBox="0 0 16 16">
                        <path d="M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />
                    </svg>
                    watch-soon
                </a></li>

              {/* 
              // Navigation Links 
              */}


                
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">My Watchlist</a>
                </li>
                
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Find a Show/Movie
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a class="dropdown-item" onClick={selectSeries}>Show</a></li>
                    <li><a class="dropdown-item" onClick={selectMovie}>Movie</a></li>
                  </ul>
                </li> 

              </ul>
                
              {/* 
              // Settings button 
              */}
                <a class="navbar-brand" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                  <RiSettings4Fill />
                </a>
            </div>
        </nav>

      {/* 
      // Offcanvas pop-up on right 
      */}
      <div class="offcanvas offcanvas-end text-light bg-dark opacity-75" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Settings</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-dark opacity-75">
          {/* 
          // Accordion links for settings 
          */}
          <div class="accordion accordion-flush bg-dark " id="accordionFlushExample">
            {/* 
            //Google Calendar Settings 
            */}
            <div class="accordion-item bg-dark ">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Google Calendar
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body d-flex bd-highlight mb-3 text-light">
                  <div class=" justify-content-center">
                    Allow permissions to access your Google Calendar to manage and receive reminders.
                    <button type="button" class="btn btn-primary mt-3">Link Google Account</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 
            Desktop Notifications 
            */}
            <div class="accordion-item bg-dark">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Desktop Notifications
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body text-light">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                      <label class="form-check-label" for="flexSwitchCheckDefault">Enable desktop notifications</label>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }

  export default NavBar;