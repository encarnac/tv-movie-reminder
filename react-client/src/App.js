import './App.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Axios from 'axios';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import Dashboard from './views/Dashboard';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function App() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const handleCalendarCookie = (calCookie) => {
        setCookie('calendarId', calCookie, { 
            path: '/',
            maxAge: 86400000,
        });
    };
    const removeCalendarCookie = () => {
        removeCookie('calendarId', { path: '/' });
    };

    const [ calendarId, setCalendarId ]  = useState(cookies['calendarId']);
    const handleCalendarId = (calId) => {
        setCalendarId(calId)
    };
    const removeCalendarId = () => {
        setCalendarId(null)
    };

    const [ events, setEvents ] = useState( [] );
    const fetchEvents = async () => {
        try {
            console.log('CALENDERID = ', calendarId)
            const eventsRes = await Axios.get('/get-events', {
                params: {
                    calendarId: calendarId
                }
            })
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
                    < NavBar {...{ calendarId, handleCalendarId, removeCalendarId, handleCalendarCookie, removeCalendarCookie, events, fetchEvents }} />
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