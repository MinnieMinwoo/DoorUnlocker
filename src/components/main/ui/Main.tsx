import React from "react";

const Main = () => {
  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <p>セキュリティのため、オートロック解除は５回になりますので、ご了承ください。</p>
      <form action="/api/signin" method="POST">
        <button type="submit" style={{ marginLeft: 8 }}>
          宅配番号の登録
        </button>
      </form>
    </>
  );
};

export default Main;
