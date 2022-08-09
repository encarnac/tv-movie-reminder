import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import { GoogleLogin } from 'react-google-login';

const SERVER_URL = process.env.REACT_APP_URL

function Login({ }) {
    const [clientId, setClientId] = useState('');
    const [profileData, setProfileData] = useState('')

    useEffect( () => {
        Axios.get(`${SERVER_URL}/gapi_key/`)
        .then(response => {
            console.log(response.data)
            setClientId(response.data)
        })
        .catch(error => {
            console.log( error )
        });
    }, [])

    const handleSuccess = ( response ) => {
        console.log('Login Success - Current User:', response.profileObj )
        setProfileData(response.profileObj);
    }

    const handleFailure = ( response ) => {
        console.log('Login FAILED. Error:', response);
    }
    
    return (
        <div>
            < GoogleLogin  
                clientId={clientId}
                buttonText='Sign In with Google'
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                responseType='code'
                accessType='offline'
            />
        </div>
    );
}

export default Login;

