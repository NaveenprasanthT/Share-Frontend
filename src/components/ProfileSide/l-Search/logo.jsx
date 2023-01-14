import React from 'react';
import logo from "../../../assest/logo.jpg";
import "./logo.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function LogoSearch() {
    return ( 
        <div className="logosearch">
            <div className="logo">
                <img src={logo} alt="Not found" />
            </div>
            <div className="search">
                <input type="text" placeholder='#Explore' />
                <div className="s-icon"><SearchOutlinedIcon/></div>
            </div>
        </div>
     );
}

export default LogoSearch;