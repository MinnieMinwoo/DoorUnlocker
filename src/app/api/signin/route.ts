export async function POST(request: Request) {
  try {
    const trackingCode = (await request.formData()).get("trackingCode");

    if (trackingCode === process.env.ADMIN_SECRET) {
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
