import { React } from 'react';

function CategoryButtons( { category, selectMovie, selectSeries } ) {

    return (
        <>
            <nav className='navbar' >
                <div className='btn-group' role='group'>

                    { category === 'tv' && (
                        <ul className='nav nav-pills gap-2'>
                            <li className='nav-item pill-1 '>
                                <button className='nav-link px-5 py-2 active' onClick={ selectSeries }>
                                    tv
                                </button>
                            </li>
                            <li className='nav-item pill-1'>
                                <button className='nav-link px-4 py-2' onClick={ selectMovie }>
                                    movie
                                </button>
                            </li>
                        </ul>
                        )}

                    { category === 'movie' && (
                        <ul className='nav nav-pills gap-2'>
                            <li className='nav-item pill-1'>
                                <button className='nav-link px-5 py-2' onClick={ selectSeries }>
                                    tv
                                </button>
                            </li>
                            <li className='nav-item pill-1'>
                                <button className='nav-link px-4 py-2 active' onClick={ selectMovie }>
                                    movie
                                </button>
                            </li>
                        </ul>
                        )}

                </div>

            </nav>
        </>
    );
}

export default CategoryButtons;

