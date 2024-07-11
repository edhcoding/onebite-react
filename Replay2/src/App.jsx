import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import "./App.css";
import Notfound from "./pages/Notfound";

// 1. / - 모든 일기를 조회하는 Home 페이지
// 2. /new - 새로운 일기를 작성하는 New 페이지
// 3. /diary - 일기를 상세히 조회하는 Diary 페이지

// Link - html의 a태그와 같은 기능
// <Link to={"/"}>Home</Link>
// useNavigate - 함수를 이용해서 특정 이벤트가 발생했을 때 페이지를 이동시키는 방법

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
