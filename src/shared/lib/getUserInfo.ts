export function getUserInfo(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || null;

  const userAgent = request.headers.get("user-agent") || null;

  let os = null;
  if (!userAgent) os = null;
  else if (userAgent.includes("Macintosh")) os = "macOS";
  else if (userAgent.includes("Windows")) os = "Windows";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";

  return { ip, userAgent, os };
}
