"use server";

import { prisma } from "@/shared";
import { MasterUser } from "../model/type";

const getMasterUser = async (sessionId: string): Promise<MasterUser | null> => {
  const user = await prisma.master.findUnique({
    where: {
      sessionId,
    },
  });
  return user;
};

export default getMasterUser;
