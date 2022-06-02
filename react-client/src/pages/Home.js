import {React, useState, useCallback, useEffect} from 'react';
import SubNavBar from '../components/SubNavBar';
import LoadingSpinner from '../components/LoadingSpinner';
import CardsList from '../components/CardsList';
import IMG3 from '../photos/IMG3.jpg'
import Axios from 'axios';

function Home({category, selectMovie, selectSeries}) {
     const [title, setTitle] = useState('')
     const [url, setURL] = useState(`http://localhost:5000/?title=${title}&category=${category}`)
     const [loading, setLoading] = useState(false)
     const [results, setResults] = useState([])
     const [display, setDisplay] = useState(false)

     const handleTitle = (e) => {
          setTitle(e.target.value)
      };

     const handleURL = () => {
          setURL(`http://localhost:5000/?title=${title}&category=${category}`)
     }

     const clearResults = () => {
          setDisplay(false)
          setResults([])
     };

     const handleFetchResults = useCallback(() => {
          setLoading(true)
          Axios.get(url).then(response => {
               setResults(response.data)
               setLoading(false)
               setDisplay(true)
               })
          .catch(error => {
               console.log(error)
               })
          }, [url]);

     useEffect(()=>{
          handleFetchResults();
          },[handleFetchResults]);

     const [item, setItem] = useState('')
     const [itemDetails, setItemDetails] = useState([])

     const handleItem = (e) => {
          setItem(e.target.value)
     }

     const fetchDetails = () => {
          Axios.get('http://localhost:5000/details/', {params: {item:item}}).then(response => {
               setItemDetails(response.data)
               }).catch(error => {
               console.log(error)
          })
     };
               


     return (
          <>
          <div class="position-relative">
               <div class="card bg-dark text-white d-flex shadow-sm">
                    <img src={IMG3} class="card-img vh-100 vw-100 opacity-25" alt="header"/>
                         <div class="card-img-overlay position-absolute top-50 translate-middle-y ">
                              <h1 class="card-title d-flex justify-content-evenly">watch-soon</h1>
                              <p class="card-text d-flex justify-content-evenly">Search for shows/movies to get reminded when they come out!</p>
                              <p class="card-text d-flex justify-content-evenly"><SubNavBar category={category} selectMovie={selectMovie} selectSeries={selectSeries} /></p>
                              <p class="card-text d-flex justify-content-evenly" >
                                   <div class="input-group m-3 w-50 shadow-lg">
                                        <span class="input-group-text">Title</span>
                                        <input type="text" class="form-control shadow" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" onChange={handleTitle} />
                                        <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2" data-bs-toggle="collapse" href="#collapseExample" onClick={handleURL} >Search</button>
                                   </div>

                              </p>      
                         </div>
               </div>
          
               {loading && !display && <LoadingSpinner /> }
               {!loading && display && (
                    <div class="container mt-4">
                         <div class="row no-gutters d-flex justify-content-center" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" class="bi bi-x-circle-fill opacity-75" viewBox="0 0 20 50" onClick={clearResults}>
                                   <path class="shadow-lg" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                              </svg>
                              <CardsList results={results} handleItem={handleItem} />
                         </div>
                    </div>
               )}
          </div>
          </>
     ) 
}

export default Home;