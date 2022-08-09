import React from 'react';
import { HiOutlineExternalLink } from "react-icons/hi";

function Footer( props ) {

    return (
        <>
            <footer className="bg-light text-sm-start">
                <div className="container pt-4" >
                    <div className="row d-flex justify-content-between">

                        <div className='col-6'>
                            <h6 className="text-uppercase">About</h6>
                            <p> Search for tv shows or movies by title using
                                the <a href='https://www.themoviedb.org/' className='text-dark'>TheMovieDatabase API</a>,
                                and select content to receive future release reminders about
                                on your linked Google Calendar.</p>
                        </div>

                        <div className='col-3'>
                            <h6 className="text-uppercase">Contact</h6>
                            <ul className='list-unstyled'>
                                <li><a href='https://github.com/encarnac' className='text-decoration-none text-dark'>
                                    GitHub <HiOutlineExternalLink /></a>
                                </li>
                                <li><a href='mailto:coleneencarnado@gmail.com' className='text-decoration-none text-dark'>
                                    Email <HiOutlineExternalLink /></a>
                                </li>
                            </ul>
                        </div>

                    <div class="row d-flex justify-content-center my-2">
                        <a class="font-monospace text-decoration-none text-dark" 
                            href='https://github.com/encarnac/craigslist-scraper-ms'>
                            watch-soon v1.0.0</a>
                        
                    </div>

                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;;