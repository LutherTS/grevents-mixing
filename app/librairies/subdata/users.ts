import { Prisma } from "@prisma/client";

export const DEFAULT_USERS_ORDER_BY_1ST = {
  appWideName: "asc",
} as Prisma.UserOrderByWithRelationInput;

export const DEFAULT_USERS_ORDER_BY_2ND = {
  username: "asc",
} as Prisma.UserOrderByWithRelationInput;

export const selectUser = {
  id: true,
  state: true,
  statusTitle: true, // to be delegated to session
  statusDashboard: true, // to be delegated to session
  statusPersonalInfo: true, // to be delegated to session
  username: true,
  appWideName: true,
  friendCode: true,
  hasTemporaryPassword: true, // to be delegated to session
  // Verifying access to the page will require a completely different user call, since data like friendCode should not be disclosed.
} satisfies Prisma.UserSelect;

export function whereUserByUsername(
  username: string
): Prisma.UserWhereUniqueInput {
  return { username, state: "LIVE" || "DEACTIVATED" };
}
