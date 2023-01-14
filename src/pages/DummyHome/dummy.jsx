import React,{useEffect,useState} from 'react';
import "../home/Home.css"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Phonebar from '../../components/Phonebar/Phonebar';
import Rightside from '../../components/Menuside/Rightide';
import { Link } from 'react-router-dom';
import DummyPost from '../../components/Post/DummyPost/DummyPost';
import ProfileSide from '../../components/ProfileSide/ProfileSide';


function DummyHome() {

    const {user} = useContext(AuthContext);

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

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
      }, [user]);

    return (
    <div>
    {windowDimenion.winWidth<1150 &&<div>
      <Phonebar dummy/>
      {!user && 
        <Link to="/register" style={{textDecoration:"none",fontSize:"20px",fontWeight:'700',color:"#f99827"}}>
        <button style={{margin:"1rem 40%"}}>SignIn</button>
        </Link>
      }
    </div>}
    <div className='dummyhome'>
        {windowDimenion.winWidth>1150 && <ProfileSide dummy/>}
        <DummyPost/>
        {windowDimenion.winWidth>1150 && <Rightside/>}
    </div>
    </div> 
     );
}

export default DummyHome;