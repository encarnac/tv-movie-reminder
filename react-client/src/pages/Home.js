import { React, useState, useCallback, useEffect } from 'react';
import SubNavBar from '../components/SubNavBar';
import LoadingSpinner from '../components/LoadingSpinner';
import CardsList from '../components/CardsList';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import IMG3 from '../photos/IMG3.jpg';
import Axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

function Home( { category, selectMovie, selectSeries } ) {
  const [ title, setTitle ] = useState( '' );
  const [ url, setURL ] = useState( `${ SERVER_URL }/search?title=${ title }&category=${ category }` );
  const [ loading, setLoading ] = useState( false );
  const [ imdbData, setImdbData ] = useState( [] );
  const [ display, setDisplay ] = useState( true );
  const [ inputState, setInputState ] = useState( false );

  const handleTitle = ( e ) => {
    setTitle( e.target.value );
  };

  const handleURL = () => {
    setURL( `${ SERVER_URL }/search?category=${ category }&title=${ title }` );
  };

  const clearResults = () => {
    setDisplay( false );
    setImdbData( [] );
    setInputState( true );
  };

  const handleFetchResults = useCallback( () => {
    setLoading( true );
    Axios.get( url ).then( response => {
      setDisplay( !display );
      setInputState( !inputState );
      setImdbData( response.data );
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

  const [ selection, setSelection ] = useState( '' );
  const [ tmdbData, setTmdbData ] = useState( [] );

  const handleSelection = ( e ) => {
    setSelection( e.target.value );
    fetchTmdb()
  };

  const fetchTmdb = () => {
    Axios.get( 'http://localhost:5000/details/', { params: { selection: selection } } ).then( response => {
      setTmdbData( response.data );
    } ).catch( error => {
      console.log( error );
    } );
  };


  return (
    <>
      <div class="position-absolute">
        <div class="card text-black d-flex">
          <img src={ IMG3 } class="card-img vw-100 opacity-50" alt="header" />
          <div class="card-img-overlay position-absolute top-50 translate-middle-y ">
            <h1 class="card-title d-flex justify-content-evenly text-black fw-bolder">watch-soon</h1>
            <p class="card-text d-flex justify-content-evenly">Search for shows/movies to get reminded when they come out!</p>
            <p class="card-text d-flex justify-content-evenly"><SubNavBar category={ category } selectMovie={ selectMovie } selectSeries={ selectSeries } /></p>
            <p class="card-text d-flex justify-content-evenly" >
              <div class="input-group w-50 shadow-lg">
                <span class="input-group-text">Title</span>
                <SearchBar inputState={ inputState } handleTitle={ handleTitle } />
                { !display && !loading &&
                  <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2" onClick={ handleURL } >Search</button> }
                { !display && loading &&
                  <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2"> <LoadingSpinner /> </button> }
                { display && !loading &&
                  <button class="btn shadow btn-outline-secondary btn-search-input opacity-25" disabled type="button" id="button-addon2" >Search</button> }
              </div>
            </p>
            { !loading && display &&
              <p class="mt-5 card-text position-absolute top-100 start-50 translate-middle-x fw-lighter">View Results Below<br />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                </svg>
              </p>
            }
          </div>
        </div>



        { !loading && display && (
          <div class="container mt-3">
            <div class="row no-gutters d-flex justify-content-center" >
              < Modal />
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="rgba(165,217,208, 0.95)" class="bi bi-x-circle-fill opacity-75" viewBox="0 0 20 50" onClick={ clearResults }>
                <path class="shadow-lg" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
              {/* <p>{imdbData}</p> */ }
              <div class="d-grid gap-5 ">
                <div class="row no-gutters d-flex gap-3 justify-content-center">
                  <CardsList imdbData={ imdbData } handleSelection={ handleSelection } />
                </div>
              </div>
            </div>
          </div>
        )}   
      </div>
    </>);
}

export default Home;;;