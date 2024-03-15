import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import uid from "uid2";

import { prisma } from "./db.server";
import {
  selectSignInUser,
  selectVerifiedSignInUser,
  selectVerifiedUser,
  whereSignInUser,
  whereVerifiedUser,
  dataSignUpUser,
  selectVerifiedSignUpUser,
} from "~/librairies/subdata/users";
import { dataSignUpUserEmailAddressAnswer } from "~/librairies/subdata/answers";

export async function signIn(usernameOrEmail: string, signinpassword: string) {
  const signInUser = await prisma.user.findFirst({
    select: selectSignInUser,
    where: whereSignInUser(usernameOrEmail),
  });
  if (!signInUser) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(
    signinpassword,
    signInUser.hashedPassword
  );
  if (!isCorrectPassword) {
    return null;
  }

  // MISSING: update statusTitle WELCOMEBACKTOGREVENTS
  const verifiedSignInUser =
    // await prisma.user.findFirst({
    //   select: selectVerifiedSignInUser,
    //   where: whereSignInUser(usernameOrEmail),
    // });
    await prisma.user.update({
      select: selectVerifiedSignInUser,
      where: {
        id: signInUser.id,
      },
      data: {
        statusTitle: "WELCOMEBACKTOGREVENTS",
      },
    });
  if (!verifiedSignInUser) {
    return null;
  }

  return verifiedSignInUser;
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

export async function createVerifiedUserSession(
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

//

function getVerifiedUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getVerifiedUserId(request: Request) {
  const session = await getVerifiedUserSession(request);
  const verifiedUserId = session.get("verifiedUserId");
  if (!verifiedUserId || typeof verifiedUserId !== "string") {
    return null;
  }
  return verifiedUserId;
}

export async function signOut(request: Request) {
  const session = await getVerifiedUserSession(request);
  // MISSING: update all statuses to NONE
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
  // PLUS:
  // redirect to "/" if "correct signOut",
  // redirect to "/sign-in" if "incorrect signOut"
}

export async function getVerifiedUser(request: Request) {
  const verifiedUserId = await getVerifiedUserId(request);
  if (typeof verifiedUserId !== "string") {
    return null;
  }

  const verifiedUser = await prisma.user.findUnique({
    select: selectVerifiedUser,
    where: whereVerifiedUser(verifiedUserId),
  });

  if (!verifiedUser) {
    throw await signOut(request);
  }

  return verifiedUser;
}

export async function signUp(
  username: string,
  appWideName: string,
  email: string,
  signUpPassword: string,
  confirmPassword: string
) {
  if (signUpPassword !== confirmPassword) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(signUpPassword, 10);
  const friendCode = uid(12);

  const signUpUser = await prisma.user.create({
    select: selectVerifiedSignUpUser,
    data: dataSignUpUser(
      username,
      appWideName,
      email,
      hashedPassword,
      friendCode
    ),
    // MISSING: statusTitle WELCOMETOGREVENTS
  });

  // automatically creating signUpUser's email address criteria
  await prisma.answer.create({
    data: dataSignUpUserEmailAddressAnswer(signUpUser.email, signUpUser.id),
  });

  return signUpUser;
}

/*
export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getVerifiedUserSession(request);
  const userId = session.get("verifiedUserId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}
*/
