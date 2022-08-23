import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import HeaderImage from '../assets/HeaderImage.jpg';

function Header( props ) {

    return (
            <div style={ {
                backgroundImage: `linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${ HeaderImage })`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'}}>

                    <div className='container 
                        d-flex 
                        justify-content-start 
                        align-items-center 
                        mx-5 
                        vh-100' >

                        <div className='row text-center'>
                            <div className='col'>
                                <h1 className='display-3'>
                                    watch-soon</h1>
                                <p className='lead'>
                                    Get reminders about upcoming tv or movie releases</p>
                                <SearchForm props={props}/>
                                { props.display && !props.loading && <div className='scroll-down'></div> }
                            </div>
                        </div>

                    </div>
            </div>
    );
}

export default Header;
