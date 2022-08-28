import './App.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Axios from 'axios';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import Dashboard from './views/Dashboard';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function App() {

    const [ calendarId, setCalendarId ]  = useState('')

    const handleCalendarId = (calId) => {
        setCalendarId(calId)
    }

    const [ events, setEvents ] = useState( [] );

    const fetchEvents = async () => {
        try {
            console.log('CALENDAR ID WAS UPDATED', calendarId)
            const eventsRes = await Axios.post( '/calendar/get-events', {
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
                    < NavBar {...{ calendarId, handleCalendarId, events, fetchEvents }} />
                </div>

                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={ < Dashboard {...{ calendarId, fetchEvents }} /> } />
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