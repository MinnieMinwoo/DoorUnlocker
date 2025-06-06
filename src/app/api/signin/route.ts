import { setLoginAttempt } from "@/entities/loginAttempt";
import { setMasterUser } from "@/entities/masterUser";
import { guestLoginValidation } from "@/features/auth";
import { getUserInfo } from "@/shared";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { ip, os, userAgent } = getUserInfo(request);
  if (!ip || !userAgent || !os) return new Response("Bad Request", { status: 400 });

  const formData = await request.formData();
  const trackingCode = formData.get("trackingCode") as string;
  const deliveryCompany =
    formData.get("deliveryCompany") === "その他"
      ? (formData.get("deliveryCompanyOther") as string)
      : (formData.get("deliveryCompany") as string);

  console.log("Tracking Code:", trackingCode);
  console.log("Delivery Company:", deliveryCompany);
  if (typeof trackingCode !== "string" || trackingCode.length < 8 || typeof deliveryCompany !== "string") {
    await setLoginAttempt(trackingCode ?? "", deliveryCompany ?? "", ip, os, userAgent, false);
    return new Response("Invalid tracking code", { status: 400 });
  }

  try {
    if (deliveryCompany === process.env.ADMIN_KEY && trackingCode === process.env.ADMIN_SECRET) {
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

    const { result, status } = await guestLoginValidation(trackingCode, deliveryCompany);
    if (!result) {
      await setLoginAttempt(trackingCode, deliveryCompany, ip, os, userAgent, false);
      const redirectUrl = new URL(`/?error=${status}`, request.url);
      return Response.redirect(redirectUrl.toString(), 302);
    }

    const { sessionId } = await setLoginAttempt(trackingCode, deliveryCompany, ip, os, userAgent, true);
    if (!sessionId) throw new Error("Session ID not found after login attempt");

    const codeCookie = await cookies();
    codeCookie.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 60 * 5 * 1000),
      maxAge: 60 * 5,
    });

    const redirectUrl = new URL("/main", request.url);
    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error("Error in signin API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
