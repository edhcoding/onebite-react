import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import "./App.css";
import { useReducer } from "react";

// 1. / - 모든 일기를 조회하는 Home 페이지
// 2. /new - 새로운 일기를 작성하는 New 페이지
// 3. /diary - 일기를 상세히 조회하는 Diary 페이지

// Link - html의 a태그와 같은 기능
// <Link to={"/"}>Home</Link>
// useNavigate - 함수를 이용해서 특정 이벤트가 발생했을 때 페이지를 이동시키는 방법

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "2번 일기 내용",
  },
];

function reducer(state, action) {
  return state;
}

export default function App() {
  const [data, dispatch] = useReducer(reducer, mockData);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
