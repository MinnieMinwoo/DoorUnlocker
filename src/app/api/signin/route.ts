import { getDeliveryCode } from "@/entities/deliveryCode";
import { setLoginAttempt } from "@/entities/loginAttempt";
import { setMasterUser } from "@/entities/masterUser";
import { getUserInfo } from "@/shared";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { ip, os, userAgent } = getUserInfo(request);
  if (!ip || !userAgent || !os) return new Response("Bad Request", { status: 400 });

  const formData = await request.formData();
  const trackingCode = formData.get("trackingCode");
  const deliveryCompany = formData.get("deliveryCompany");
  if (typeof trackingCode !== "string" || trackingCode.length < 8 || typeof deliveryCompany !== "string") {
    await setLoginAttempt(trackingCode as string, ip, os, userAgent, false);
    return new Response("Invalid tracking code", { status: 400 });
  }

  try {
    if (trackingCode === process.env.ADMIN_SECRET) {
      const { sessionId } = await setMasterUser(ip, os, userAgent);

      const cookie = await cookies();
      cookie.set("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 60 * 60 * 1000),
        maxAge: 60 * 60,
      });

      const redirectUrl = new URL("/admin", request.url);
      return Response.redirect(redirectUrl.toString(), 302);
    }

    const result = await getDeliveryCode(trackingCode, deliveryCompany);
    if (!result) {
      await setLoginAttempt(trackingCode as string, ip, os, userAgent, false);
      const redirectUrl = new URL("/?error=404", request.url);
      return Response.redirect(redirectUrl.toString(), 302);
    }

    const { estimatedDeliveryDate } = result;
    if (!estimatedDeliveryDate) {
      await setLoginAttempt(trackingCode as string, ip, os, userAgent, false);
      const redirectUrl = new URL("/?error=401", request.url);
      return Response.redirect(redirectUrl.toString(), 302);
    }

    //todo: check login count

    const { sessionId } = await setLoginAttempt(trackingCode, ip, os, userAgent, true);
    const codeCookie = await cookies();
    codeCookie.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 60 * 5 * 1000),
      maxAge: 60 * 5,
    });
    const url = new URL(request.url);
    const redirectUrl = new URL("/?success=true", url.origin);
    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error("Error in signin API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
