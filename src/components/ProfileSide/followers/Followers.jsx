import React, { useState } from 'react';
import "./Followers.css"
import noprofile from "../../../assest/no_profile.jpg";
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom';

function Followers() {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    //const [friendlist,setFriendlist] = useState([])
    const[users,setUsers] = useState([]);
    const {user} = useContext(AuthContext)

    //const {user:currentUser,dispatch} = useContext(AuthContext);
    //const [followed,setFollowed] = useState(false);


{/*    const handleClick =async (id) =>{
        try{
            if(followed){
                await axios.put("/users/"+id+ "/unfollow",{userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:id});
            }else{
                await axios.put("/users/"+id+ "/follow",{userId:currentUser._id});
                dispatch({type:"FOLLOW",payload:id});
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed)
    }*/}

    useEffect(()=>{
        const fetchall =async () => {
            try{
                const res = await axios.get(url+"/users/all")
                //const list = await axios.get(`/users/friends/${user.username}`)
                setUsers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchall();
    },[])

    {/*const final =[
        friendlist.map(f => {
            users.filter(u =>{ 
                return u._id !== f._id})
    })
]
console.log(final)*/}

    return ( 
        <div className="followers">
            {users.map((each)=>{
                if(each._id !== user._id){
                return (
                <div key={each._id}>                        
                    <div className="user">
                    <Link to={`profile/${each.username}`} state={{name:each.username}} style={{textDecoration:"none"}}>
                        <img src={each.profilePic || noprofile } alt="Not found" className='userimg'/>
                    </Link>                   
                    <div className="username">
                        <span>{each.username}</span>
                        <span>{each.desc}</span>
                        </div>
                    </div>
                </div>
                );
            }
            })}
        </div>
     );
}

export default Followers;