import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GAPI_KEY

function Logout( ) {

  const logoutSuccess = () => {
    console.log('Logout SUCCESS - No User')
  }
  return (
    <div>
        < GoogleLogout
            clientId={clientId}
            buttonText='Remove Your Google Account'
            onLogoutSuccess={logoutSuccess}
            />


    </div>
      
  );
}

export default Logout;

