import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
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
                        <Route path='/' element={ < Home /> } />
                    </Routes>
                </BrowserRouter>

                <div class='row'>
                    < Footer />
                </div>
            </div>
        </>
    );
}

export default App;