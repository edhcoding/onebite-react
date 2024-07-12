import emotion1 from "./../assets/emotion1.png";
import emotion2 from "./../assets/emotion2.png";
import emotion3 from "./../assets/emotion3.png";
import emotion4 from "./../assets/emotion4.png";
import emotion5 from "./../assets/emotion5.png";

// 이미지를 assets에 넣는 이유 - vite가 자동 최적화 시켜줌 Import 해서 사용해야함 <img src={emotion1} />;
// 자동 최적화 - 메모리에 캐싱 되어 새로고침해도 다시 안불러옴 - but 이미지가 10000개 넘으면 캐싱하는게 안좋아서 public에 넣기도 함
// public에 넣으면 vite가 자동 최적화 안시켜줌 - import 하지말고 src에 이미지 경로 넣어야함 src={"/emotion1.png"}

export function getEmotionImage(emotionId) {
  switch (emotionId) {
    case 1:
      return emotion1;
    case 2:
      return emotion2;
    case 3:
      return emotion3;
    case 4:
      return emotion4;
    case 5:
      return emotion5;
    default:
      return null;
  }
}
