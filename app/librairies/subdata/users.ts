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
  id: true,
  hashedPassword: true,
} satisfies Prisma.UserSelect;

export const selectVerifiedSignInUser = {
  id: true,
  username: true,
} satisfies Prisma.UserSelect;

export const selectVerifiedUser = {
  id: true,
  state: true,
  statusTitle: true,
  statusDashboard: true,
  statusPersonalInfo: true,
  username: true,
  appWideName: true,
  hasTemporaryPassword: true,
  email: true,
} satisfies Prisma.UserSelect;

export const selectVerifiedSignUpUser = {
  id: true,
  username: true,
  email: true,
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

export function whereVerifiedUser(id: string): Prisma.UserWhereUniqueInput {
  return { id };
}

// /* This is actually DRY-less.
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
  };
}
// ...But only currently. */
