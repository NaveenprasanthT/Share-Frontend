import { useRef,useState} from 'react';
import { Modal,useMantineTheme } from '@mantine/core';
import "./ProfileModel.css"
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import {storage} from "../../firebaseConfrig.js"
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {v4} from "uuid";


function ProfileModel({openModel,setOpenModel,setAcc}) {

  const url = "https://bronze-hummingbird-boot.cyclic.app/api"

const theme = useMantineTheme();

const newname = useRef();
const description = useRef();
const city = useRef();
const from = useRef();

const {user:currentUser} = useContext(AuthContext);

const [user,setUser] = useState({});

useEffect(()=>{
    const fetchUser =async () => {
    try{
        const res =await axios.get(`${url}/users?userId=${currentUser._id}`)
        setUser(res.data)
    }catch(err){
        console.log(err)
    }
    }
    fetchUser();
},[])

const editHandler = async(e) => {
    e.preventDefault();

    const updatedUser = {
        userId:currentUser._id,
        username: newname.current.value,
        desc:description.current.value,
        city:city.current.value,
        from:from.current.value,
        profilePic: profileLink,
    }
    try{
        await axios.put(`${url}/users/${user._id}`,updatedUser)
        const send = await axios.get(`${url}/users?userId=${user._id}`)
        setOpenModel(false)
        setAcc(send.data)
    }catch(err){
        console.log(err)
    }
}

    const [profile,setProfile] = useState();
    const [profileLink,setProfileLink] = useState(user.profilePic)

    const sendData = () =>{
        const metadata = {
            contentType: 'image/jpeg'
          };
          
          const storageRef = ref(storage, 'profile&cover/' + profile.name + v4() +user.username);
          const uploadTask = uploadBytesResumable(storageRef, profile, metadata);
          
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
                setProfileLink(downloadURL)
              });
            }
          );
          setProfile();
        }

        {profile && sendData()};




  return (
    <>
      <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={openModel}
      onClose={()=>setOpenModel(false)}
    >
        <div className='edit'>
        <span>Edit Your Info...</span>
        <form onSubmit={editHandler}>
            <input type="text" placeholder='Username' ref={newname} defaultValue={user.username} />
            <input type="text" placeholder='About You' ref={description} defaultValue={user.desc} />
            <input type="text" placeholder='City' ref={city} defaultValue={user.city} />
            <input type="text" placeholder='Where You from' defaultValue={user.from} ref={from} />
            <span style={{fontSize:"17px",fontWeight:"500"}}>Profile Picture</span>
            <div>
                    <img src={profileLink || user.profilePic} alt="" />
                    <input type='file' accept='.png,.jpeg,.jpg,.webg'  
                        onChange={(e)=>setProfile(e.target.files[0])}/>
            </div>
            <button type='submit'>Update</button>
        </form>
        </div>
    </Modal>
    </>
  );
}

export default ProfileModel;