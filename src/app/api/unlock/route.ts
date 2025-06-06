import { getLoginAttemptBySession } from "@/entities/loginAttempt";
import { getMasterUser } from "@/entities/masterUser";
import { unlock } from "@/features/switchbot";
import { cookies } from "next/headers";
import { getUnlockEvents, setUnlockEvent } from "@/entities/unlockEvent";
import { getUserInfo } from "@/shared";

export async function POST(request: Request) {
  const { ip, os, userAgent } = getUserInfo(request);
  if (!ip || !userAgent || !os) return new Response("Bad Request", { status: 400 });

  const cookie = await cookies();
  const sessionId = cookie.get("sessionId")?.value;
  if (!sessionId) return new Response("Unauthorized", { status: 401 });

  let trackingNumber: string;
  let deliveryCompany: string;

  const master = await getMasterUser(sessionId);
  if (master) {
    trackingNumber = "MASTER_USER";
    deliveryCompany = "MASTER_USER";
  } else {
    const user = await getLoginAttemptBySession(sessionId);
    if (!user) return new Response("Unauthorized", { status: 401 });
    trackingNumber = user.packageTrackingNumber;
    deliveryCompany = user.deliveryCompany;
    const unlockEvents = await getUnlockEvents(trackingNumber, deliveryCompany);
    if (unlockEvents.length >= 5) return new Response("Forbidden", { status: 403 });
  }

  try {
    await unlock();
    await setUnlockEvent(trackingNumber, deliveryCompany, sessionId, ip, os, userAgent);

    const redirectPath = master ? "/admin" : "/main";
    const url = new URL(request.url);
    url.pathname = redirectPath;
    url.search = "?success=true";
    return Response.redirect(url.toString(), 302);
  } catch (error) {
    console.error("Error unlocking:", error);
  }
}
