import {React, useState} from 'react';
import SubNavBar from '../components/SubNavBar';
import IMG4 from '../photos/IMG4.jpg'
import TableFrame from '../components/TableFrame';
import Axios from 'axios';


function Home({category, selectMovie, selectSeries}) {
     const [title, setTitle] = useState('')
     const [resultsList, getResults] = useState([])


     const searchTitle = (e) => {
          setTitle(e.target.value)
      }

     const submitSearch = () => {
          Axios.get('http://localhost:5000/home', {params: {title:title, category:category}}).then(response => {
               getResults(response.data)
               }).catch(error => {
               console.log(error)
          })
     }

     return (
          <>
          <div class="position-relative">
               <div class="card bg-dark text-white d-flex">
                    <img src={IMG4} class="card-img vh-100 vw-100 opacity-50" alt="header"/>
                         <div class="card-img-overlay position-absolute top-50 translate-middle-y ">
                                   <h1 class="card-title d-flex justify-content-evenly">shwtmr</h1>
                                   <p class="card-text d-flex justify-content-evenly">Search for shows/movies to get reminded when they come out!</p>
                                   <p class="card-text d-flex justify-content-evenly"><SubNavBar category={category} selectMovie={selectMovie} selectSeries={selectSeries} /></p>
                                   <p class="card-text d-flex justify-content-evenly" data-bs-toggle="collapse" href="#collapseExample">
                                        <div class="input-group m-3 w-50 shadow-lg">
                                             <span class="input-group-text">Title</span>
                                             <input type="text" class="form-control" placeholder="ex. Game of Thrones" aria-label="ex. 'Game of Thrones'" aria-describedby="button-addon2" onChange={searchTitle} />
                                             <button class="btn btn-outline-secondary btn-search-input" type="button" id="button-addon2" onClick={submitSearch} >Search</button>
                                        </div>

                                   </p>      
                         </div>
               </div>
          </div>

          <div class="collapse position-relative" id="collapseExample">
               <TableFrame rowData={resultsList} />
          </div>
          
          </>
     ) 
}

export default Home;