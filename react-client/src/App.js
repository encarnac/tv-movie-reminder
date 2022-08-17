import './App.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Axios from 'axios';

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

    const [ events, setEvents ] = useState( [] );

    const fetchEvents = async () => {
        try {
            const eventsRes = await Axios.post( '/user/get-upcoming', {
                token: token,
                calendarId: calendarId
                }
            );
            console.log( 'EVENTS RESPONSE: ', eventsRes.data );
            setEvents( eventsRes.data );
        } catch(error) {
            console.log(error)
        }
    };

    useEffect( () => {
        fetchEvents();
    }, [ calendarId ] );
    
    return (
        <> <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className='App'>
                <div class='row fixed-top'>
                    < NavBar {...{ token, saveToken, clearToken, calendarId, handleCalendars, events, fetchEvents }} />
                </div>

                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={ < Home {...{ token, calendarId, fetchEvents }} /> } />
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