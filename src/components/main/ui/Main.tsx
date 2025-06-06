import { Timer } from "@/components/timer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Main = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const headers: Record<string, string> = sessionCookie ? { Cookie: `sessionId=${sessionCookie}` } : {};

  const response = await fetch(`${baseUrl}/api/validation/guest`, {
    headers,
    cache: "no-store",
  });
  if (!response.ok) redirect("/?error=unauthorized");

  const { expiresAt } = await response.json();

  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <p>セキュリティのため、オートロック解除は５回になりますので、ご了承ください。</p>
      <Timer expireTime={expiresAt} />

      <form action="/api/unlock" method="POST">
        <button type="submit" style={{ marginLeft: 8 }}>
          オートロック解除
        </button>
      </form>
    </>
  );
};

export default Main;
