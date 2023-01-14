import React,{useState} from 'react';
import "./Post.css"
import Postshare from './Postshare/Postshare';
import PostUser from './PostUser/PostUser';
import { useEffect } from 'react';

import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import DummyPost from './DummyPost/DummyPost';

function Post({username}) {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext)
    
    useEffect(()=>{
        const fetchdata =async () =>{
            const res =username 
            ? await axios.get(`${url}/profile/${username}`)  
            : await axios.get(url+"/posts/timeline/" + user._id)
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchdata();
    },[username,user._id]);

    return ( 
        <div className="Post">
            <Postshare/>
            {posts.map((Post)=>{
                return(
                    <PostUser key={Post._id} Post={Post} profile/>
                )
            })}
            <DummyPost/>
        </div>
     );
}

export default Post;