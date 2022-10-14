import {userAction} from '../reducers/userReducer'
import {getStorageItem,setStorageItem}  from '../../utils/useLocalStorage';
import jwt_decode from "jwt-decode";
import Axios from "axios";
function getUserState(){
  
  return async(dispatch)=>{
    try{
      const token = getStorageItem('jwtToken','')
      console.log(token);
      const response = await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}user/token/verify/`,{token})
      if (response.data.token) {
      dispatch(userAction.getIsAuthenticated(true))
    }else{
      dispatch(userAction.getIsAuthenticated(false))
    }
    }
    catch(e){
      console.log(e);
      dispatch(userAction.getIsAuthenticated(false))
    }
  }
}

function getUserPk(username,password){
  return async(dispatch)=>{
    const response=await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}user/token/`,{username,password});
    const {
      data:{token:jwtToken}
    }=response;
    const {user_id}= jwt_decode(jwtToken);
    console.log(user_id)
    dispatch(userAction.getPk(user_id))
    setStorageItem("jwtToken",jwtToken);

  }
}

export const userActions = {getUserState,getUserPk}
