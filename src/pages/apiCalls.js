import axios from "axios";

export const logincall = async  (userCredentials,dispatch) => {

    const url = "https://bronze-hummingbird-boot.cyclic.app/api"

    dispatch({type:"LOGIN-START"});
    try{
        const res = await axios.post(`${url}/auth/login`,userCredentials);
        dispatch({type:"LOGIN-SUCCESS",payload:res.data});
    }catch(err){
        dispatch({type:"LOGIN-FAILURE",payload:err});
        alert(err.response.data)
    }
}
