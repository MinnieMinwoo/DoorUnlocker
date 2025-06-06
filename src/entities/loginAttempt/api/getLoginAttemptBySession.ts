"use server";
import { prisma } from "@/shared";
import { LoginAttempt } from "../model";

const getLoginAttemptBySession = async (sessionId: string): Promise<LoginAttempt | null> => {
  const result = await prisma.loginAttempt.findFirst({
    where: {
      sessionId: sessionId,
    },
  });
  return result;
};

export default getLoginAttemptBySession;
