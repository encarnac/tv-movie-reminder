import { React, useState } from 'react';
import { MdClose } from "react-icons/md";

function SearchInput({ inputState, handleTitle, clearResults }) {
    const [ inputValue , setInputValue ] = useState('')

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
        handleTitle(e)
    }

    const resetInputValue = () => {
        clearResults()
        setInputValue('')
    }
  return (
    <>
        { inputState 
            ?   <>
                    <input type='text' value={inputValue} onChange={(e)=> handleInputValue(e)} className='form-control rounded-edge' placeholder='ex. Game of Thrones' />
                    { inputValue !== '' && <button id='clear-input'className='btn' onClick={resetInputValue}><MdClose/></button> }
                </>
            :   <>
                    <input type='text' value={inputValue} className='form-control rounded-edge opacity-50' placeholder='ex. Game of Thrones' disabled readOnly/>
                    <button id='clear-input' className='btn disable' onClick={resetInputValue}><MdClose/></button>
                </>
        }
    </>
  );
}

export default SearchInput;

