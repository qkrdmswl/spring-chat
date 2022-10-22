import {React,useState} from 'react'
import { Routes, Route ,Navigate} from "react-router-dom";
import Introduce from './page/Introduce';
import Login from "./page/Login";
import DiaryCreate from "./page/DiaryCreate";
import DiaryDetail from "./page/DiaryDetail";
import DiaryList from "./page/DiaryList";
import FindPassword from "./page/FindPassword";
import Main from "./page/Main";
import Mypage from "./page/Mypage";
import Register from "./page/Register";
import './App.css';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation'

function App() {
  let [isAuthenticated , setAuthentication] = useState(false);
  let [navVisible,setNavVisible] = useState(true);
  
 

  return (
    <div>
    {navVisible && <Navigation isAuthenticated={isAuthenticated}  setAuthentication={setAuthentication}/>}
      <Routes>
        <Route path="/" element={<Introduce setNavVisible={setNavVisible}/>}/>
        <Route path="/diary-create" element={isAuthenticated==true ? <DiaryCreate authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-detail" element={isAuthenticated==true ? <DiaryDetail authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-list" element={isAuthenticated==true ? <DiaryList authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/login"  element={<Login setAuthentication={setAuthentication} setNavVisible={setNavVisible}/>}/>
        <Route path="/main" element={isAuthenticated ? <Main authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Navigate replace to="/" />} />
        <Route path="/Mypage" element={isAuthenticated==true ? <Mypage authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/Register" element={<Register setNavVisible={setNavVisible}/>}/>
        <Route path="/FindPassword" element={<FindPassword setNavVisible={setNavVisible}/>}/>
      </Routes>

    </div>

  );
}

export default App;
