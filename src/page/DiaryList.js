import React from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";

const DiaryList = () => {
  return (
    <div>
      <Navigation/>
      <h1>작성 했던 일기를 볼 수 있는 페이지 ( DiaryList)</h1>
      <Link to="/diary-create"><Button variant="info">일기 쓰기</Button></Link>
    </div>
    
  )
}

export default DiaryList