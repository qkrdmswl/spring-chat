import {React,useState} from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";
import {useLocalStorage,getStorageItem}  from '../utils/useLocalStorage';

const Main = () => {
  const [k,setK]= useState("");
  
  return (
    <div><Navigation/>
    <h1>메인 페이지 (Main)</h1>
    <h2>{getStorageItem("jwtToken","")}</h2>
    </div>
  )
}

export default Main