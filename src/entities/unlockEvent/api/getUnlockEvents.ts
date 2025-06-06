"use server";
import { prisma } from "@/shared";
import { UnlockEvent } from "../model";

const getUnlockEvents = async (trackingNumber: string, deliveryCompany: string): Promise<UnlockEvent[]> => {
  const result = await prisma.unlockEvent.findMany({
    where: {
      packageTrackingNumber: trackingNumber,
      deliveryCompany: deliveryCompany,
    },
  });

  return result;
};

export default getUnlockEvents;
