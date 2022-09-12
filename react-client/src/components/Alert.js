import React from 'react';
import CheckCircleIcon from '../assets/CheckCircleIcon';
import ExclamationTriangleIcon from 'assets/ExclamationTriangleIcon';

function Alert( { alertState, alertMessage, closeAlert, alertType } ) {

    return (
        <>
            { alertState && (
                <div id='top-alert' className={`alert ${ alertType } d-flex align-items-center justify-content-between text-center fade show`} role='alert'>
                    { alertType === 'alert-success' && < CheckCircleIcon /> }
                    { alertType === 'alert-warning' && < ExclamationTriangleIcon /> }



                    <div>
                       <strong>
                            { alertMessage }
                       </strong>
                    </div>

                    <button type='button' className='btn-close' onClick={ closeAlert }></button>
                </div>
            ) }
        </>
    );
};

export default Alert;