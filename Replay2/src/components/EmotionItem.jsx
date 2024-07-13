import { getEmotionImage } from "../util/get-emotion-image";
import "./EmotionItem.css";

export default function EmotionItem({ emotionId, emotionName, isSelected }) {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
}
