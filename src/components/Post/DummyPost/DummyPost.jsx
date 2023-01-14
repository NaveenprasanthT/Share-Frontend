import React from 'react';
import "../PostUser/PostUser.css";
import logo from "../../../assest/logo1.jpg";
import likeimg from "../../../assest/like.png";
import heart from "../../../assest/heart.png";

import {posts} from "./postdata.js"

function DummyPost() {

    return (
        <div>
        {posts.map((Post)=>{
            return(
            <div className="PostUser">
        <div className="PostWrapper">
            <div className="header">
                <div className="headerleft">
                    <img src={logo} alt="Notfound" className='userimg'/>
                </div>
                <div className="headerright">
                    <span>Share</span><br/>
                    <span>By Naveen</span>
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
                    <img src={likeimg}/>
                    <img src={heart}/>
                </div>
                    <span></span>
                </div>
                <div className="time">
                    <span>Just now</span>
                </div>
                </div>
        </div>
    </div>
        )
    })
    }
    </div>
     );
}

export default DummyPost;