import { Prisma } from "@prisma/client";

import { ManyCriteria } from "./many-criteria";
import { ManyUserQuestionFriendsPinned } from "./many-userquestionfriends";
import { selectUserQuestionFriendsAnswers } from "~/librairies/subdata/userquestionfriends";
import { selectAnswers } from "~/librairies/subdata/answers";
import { selectContacts } from "~/librairies/subdata/contacts";

// export function RelationCombinationNoneExposed() {

export function RelationCombinationFriendExposed({
  contact,
  userQuestionFriendsAnswersPinnedByFriend,
  pinnedNotIrlAnswersExposed,
  unpinnedNativeNotIrlAnswersExposed,
  unpinnedPseudonativeNotIrlAnswersExposed,
  unpinnedSharedToContactCustomAnswersExposed,
  answersPinnedbyFriendAnswersCount,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  userQuestionFriendsAnswersPinnedByFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>[];
  pinnedNotIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedNativeNotIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedPseudonativeNotIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedSharedToContactCustomAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  answersPinnedbyFriendAnswersCount: number;
}) {
  return (
    <>
      <ManyUserQuestionFriendsPinned
        userQuestionFriendsAnswers={userQuestionFriendsAnswersPinnedByFriend}
        label="Find their pinned by you for friend criteria below"
        notLabel="No pinned by you criteria yet."
      />
      <ManyCriteria
        answers={pinnedNotIrlAnswersExposed}
        selectContext="Profile"
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their pinned for friend criteria below"
        notLabel="No pinned criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      <ManyCriteria
        answers={unpinnedNativeNotIrlAnswersExposed}
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their (other) native criteria below"
        notLabel="No native criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      <ManyCriteria
        answers={unpinnedPseudonativeNotIrlAnswersExposed}
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their (other) pseudonative criteria below"
        notLabel="No pseudonative criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      {unpinnedSharedToContactCustomAnswersExposed.length > 0 && (
        <ManyCriteria
          answers={unpinnedSharedToContactCustomAnswersExposed}
          selectContext="Profile"
          answerComponentRequired="OneAnswerPinnableByFriend"
          label="See their (other) custom answers shared to you below"
          contact={contact}
          answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
        />
      )}
    </>
  );
}

// export function RelationCombinationIrlExposed({

export function RelationCombinationIrlExposed({
  contact,
  userQuestionFriendsAnswersPinnedByFriend,
  pinnedNotAndIrlAnswersExposed,
  unpinnedNativeNotIrlAnswersExposed,
  unpinnedPseudonativeNotIrlAnswersExposed,
  unpinnedNativeIrlAnswersExposed,
  unpinnedPseudonativeIrlAnswersExposed,
  unpinnedSharedToContactCustomAnswersExposed,
  answersPinnedbyFriendAnswersCount,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  userQuestionFriendsAnswersPinnedByFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>[];
  pinnedNotAndIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedNativeNotIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedPseudonativeNotIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedNativeIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedPseudonativeIrlAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  unpinnedSharedToContactCustomAnswersExposed: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  answersPinnedbyFriendAnswersCount: number;
}) {
  return (
    <>
      <ManyUserQuestionFriendsPinned
        userQuestionFriendsAnswers={userQuestionFriendsAnswersPinnedByFriend}
        label="Find their pinned by you for irl criteria below"
        notLabel="No pinned by you criteria yet."
      />
      <ManyCriteria
        answers={pinnedNotAndIrlAnswersExposed}
        selectContext="Profile"
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their pinned for irl criteria below"
        notLabel="No pinned criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      <ManyCriteria
        answers={unpinnedNativeNotIrlAnswersExposed}
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their (other) native criteria below"
        notLabel="No native criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      <ManyCriteria
        answers={unpinnedPseudonativeNotIrlAnswersExposed}
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their (other) pseudonative criteria below"
        notLabel="No pseudonative criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      <ManyCriteria
        answers={unpinnedNativeIrlAnswersExposed}
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their (other) native irl criteria below"
        notLabel="No native irl criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      <ManyCriteria
        answers={unpinnedPseudonativeIrlAnswersExposed}
        answerComponentRequired="OneAnswerPinnableByFriend"
        label="Find their (other) pseudonative irl criteria below"
        notLabel="No pseudonative irl criteria yet."
        contact={contact}
        answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
      />
      {unpinnedSharedToContactCustomAnswersExposed.length > 0 && (
        <ManyCriteria
          answers={unpinnedSharedToContactCustomAnswersExposed}
          selectContext="Profile"
          answerComponentRequired="OneAnswerPinnableByFriend"
          label="See their (other) custom answers shared to you below"
          contact={contact}
          answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
        />
      )}
    </>
  );
}

// export function RelationCombinationIAmBlockingExposed({

// export function RelationCombinationHasMeBlockedExposed({

// export function RelationCombinationBlockingBlockedExposed({
