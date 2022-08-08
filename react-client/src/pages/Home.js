import { React, useState, useCallback, useEffect } from 'react';
import Axios from 'axios';
import Header from '../components/Header';
import CardsList from '../components/CardsList';

const SERVER_URL = 'http://localhost:3000';

function Home( ) {

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

    const [ url, setURL ] = useState( `${ SERVER_URL }/search?title=${ title }&category=${ category }` );

    const handleURL = () => {
        setURL( `${ SERVER_URL }/search?category=${ category }&title=${ title }` );
    };

    const [ loading, setLoading ] = useState( false );
    const [ display, setDisplay ] = useState( true );
    const [ inputState, setInputState ] = useState( false );
    const [ tmdbData, setTmdbData ] = useState( [] );

    const handleFetchResults = useCallback( () => {
        setLoading( true );
        Axios.get( url ).then( response => {
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

    const clearResults = () => {
        setDisplay( false );
        setTmdbData( [] );
        setInputState( true );
    };


    return (
        <>
            <div className='position-absolute'>
                < Header {...{ category, selectMovie, selectSeries, inputState, handleTitle, display, loading, handleURL }} />

                { !loading && display && (
                    <div className='container mt-3'>
                        <div className='row no-gutters d-flex justify-content-center' >
                            <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgba(165,217,208, 0.95)' className='bi bi-x-circle-fill opacity-75' viewBox='0 0 20 50' onClick={ clearResults }>
                                <path className='shadow-lg' d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
                            </svg>
                            <CardsList tmdbData={ tmdbData } />
                        </div>
                    </div>
                ) }

            </div>
        </> );
}

export default Home;;;