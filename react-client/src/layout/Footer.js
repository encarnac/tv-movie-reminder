import React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

function Footer( props ) {

    return (
        <>
            <footer className='bg-light text-start px-3'>
                <div className='container my-4 me-5' >
                    <div className='row d-flex justify-content-between mx-3'>

                        <div className='col-4 px-5 mx-2 text-center'>
                            <h6 className='text-uppercase'>
                                <span className='bi bi-alarm-fill'>  watch-soon</span>
                                <span className='text-lowercase'>
                                    <a className='font-monospace text-decoration-none text-dark fs-6'
                                        href='https://github.com/encarnac/craigslist-scraper-ms'> v1.0.0
                                        </a>
                                    </span>
                            </h6>
                        </div>

                        <div className='col-4 px-5 mx-1'>
                            <h6 className='text-uppercase'>About</h6>
                            <p> Search for tv shows or movies by title using
                                the <a href='https://www.themoviedb.org/' className='text-decoration-none text-dark fw-semibold'>TheMovieDatabase API</a>,
                                and select content to receive future release reminders about
                                on your linked Google Calendar.</p>
                        </div>

                        <div className='col-3 ps-5 ms-5'>
                            <h6 className='text-uppercase'>Contact</h6>
                            <ul className='list-unstyled'>
                                <li><a href='https://github.com/encarnac' className='text-decoration-none text-dark '>
                                    <span className='bi bi-github'></span> GitHub <HiOutlineExternalLink /></a>
                                </li>
                                <li><a href='mailto:coleneencarnado@gmail.com' className='text-decoration-none text-dark'>
                                    <span className='bi bi-envelope-fill'></span> Email <HiOutlineExternalLink /></a>
                                </li>
                            </ul>
                        </div>


                    </div>

                </div>
            </footer>
        </>
    );
}

export default Footer;