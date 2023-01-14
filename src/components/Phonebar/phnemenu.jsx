import React from 'react';
import "./Phonebar.css"
import Profilecard from "../ProfileSide/Profilecard/Profilecard.jsx"
import Followers from "../ProfileSide/followers/Followers.jsx"

function Phnemenu({open}) {
    
    return ( 
        <div className={open?"phnemenu":"closed"}>
            <Profilecard/>
            <h3 style={{padding:"1rem 1rem",}}>People You may know</h3>
            <Followers/>
        </div>
     );
}

export default Phnemenu;