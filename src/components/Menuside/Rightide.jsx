import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Add from './Add/Add';
import Menu from './Menu/Menu';
import './Rightside.css'


const ProfileSide = ({user}) =>{

    return(
        <div className="userinfo">
            <div className="userinfoWrapper">
                <h2>User Info</h2>
                <table className='info'>
                    <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>:</td>
                        <td>{user.city}</td>
                    </tr>
                    <tr>
                        <td>From</td>
                        <td>:</td>
                        <td>{user.from}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td>{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Not mentioned"}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

const HomePage =() =>{
    return(
        <Add/>
    );
}

function Rightside({username}) {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    const [user,setUser] = useState({});

    useEffect(()=>{
        const fetchUser =async () =>{
            const res = await axios.get(`${url}/users?username=${username}`);
            setUser(res.data)
        }
        fetchUser();
    },[])

    return ( 
        <div className="Rightside">
            <Menu/>
            {username ? <ProfileSide user={user}/> : <HomePage/>}
        </div>
     );
}

export default Rightside;