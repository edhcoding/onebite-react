import "./Button.css";

export default function Button({ text, type, onClick, className }) {
  return (
    <butto onClick={onClick} className={`Button Button_${type} ${className}`}>
      {text}
    </butto>
  );
}
