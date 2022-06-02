import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';


function Login() {

     return (
        <>
     <BackButton />
     <div class="container">
          <div class="row align-items-center justify-content-center">
               <div class="col col-sm-5 col-lg-3">
               <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-hexagon-half mt-5 mb-0 img-thumbnail placeholder-glow" viewBox="0 0 16 16">
                        <path d="M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />
                    </svg>
                    <h1 class="display-6 mb-5">Log In</h1>
               </div>
          </div>



          <div class="row align-items-center justify-content-center">
               <div class="col-lg-5">
                    <div class="form-floating mb-3">
                         <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                         <label for="floatingInput">Email or Phone Number</label>
                    </div>
               </div>
          </div>
          

          <div class="row align-items-center justify-content-center">
               <div class="col-lg-5">
                    <div class="form-floating">
                         <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                         <label for="floatingPassword">Password</label>
                    </div>
               </div>
          </div>
          
          

          <div class="row align-items-center justify-content-center">
               <div class="col-lg-5">
                    <Link to="/home">                    
                         <button type="button" class="btn btn-secondary btn-lg my-3">Log In</button>
                    </Link>
               </div>
          </div>

            <div class="row align-items-center justify-content-center">
                <div class="col d-grid col-6 mx-auto fixed-bottom mt-3">
                    <p><img src="https://img.icons8.com/officel/80/000000/horizontal-line.png" /></p>
                    <p>Don't have an account? <br/> <Link class="text-link" to='/signup-phone'>Sign Up</Link></p>
                </div>
            </div>

        </div>

        </>
     )
}

export default Login;