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
  username: true,
  appWideName: true,
  friendCode: true,
} satisfies Prisma.UserSelect;

export const selectSignInUser = {
  hashedPassword: true,
} satisfies Prisma.UserSelect;

export const selectVerifiedSignInUser = {
  id: true,
  state: true,
  statusTitle: true,
  statusDashboard: true,
  statusPersonalInfo: true,
  username: true,
  appWideName: true,
  hasTemporaryPassword: true,
} satisfies Prisma.UserSelect;

export function whereUserByUsername(
  username: string
): Prisma.UserWhereUniqueInput {
  return { username, state: "LIVE" || "DEACTIVATED" };
}

export function whereSignInUser(
  usernameOrEmail: string
): Prisma.UserWhereInput {
  return {
    OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  };
}
