import { getLoginAttemptBySession } from "@/entities/loginAttempt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookie = await cookies();
    const sessionId = cookie.get("sessionId")?.value;
    if (!sessionId) return new Response("Unauthorized", { status: 401 });

    const guestUser = await getLoginAttemptBySession(sessionId);
    if (!guestUser) return new Response("Unauthorized", { status: 401 });

    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - guestUser.timestamp?.getTime();
    if (timeDifference > 60 * 5 * 1000) return new Response("Unauthorized", { status: 401 });

    const expiresAt = new Date(guestUser.timestamp.getTime() + 5 * 60 * 1000);

    return new Response(
      JSON.stringify({
        expiresAt: expiresAt.toISOString(),
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
