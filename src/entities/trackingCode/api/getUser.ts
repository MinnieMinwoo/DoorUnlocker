import { prisma } from "@/shared";

const getUser = async (code: string) => {
  try {
    const deliveryPackage = await prisma.deliveryPackage.findUnique({
      where: { trackingNumber: code },
    });
    return deliveryPackage;
  } catch (error) {
    console.error("getUser error:", error);
    throw error;
  }
};

export default getUser;
