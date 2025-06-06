"use server";
import { prisma } from "@/shared";
import { UnlockEvent } from "../model";

const setUnlockEvent = async (
  trackingNumber: string,
  deliveryCompany: string,
  sessionId: string,
  ip: string,
  os: string,
  ua: string
): Promise<UnlockEvent> => {
  const result = await prisma.unlockEvent.create({
    data: {
      packageTrackingNumber: trackingNumber,
      deliveryCompany: deliveryCompany,
      sessionId: sessionId,
      ipAddress: ip,
      os: os,
      userAgent: ua,
    },
  });
  return result as UnlockEvent;
};

export default setUnlockEvent;
