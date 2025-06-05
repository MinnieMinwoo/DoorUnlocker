import React from "react";

const Main = () => {
  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <p>このシステムは、不在中の場合でもオートロックを自動で解除するためのものです。</p>
      <p>追跡コード、または配達指示などで指定したパスワードを入力したら、オートロックが解除されます。</p>
      <p>セキュリティのため、数回入力に失敗したらログインはできませんので、ご了承ください。</p>
      <form action="/api/signin" method="POST">
        <label>宅配追跡番号または指定した番号:</label>
        <input type="text" name="trackingCode" required />
        <button type="submit">オートロック解除</button>
      </form>
    </>
  );
};

export default Main;
