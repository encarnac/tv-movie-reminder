import { React, useState, useCallback, useEffect } from 'react';
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

    const handleFetchResults = useCallback( () => {
        setLoading( true );
        Axios.post( url )
            .then( response => {
                setDisplay( !display );
                setInputState( !inputState );
                setTmdbData( response.data );
                console.log( response.data );
                setLoading( false );
            } )
            .catch( error => {
                console.log( error );
            } );
    }, [ url ] );

    useEffect( () => {
        handleFetchResults();
    }, [ handleFetchResults ] );



    const [ clearButtonState, setClearButtonState ] = useState( false );

    useEffect( () => {
        window.addEventListener( 'scroll', () => {
            if ( window.scrollY > 60 ) {
                setClearButtonState( true );
            } else {
                setClearButtonState( false );
            }
        } );
    }, [] );

    const clearResults = () => {
        setDisplay( false );
        setTmdbData( [] );
        setInputState( true );
        window.scrollTo( {
            top: 0,
            behavior: 'smooth',
        } );
    };

    return (
            <>
                <section className='header'>
                    < Header { ...{ category, selectMovie, selectSeries, inputState, handleTitle, display, loading, handleURL, clearResults } } />
                </section>

                <section className='results'>
                    { !loading && display && (
                        <div className='container mt-4 pt-5'>
                            <div className='row d-flex justify-content-center no-gutters gap-4' >
                                <DisplayResults
                                    tmdbData={ tmdbData }
                                    calendarId={ props.calendarId }
                                    fetchEvents={ props.fetchEvents }
                                    handleAlert={ props.handleAlert } />
                            </div>

                            { clearButtonState && (
                                <div className='fixed-bottom no-gutters'>
                                    <button className='btn btn-clear-results position-absolute bottom-0 end-0 mb-5'
                                        onClick={ clearResults }>
                                            <span className='bi bi-x-lg'></span>&nbsp; clear 
                                    </button>
                                </div>
                            ) }
                        </div>
                    ) }
                </section>
            </> 
    );
};

export default Dashboard;