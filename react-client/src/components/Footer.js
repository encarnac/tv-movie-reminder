import React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

function Footer( props ) {

    return (
        <>
            <footer className='bg-light text-start px-3'>
                <div className='container my-4' >
                    <div className='row d-flex justify-content-between mx-3'>

                        <div className='col-5 px-5 mx-1'>
                            <h6 className='text-uppercase'>About</h6>
                            <p> Search for tv shows or movies by title using
                                the <a href='https://www.themoviedb.org/' className='text-dark'>TheMovieDatabase API</a>,
                                and select content to receive future release reminders about
                                on your linked Google Calendar.</p>
                        </div>

                        <div className='col-2 px-5 mx-1'>
                            <h6 className='text-uppercase'>Contact</h6>
                            <ul className='list-unstyled'>
                                <li><a href='https://github.com/encarnac' className='text-decoration-none text-dark'>
                                    GitHub <HiOutlineExternalLink /></a>
                                </li>
                                <li><a href='mailto:coleneencarnado@gmail.com' className='text-decoration-none text-dark'>
                                    Email <HiOutlineExternalLink /></a>
                                </li>
                            </ul>
                        </div>

                        <div className='col-4 px-5 mx-1 text-center'>
                        <h6 class="text-uppercase">
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-hexagon-half mx-2' viewBox='0 0 16 16'>
                                <path d='M14 4.577v6.846L8 15V1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z' />
                            </svg>
                            watch-soon 
                            <span class="text-lowercase">
                                <a className='font-monospace text-decoration-none text-dark fs-6'
                                    href='https://github.com/encarnac/craigslist-scraper-ms'> v1.0.0
                                    </a>
                                </span>
                            </h6>

                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}

export default Footer;