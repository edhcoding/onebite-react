import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { usePageTitle } from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime(); // 1일 0시 0분 0초

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime(); // 0을 설정해주면 이전달의 마지막 날을 가리킴

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

export default function Home() {
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date()); // Sat Jul 13 2024 18:38:16 GMT+0900 (한국 표준시)

  const monthlyData = getMonthlyData(pivotDate, data);

  usePageTitle("감정 일기장");

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList monthlyData={monthlyData} />
    </div>
  );
}
