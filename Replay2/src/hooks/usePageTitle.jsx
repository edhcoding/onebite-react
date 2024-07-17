import { useEffect } from "react";

export const usePageTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0]; // $ 달러 사인은 보통 dom 요소를 저잘할 때 사용함
    $title.innerText = title;
  }, [title]);
};
