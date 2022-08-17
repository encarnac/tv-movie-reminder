import './App.css';
import { React, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function App() {

    const [ token, setToken ] = useState('')
    const [ calendarId, setCalendarId ]  = useState('')

    const saveToken = ( tokenRes ) => { 
        setToken( tokenRes );
        }

    const clearToken = () => {
        setToken('')
    }

    const handleCalendars = async (calendarsList) => {
        console.log('FILTER LIST: ', calendarsList)
        const calendar = await calendarsList.filter(
            ( cal ) => cal.summary === 'tv-movie');
        setCalendarId(calendar[0].id);
        console.log('CALENDAR: ', calendar)
    }
    
    return (
        <> <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className='App'>
                <div class='row fixed-top'>
                    < NavBar {...{ token, saveToken, clearToken, calendarId, handleCalendars }} />
                </div>

                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={ < Home {...{ token, calendarId }} /> } />
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