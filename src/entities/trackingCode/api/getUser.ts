import { PrismaClient } from "@prisma/client";

const getUser = async (code: string) => {
  const prisma = new PrismaClient();
  const deliveryPackage = await prisma.deliveryPackage.findUnique({
    where: { trackingNumber: code },
  });
};

export default getUser;
