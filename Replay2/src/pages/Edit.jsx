import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useDiary from "../hooks/useDiary";

export default function Edit() {
  const params = useParams();
  const nav = useNavigate();

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
    /**
     * alert, prompt, confirm을 이용한 상호작용
     * alert - "확인"버튼을 누를때까지 메시를 보여주는 알림창
     *
     * prompt - 두개의 인수를 받음 result = prompt(title, [default]); title - 사용자에게 보여줄 문자열, default - 입력 필드의 초깃값
     * ex)
     * let age = prompt('나이를 입력해주세요.', 100);
     * alert(`당신의 나이는 ${age}살 입니다.`);
     *
     * confirm - 확인 누르면 true 반환, 취소 누르면 false 반환
     */
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
}
