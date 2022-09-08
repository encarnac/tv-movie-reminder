import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';

function Header( props ) {

    const { resultRef } = props;

    const viewResults = () => {
        resultRef.current.scrollIntoView({block: "start", inline: "start", behavior: "smooth" });
    }

    return (
            <div className='landing-header '>

                    <div className='
                        container 
                        d-flex 
                        justify-content-between 
                        align-items-end
                        align-items-lg-center 
                        vh-100
                        pb-4' >

                        <div className='row text-center mx-auto ms-lg-4 m-5 mb-md-1 pb-md-1 '>
                            <div className='col mx-1'>
                                <h1 className='display-3'>
                                    watch-soon</h1>
                                <p className='lead'>
                                    Get reminders about upcoming tv or movie releases</p>
                                <SearchForm props={props}/>
                                {   props.display 
                                    && !props.loading 
                                    && <div className='scroll-down p-2' style={{cursor: 'pointer'}} onClick={ ()=> viewResults() }></div> 
                                }
                            </div>
                        </div>

                    </div>
            </div>
    );
};

export default Header;
