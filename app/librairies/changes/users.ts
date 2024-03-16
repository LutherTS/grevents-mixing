import { Prisma } from "@prisma/client";

import { prisma } from "~/utilities/server/db.server";

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
  const where: Prisma.UserWhereUniqueInput = { id };
  const data: Prisma.UserUpdateInput = {
    appWideName,
    statusDashboard: "APPWIDENAMEUPDATED",
  };

  return await prisma.user.update({
    where,
    data,
  });
}

export async function updateUserEmailByIdAndAnswerId(
  id: string,
  email: string,
  answerId: string
) {
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
    where,
    data,
  });
}
