import React,{useEffect,useState} from 'react';
import Post from '../../components/Post/Post';
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import Rightside from '../../components/Menuside/Rightide';
import "./Home.css"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Phonebar from '../../components/Phonebar/Phonebar';

function Home() {

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
      <Phonebar/>
    </div>}
    <div className='home'>
        {windowDimenion.winWidth>1150 && <ProfileSide/>}
        <Post/>
        {windowDimenion.winWidth>1150 && <Rightside/>}
    </div>
    </div> 
     );
}

export default Home;