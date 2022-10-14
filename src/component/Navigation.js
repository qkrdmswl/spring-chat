import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from "react-router-dom";
import {setStorageItem}  from '../utils/useLocalStorage'
import {  Link } from "react-router-dom";

const Navigation = ({isAuthenticated,setAuthentication}) => {
  const navigate = useNavigate();
  const logout= () =>{
    setStorageItem('jwtToken','');
    setAuthentication(false);
    window.localStorage.clear();
    navigate('/')
  }
  const mypage=() => {
    navigate('/mypage');
  }
  const diarylist = () => {
    navigate('/diary-list')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Link to={'/main'}><Navbar.Brand>
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Haru Emotion Diary</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end"> 
        <Nav>
          <Nav.Link onClick={diarylist}>전체 일기장</Nav.Link>
          <Nav.Link onClick={mypage}>마이페이지</Nav.Link>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation