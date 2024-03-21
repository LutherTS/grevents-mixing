import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { ManyCriteria } from "./many-criteria";
import { ManyUserQuestionFriendsPinned } from "./many-userquestionfriends";
import { selectUserQuestionFriendsAnswers } from "~/librairies/subdata/userquestionfriends";
import { selectAnswers } from "~/librairies/subdata/answers";
import { selectContacts } from "~/librairies/subdata/contacts";
import { LinkButton } from "./link-button";
import { PageLink } from "./page-link";

// contact. c'est user
// contact.mirror c'est verifiedUser

export function RelationCombinationUserNoneExposed({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      <p className="mt-2">Nothing to see here...</p>
      <div>
        {contact.mirror?.processRelationship === "SENTFRIEND" && (
          <>
            <AnnulFriendForm contact={contact} />
          </>
        )}
        {contact.mirror?.processRelationship === "ANNULFRIEND" && (
          <>
            <p className="mt-2 text-gray-500 line-through">
              Send friend request
            </p>
          </>
        )}
        {contact.processRelationship === "SENTFRIEND" && (
          <>
            <p className="mt-2">
              <AcceptFriendForm contact={contact} />
              &nbsp;/&nbsp;
              <DeclineFriendForm contact={contact} />
            </p>
          </>
        )}
        {contact.mirror?.processRelationship !== "SENTFRIEND" &&
          contact.mirror?.processRelationship !== "ANNULFRIEND" &&
          contact.processRelationship !== "SENTFRIEND" && (
            <>
              <SendFriendForm contact={contact} />
            </>
          )}
        {contact.mirror?.processRelationship !== "SENTFRIEND" && (
          <>
            <BlockForm contact={contact} />
          </>
        )}
      </div>
      <div>
        {contact.mirror?.processRelationship === "SENTFRIEND" && (
          <>
            <p className="mt-2 text-orange-500">
              Friend request sent and pending. However, do take into
              consideration that canceling your friend request to{" "}
              {contact.userFirst.appWideName} will prevent you from sending{" "}
              {contact.userFirst.appWideName} another friend request at this
              time.
            </p>
          </>
        )}
        {contact.mirror?.processRelationship === "ANNULFRIEND" && (
          <>
            <p className="mt-2 text-red-500">
              As a consequence of you annulling your friend request sent to{" "}
              {contact.userFirst.appWideName}, to prevent mass requesting you
              cannot send {contact.userFirst.appWideName} another friend request
              at this time.
            </p>
          </>
        )}
        {contact.processRelationship === "SENTFRIEND" && (
          <>
            <p className="mt-2 text-orange-500">
              {contact.userFirst.appWideName} has sent you a friend request. By
              accepting this request, {contact.userFirst.appWideName} will have
              access to all of your native criteria, present and future, and you
              will have access to all the native criteria of{" "}
              {contact.userFirst.appWideName}, present and future all the same.
              Irl native criteria, however, will require upgrading your
              friendship for shared access between the two of you.
            </p>
            <PageLink
              href={`/users/${contact.mirror?.userFirst.username}/previews/queried?userlast=${contact.userFirst.username}&relcombo=friend`}
            >
              Preview the criteria you&apos;ll give access to{" "}
              {contact.userFirst.appWideName}
            </PageLink>
          </>
        )}
        {contact.processRelationship === "ANNULFRIEND" && (
          <>
            <p className="mt-2 text-neutral-500">
              (Just letting you know that {contact.userFirst.appWideName} has
              annulled a friend request, so you&apos;re the only one between the
              two of you who can initiate a friend request at this time.)
            </p>
          </>
        )}
      </div>
    </>
  );
}

// Because contact will be shared via hidden input, like a bind.
function ProfileForm({
  contact,
  action,
  children,
  specifiedClasses,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  action: string;
  children: React.ReactNode;
  specifiedClasses?: string;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action={action}
        method="post"
        className={specifiedClasses ? specifiedClasses : "mt-2"}
      >
        <LinkButton disabled={fetcher.state !== "idle"}>{children}</LinkButton>
      </fetcher.Form>
    </>
  );
}

function SendFriendForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/send-friend-request">
        Send friend request
      </ProfileForm>
    </>
  );
}

function BlockForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/block">
        Block
      </ProfileForm>
    </>
  );
}

function AnnulFriendForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/annul-friend-request">
        Annul friend request
      </ProfileForm>
    </>
  );
}

function AcceptFriendForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm
        contact={contact}
        action="/accept-friend-request"
        specifiedClasses="inline"
      >
        Accept
      </ProfileForm>
    </>
  );
}

function DeclineFriendForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm
        contact={contact}
        action="/decline-friend-request"
        specifiedClasses="inline"
      >
        Decline
      </ProfileForm>
    </>
  );
}

export function RelationCombinationUserFriendExposed({
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
      {/* pt-2 as makeshift styling */}
      <div className="pt-2">
        <ManyUserQuestionFriendsPinned
          userQuestionFriendsAnswers={userQuestionFriendsAnswersPinnedByFriend}
          label="Find their pinned by you for friend criteria below"
          notLabel="No pinned by you criteria yet."
        />
      </div>
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
      {/* pt-2 as makeshift styling */}
      <div className="pt-2">
        {contact.mirror?.processRelationship === "SENTIRL" && (
          <>
            <AnnulIrlForm contact={contact} />
          </>
        )}
        {contact.mirror?.processRelationship === "ANNULIRL" && (
          <>
            <p className="mt-2 text-gray-500 line-through">
              Upgrade friendship to irl
            </p>
          </>
        )}
        {contact.processRelationship === "SENTIRL" && (
          <>
            <p className="mt-2">
              <AcceptIrlForm contact={contact} />
              &nbsp;/&nbsp;
              <DeclineIrlForm contact={contact} />
            </p>
          </>
        )}
        {contact.mirror?.processRelationship !== "SENTIRL" &&
          contact.mirror?.processRelationship !== "ANNULIRL" &&
          contact.processRelationship !== "SENTIRL" && (
            <>
              <UpgradeToIrlForm contact={contact} />
            </>
          )}
        {contact.mirror?.processRelationship !== "SENTIRL" && (
          <>
            <UnfriendForm contact={contact} />
          </>
        )}
      </div>
      <div>
        {contact.mirror?.processRelationship === "SENTIRL" && (
          <>
            <p className="mt-2 text-orange-500">
              Irl upgrade request sent and pending. However, do take into
              consideration that canceling your irl upgrade request to{" "}
              {contact.userFirst.appWideName} will prevent you from sending{" "}
              {contact.userFirst.appWideName} another irl upgrade request at
              this time.
            </p>
          </>
        )}
        {contact.mirror?.processRelationship === "ANNULIRL" && (
          <>
            <p className="mt-2 text-red-500">
              As a consequence of you annulling your irl upgrade request sent to{" "}
              {contact.userFirst.appWideName}, to prevent mass requesting you
              cannot send {contact.userFirst.appWideName} another irl upgrade
              request at this time.
            </p>
          </>
        )}
        {contact.processRelationship === "SENTIRL" && (
          <>
            <p className="mt-2 text-orange-500">
              {contact.userFirst.appWideName} has sent you an irl upgrade
              request. By accepting this request,{" "}
              {contact.userFirst.appWideName} will have additional access to all
              of your irl native criteria (such as Last name and Address),
              present and future, and you will have access to all the irl native
              criteria of {contact.userFirst.appWideName}, present and future
              all the same. Once this friendship is upgraded, you can downgrade
              this friendship from irl with a click at your own discretion
              without requiring the consent of {contact.userFirst.appWideName},
              so accepting this irl upgrade request is easily reversible.
            </p>
            <PageLink
              href={`/users/${contact.mirror?.userFirst.username}/previews/queried?userlast=${contact.userFirst.username}&relcombo=irl`}
            >
              Preview the criteria you&apos;ll give access to{" "}
              {contact.userFirst.appWideName}
            </PageLink>
          </>
        )}
        {contact.processRelationship === "ANNULIRL" && (
          <>
            <p className="mt-2 text-neutral-500">
              (Just letting you know that {contact.userFirst.appWideName} has
              annulled an irl upgrade request, so you&apos;re the only one
              between the two of you who can initiate an irl upgrade request at
              this time.)
            </p>
          </>
        )}
      </div>
    </>
  );
}

function UpgradeToIrlForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/send-irl-request">
        Upgrade friendship to irl
      </ProfileForm>
    </>
  );
}

function UnfriendForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/unfriend">
        Unfriend
      </ProfileForm>
    </>
  );
}

function AnnulIrlForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/annul-irl-request">
        Annul irl upgrade request
      </ProfileForm>
    </>
  );
}

function AcceptIrlForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm
        contact={contact}
        action="/accept-irl-request"
        specifiedClasses="inline"
      >
        Accept
      </ProfileForm>
    </>
  );
}

function DeclineIrlForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm
        contact={contact}
        action="/decline-irl-request"
        specifiedClasses="inline"
      >
        Decline
      </ProfileForm>
    </>
  );
}

export function RelationCombinationUserIrlExposed({
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
      {/* pt-2 as makeshift styling */}
      <div className="pt-2">
        <ManyUserQuestionFriendsPinned
          userQuestionFriendsAnswers={userQuestionFriendsAnswersPinnedByFriend}
          label="Find their pinned by you for irl criteria below"
          notLabel="No pinned by you criteria yet."
        />
      </div>
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
      {/* pt-2 as makeshift styling */}
      <div className="pt-2">
        <DowngradeFriendshipFromIrlForm contact={contact} />
        <UnfriendForm contact={contact} />
      </div>
    </>
  );
}

function DowngradeFriendshipFromIrlForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/downgrade-from-irl">
        Downgrade friendship from irl
      </ProfileForm>
    </>
  );
}

export function RelationCombinationUserIsBlockingExposed({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      <p className="mt-2 font-semibold text-red-500">
        YOU CAN NO LONGER ACCESS ANY OF THE INFORMATION OF{" "}
        {contact.userFirst.username.toUpperCase()} ACROSS THE ENTIRE
        APPLICATION, FUTURE COMMON GROUPS AND FUTURE COMMON EVENTS INCLUDED.
      </p>
      <BlockBackForm contact={contact} />
    </>
  );
}

function BlockBackForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/block">
        Block back
      </ProfileForm>
    </>
  );
}

export function RelationCombinationUserIsBlockedExposed({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      <p className="mt-2 font-semibold">
        {contact.userFirst.username.toUpperCase()} CAN NO LONGER ACCESS ANY OF
        YOUR INFORMATION ACROSS THE ENTIRE APPLICATION, FUTURE COMMON GROUPS AND
        FUTURE COMMON EVENTS INCLUDED.
      </p>
      <UnblockForm contact={contact} />
    </>
  );
}

function UnblockForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/unblock">
        Unblock
      </ProfileForm>
    </>
  );
}

export function RelationCombinationBlockingBlockedExposed({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      <p className="mt-2 font-semibold text-red-500">
        <span className="text-black dark:text-white">
          YOU AND {contact.userFirst.username.toUpperCase()}
        </span>{" "}
        CAN NO LONGER ACCESS EACH OTHER&apos;S INFORMATION ACROSS THE ENTIRE
        APPLICATION, FUTURE COMMON GROUPS AND FUTURE COMMON EVENTS INCLUDED.
      </p>
      <UnblockIfThatsOKWithYouForm contact={contact} />
    </>
  );
}

function UnblockIfThatsOKWithYouForm({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <ProfileForm contact={contact} action="/unblock">
        Unblock if that&apos;s OK with you
      </ProfileForm>
    </>
  );
}
