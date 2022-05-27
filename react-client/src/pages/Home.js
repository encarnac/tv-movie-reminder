import {React, useState} from 'react';
import SubNavBar from '../components/SubNavBar';
import LoadingSpinner from '../components/LoadingSpinner';
import IMG3 from '../photos/IMG3.jpg'
import Card from '../components/Card';
import Axios from 'axios';

function Home({category, selectMovie, selectSeries}) {
     const [title, setTitle] = useState('')
     const [isLoading, setLoading] = useState(false)
     const [results, setResults] = useState([])
     const [display, setDisplay] = useState(false)
     const [item, setItem] = useState('')
     const [details, setDetails] = useState([])


     const inputTitle = (e) => {
          setTitle(e.target.value)
      };

     
     const clearResults = () => {
          setDisplay(false)
          setResults([])
     };

     const fetchResults = () => {
          setLoading(true)
          Axios.get('http://localhost:5000/', {params: {title:title, category:category}}).then(response => {
               setResults(response.data)
               setLoading(false)
               setDisplay(true)
               }).catch(error => {
               console.log(error)
          })
     };

     const fetchDetails = () => {
          Axios.get('http://localhost:5000/details/', {params: {item:item}}).then(response => {
               setDetails(response.data)
               }).catch(error => {
               console.log(error)
          })
     };


     const renderResults = (
          <>
               {display && 
                    <div class="d-grid gap-5 ">
                         <div class="row no-gutters mt-3 d-flex justify-content-center" onClick={clearResults}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" class="bi bi-x-circle-fill " viewBox="0 0 100 100">
                                   <path class="shadow" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                              </svg>
                         </div>
                    
                         <div class="row no-gutters d-flex justify-content-center">
                              {results.map((results, i) =>
                                   <div key={i} class="col col-xs-12 col-md-4 col-lg-3">
                                        <Card handleItem={setItem} imageURL={results.image} title={results.title} rating={results.rating} contentRating={results['content rating']} imdbID={results['imdb id']} />
                                   </div>
                              )}
                         </div>
                    </div>
               }
          </>
     )
               



     return (
          <>
          <div class="position-relative">
               <div class="card bg-dark text-white d-flex">
                    <img src={IMG3} class="card-img vh-100 vw-100 opacity-50" alt="header"/>
                         <div class="card-img-overlay position-absolute top-50 translate-middle-y ">
                              <h1 class="card-title d-flex justify-content-evenly">watch-soon</h1>
                              <p class="card-text d-flex justify-content-evenly">Search for shows/movies to get reminded when they come out!</p>
                              <p class="card-text d-flex justify-content-evenly"><SubNavBar category={category} selectMovie={selectMovie} selectSeries={selectSeries} /></p>
                              <p class="card-text d-flex justify-content-evenly" >
                                   <div class="input-group m-3 w-50 shadow-lg">
                                        <span class="input-group-text">Title</span>
                                        <input type="text" class="form-control shadow" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" onChange={inputTitle} />
                                        <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2" data-bs-toggle="collapse" href="#collapseExample" onClick={fetchResults} >Search</button>
                                   </div>

                              </p>      
                         </div>
               </div>
          </div>

          {isLoading ? <LoadingSpinner /> : renderResults}


          </>
     ) 
}

export default Home;