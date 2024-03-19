import { selectUser } from "~/librairies/subdata/users";
import { LinkButtonMockup } from "./link-button";
import { Prisma } from "@prisma/client";

export function RelationCombinationNonePreviewed() {
  return (
    <>
      <div>
        <LinkButtonMockup>Send friend request</LinkButtonMockup>
        <LinkButtonMockup>Block</LinkButtonMockup>
      </div>
    </>
  );
}

export function RelationCombinationIAmBlockingPreviewed({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: typeof selectUser;
  }>;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold text-red-500">
          YOU CAN NO LONGER ACCESS ANY OF THE INFORMATION OF{" "}
          {user.username.toUpperCase()} ACROSS THE ENTIRE APPLICATION, FUTURE
          COMMON GROUPS AND FUTURE COMMON EVENTS INCLUDED.
        </p>
        <LinkButtonMockup>Block them back</LinkButtonMockup>
      </div>
    </>
  );
}

export function RelationCombinationHasMeBlockedPreviewed({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: typeof selectUser;
  }>;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold">
          {user.username.toUpperCase()} CAN NO LONGER ACCESS ANY OF YOUR
          INFORMATION ACROSS THE ENTIRE APPLICATION, FUTURE COMMON GROUPS AND
          FUTURE COMMON EVENTS INCLUDED.
        </p>
        <LinkButtonMockup>Unblock</LinkButtonMockup>
      </div>
    </>
  );
}

export function RelationCombinationBlockingBlockedPreviewed({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: typeof selectUser;
  }>;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold text-red-500">
          <span className="text-black dark:text-white">
            YOU AND {user.username.toUpperCase()}
          </span>{" "}
          CAN NO LONGER ACCESS EACH OTHER&apos;S INFORMATION ACROSS THE ENTIRE
          APPLICATION, FUTURE COMMON GROUPS AND FUTURE COMMON EVENTS INCLUDED.
        </p>
        <LinkButtonMockup>Unblock if it&apos;s OK with you</LinkButtonMockup>
      </div>
    </>
  );
}
