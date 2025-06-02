import { unlock } from "@/features/switchbot";

export async function POST(request: Request) {
  try {
    await unlock();

    return Response.redirect("/?success=true", 302);
  } catch (error) {
    console.error("Error unlocking:", error);
  }
}
