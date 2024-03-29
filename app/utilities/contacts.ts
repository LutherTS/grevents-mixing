import { Prisma } from "@prisma/client";

import { selectContacts } from "~/librairies/subdata/contacts";

export function decideContactRelCombo(
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>,
  relCombo: string
) {
  if (
    relCombo === "" &&
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === false &&
    contact.mirror.blocking === false
  ) {
    return "none";
  } else if (
    relCombo === "" &&
    contact &&
    contact.mirror &&
    contact.kind === "FRIEND" &&
    contact.mirror.kind === "FRIEND" &&
    contact.blocking === false &&
    contact.mirror.blocking === false
  ) {
    return "friend";
  } else if (
    relCombo === "" &&
    contact &&
    contact.mirror &&
    contact.kind === "IRL" &&
    contact.mirror.kind === "IRL" &&
    contact.blocking === false &&
    contact.mirror.blocking === false
  ) {
    return "irl";
  } else if (
    relCombo === "" &&
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === true &&
    contact.mirror.blocking === false
  ) {
    return "i-am-blocking";
  } else if (
    relCombo === "" &&
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === false &&
    contact.mirror.blocking === true
  ) {
    return "has-me-blocked";
  } else if (
    relCombo === "" &&
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === true &&
    contact.mirror.blocking === true
  ) {
    return "blocking-blocked";
  } else {
    return relCombo;
  }
}

export function defineContactRelCombo(
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>
) {
  if (
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === false &&
    contact.mirror.blocking === false
  ) {
    return "none";
  } else if (
    contact &&
    contact.mirror &&
    contact.kind === "FRIEND" &&
    contact.mirror.kind === "FRIEND" &&
    contact.blocking === false &&
    contact.mirror.blocking === false
  ) {
    return "friend";
  } else if (
    contact &&
    contact.mirror &&
    contact.kind === "IRL" &&
    contact.mirror.kind === "IRL" &&
    contact.blocking === false &&
    contact.mirror.blocking === false
  ) {
    return "irl";
  } else if (
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === true &&
    contact.mirror.blocking === false
  ) {
    return "i-am-blocking";
  } else if (
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === false &&
    contact.mirror.blocking === true
  ) {
    return "has-me-blocked";
  } else if (
    contact &&
    contact.mirror &&
    contact.kind === "NONE" &&
    contact.mirror.kind === "NONE" &&
    contact.blocking === true &&
    contact.mirror.blocking === true
  ) {
    return "blocking-blocked";
  } else {
    return "";
  }
}

export const relationCombinations = [
  "none",
  "friend",
  "irl",
  "i-am-blocking",
  "has-me-blocked",
  "blocking-blocked",
];

export type RelationCombination =
  | "none"
  | "friend"
  | "irl"
  | "i-am-blocking"
  | "has-me-blocked"
  | "blocking-blocked";
