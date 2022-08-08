import { React, useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';



function App() {

  return (
    <>
    <div className='App'>
      <div class='row fixed-top'>
        < NavBar />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
  )
}

export default App;