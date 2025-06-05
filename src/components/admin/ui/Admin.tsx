import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Timer } from "@/components/timer.tsx";

export default async function Admin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const headers: Record<string, string> = sessionCookie ? { Cookie: `sessionId=${sessionCookie}` } : {};

  const response = await fetch(`${baseUrl}/api/validation/master`, {
    headers,
    cache: "no-store",
  });
  if (!response.ok) redirect("/?error=unauthorized");

  const {
    user: { loginTime },
  } = await response.json();

  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <Timer loginTime={loginTime} />
      <form action="/api/signin" method="POST">
        <label>宅配追跡番号または指定した番号:</label>
        <input type="text" name="trackingCode" required minLength={8} />
        <button type="submit">宅配番号の登録</button>
      </form>
      <form>
        <button type="submit">オートロック解除</button>
      </form>
    </>
  );
}
