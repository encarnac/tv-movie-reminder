import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function App() {
    
    return (
        <> <GoogleOAuthProvider clientId={CLIENT_ID}>
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
            </GoogleOAuthProvider>
        </>
    );
}

export default App;