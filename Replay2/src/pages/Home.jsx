import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

export default function Home() {
  return (
    <div>
      <Header
        title={"2024년 2월"}
        leftChild={<Button text={"<"} />}
        rightChild={<Button text={">"} />}
      />
      <DiaryList />
    </div>
  );
}
