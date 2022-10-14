import {React,useState,useEffect} from 'react'
 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';
 import { useDispatch } from 'react-redux';
import { Link,useNavigate} from "react-router-dom";
import {userActions} from '../redux/actions/userAction'
import {notification} from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import useLocalStorage  from '../utils/useLocalStorage';

const Login = ({isAuthenticated , setAuthentication}) => {
  
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [username,setId]= useState(null);
  const [password,setPassword]= useState(null);
  const [jwtToken,setJwtToken] = useLocalStorage("jwtToken",""); //local 에 저장
  
  const onSubmit = async(event) =>{
      event.preventDefault();
      try{ 
        const response=await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}user/token/`,{username,password})
        const {
          data:{token:jwtToken}
        }=response
        setAuthentication(true);
        const {user_id}= jwt_decode(jwtToken);
        console.log(user_id)
        dispatch(userActions.getUserPk(username,password))
        setJwtToken(jwtToken);
        // dispatch(userActions.getUserPk(username,password));
        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          placement : 'topRight'
        });
        // dispatch(userActions.getUserState());
        navigate('/main')
      }
      catch(e){

        notification.open({
          message: "로그인 실패",
          icon: <FrownOutlined style={{ color: "#108ee9" }} />,
          placement : 'topRight'
        });
      }
  }
  return (
    <div className='log'>

    <Form className="LoginForm" onSubmit={onSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email"  onChange={e => setId(e.target.value)}/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>
   <Link to="/Register"><Button variant="info">회원가입</Button></Link>
   <Link to="/FindPassword"><Button variant="info">비밀번호 찾기</Button></Link>

   </div>
  )
}

export default Login