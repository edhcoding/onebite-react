import { createContext, useEffect, useReducer, useRef, useState } from "react";
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

/**
 * 배포 전 준비사항
 * 1. 페이지 타이틀 설정하기
 * 2. Favicon 설정하기
 * 3. 오픈 그래프 태그 설정하기
 * 4. 프로젝트 빌드(build)
 */

/**
 * 현존 유명한 클라우드 서비스
 * aws, gcp, vercel, netlify, firebase
 * 
 * vercel 사용
 * 1. 터미널에 vercel login 엔터
 * continue with github 엔터
 * 로그인 완료 됬으면 터미널에 vercel 엔터
 * 현재 위치의 파일들 배포를 원하냐고 물어봄 맞으면 Y
 * 어떤 vercel 계정에 적용하고 싶은지 선택
 * 이미 존재하는 프로젝트에 연결할 건지 물어보면 N 맞으면 Y
 * 프로젝트 이름 - ex) emotion-diary
 * 어떤 디렉토리에 너의 코드가 위치해 있냐 물어보면 ./ <= 기본값으로 그냥 엔터
 * vercel이 알아서 인식하고 설정을 변경할거냐 물어보면 N , 변경하고 싶으면 Y
 * 끝
 * 또 수정할 코드가 있다면 수정하고 터미널에 vercel 엔터 하면 => 새로운 코드 적용됨
 */

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2024-07-13").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2024-07-12").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2024-06-12").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용",
//   },
// ];

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

// context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

export default function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const idRef = useRef(3);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData); // undefined, null이 들어오면 오류가 발생하므로 if 문으로 감싸줌
    if (!Array.isArray(parsedData)) {
      // Array.isArray 자바스크립트 내장함수로 배열인지 아닌지 확인 배열이면 true 아니면 false
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      // JSON.parse 한 데이터가 배열 형태가 아닐수도 있기 때문에 예외 처리 해줘야 함(앞에 작성)
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // localStorage 연습
  // localStorage.setItem("test", "hello");
  // localStorage.setItem("person", JSON.stringify({ name: "은동혁" }));

  // console.log(localStorage.getItem("test"));
  // console.log(JSON.parse(localStorage.getItem("person"))); // JSON.parse의 인수로는 null, undefined가 들어오면 오류 나옴

  // localStorage.removeItem("test");
  // localStorage.removeItem("person"); // removeItem 하지 않고도 application 탭에서 백 스페이스를 눌러서 간단하게 삭제도 가능함

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

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>;
  }

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
