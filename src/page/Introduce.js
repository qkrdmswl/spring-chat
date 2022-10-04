import React from 'react'
import Button from 'react-bootstrap/Button';
import { Routes, Route ,Link} from "react-router-dom";
const Introduce = () => {
  return (
    <div>
    <h1>소개 페이지 (Introduce)</h1>

    <Link to="/login"><Button variant="info">Sign in</Button></Link>
    <Link to="/login"><Button variant="info">Start</Button></Link>
    <Link to="/login"><Button variant="info">오늘 하루 진단받기</Button></Link>


    </div>
  )
}

export default Introduce