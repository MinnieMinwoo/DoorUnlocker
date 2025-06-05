"use server";
import { prisma } from "@/shared";
import { LoginAttempt } from "../model";

const setLoginAttempt = async (
  trackingNumber: string,
  ip: string,
  os: string,
  ua: string,
  success: boolean
): Promise<LoginAttempt> => {
  const result = await prisma.loginAttempt.create({
    data: {
      packageTrackingNumber: trackingNumber,
      sessionId: crypto.randomUUID(),
      ipAddress: ip,
      os: os,
      userAgent: ua,
      success: success,
    },
  });
  return result;
};

export default setLoginAttempt;
