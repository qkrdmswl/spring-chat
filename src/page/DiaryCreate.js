import React from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";

const DiaryCreate = () => {
  return (
    <div>
      <Navigation/>
      <h1>일기를 작성하고 저장하는 페이지 (DiaryCreate)</h1>
      <Link to="/diary-detail"><Button variant="info">저장</Button></Link>
      <Button variant="info">임시저장</Button>
      <Link to="/diary-list"><Button variant="info">취소</Button></Link>
    </div>

  )
}

export default DiaryCreate