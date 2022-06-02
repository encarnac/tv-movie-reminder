import React from 'react';
import {HiOutlineMenuAlt4 } from 'react-icons/hi';

function BottomNavBar() {



    return (
    <>
        <div>
            <nav class="navbar navbar-expand navbar-light bg-light" >
                        <ul class="d-flex flex-fill navbar-nav me-auto mb-2 mb-lg-1">
                            <li class="nav-item p-2 flex-fill">
                                <HiOutlineMenuAlt4/>
                            </li>
                            <li class="nav-item p-2 flex-fill">
                                <HiOutlineMenuAlt4/>
                            </li>
                            <li class="nav-item p-2 flex-fill">
                                <HiOutlineMenuAlt4/>
                            </li>
                        </ul>
            </nav>

        </div>
    </>
    );
}

export default BottomNavBar;

