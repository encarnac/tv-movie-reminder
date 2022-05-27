import { React } from 'react';
import { IoIosFilm } from 'react-icons/io';
import {IoIosEasel} from 'react-icons/io';


function SubNavBar({category, selectMovie, selectSeries}) {


    return (
        <>
            <nav class="navbar" >
                <div class="container-fluid">
                    <div class="btn-group" role="group" aria-label="...">
                    {category === 'tv' && (
                        <ul class="nav nav-pills gap-3">
                            <li class="nav-item pill-1 shadow-lg">
                                <button class="nav-link nav-link nav-pills-link-active-bg-secondary px-3 py-2 active" aria-current="page" onClick={selectSeries}>
                                    series
                                    <br/>
                                    <IoIosEasel />
                                </button>
                            </li>
                            <li class="nav-item pill-1 shadow-lg">
                                <button class="nav-link px-4 py-2" onClick={selectMovie}>
                                    film
                                    <br/>
                                    <IoIosFilm />
                                </button>
                            </li>
                        </ul>
                    )}

                    {category === 'ft' && (
                        <ul class="nav nav-pills gap-3">
                            <li class="nav-item pill-1 shadow-lg">
                                <button class="nav-link nav-link nav-pills-link-active-bg-secondary px-3 py-2" aria-current="page" onClick={selectSeries}>
                                    series
                                    <br/>
                                    <IoIosEasel />
                                </button>
                            </li>
                            <li class="nav-item pill-1 shadow-lg">
                                <button class="nav-link px-4 py-2 active" onClick={selectMovie}>
                                    film
                                    <br/>
                                    <IoIosFilm />
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

