import React from 'react'
import Button from 'react-bootstrap/Button';
import { Routes, Route ,Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




const Introduce = () => {
  return (
    <div>
    {/* 네비게이션 바 추가 필요 */}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Haru Emotion Diary</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end"> 
        <Nav>
          <Nav.Link href="/login">Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

    <h1>소개 페이지 (Introduce)</h1>

    <Link to="/login"><Button variant="info">Start</Button></Link>
    <Link to="/login"><Button variant="info">오늘 하루 진단받기</Button></Link>


    </div>
  )
}

export default Introduce