import { useParams } from "react-router-dom";

export default function Edit() {
  const params = useParams();

  return <div>{params.id}번 일기 수정페이지입니다</div>;
}
