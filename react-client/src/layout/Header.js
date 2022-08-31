import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import HeaderImage from '../assets/HeaderImage.svg'

function Header( props ) {

    return (
            <div className='landing-header'>

                    <div className='container 
                        d-flex 
                        justify-content-start 
                        align-items-center 
                        vh-100' >

                        <div className='row text-center ms-lg-4 mx-auto'>
                            <div className='col'>
                                <h1 className='display-3'>
                                    watch-soon</h1>
                                <p className='lead'>
                                    Get reminders about upcoming tv or movie releases</p>
                                <SearchForm props={props}/>
                                {   props.display 
                                    && !props.loading 
                                    && <div className='scroll-down'></div> 
                                }
                            </div>
                        </div>

                    </div>
            </div>
    );
}

export default Header;
