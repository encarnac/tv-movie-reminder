import React from 'react';
import CheckCircleIcon from '../assets/CheckCircleIcon';

function Alert( { alertState, alertMessage, closeAlert } ) {

    return (
        <>
            { alertState && (
                <div id='top-alert' className='alert alert-success d-flex align-items-center justify-content-between text-center fade show ' role='alert'>
                    < CheckCircleIcon />

                    <div>
                       <strong>
                            {alertMessage}
                       </strong>
                    </div>

                    <button type='button' className='btn-close' onClick={ closeAlert }></button>
                </div>
            ) }
        </>
    );
};

export default Alert;