import { prisma } from "~/utilities/server/db.server";

// if statusTitle is undefined, resetUserStatusTitleById
export async function updateUserStatusTitleById(
  id: string,
  statusTitle?: string
) {
  const where = {
    id,
  };

  let data = {
    statusTitle: "NONE",
  };
  if (statusTitle) {
    data = {
      statusTitle,
    };
  }

  const select = {};

  return await prisma.user.update({
    where,
    data,
  });
}
