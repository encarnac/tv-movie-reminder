import { React, useState } from 'react';
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GAPI_KEY;

function Login() {

    const login = useGoogleLogin( {
        onSuccess: codeResponse => console.log( codeResponse ),
        onError: errorResponse => console.log( errorResponse ),
        flow: 'auth-code',
        scopes: 'openid email profile ./auth/calendar'
    } );

    const impLogin = useGoogleLogin( {
        onSuccess: tokenResponse => console.log( tokenResponse ),
        onError: errorResponse => console.log( errorResponse ),
        flow: 'implicit'
    } );

    return (
        <div>

            <GoogleLogin
                onSuccess={ credentialResponse => {
                    console.log( credentialResponse );
                    }}
                onError={() => {
                    console.log('Login Failed');
                    }}
                type='standard'
                theme='outline'
                size='large'
                text='continue_with'
                shape='pill'
                width='260px'
            />

            <button onClick={ () => impLogin() }>
                Sign In With Google (Imp)
            </button>

            <button onClick={ () => login() }>
                Sign In With Google (Auth)
            </button>

        </div>



    );
}

export default Login;

