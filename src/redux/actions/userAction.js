import {userAction} from '../reducers/userReducer'
import {getStorageItem}  from '../../utils/useLocalStorage';
import Axios from "axios";
function getUserState(){
  
  return async(dispatch)=>{
    try{
      const token = getStorageItem('jwtToken','')
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

export const userActions = {getUserState}
