import { React } from 'react';

function CategoryButtons( { props } ) {
    const category = props.category
    const selectMovie = props.selectMovie
    const selectSeries = props.selectSeries
    const display = props.display
    const loading = props.loading

    return (
        <>
            <nav className='navbar' >
                <div className='btn-group' role='group'>

                    { category === 'tv' && (
                        <ul className='nav nav-pills gap-2'>
                            <li className='nav-item pill-1 '>
                                { display && !loading 
                                ?   <button className='nav-link px-5 py-2 active opacity-25' onClick={ selectSeries } disabled >
                                        tv
                                    </button>
                                :   <button className='nav-link px-5 py-2 active' onClick={ selectSeries }>
                                        tv
                                    </button>
                                }
                            </li>
                            <li className='nav-item pill-1'>
                                { display && !loading 
                                ?   <button className='nav-link px-4 py-2 opacity-25' onClick={ selectMovie } disabled>
                                        movie
                                    </button>
                                :   <button className='nav-link px-4 py-2' onClick={ selectMovie }>
                                        movie
                                    </button>
                                }
                            </li>
                        </ul>

                    ) }

                    { category === 'movie' && (
                        <ul className='nav nav-pills gap-2'>
                            <li className='nav-item pill-1'>
                                { display && !loading 
                                ?   <button className='nav-link px-5 py-2 opacity-25' onClick={ selectSeries } disabled>
                                        tv
                                    </button>
                                :   <button className='nav-link px-5 py-2' onClick={ selectSeries }>
                                        tv
                                    </button>
                                }                            
                            </li>
                            <li className='nav-item pill-1'>
                                { display && !loading 
                                ?   <button className='nav-link px-4 py-2 active opacity-25' onClick={ selectMovie } disabled>
                                        movie
                                    </button>
                                :   <button className='nav-link px-4 py-2 active' onClick={ selectMovie }>
                                        movie
                                    </button>
                                }   
                            </li>
                        </ul>
                    ) }

                </div>

            </nav>
        </>
    );
}

export default CategoryButtons;

