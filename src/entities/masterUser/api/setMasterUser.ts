"use server";

import { prisma } from "@/shared";
import { MasterUser } from "../model/type";

const setMasterUser = async (ip: string, os: string, ua: string): Promise<MasterUser> => {
  const user = await prisma.master.create({
    data: {
      sessionId: crypto.randomUUID(),
      ipAddress: ip,
      os: os,
      userAgent: ua,
    },
  });
  return user;
};

export default setMasterUser;
