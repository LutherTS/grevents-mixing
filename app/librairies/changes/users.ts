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
