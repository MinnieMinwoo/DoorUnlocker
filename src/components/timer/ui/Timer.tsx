"use client";
import React, { useEffect, useState } from "react";

export default function Timer({ expireTime }: { expireTime: string }) {
  const [remainText, setRemainText] = useState("0分 0秒");

  useEffect(() => {
    if (!expireTime) {
      setRemainText("0分 0秒");
      return;
    }
    const expireDate = new Date(expireTime);

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
  }, [expireTime]);

  return <span>{remainText}</span>;
}
