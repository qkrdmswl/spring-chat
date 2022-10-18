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
  
 

  return (
    <div>
    <Navigation isAuthenticated={isAuthenticated}  setAuthentication={setAuthentication}/>
      <Routes>
        <Route path="/" element={<Introduce/>}/>
        <Route path="/diary-create" element={isAuthenticated==true ? <DiaryCreate authentication={isAuthenticated} /> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-detail" element={isAuthenticated==true ? <DiaryDetail authentication={isAuthenticated}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-list" element={isAuthenticated==true ? <DiaryList authentication={isAuthenticated}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/login" element={<Login setAuthentication={setAuthentication}/>}/>
        <Route path="/main" element={isAuthenticated ? <Main authentication={isAuthenticated}/> : <Navigate replace to="/" />} />
        <Route path="/Mypage" element={isAuthenticated==true ? <Mypage authentication={isAuthenticated}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/FindPassword" element={<FindPassword/>}/>
      </Routes>

    </div>

  );
}

export default App;
