import { Routes, Route ,Link} from "react-router-dom";
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
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Introduce/>}/>
        <Route path="/diary-create" element={<DiaryCreate/>}/>
        <Route path="/diary-detail" element={<DiaryDetail/>}/>
        <Route path="/diary-list" element={<DiaryList/>}/>
        <Route path="/diary-detail" element={<DiaryDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/Mypage" element={<Mypage/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
