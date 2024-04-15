import { Prisma } from "@prisma/client";

import { prisma } from "~/utilities/server/db.server";
import { selectVerifiedUser } from "../subdata/users";

// if statusTitle is undefined, resetUserStatusTitleById
export async function updateUserStatusTitleById(
  id: string,
  statusTitle?: string
) {
  const where: Prisma.UserWhereUniqueInput = { id };

  let data: Prisma.UserUpdateInput = { statusTitle: "NONE" };
  if (statusTitle) {
    data = { statusTitle };
  }

  return await prisma.user.update({
    where,
    data,
  });
}

// if statusDashboard is undefined, resetUserStatusDashboardById
export async function updateUserStatusDashboardById(
  id: string,
  statusDashboard?: string
) {
  const where: Prisma.UserWhereUniqueInput = { id };

  let data: Prisma.UserUpdateInput = { statusDashboard: "NONE" };
  if (statusDashboard) {
    data = { statusDashboard };
  }

  return await prisma.user.update({
    where,
    data,
  });
}

export async function updateUserAppWideNameById(
  id: string,
  appWideName: string
) {
  const select = selectVerifiedUser;
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUpdateInput = {
    appWideName,
    statusDashboard: "APPWIDENAMEUPDATED",
  };

  return await prisma.user.update({
    select,
    where,
    data,
  });
}

export async function updateUserEmailByIdAndAnswerId(
  id: string,
  email: string,
  answerId: string
) {
  const select = selectVerifiedUser;
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUpdateInput = {
    email,
    statusDashboard: "EMAILUPDATED",
    answers: {
      update: {
        data: {
          value: email,
        },
        where: {
          id: answerId,
        },
      },
    },
  };

  return await prisma.user.update({
    select,
    where,
    data,
  });
}

export async function updateUserFriendCodeById(id: string, friendCode: string) {
  const select = selectVerifiedUser;
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUpdateInput = {
    friendCode,
    statusDashboard: "FRIENDCODEUPDATED",
  };

  return await prisma.user.update({
    select,
    where,
    data,
  });
}

export async function updateDeactivateUserById(id: string) {
  const select = selectVerifiedUser;
  const where: Prisma.UserWhereUniqueInput = { id };

  let data: Prisma.UserUpdateInput = {
    state: "DEACTIVATED",
    statusDashboard: "NOWDEACTIVATED",
  };

  return await prisma.user.update({
    select,
    where,
    data,
  });
}

export async function updateReactivateUserById(id: string) {
  const select = selectVerifiedUser;
  const where: Prisma.UserWhereUniqueInput = { id };

  let data: Prisma.UserUpdateInput = {
    state: "LIVE",
    statusDashboard: "NOWREACTIVATED",
  };

  return await prisma.user.update({
    select,
    where,
    data,
  });
}

export async function updateUserPasswordById(
  id: string,
  hashedPassword: string
) {
  const select = selectVerifiedUser;
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUpdateInput = {
    hashedPassword,
    statusDashboard: "PASSWORDUPDATED",
  };

  return await prisma.user.update({
    select,
    where,
    data,
  });
}

// if statusPersonalInfo is undefined, resetUserStatusPersonalInfoById
export async function updateUserStatusPersonalInfoById(
  id: string,
  statusPersonalInfo?: string
) {
  const where: Prisma.UserWhereUniqueInput = { id };

  let data: Prisma.UserUpdateInput = { statusPersonalInfo: "NONE" };
  if (statusPersonalInfo) {
    data = { statusPersonalInfo };
  }

  return await prisma.user.update({
    where,
    data,
  });
}

export async function updatePinFriendbyUserIdAndContactId(
  id: string,
  pinnedFriendId: string
) {
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUncheckedUpdateInput = {
    pinnedFriendId,
    statusDashboard: "FRIENDPINNED",
  };

  return await prisma.user.update({
    where,
    data,
  });
}

export async function updateUnpinFriendbyUserId(id: string) {
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUncheckedUpdateInput = {
    pinnedFriendId: null,
    statusDashboard: "FRIENDUNPINNED",
  };

  return await prisma.user.update({
    where,
    data,
  });
}
