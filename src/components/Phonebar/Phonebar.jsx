import React, { useState } from 'react';
import "./Phonebar.css";
import logo from "../../assest/logo.jpg";
import SegmentIcon from '@mui/icons-material/Segment';
import Phnemenu from './phnemenu';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

function Phonebar({dummy}) {

    const [open,setOpen] = useState(false);

    return ( 
        <div className="phonebar">
            <div className="phonebarcontainer">
                <img src={logo} alt="" />
                {!dummy && <ul onClick={()=>setOpen(!open)}>
                {open === false?<SegmentIcon/>:<DoubleArrowIcon/>}
                </ul>}
            </div>
            {!dummy && <Phnemenu  open={open}/>}
        </div>
     );
}

export default Phonebar;