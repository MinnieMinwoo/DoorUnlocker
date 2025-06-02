import React from "react";

const Main = () => {
  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <form action="/api/unlock" method="POST">
        <button type="submit">オートロック解除</button>
      </form>
    </>
  );
};

export default Main;
