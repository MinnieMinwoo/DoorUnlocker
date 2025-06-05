"use server";

import { prisma } from "@/shared";
import { MasterUser } from "../model/type";

const setMasterUser = async (): Promise<MasterUser> => {
  const user = await prisma.master.create({
    data: {
      sessionId: crypto.randomUUID(),
    },
  });
  return user;
};

export default setMasterUser;
