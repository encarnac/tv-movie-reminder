import { React, useState, useEffect} from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import Home from './pages/Home';


function App() {

  const[category, setCategory] = useState('tv')

  const selectMovie = () => {
       setCategory('ft')
  }

  const selectSeries = () => {
       setCategory('tv')
  }

  return (
    <>
    <div className="App">
      <div class="row fixed-top">
        <NavBar selectMovie={selectMovie} selectSeries={selectSeries} />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home category={category} selectMovie={selectMovie} selectSeries={selectSeries}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  
  </>
  )
}

export default App;