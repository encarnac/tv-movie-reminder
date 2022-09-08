import { React, useState } from 'react';

function AddButton({ content, episode, handleSelect }) {
    const [isHovering, setIsHovering] = useState(false);
    const [ checked, setChecked ] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const handleEpisode = (e) => {
        setChecked(!checked)
        handleSelect(e)
    };

  return (  
        <>
            { checked 
                ?   <i className='bi bi-check-circle-fill'
                        onClick={()=> handleEpisode( episode ) }>
                    </i>
                :   <i className={ isHovering ? 'bi bi-check-circle' : 'bi bi-circle' }
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={()=> handleEpisode( episode ) }>
                    </i>
            
            }   
        </>
            
  );
}

export default AddButton;