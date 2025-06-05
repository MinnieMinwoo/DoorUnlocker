"use server";

import { prisma } from "@/shared";

const setDeliveryCode = async (
  trackingNumber: string,
  deliveryCompany: string,
  estimatedDeliveryDate: Date
): Promise<void> => {
  try {
    const result = await prisma.deliveryPackage.create({
      data: {
        trackingNumber: trackingNumber,
        deliveryCompany: deliveryCompany,
        estimatedDeliveryDate: new Date(estimatedDeliveryDate),
      },
    });
    console.log("Delivery code set successfully:", result);
  } catch (error) {
    console.error("Error setting delivery code:", error);
    throw error;
  }
};

export default setDeliveryCode;
