import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Routes, Route ,Link} from "react-router-dom";
import {userActions} from './redux/actions/userAction';
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
function App() {
  const dispatch =useDispatch();
  useEffect(()=>{
    dispatch(userActions.getUserState());
  })

  const {isAuthenticated} = useSelector(state => state.user);
  console.log(isAuthenticated)

  return (

      <Routes>
        <Route path="/" element={<Introduce/>}/>
        <Route path="/diary-create" element={isAuthenticated==true ? <DiaryCreate/> : <Login/>}/>
        <Route path="/diary-detail" element={isAuthenticated==true ? <DiaryDetail/> : <Login/>}/>
        <Route path="/diary-list" element={isAuthenticated==true ? <DiaryList/> : <Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={isAuthenticated==true ? <Main/> : <Login/>}/>
        <Route path="/Mypage" element={isAuthenticated==true ? <Mypage/> : <Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/FindPassword" element={isAuthenticated==true ? <FindPassword/> : <Login/>}/>
      </Routes>

  );
}

export default App;
