import React from 'react';
import { Link } from 'react-router-dom';

function Splash() {
     return (
        <>
        <div class="container mt-1">
            <div class="row my-5"></div>
            <div class="row align-items-center justify-content-center">
                <div class="col fixed-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-hexagon-half mt-5 mb-0 img-thumbnail placeholder-glow" viewBox="0 0 16 16">
                        <path d="M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z" />
                    </svg>
                    <h1 class="display-6 mb-5">shwtmr</h1>
                </div>
            </div>
            <div class="row">
                <div class="col d-grid gap-2 col-med-6 mx-auto fixed-bottom my-5">
                    <Link className="text-link" to="/home">
                        <button type="button" class="btn btn-lg col-3 btn-dark text-no-wrap">Get Started Here</button>
                    </Link>
                    <p class="mt-0 fs-6 text fw-lighter text-muted">You must have an account to use shwtmr </p>

                   
                </div>
            </div>

        </div>

        </>
     )
}

export default Splash;