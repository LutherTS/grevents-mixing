import { Prisma } from "@prisma/client";

import { selectUser } from "~/librairies/subdata/users";
import { selectAnswers } from "~/librairies/subdata/answers";
import { LinkButtonMockup } from "./link-button";
import { ManyCriteria } from "./many-criteria";

export function RelationCombinationNonePreviewed() {
  return (
    <>
      <div>
        <p className="mt-2">Nothing to see here...</p>
      </div>
    </>
  );
}

export function RelationCombinationFriendPreviewed({
  pinnedNotIrlAnswers,
  unpinnedNativeNotIrlAnswers,
  unpinnedPseudonativeNotIrlAnswers,
}: {
  pinnedNotIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedNativeNotIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedPseudonativeNotIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
}) {
  return (
    <>
      <ManyCriteria
        answers={pinnedNotIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their pinned for friend criteria below"
        notLabel="No pinned criteria yet."
      />
      <ManyCriteria
        answers={unpinnedNativeNotIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their (other) native criteria below"
        notLabel="No native criteria yet."
      />
      <ManyCriteria
        answers={unpinnedPseudonativeNotIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their (other) pseudonative criteria below"
        notLabel="No native irl criteria yet."
      />
    </>
  );
}

export function RelationCombinationIrlPreviewed({
  pinnedNotAndIrlAnswers,
  unpinnedNativeNotIrlAnswers,
  unpinnedPseudonativeNotIrlAnswers,
  unpinnedNativeIrlAnswers,
  unpinnedPseudonativeIrlAnswers,
}: {
  pinnedNotAndIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedNativeNotIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedPseudonativeNotIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedNativeIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedPseudonativeIrlAnswers: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
}) {
  return (
    <>
      <ManyCriteria
        answers={pinnedNotAndIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their pinned for irl criteria below"
        notLabel="No pinned criteria yet."
      />
      <ManyCriteria
        answers={unpinnedNativeNotIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their (other) native criteria below"
        notLabel="No native criteria yet."
      />
      <ManyCriteria
        answers={unpinnedPseudonativeNotIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their (other) pseudonative criteria below"
        notLabel="No native irl criteria yet."
      />
      <ManyCriteria
        answers={unpinnedNativeIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their (other) native irl criteria below"
        notLabel="No native criteria yet."
      />
      <ManyCriteria
        answers={unpinnedPseudonativeIrlAnswers}
        answerComponentRequired="OneAnswer"
        label="Find their (other) pseudonative irl criteria below"
        notLabel="No native irl criteria yet."
      />
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
      </div>
    </>
  );
}
