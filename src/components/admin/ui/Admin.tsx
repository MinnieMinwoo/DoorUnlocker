import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Timer } from "@/components/timer";
import { UnlockButton } from "@/components/unlockbutton";
import { DeliveryCompany } from "@/components/deliveryCompany";

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

  const { expiresAt } = await response.json();

  return (
    <>
      <h1>自動オートロック解除システム</h1>
      <Timer expireTime={expiresAt} />
      <form action="/api/track" method="POST">
        <label>宅配追跡番号または指定した番号:</label>
        <input type="text" name="trackingCode" required minLength={8} />
        <DeliveryCompany />
        <label style={{ marginLeft: 8 }}>予想到着日:</label>
        <input type="date" name="estimatedDeliveryDate" required style={{ marginLeft: 8 }} min="2025-06-05" />
        <button type="submit" style={{ marginLeft: 8 }}>
          宅配番号の登録
        </button>
      </form>
      <UnlockButton />
    </>
  );
}
