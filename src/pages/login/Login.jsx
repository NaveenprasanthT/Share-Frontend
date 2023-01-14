import React,{useRef} from 'react';
import { useContext } from 'react';
import logo from   "../../assest/logo.jpg"
import { AuthContext } from '../../context/AuthContext';
import {logincall} from '../apiCalls';
import "./Login.css"
import {Link,useLocation} from "react-router-dom";

function Login() {

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked);
    };

    const location = useLocation();

    const email = useRef();
    const password = useRef();
    const {user,isFetching, err, dispatch} = useContext(AuthContext)

    const handlerClick = (e) =>{
        e.preventDefault();
        logincall({mail:email.current.value,password:password.current.value},dispatch)
    }

    return ( 
        <div className="login">
            <div className="loginWrapper">
                <div className="loginleft">
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
                <form className="loginright" onSubmit={handlerClick}>
                    <input 
                        type="email" 
                        placeholder='E-mail'
                        required
                        ref={email}
                        defaultValue={location.state.mail || ""}
                        className='inputcss' />
                    <input
                        ref={password} 
                        type={!checked? "password" : "text"} 
                        placeholder='Password'
                        required
                        minLength={6}
                        defaultValue={location.state.password || ""} 
                        className='inputcss' />
                    <span><label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />
                        Show password
                    </label></span>
                    <button className='loginbutton' disabled={isFetching} type="submit">{isFetching?"Loading": "Login"}</button>
                    <span>Forgot Password?</span>
                    <Link to="/register" style={{textDecoration:"none",alignItems:"center"}}>
                    <button className='newacc' disabled={isFetching}>Create a new Account</button>
                    </Link>
                </form>   
            </div>  
        </div>
     );
}

export default Login;