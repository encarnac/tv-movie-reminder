import { React, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

function AddButton({ content, episode, handleReminder }) {
    const [isHovering, setIsHovering] = useState(false);
    const [ active, setActive ] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const newContent = {
        category : content.category,
        title: content.title, 
        overview: content.overview, 
        seasonCount: content.seasonCount,
        seasonEpisodes: [ episode ]
    };

    const handleSingleReminder = (e) => {
        setActive(true);
        handleReminder(e);
    };

  return (  
        <>
            { active 
                ?   <i className='bi bi-check-circle-fill'></i>
                :   <i className={ isHovering ? 'bi bi-plus-circle-fill' : 'bi bi-plus-circle' }
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onClick={()=> handleSingleReminder( newContent ) }>
                    </i>
            
            }   
        </>
            
  );
}

export default AddButton;