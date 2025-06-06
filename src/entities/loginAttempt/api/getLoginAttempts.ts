"use server";
import { prisma } from "@/shared";
import { LoginAttempt } from "../model";

const getLoginAttempt = async (trackingNumber: string, success = true): Promise<LoginAttempt[]> => {
  const result = await prisma.loginAttempt.findMany({
    where: {
      packageTrackingNumber: trackingNumber,
      success: success,
    },
  });
  return result as LoginAttempt[];
};

export default getLoginAttempt;
