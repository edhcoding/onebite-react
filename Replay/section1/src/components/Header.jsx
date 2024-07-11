import React, { memo } from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 ❤️</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

// const memoizedHeader = memo(Header);
// export default memoizedHeader;

export default memo(Header); // 단축해서 이렇게도 가능
