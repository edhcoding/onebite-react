import { createContext, useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import "./App.css";

// 1. / - 모든 일기를 조회하는 Home 페이지
// 2. /new - 새로운 일기를 작성하는 New 페이지
// 3. /diary - 일기를 상세히 조회하는 Diary 페이지

// Link - html의 a태그와 같은 기능
// <Link to={"/"}>Home</Link>
// useNavigate - 함수를 이용해서 특정 이벤트가 발생했을 때 페이지를 이동시키는 방법

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-07-13").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2024-07-12").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2024-06-12").getTime(),
    emotionId: 3,
    content: "3번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

// context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

export default function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
    // const newDiary = {
    //   id: idRef.current++,
    //   createdDate,
    //   emotionId,
    //   content,
    // };
    // setData([newDiary, ...data]);
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: { id, createdDate, emotionId, content },
    });
    // setData((prevData) =>
    //   prevData.map((item) =>
    //     String(item.id) === String(id) ? { id, createdDate, emotionId, content } : item
    //   )
    // );
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
    // setData((prevData) => prevData.filter((item) => String(item.id) !== String(id)));
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
