import axios from 'axios';
import React, { useRef } from 'react';
import logo from   "../../assest/logo.jpg"
import "./register.css"
import {Link, useNavigate} from "react-router-dom"

function Register() {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
            const user = {
                username : username.current.value,
                mail:email.current.value,
                password:password.current.value
            }
            try{
                await axios.post(`${url}/auth/register`,user);
                navigate("/login",{
                    state:{
                        mail:email.current.value,
                        password:password.current.value ,                       
                    }
                }
                )
            }catch(err){
                console.log(err)
            }
    }

    return ( 
        <div className="register">
            <div className="registerWrapper">
                <div className="registerleft">
                    <div className='logoandname'>
                        <img src={logo} alt="Not Found" />
                        <span>Share</span>
                    </div>
                    <div className="by">
                        <h5>
                            Connect with the People <br/> around you on Share
                         </h5>                    
                    </div>
                </div> 
                <form className="registerright" onSubmit={handleSubmit}>
                    <input required type="text" placeholder='Username' className='inputcss' ref={username} />
                    <input required type="email" placeholder='E-mail' className='inputcss' ref={email}/>
                    <input required type={!checked ? "password" : "text"} placeholder='Password' className='inputcss' ref={password} minLength={6}/>
                    <span><label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />
                        Show password
                    </label></span>
                    <button className='registerbutton' type="submit">Register</button>
                    <span>Already have an Account</span>
                    <Link to="/login" 
                        state={{
                            mail:"",
                            password:"",                       
                        }}
                        style={{textDecoration:"none",alignItems:"center"}}>
                    <button className='newacc'>Login</button>                   
                    </Link>
                </form>   
            </div>  
        </div>
     );
}

export default Register;
