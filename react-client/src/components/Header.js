import React from 'react';
import SearchForm from './SearchForm';
import IMG3 from '../photos/IMG3.jpg';

function Header( props ) {

    return (
            <div style={ {
                backgroundImage: `linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${ IMG3 })`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'}}>

                    <div className="container 
                        d-flex 
                        justify-content-start 
                        align-items-center 
                        mx-5 
                        vh-100" >

                        <div className="row text-center">
                            <div className="col">
                                <h1 class="display-3">
                                    watch-soon</h1>
                                <p class="lead">
                                    Never miss a tv or film release again</p>
                                <SearchForm props={props}/>
<<<<<<< HEAD
                                { props.display && !props.loading && <div className='scroll-down'></div> }
=======
>>>>>>> parent of 532e6e00 (Added footer and animted scroll arrow)
                            </div>
                        </div>

                    </div>
            </div>
    );
}

export default Header;;