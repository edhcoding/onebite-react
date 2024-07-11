import { createContext, useCallback, useMemo, useReducer, useRef } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";

/**
 * useMemo - 불 필요한 연산 방지
 * "메모이제이션" 기법을 기반으로 컴포넌트 내부에서 불필요한 연산 다시 수행하지 않도록 최적화 해줌
 * 자메로 useCallback이 있음
 */

/**
 * React.memo - 컴포넌트를 인수로 받아, 최적화된 컴포넌트로 만들어 반환함
 * ex) const MemoizedComponent = memo(component)
 * 인수로는 컴포넌트, MemoizedComponent 반환값: 최적화된 컴포넌트 props를 기준으로 메모이제이션 됨
 * 이제부터 MemoizedComponent는 부모 컴포넌트가 리렌더링 되더라도 자신이 받는 props가 변하지 않는이상 리렌더링이 안됨
 */

/**
 * useCallback - 불 필요한 함수 재생성 방지하기
 * React.memo는 props가 바뀌었는지 안바뀌었는지 얕은 비교를 하기 때문에 onUpdate, onDelete같은 함수 같은 객체 타입의 값을 props로 전달해줄 때는
 * 제대로 된 최적화가 이루어지지 않아서 추가적으로 별도의 콜백함수를 보내야해서 일일이 하나하나 props 값이 바뀌었는지 비교 해줬어야함
 * => 이럴때는 onUpdate나 onDelete를 애초에 다시 생성되지 않도록 최적화 시키면 됨 useCallback
 */

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

// context는 함수 밖에서 정의함, 안에서 정의하면 리렌더링 발생
// export const TodoContext = createContext();
// context 분리
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

// npm create vite@latest로 설치
function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content,
    //   date: new Date().getTime(),
    // };

    // setTodos([newTodo, ...todos]);
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
    //   )
    // );
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  // const onDelete = (targetId) => {
  //   // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
  //   // setTodos(todos.filter((todo) => todo.id !== targetId));
  //   dispatch({
  //     type: "DELETE",
  //     targetId,
  //   });
  // };

  // 첫 번째 인수로는 콜백함수 - 안에는 불 필요하게 재생성되지 않도록 방지하고 싶은 함수 넣으면 됨
  // 두 번째 인수로는 의존성 배열 deps
  // useCallback(() => {}, []);
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  // <TodoDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}> 이렇게 쓰면 App 컴포넌트에 있는 todos가 바뀌면서 다시 리렌더링 될거임
  // 그럼 context를 분리한 이유가 없음 그래서 { onCreate, onUpdate, onDelete } 이 객체를 다시 생성하지 않도록 => useMemo 사용하면 됨
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={{ todos }}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
