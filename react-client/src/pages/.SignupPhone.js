import React from 'react';
import { Link } from 'react-router-dom';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import BackButton from '../components/BackButton';



function SignupPhone({usePhone, useEmail}) {

     return (
        <>
     <BackButton/>
     <div class="container">
          <div class="row align-items-center justify-content-center">
               <div class="col col-sm-5 col-lg-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-hexagon-half mt-5 mb-0 img-thumbnail placeholder-glow" viewBox="0 0 16 16">
                        <path d="M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />
                    </svg>
                    <h1 class="display-6 mb-5">Sign Up</h1>
               </div>
          </div>

          
          <div class="row align-items-center justify-content-center">
               <div class="d-flex flex-wrap col-sm-5 col-lg-3 bd-highlight mb-0">
                    <label for="inteltelinput" class="form-label text-muted fs-6">Use phone number:</label>
                    <IntlTelInput class="form-control" id ="inteltelinput" containerClassName="intl-tel-input" inputClassName="form-control"/> 
               </div>
               <div class="row align-items-center justify-content-center mt-0">
                    <div class="d-flex justify-content-end col-sm-5 col-lg-3 bd-highlight me-5">
                         <Link className="text-link" to="/signup-email">
                              <button onClick={usePhone} type="button" class="btn btn-outline-dark btn-sm mt-1">Next</button>
                         </Link>
                    </div>
               </div>

          </div>


          <div class="row align-items-center justify-content-center">
               <div class="col mx-auto mt-4">
                    <p class="fw-light mb-4">
                         <img src="https://img.icons8.com/office/16/000000/horizontal-line.png"/>
                         or 
                         <img src="https://img.icons8.com/office/16/000000/horizontal-line.png"/>
                    </p>
                    <p class="my-3">
                         <Link className="text-link" to="/signup-email">
                              <button onClick={useEmail} type="button" class="btn btn-lg btn-secondary px-5">Use email</button>
                         </Link>
                    </p>

               </div>
          </div>
          

            <div class="row align-items-center justify-content-center">
                <div class="col d-grid col-6 mx-auto fixed-bottom mt-3">
                    <p><img src="https://img.icons8.com/officel/80/000000/horizontal-line.png" /></p>
                    <p>Already have an account? <br/> <Link class="text-link" to='/login'>Log In</Link></p>
                </div>
            </div>

        </div>

        </>
     )
}

export default SignupPhone;