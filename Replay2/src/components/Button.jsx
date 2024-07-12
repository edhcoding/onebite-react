import "./Button.css";

export default function Button({ text, type, onClick }) {
  return (
    <butto onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </butto>
  );
}
