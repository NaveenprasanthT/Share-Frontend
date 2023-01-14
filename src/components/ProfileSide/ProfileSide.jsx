import React from 'react';
import Followers from './followers/Followers';
import LogoSearch from './l-Search/logo';
import Profilecard from './Profilecard/Profilecard';
import "./ProfileSide.css"

function ProfileSide({dummy}) {
    return ( 
        <div className="ProfileSide">
            <LogoSearch/>
            <Profilecard />
            <h3>People you may know</h3>
            {!dummy && <Followers/>}
        </div>
     );   
}

export default ProfileSide;