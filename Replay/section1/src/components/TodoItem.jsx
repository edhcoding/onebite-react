import "./TodoItem.css";

// toDateString Thu Jul 11 2024 년도까지만 끝 시간 안나옴
// toLocaleDateString 2024.7.11 이렇게 나옴

export default function TodoItem({ id, isDone, content, date, onUpdate }) {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button>삭제</button>
    </div>
  );
}
