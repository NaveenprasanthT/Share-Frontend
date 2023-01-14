import React, { useContext } from 'react';
import cover from "../../../assest/nocover.webp"
import profile from "../../../assest/no_profile.jpg"
import "./Profilecard.css"

import {Link} from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import ProfileModel from '../../ProfileModel/ProfileModel';

function Profilecard() {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    const [openModel,setOpenModel] = useState(false)

    const {user} = useContext(AuthContext);

    const [acc,setAcc] = useState({});


    useEffect(()=>{
        const func =async () => {
            try{
                const res = await axios.get(`${url}/users?userId=${user._id}`);
                setAcc(res.data)
            }catch(err){
                console.log(err)
            }
        }
        func();
    },[])

    
        
    return ( 
        <div className="Profilecard">
            <div className="photo">
                <img src={cover} alt="Not found" />
                <div>
                    <img src={acc.profilePic || profile} alt="Not found" />
                </div>
            </div>
            <div className="name">
                <span>{acc.username || "User"}</span>
                <span>{acc.desc || "Welcome"}</span>
            </div>
            <div className="followcard">
                <hr/>
                <div>
                    <div className="follow">
                        <span>{acc.followers?.length || "-"}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{acc.following?.length || "-"}</span>
                        <span>Following</span>
                    </div>
                </div>
                <hr/>
            </div>
            <div className='cardButtons'>
            <label>
            <Link to={"/profile/"+acc.username} state={{name:acc.username}} style={{textDecoration:"none",color:"#f95f35"}}>
                    View Profile
            </Link>
            </label>
            <label>|</label>
            <label onClick={()=>{setOpenModel(true)}}>
                <EditIcon/> Edit
            </label>
            <ProfileModel openModel={openModel} setOpenModel={setOpenModel} setAcc={setAcc}/>
            </div>
        </div>
     );
}

export default Profilecard;