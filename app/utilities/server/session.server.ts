import bcrypt from "bcryptjs";

import { prisma } from "./db.server";
import {
  selectSignInUser,
  selectVerifiedSignInUser,
  whereSignInUser,
} from "~/librairies/subdata/users";

export async function signIn(usernameOrEmail: string, password: string) {
  const signInUser = await prisma.user.findFirst({
    select: selectSignInUser,
    where: whereSignInUser(usernameOrEmail),
  });
  if (!signInUser) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    signInUser.hashedPassword
  );
  if (!isCorrectPassword) {
    return null;
  }

  const verifiedSignInUser = await prisma.user.findFirst({
    select: selectVerifiedSignInUser,
    where: whereSignInUser(usernameOrEmail),
  });
  if (!verifiedSignInUser) {
    return null;
  }

  return { verifiedSignInUser };
}
