import React, { useMemo, useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";

export default function List({ todos, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  // const getAnalyzedData = () => {
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   // filter메서드는 배열 내에 전체 요소들을 순회하기 때문에 요소들이 많아질수록 오래걸림
  //   // 방지해야 할텐데 컴포넌트 내부에서 그냥 호출되고 있기 때문에 List 컴포넌트가 리렌더링 될때마다 재호출 일어날거임
  //   // 검색할때마다 호출되므로 추가, 수정, 삭제할때만 한 번씩 호출하는게 맞음
  //   // 이럴때 useMemo사용해서 메모이제이션해야함
  //   const notDoneCount = totalCount - doneCount;
  //   return { totalCount, doneCount, notDoneCount };
  // };

  // useMemo - 첫 번째 인수 콜백, 두 번째 인수 의존성 배열
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    // filter메서드는 배열 내에 전체 요소들을 순회하기 때문에 요소들이 많아질수록 오래걸림
    // 방지해야 할텐데 컴포넌트 내부에서 그냥 호출되고 있기 때문에 List 컴포넌트가 리렌더링 될때마다 재호출 일어날거임
    // 검색할때마다 호출되므로 추가, 수정, 삭제할때만 한 번씩 호출하는게 맞음
    // 이럴때 useMemo사용해서 메모이제이션해야함
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [todos]);

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className="List">
      <h4>Todo List 💚</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
