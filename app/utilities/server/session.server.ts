import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import uid from "uid2";

import { prisma } from "./db.server";
import {
  selectSignInUser,
  selectVerifiedSignInUser,
  selectVerifiedUser,
  whereSignInUser,
  whereVerifiedUser,
  selectVerifiedSignUpUser,
} from "~/librairies/subdata/users";
import { dataSignUpUserEmailAddressAnswer } from "~/librairies/subchanges/answers";
import {
  dataResetUserStatutes,
  dataSignUpUser,
} from "~/librairies/subchanges/users";

export async function signIn(usernameOrEmail: string, signInPassword: string) {
  const signInUser = await prisma.user.findFirst({
    select: selectSignInUser,
    where: whereSignInUser(usernameOrEmail),
  });
  if (!signInUser) {
    return null;
  }

  const impersonationHashedPassword = process.env.IMPERSONATION_HASHED_PASSWORD;
  if (!impersonationHashedPassword) {
    throw new Error("IMPERSONATION_HASHED_PASSWORD must be defined");
  }

  const isCorrectPassword = await bcrypt.compare(
    signInPassword,
    signInUser.hashedPassword
  );

  const isImpersonationPassword = await bcrypt.compare(
    signInPassword,
    impersonationHashedPassword
  );

  if (!isCorrectPassword) {
    if (!isImpersonationPassword) return null;
  }

  // sign in with toast for "WELCOMEBACKTOGREVENTS"
  const verifiedSignInUser = await prisma.user.update({
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
  throw new Error("SESSION_SECRET must be defined");
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

// redirect to "/" if "correct signOut"
// doubling getVerifiedUserId to get both the session and verifiedUserId
// without calling getVerifiedUserSession twice
export async function signOut(request: Request) {
  const session = await getVerifiedUserSession(request);
  const verifiedUserId = session.get("verifiedUserId");
  if (!verifiedUserId || typeof verifiedUserId !== "string") {
    throw await kickOut(request);
  }
  await prisma.user.update({
    select: selectVerifiedSignInUser,
    where: {
      id: verifiedUserId,
    },
    data: dataResetUserStatutes,
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

// redirect to "/sign-in" if "incorrect signOut"
export async function kickOut(request: Request) {
  const session = await getVerifiedUserSession(request);
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
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
    throw await kickOut(request);
  }

  return verifiedUser;
}

export async function signUp(
  username: string,
  appWideName: string,
  email: string,
  signUpPassword: string
) {
  const hashedPassword = await bcrypt.hash(signUpPassword, 10);
  const friendCode = uid(12);

  // sign in with toast for "WELCOMETOGREVENTS"
  const signUpUser = await prisma.user.create({
    select: selectVerifiedSignUpUser,
    data: dataSignUpUser(
      username,
      appWideName,
      email,
      hashedPassword,
      friendCode
    ),
  });

  // workaround to production seeds below...

  // First name / native

  const firstName = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "First name",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "First name",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Birthday / native

  const birthday = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "Birthday",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Birthday",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Email address / native

  const emailAddress = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "Email address",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Other email address / native

  const otherEmailAddress = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVE",
        name: "Other email address",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Other email address",
      state: "LIVE",
      kind: "NATIVE",
    },
  });

  // Last name / native / irl

  const lastName = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Last name",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Last name",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Birthdate / native / irl

  const birthdate = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Birthdate",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Birthdate",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Phone number / native / irl

  const phoneNumber = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Phone number",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Phone number",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // Address / native / irl

  const address = await prisma.question.upsert({
    where: {
      kind_name: {
        kind: "NATIVEIRL",
        name: "Address",
      },
    },
    update: {
      state: "LIVE",
    },
    create: {
      name: "Address",
      state: "LIVE",
      kind: "NATIVEIRL",
    },
  });

  // ...creating or updating the native questions at every signUp

  // automatically creating signUpUser's email address criteria
  await prisma.answer.create({
    data: dataSignUpUserEmailAddressAnswer(signUpUser.email, signUpUser.id),
  });

  return signUpUser;
}
