import React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

function Footer( props ) {

    return (
        <>
            <footer className='bg-light text-start'>
                <div className='container my-4 mx-auto ' >
                    <div className='row d-flex justify-content-between mx-3'>

                        <div className='col-12 col-md-3 col-xl-3 ps-xl-5 text-center text-md-start mt-2'>
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

                        <div className='col-12 col-md-5 col-xl-5 text-center text-md-start mt-2 '>
                            <h6 className='text-uppercase'>About</h6>
                            <p> Search for tv shows or movies by title using
                                the <a href='https://www.themoviedb.org/' className='text-decoration-none text-dark fw-semibold'>The Movie Database API</a>,
                                and add content to your watchlist to receive future release reminders
                                on your Google Calendar.</p>
                        </div>

                        <div className='col-12 col-md-3 col-xl-3 text-center text-md-end mt-2 '>
                            <h6 className='text-uppercase'>
                                <span className='bi bi-alarm-fill'>  watch-soon</span>
                                <span className='text-lowercase'>
                                    <a className='font-monospace text-decoration-none text-dark fs-6'
                                        href='https://github.com/encarnac/tv-movie-reminder'> v1.0.0
                                        </a>
                                    </span>
                            </h6>
                        </div>

                    </div>

                </div>
            </footer>
        </>
    );
};

export default Footer;