import { Prisma } from "@prisma/client";

export function dataSignUpUser(
  username: string,
  appWideName: string,
  email: string,
  hashedPassword: string,
  friendCode: string
): Prisma.UserCreateInput {
  return {
    username,
    appWideName,
    email,
    hashedPassword,
    friendCode,
    state: "LIVE",
    statusTitle: "WELCOMETOGREVENTS",
  };
}

export const dataResetUserStatutes = {
  statusTitle: "NONE",
  statusDashboard: "NONE",
  statusPersonalInfo: "NONE",
} satisfies Prisma.UserUpdateInput;
