"use client";
import React, { useEffect, useState } from "react";

export default function Timer({ loginTime }: { loginTime: string }) {
  const [remainText, setRemainText] = useState("0分 0秒");

  useEffect(() => {
    if (!loginTime) {
      setRemainText("0分 0秒");
      return;
    }
    const loginDate = new Date(loginTime);
    const expireDate = new Date(loginDate.getTime() + 60 * 60 * 1000);

    const updateRemain = () => {
      const now = new Date();
      const diff = expireDate.getTime() - now.getTime();
      if (diff > 0) {
        const min = Math.floor(diff / 60000);
        const sec = Math.floor((diff % 60000) / 1000);
        setRemainText(`${min}分 ${sec}秒`);
      } else {
        setRemainText("0分 0秒");
      }
    };
    updateRemain();
    const timer = setInterval(updateRemain, 1000);
    return () => clearInterval(timer);
  }, [loginTime]);

  return <span>{remainText}</span>;
}
