import React, { useContext } from 'react';
import "./Menu.css"

import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CallIcon from '@mui/icons-material/Call';

import {Link} from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

function Menu() {

    const {user} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('user')
    }

    return ( 
        <div className="Menu">
            <div className="MenuOptions">
                <ul>
                    <li>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <div className='MenuOption'><ViewTimelineOutlinedIcon/>
                        <span>Homepage</span>
                    </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <div className='MenuOption'><NotificationsActiveOutlinedIcon/> 
                        <span>Notification</span>
                    </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <div className='MenuOption'><MessageOutlinedIcon/>
                        <span>Messenger</span>
                    </div>
                    </Link>
                    </li>
                    <li>
                    <Link to="/register" style={{textDecoration:"none"}}>
                    <div className='MenuOption'><CallIcon/>
                        {user && <span onClick={()=>handleClick}>Logout</span>}
                        {!user && <span>SingUp</span>}
                    </div>
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
     );
}

export default Menu;