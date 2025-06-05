import { getMasterUser } from "@/entities/masterUser";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookie = await cookies();
    const sessionId = cookie.get("sessionId")?.value;
    if (!sessionId) return new Response("Unauthorized", { status: 401 });

    const masterUser = await getMasterUser(sessionId);
    if (!masterUser) return new Response("Unauthorized", { status: 401 });

    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - masterUser.loginTime?.getTime();
    if (timeDifference > 60 * 60 * 1000) return new Response("Unauthorized", { status: 401 });

    return new Response(
      JSON.stringify({
        user: masterUser,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in signin API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
