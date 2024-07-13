import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css";

export default function DiaryItem({ id, emotionId, createdDate, content }) {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      {/* 이미지 섹션 */}
      <div
        className={`img_section img_section_${emotionId}`}
        onClick={() => nav(`/diary/${id}`)}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      {/* 이미지 날짜, 설명 */}
      <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      {/* 이미지 수정하기 */}
      <div className="button_section">
        <Button text={"수정하기"} onClick={() => nav(`/edit/${id}`)} />
      </div>
    </div>
  );
}
