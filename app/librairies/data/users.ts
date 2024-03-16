import { prisma } from "~/utilities/server/db.server";
import {
  selectSignInUser,
  selectUser,
  whereUserByUsername,
  whereVerifiedUser,
} from "../subdata/users";

export async function findUserByUsername(username: string) {
  const select = selectUser;
  const where = whereUserByUsername(username);

  return await prisma.user.findUnique({
    select,
    where,
  });
}

export async function findPasswordUserById(id: string) {
  const select = selectSignInUser;
  const where = whereVerifiedUser(id);

  return await prisma.user.findUnique({
    select,
    where,
  });
}
