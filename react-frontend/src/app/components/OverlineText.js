
import React, { useState } from "react";

function OverlineText(props){
        const [isActive, setActive] = useState(false);
      
        const toggleClass = () => {
          setActive(!isActive);
        };
      
        return (
            
          <div role="button"
            className={isActive ? 'text-decoration-line-through': null} 
            onClick={toggleClass} 
          >
            <p className="text-sm-left m-0">{props.text}</p>
          </div>
          
         );
      }  

export default OverlineText;