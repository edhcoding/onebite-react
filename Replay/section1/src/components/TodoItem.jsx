import { memo, useContext } from "react";
import { TodoDispatchContext } from "../App";
import "./TodoItem.css";

// toDateString Thu Jul 11 2024 년도까지만 끝 시간 안나옴
// toLocaleDateString 2024.7.11 이렇게 나옴

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// 고차 컴포넌트 (HOC) - 고차 컴포넌트를 이용하면 한 번 호출한 것 만으로 컴포넌트에 새로운 기능을 부여 가능함
// 하지만 아직도 TodoItem들이 전부 다 리렌더링 발생
// onUpdate, onDelete와 같은 객체 타입의 값, 함수는 매번 새롭게 전달이 될 때마다
// 다른 주소값을 가지게 되기 때문에 memo메서드가 판단하기에 props가 바꼈다고 판단함 => memo 얕은비교
// 방법2가지
// 1. app 컴포넌트로 가서 함수들 자체를 메모이제이션해서 리렌더링 되더라도 다시 생성되지 않게 방지하는 방법
// 2. memo 인수의 두 번째 인수로 콜백함수를 전달해서 최적화 기능을 커스터마이징 해주면 됨

// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라, props가 바뀌었는지 안바뀌었는지 판단함
//   // T반환하면 => props가 바뀌지 않았다고판단 => 리렌더링 안됨
//   // F => props 바뀜 => 리렌더링 됨
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   return true;
// });

// useCallback을 사용했으므로 위에 코드는 다 주석처리하고 memo 메서드만 사용해서 작성하면 됨
export default memo(TodoItem);
