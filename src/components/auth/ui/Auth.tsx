import { DeliveryCompany } from "@/components/deliveryCompany";
import React from "react";

const Auth = () => {
  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <p>このシステムは、不在中の場合でもオートロックを自動で解除するためのものです。</p>
      <p>追跡コード、または配達指示などで指定したパスワードを入力したら、オートロックが解除されます。</p>
      <p>セキュリティのため、数回入力に失敗したらログインはできませんので、ご了承ください。</p>
      <form action="/api/signin" method="POST">
        <label>宅配追跡番号または指定した番号:</label>
        <input type="text" name="trackingCode" required minLength={8} />
        <DeliveryCompany />
        <label style={{ marginLeft: 8 }}>予想到着日:</label>
        <button type="submit" style={{ marginLeft: 8 }}>
          宅配番号の登録
        </button>
      </form>
    </>
  );
};

export default Auth;
