import { setDeliveryCode } from "@/entities/deliveryCode";

export async function POST(request: Request) {
  const formData = await request.formData();
  const trackingCode = formData.get("trackingCode");
  const deliveryCompany =
    formData.get("deliveryCompany") === "その他"
      ? formData.get("deliveryCompanyOther")
      : formData.get("deliveryCompany");
  const estimatedDeliveryDate = formData.get("estimatedDeliveryDate"); // YYYY-MM-DD

  if (
    typeof trackingCode !== "string" ||
    trackingCode.length < 8 ||
    typeof deliveryCompany !== "string" ||
    typeof estimatedDeliveryDate !== "string"
  )
    return new Response("Invalid form data", { status: 400 });

  try {
    const dateObj = new Date(estimatedDeliveryDate);
    await setDeliveryCode(trackingCode, deliveryCompany, dateObj);
    const redirectUrl = new URL("/admin?success=true", request.url);
    return Response.redirect(redirectUrl.toString(), 302);
  } catch (error) {
    console.error("Error setting delivery code:", error);
    const redirectUrl = new URL("/admin?failed=true", request.url);
    return Response.redirect(redirectUrl.toString(), 302);
  }
}
