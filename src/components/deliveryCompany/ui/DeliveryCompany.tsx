"use client";

import React, { useState } from "react";

export default function DeliveryCompany() {
  const [showOther, setShowOther] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowOther(e.target.value === "その他");
  };

  return (
    <label style={{ marginLeft: 8 }}>
      配達業者選択:
      <select name="deliveryCompany" required style={{ marginLeft: 8 }} onChange={handleChange}>
        <option value="">選択してください</option>
        <option value="ヤマト運輸">ヤマト運輸</option>
        <option value="佐川急便">佐川急便</option>
        <option value="日本郵便">日本郵便</option>
        <option value="Amazon">Amazon</option>
        <option value="その他">その他</option>
      </select>
      {showOther && (
        <input
          type="text"
          name="deliveryCompanyOther"
          id="other-company-input"
          placeholder="配達業者名を入力"
          required
          style={{ marginLeft: 8 }}
        />
      )}
    </label>
  );
}
