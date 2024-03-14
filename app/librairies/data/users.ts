import { prisma } from "~/utilities/server/db.server";
import { selectUser, whereUserByUsername } from "../subdata/users";

export async function findUserByUsername(username: string) {
  const select = selectUser;
  const where = whereUserByUsername(username);

  return await prisma.user.findUnique({
    select,
    where,
  });
}
