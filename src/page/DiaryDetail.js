import React from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";


const DiaryDetail = ({setNavVisible}) => {
  setNavVisible(true);
  return (
    <div>
      <Navigation/>
      <h1>일기와 음악 / 영화 추천 결과를 볼 수 있는 페이지 (DiaryDetail)</h1>
    </div>
    
  )
}

export default DiaryDetail