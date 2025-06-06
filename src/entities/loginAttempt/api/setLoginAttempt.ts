"use server";
import { prisma } from "@/shared";
import { LoginAttempt } from "../model";

const setLoginAttempt = async (
  trackingNumber: string,
  deliveryCompany: string,
  ip: string,
  os: string,
  ua: string,
  success: boolean
): Promise<LoginAttempt> => {
  const result = await prisma.loginAttempt.create({
    data: {
      packageTrackingNumber: trackingNumber,
      deliveryCompany: deliveryCompany,
      sessionId: success ? crypto.randomUUID() : "",
      ipAddress: ip,
      os: os,
      userAgent: ua,
      success: success,
    },
  });
  return result as LoginAttempt;
};

export default setLoginAttempt;
