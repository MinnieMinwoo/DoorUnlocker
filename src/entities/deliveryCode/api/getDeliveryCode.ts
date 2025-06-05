"use server";
import { DeliveryPackage } from "@/generated/prisma";
import { prisma } from "@/shared";

const getDeliveryCode = async (deliveryCode: string, deliveryCompany: string): Promise<DeliveryPackage | null> => {
  try {
    const deliveryPackage = await prisma.deliveryPackage.findUnique({
      where: { trackingNumber: deliveryCode, deliveryCompany: deliveryCompany },
    });
    return deliveryPackage;
  } catch (error) {
    console.error("getDeliveryCode error:", error);
    throw error;
  }
};

export default getDeliveryCode;
