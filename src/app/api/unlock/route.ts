import { getMasterUser } from "@/entities/masterUser";
import { unlock } from "@/features/switchbot";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = await cookies();
  const sessionId = cookie.get("sessionId")?.value;
  if (!sessionId) return new Response("Unauthorized", { status: 401 });

  const masterUser = await getMasterUser(sessionId);

  //todo: check guest user
  if (!masterUser) return new Response("Unauthorized", { status: 401 });

  try {
    await unlock();

    const redirectUrl = new URL("/?success=true", request.url);
    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error("Error unlocking:", error);
  }
}
