import {React, useState} from 'react';
import SubNavBar from '../components/SubNavBar';
import IMG3 from '../photos/IMG3.jpg'
import ResultCard from '../components/ResultCard';
import Axios from 'axios';


function Home({category, selectMovie, selectSeries}) {
     const [title, setTitle] = useState('')
     const [resultsList, getResults] = useState([])

     const searchTitle = (e) => {
          setTitle(e.target.value)
      }

     const submitSearch = () => {
          Axios.get('http://localhost:5000/', {params: {title:title, category:category}}).then(response => {
               getResults(response.data)
               }).catch(error => {
               console.log(error)
          })
     }

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
                                             <input type="text" class="form-control shadow" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" onChange={searchTitle} />
                                             <button class="btn shadow btn-outline-secondary btn-search-input" type="button" id="button-addon2" data-bs-toggle="collapse" href="#collapseExample" onClick={submitSearch} >Search</button>
                                        </div>

                                   </p>      
                         </div>
               </div>
          </div>

          <div class="collapse position-relative p-2" id="collapseExample">
               <div class=" d-grid gap-5 py-5">
                    <div class="row no-gutters d-flex justify-content-center">
                         {resultsList.map((resultsList, i) =>
                              <div key={i} class="col col-xs-12 col-md-4 col-lg-3">
                                   <ResultCard imageURL={resultsList.image} title={resultsList.title} rating={resultsList.rating} contentRating={resultsList['content rating']}  />
                              </div>
                         )}
                    </div>
               </div>   
          </div>
          
          </>
     ) 
}

export default Home;