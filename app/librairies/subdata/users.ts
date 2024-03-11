import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const selectUser = (): Prisma.UserSelect<DefaultArgs> => {
  return {
    id: true,
    state: true,
    statusTitle: true, // to be delegated to session
    statusDashboard: true, // to be delegated to session
    statusPersonalInfo: true, // to be delegated to session
    username: true,
    appWideName: true,
    friendCode: true,
    hasTemporaryPassword: true, // to be delegated to session
    // Verifying access to the page will require a completely different user call, since data like friendCode should not be disclose.
  };
};

export const whereUserByUsername = (
  username: string
): Prisma.UserWhereUniqueInput => {
  return { username, state: "LIVE" || "DEACTIVATED" };
};
