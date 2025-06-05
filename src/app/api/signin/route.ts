import { setMasterUser } from "@/entities/masterUser";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const trackingCode = (await request.formData()).get("trackingCode");

    if (trackingCode === process.env.ADMIN_SECRET) {
      const { sessionId } = await setMasterUser();

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

    const url = new URL(request.url);
    const redirectUrl = new URL("/?success=true", url.origin);
    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error("Error in signin API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
