import "./Button.css";

export default function Button({ text, type, onClick, className }) {
  return (
    <button onClick={onClick} className={`Button Button_${type} ${className}`}>
      {text}
    </button>
  );
}
