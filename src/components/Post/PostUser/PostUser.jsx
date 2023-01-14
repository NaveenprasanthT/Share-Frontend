import React from 'react';
import "./PostUser.css"
import likeimg from "../../../assest/like.png";
import heart from "../../../assest/heart.png";
import { useState,useEffect } from 'react';
import axios from 'axios';

import noprofile from "../../../assest/no_profile.jpg";

import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';


function PostUser({Post},profile) {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    const [like,setLike] = useState(Post.likes.length);
    const [islike,setIslike] = useState(false);
    const [user,setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext);

    const likeHandler = () =>{
        try{
            axios.put(url+"/posts/" + Post._id + "/like",{userId: currentUser._id})
        }catch(err){
            console.log(err)
        }
        setLike(islike? like-1 : like+1);
        setIslike(!islike);
    }

    useEffect(()=>{
        const fetchUser =async () =>{
            const res = profile 
                        ? await axios.get(`${url}/users?userId=${Post.userId}`)
                        : await axios.get(`${url}/users/${Post.userId}`)
            setUser(res.data)
        }
        fetchUser();
    },[Post.userId])
                
    return ( 
        <div className="PostUser">
                <div className="PostWrapper">
                    <div className="header">
                        <div className="headerleft">
                        <Link to={`profile/${user.username}`} state={{name:user.username}}>
                            <img src={user.profilePic || noprofile} alt="Notfound" className='userimg'/>
                        </Link>
                        </div>
                        <div className="headerright">
                            <span>{user.username}</span><br/>
                            <span>{user.desc}</span>
                        </div>
                        </div>
                        <div className="desc">
                            <span>{Post.desc}</span>
                        </div>
                        <div className="poster">
                            <img src={Post.img} alt="" />
                        </div>
                        <div className="bottom">
                        <div className="likes">
                        <div>
                            <img src={likeimg} alt="" onClick={likeHandler}/>
                            <img src={heart} alt="" onClick={likeHandler}/>
                        </div>
                            <span>{like} likes</span>
                        </div>
                        <div className="time">
                            <span>{format(Post.createdAt)}</span>
                        </div>
                        </div>
                </div>
        </div>
                );
}

export default PostUser;