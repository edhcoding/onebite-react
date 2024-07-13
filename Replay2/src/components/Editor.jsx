import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import "./Editor.css";

export default function Editor({ initData, onSubmit }) {
  // 하나의 input에 날짜, 감정, 일기 전부 저장할거임
  // 이럴때는 state를 객체로 만들어야 함
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    // console.log(e.target.name); // 어떤 요소에 입력이 들어올건지
    // console.log(e.target.value); // 입력된 값이 무엇인지
    // e.target.value하면 2024-07-13 문자열로 들어옴 이렇게만 들어오면 date객체로 들어오는게 아니라 문자열로 들어오기 때문에 오류나옴

    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button
          text={"작성완료"}
          type={"POSITIVE"}
          onClick={onClickSubmitButton}
        />
        {/* Button 컴포넌트에 App 컴포넌트에 있는 onCreate 함수를 useContext를 이용해 가져와서 사용하면 끝인데 그렇게 하면 오류가나옴
        왜냐하면 editor 컴포넌트가 new page에만 사용하는게 아니라 edit page에서도 똑같이 사용하고 있기 때문에 수정하려고 하는데 생성이 되면 안되고 update가 되야함
        따라서 어떤 page이냐에 따라서 다른 동작을 할 수 있개 만들어줘야함 */}
      </section>
    </div>
  );
}
