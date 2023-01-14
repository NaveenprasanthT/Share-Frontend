import React, { useState,useEffect } from 'react';
import noprofile from "../../../assest/no_profile.jpg";
import "./Postshare.css";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

import {storage} from "../../../firebaseConfrig.js"
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

function Postshare() {

  const url ="https://bronze-hummingbird-boot.cyclic.app/api"

    const [file, setFile] = useState();       
    const [link, setLink] = useState(); 
    const {user} = useContext(AuthContext);
    const [acc,setAcc] = useState({});
    const desc = useRef();

    useEffect(()=>{
      const fetchUser =async () =>{
          const res = await axios.get(`${url}/users?userId=${user._id}`);
          setAcc(res.data)
      }
      fetchUser();
  },[])

        const sendData = () =>{
        const metadata = {
            contentType: 'image/jpeg'
          };
          
          const storageRef = ref(storage, 'images/' + file.name + v4() +user.username);
          const uploadTask = uploadBytesResumable(storageRef, file, metadata);
          
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              switch (error.code) {
                case 'storage/unauthorized':
                  break;
                case 'storage/canceled':
                  break;
                case 'storage/unknown':
                  break;
              }
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setLink(downloadURL)
              });
            }
          );
          setFile();
        }

        {file && sendData()};

    const postHandler =async (e) =>{
        e.preventDefault();     
        if(desc.current.value || link)
        {const post = {
            userId:user._id,
            desc:desc.current.value,
            img:link,
        };
        try{
            await axios.post(url+"/posts",post);
            setLink();
            window.location.reload();
        }catch(err){
            console.log(err)
        }
      }
        
    }

    const postdelete = (e) =>{
        e.preventDefault()
        setFile()
        setLink();
    }

    return ( 
        <div className="Postshare">
            <img src={acc.profilePic || noprofile} alt="Not found" />
            <form>
                <input type="text" placeholder={`What's happening ${acc.username}`} ref={desc}/>
                {link && <div>
                            <img src={link} alt="" className='show'/>
                        </div>}
                <div className="postoptions">
                <label htmlFor='file' className='addedimg'>
                    <div className='option'>
                    <PhotoLibraryIcon/>
                    Photo 
                    </div>
                    <input style={{display:"none"}} type="file" id='file' accept='.png,.jpeg,.jpg,.webg'
                            onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <label className='option'>
                    <MyLocationIcon />
                    Location
                </label>
                <label className='option'>
                    <EmojiEmotionsIcon/>
                    Feeling
                </label>
                <div className='but'>
                <label className='option'>
                    <button className="share" onClick={postHandler}>
                        Share
                    </button>
                </label>
               {link && <label className='option'>
                    <button className="cancel" onClick={postdelete} style={{marginLeft:".5rem"}}>
                        Cancel
                    </button>
                </label>}
                </div>
                </div>
            </form>
        </div>
     );
}

export default Postshare;