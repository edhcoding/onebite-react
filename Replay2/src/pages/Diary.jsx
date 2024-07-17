import { useNavigate, useParams } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed-date";
import useDiary from "../hooks/useDiary";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Diary() {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);

  usePageTitle(`${params.id}번 일기`);

  if (!curDiaryItem) {
    return <div>데이터 로딩중...</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;

  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
}

// const params = useParams();
// diary/1 /2 /3 urlParameter일때 사용
// console.log(params);  id: 100   ex)사용할때는 {params.id} 100번 일기입니다!

// const [params, setParams] = useSearchParams();
// diray?value=hi 쿼리스트링 일 때 사용
// console.log(params.get("value")); // hi
