import { React, useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import Header from '../layout/Header';
import DisplayResults from '../components/DisplayResults/DisplayResults';

function Dashboard( props ) {
    const [ category, setCategory ] = useState( 'tv' );

    const selectMovie = () => {
        setCategory( 'movie' );
    };

    const selectSeries = () => {
        setCategory( 'tv' );
    };

    const [ title, setTitle ] = useState( '' );

    const handleTitle = ( e ) => {
        setTitle( e.target.value );
    };



    const [ url, setURL ] = useState( `/search?title=${ title }&category=${ category }` );

    const handleURL = () => {
        setURL( `/search?category=${ category }&title=${ title }` );
    };



    const [ loading, setLoading ] = useState( false );
    const [ display, setDisplay ] = useState( true );
    const [ inputState, setInputState ] = useState( false );
    const [ tmdbData, setTmdbData ] = useState( [] );

    const handleFetchResults = () => {
        setLoading( true );
        Axios.post( url )
            .then( response => {
                setDisplay( !display );
                setInputState( !inputState );
                setTmdbData( response.data );
                setLoading( false );
            } )
            .catch( error => {
                console.log( error );
            } );
    };

    useEffect( () => {
        handleFetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ url ] );



    const [ clearButtonState, setClearButtonState ] = useState( false );
    const [ scrollButtonState, setScrollButtonState ] = useState( false );

    useEffect( () => {
        window.addEventListener( 'scroll', () => {
            if ( window.scrollY > 550 ) {
                setClearButtonState( true );
                if ( window.scrollY > 700 ) {
                    setScrollButtonState( true )
                }
            } else {
                setClearButtonState( false );
                setScrollButtonState( false );
            }
        });
    }, [] );



    const clearResults = () => {
        setDisplay( false );
        setTmdbData( [] );
        setInputState( true );
        scrollToTop()
        
    };

    const scrollToTop = () => {
        window.scrollTo( {
            top: 0,
            behavior: 'smooth',
        } );
    }

    const resultRef = useRef(null)

    return (
            <>
                <section className='header'>
                    < Header { ...{ resultRef, category, selectMovie, selectSeries, inputState, handleTitle, display, loading, handleURL, clearResults } } />
                </section>

                <section className='results' ref={ resultRef }>
                    { !loading && display && (
                        <div className='container mt-4 pt-5'>
                            <div className='row d-flex justify-content-center no-gutters gap-4'>
                                <DisplayResults
                                    tmdbData={ tmdbData }
                                    calendarId={ props.calendarId }
                                    fetchEvents={ props.fetchEvents }
                                    handleAlert={ props.handleAlert } />
                            </div>

                            { clearButtonState && (
                                <div className='top-right-fixed no-gutters'>
                                    <button className='btn btn-clear-results d-flex align-items-center'
                                        onClick={ clearResults }>
                                            <span className='bi bi-x-lg'></span>&nbsp; clear 
                                    </button>
                                </div>
                            ) }

                            { scrollButtonState && (
                                <div className='fixed-bottom no-gutters'>
                                    <button className='btn cursor-pointer position-absolute bottom-0 start-0 m-3 opacity-75'
                                        onClick={ scrollToTop }>
                                            <h2 className='bi bi-chevron-bar-up opacity-75'> </h2>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) }
                </section>
            </> 
    );
};

export default Dashboard;