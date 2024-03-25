import { Prisma } from "@prisma/client";
import { prisma } from "~/utilities/server/db.server";

// if statusOtherProfile is undefined, resetContactStatusOtherProfileById
export async function updateContactStatusOtherProfileById(
  id: string,
  statusOtherProfile?: string
) {
  const where: Prisma.ContactWhereUniqueInput = { id };

  let data: Prisma.ContactUpdateInput = { statusOtherProfile: "NONE" };
  if (statusOtherProfile) {
    data = { statusOtherProfile };
  }

  return await prisma.contact.update({
    where,
    data,
  });
}
