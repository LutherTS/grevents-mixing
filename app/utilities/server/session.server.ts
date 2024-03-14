import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

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

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "Grevents_Session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(
  verifiedUserId: string,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set("verifiedUserId", verifiedUserId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
