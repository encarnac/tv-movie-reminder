import React from 'react';
import CheckCircleIcon from '../assets/CheckCircleIcon';

function Alert( { alertState, closeAlert } ) {

    return (
        <div>
            { alertState && (
                <div className='lert alert-primary d-flex align-items-center fade show' role='alert'>
                    < CheckCircleIcon />
                    <strong>Successfully deleted reminders!</strong> You will not longer receive those release reminders.
                    <button type='button' className='btn-close' onClick={ closeAlert }></button>
                </div>
            ) }
        </div>

    );
}

export default Alert;