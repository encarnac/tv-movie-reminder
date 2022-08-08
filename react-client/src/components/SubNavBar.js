import { React } from 'react';
import { IoIosFilm } from 'react-icons/io';
import { IoIosEasel } from 'react-icons/io';


function SubNavBar({ category, selectMovie, selectSeries }) {

    return (
        <>
            <nav className='navbar gx-5 px-5' >
                <div className='container-fluid px-5 mx-5'>
                    <div className='btn-group' role='group' aria-label='...'>
                        {category === 'tv' && (
                            <ul className='nav nav-pills gap-2'>
                                <li className='nav-item pill-1 shadow-lg'>
                                    <button className='nav-link nav-pills-link-active-bg-secondary px-5 py-2 active' aria-current='page' onClick={selectSeries}>
                                        tv-series
                                        <br />
                                        {/* <IoIosEasel /> */}
                                    </button>
                                </li>
                                <li className='nav-item pill-1 shadow-lg'>
                                    <button className='nav-link px-5 py-2' onClick={selectMovie}>
                                        film
                                        <br />
                                        {/* <IoIosFilm /> */}
                                    </button>
                                </li>
                            </ul>
                        )}

                        {category === 'movie' && (
                            <ul className='nav nav-pills gap-2'>
                                <li className='nav-item pill-1 shadow-lg'>
                                    <button className='nav-link nav-pills-link-active-bg-secondary px-5 py-2' aria-current='page' onClick={selectSeries}>
                                        tv-series
                                        <br />
                                        {/* <IoIosEasel /> */}
                                    </button>
                                </li>
                                <li className='nav-item pill-1 shadow-lg'>
                                    <button className='nav-link px-5 py-2 active' onClick={selectMovie}>
                                        film
                                        <br />
                                        {/* <IoIosFilm /> */}
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SubNavBar;

