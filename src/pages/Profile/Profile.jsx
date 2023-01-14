import React, { useState } from 'react';
import "./Profile.css"
import Rightside from '../../components/Menuside/Rightide';
import Post from '../../components/Post/Post';

import cover from "../../assest/nocover.webp"
import Profilephoto from "../../assest/no_profile.jpg"
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
 
import noprofile from "../../assest/no_profile.jpg"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Phonebar from '../../components/Phonebar/Phonebar';


function Profile() {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    const location = useLocation()
    const { name } = location.state

    const [user,setUser] = useState({});
    const [friends,setFriends] = useState([])
    const username = name;

    const {user:currentUser,dispatch} = useContext(AuthContext);
    const [followed,setFollowed] = useState(currentUser.following.includes(user?._id)?true:false);

    useEffect(()=>{
        const fetchUser =async () =>{
            const res = await axios.get(`${url}/users?username=${username}`);
            setUser(res.data)
        }
        fetchUser();
    },[name])

    useEffect(()=>{
        const fetchfriends = async ()=>{
            const res = await axios.get(`${url}/users/friends/${username}`);
            setFriends(res.data);
        }
        fetchfriends();
    },[name])

    const handleClick =async () =>{
        try{
            if(followed){
                await axios.put(url+"/users/"+user._id+ "/unfollow",{userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }else{
                await axios.put(url+"/users/"+user._id+ "/follow",{userId:currentUser._id});
                dispatch({type:"FOLLOW",payload:user._id});
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed)
    }

    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
      })
    
      const detectSize = () => {
        detectHW({
          winWidth: window.innerWidth,
        })
      }
    
      useEffect(() => {
        window.addEventListener('resize', detectSize)
    
        return () => {
          window.removeEventListener('resize', detectSize)
        }
      }, [windowDimenion])

    return (
    <div>
    {windowDimenion.winWidth<1150 &&<div>
      <Phonebar/>
    </div>}
        <div className="Profile">
            <div className="myprofile">
                <div className="profileimg">
                    <img src={user.coverfilePic || cover} alt="Not found" />
                    <img src={user.profilePic || Profilephoto} alt="Not found" />
                </div>
                <div className="profilename">
                        <span>{user.username}</span>
                        <span>{user.desc}</span>
                        {username !== currentUser.username && (
                        <button onClick={handleClick}>
                           {followed? "Unfollow - ":"Follow + "}
                        </button>
                        )}
                </div>
                <div className="postandfrnz">
                    <div className="frnz">
                        <h2>Your Friends</h2>
                        <div className="frnzWrapper">
                            {friends.map((follow)=>{
                                return(
                                    <div className="photoandname">
                                        <img src={follow.profilePic || noprofile} alt="Not found" />
                                        <span>{follow.username}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mypost">
                        <Post username={username}/>
                    </div>
                </div>
            </div>
            {windowDimenion.winWidth>1150 && <Rightside username={username}/>}            
        </div>
        </div>
     );
}

export default Profile;