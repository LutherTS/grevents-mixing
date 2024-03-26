import { Prisma } from "@prisma/client";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import {
  RelationCombinationBlockingBlockedExposed,
  RelationCombinationUserFriendExposed,
  RelationCombinationUserIrlExposed,
  RelationCombinationUserNoneExposed,
  RelationCombinationUserIsBlockedExposed,
  RelationCombinationUserIsBlockingExposed,
} from "~/components/relcombos-exposed";
import { SignOutForm } from "~/components/sign-out-form";
import { StatusOtherProfileToasts } from "~/components/status-other-profile-toasts";
import { StatusRelationshipToasts } from "~/components/status-relationship-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserPinnedNotAndIrlAnswersByUserIdExposed,
  findUserPinnedNotIrlAnswersByUserIdExposed,
  findUserUnpinnedNativeIrlAnswersByUserIdExposed,
  findUserUnpinnedNativeNotIrlAnswersByUserIdExposed,
  findUserUnpinnedPseudonativeIrlAnswersByUserIdExposed,
  findUserUnpinnedPseudonativeNotIrlAnswersByUserIdExposed,
  findUserUnpinnedSharedToContactCustomAnswersExposed,
} from "~/librairies/data/answers";
import { findContactByUserFirstIdAndUserLastId } from "~/librairies/data/contacts";
import {
  countUserQuestionFriendsAnswersPinnedByFriend,
  findUserQuestionFriendsAnswersPinnedByFriend,
} from "~/librairies/data/userquestionfriends";
import { findUserByUsername } from "~/librairies/data/users";
import { selectAnswers } from "~/librairies/subdata/answers";
import { selectContacts } from "~/librairies/subdata/contacts";
import {
  PINNED_BY_FRIEND_ANSWERS_LIMIT,
  selectUserQuestionFriendsAnswers,
} from "~/librairies/subdata/userquestionfriends";
import { selectUser, selectVerifiedUser } from "~/librairies/subdata/users";
import { defineContactRelCombo } from "~/utilities/contacts";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

type ProfileLoaderByHand = {
  // because TypeScript Union Types are once again failing.
  verifiedUser: Prisma.UserGetPayload<{
    select: typeof selectVerifiedUser;
  }>;
  user: Prisma.UserGetPayload<{
    select: typeof selectUser;
  }>;
  userToVerifiedUserContact?: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  relCombo?: string;
  userQuestionFriendsAnswersPinnedByFriend?: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>[];
  userPinnedNotIrlAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userPinnedNotAndIrlAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedNativeNotIrlAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedPseudonativeNotIrlAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedNativeIrlAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedPseudonativeIrlAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedSharedToContactCustomAnswersExposed?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userQuestionFriendsAnswersPinnedByFriendCount?: number;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const verifiedUser = await getVerifiedUser(request);
  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const userToVerifiedUserContact = await findContactByUserFirstIdAndUserLastId(
    user.id,
    verifiedUser.id
  );

  if (verifiedUser.id !== user.id && !userToVerifiedUserContact) {
    await updateUserStatusDashboardById(
      verifiedUser.id,
      "REDIRECTEDTODASHBOARD"
    );
    throw redirect(`/users/${verifiedUser.username}/dashboard`);
  }

  let relCombo;

  if (userToVerifiedUserContact) {
    relCombo = defineContactRelCombo(userToVerifiedUserContact);
  }

  let userQuestionFriendsAnswersPinnedByFriend;
  let userPinnedNotIrlAnswersExposed;
  let userPinnedNotAndIrlAnswersExposed;
  let userUnpinnedNativeNotIrlAnswersExposed;
  let userUnpinnedPseudonativeNotIrlAnswersExposed;
  let userUnpinnedNativeIrlAnswersExposed;
  let userUnpinnedPseudonativeIrlAnswersExposed;
  let userUnpinnedSharedToContactCustomAnswersExposed;
  let userQuestionFriendsAnswersPinnedByFriendCount; // honestly optional,
  // can be obtained by userQuestionFriendsAnswersPinnedByFriend.length

  if (userToVerifiedUserContact && relCombo === "friend") {
    [
      userQuestionFriendsAnswersPinnedByFriend,
      userPinnedNotIrlAnswersExposed,
      userUnpinnedNativeNotIrlAnswersExposed,
      userUnpinnedPseudonativeNotIrlAnswersExposed,
      userUnpinnedSharedToContactCustomAnswersExposed,
      userQuestionFriendsAnswersPinnedByFriendCount,
    ] = await Promise.all([
      findUserQuestionFriendsAnswersPinnedByFriend(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserPinnedNotIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedSharedToContactCustomAnswersExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      countUserQuestionFriendsAnswersPinnedByFriend(
        user.id,
        userToVerifiedUserContact.id
      ),
    ]);
    return json({
      verifiedUser,
      user,
      userToVerifiedUserContact,
      relCombo,
      userQuestionFriendsAnswersPinnedByFriend,
      userPinnedNotIrlAnswersExposed,
      userUnpinnedNativeNotIrlAnswersExposed,
      userUnpinnedPseudonativeNotIrlAnswersExposed,
      userUnpinnedSharedToContactCustomAnswersExposed,
      userQuestionFriendsAnswersPinnedByFriendCount,
    });
  } else if (userToVerifiedUserContact && relCombo === "irl") {
    [
      userQuestionFriendsAnswersPinnedByFriend,
      userPinnedNotAndIrlAnswersExposed,
      userUnpinnedNativeNotIrlAnswersExposed,
      userUnpinnedPseudonativeNotIrlAnswersExposed,
      userUnpinnedNativeIrlAnswersExposed,
      userUnpinnedPseudonativeIrlAnswersExposed,
      userUnpinnedSharedToContactCustomAnswersExposed,
      userQuestionFriendsAnswersPinnedByFriendCount,
    ] = await Promise.all([
      findUserQuestionFriendsAnswersPinnedByFriend(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserPinnedNotAndIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedNativeIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedPseudonativeIrlAnswersByUserIdExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      findUserUnpinnedSharedToContactCustomAnswersExposed(
        user.id,
        userToVerifiedUserContact.id
      ),
      countUserQuestionFriendsAnswersPinnedByFriend(
        user.id,
        userToVerifiedUserContact.id
      ),
    ]);
    return json({
      verifiedUser,
      user,
      userToVerifiedUserContact,
      relCombo,
      userQuestionFriendsAnswersPinnedByFriend,
      userPinnedNotAndIrlAnswersExposed,
      userUnpinnedNativeNotIrlAnswersExposed,
      userUnpinnedPseudonativeNotIrlAnswersExposed,
      userUnpinnedNativeIrlAnswersExposed,
      userUnpinnedPseudonativeIrlAnswersExposed,
      userUnpinnedSharedToContactCustomAnswersExposed,
      userQuestionFriendsAnswersPinnedByFriendCount,
    });
  } else {
    return json({
      verifiedUser,
      user,
      userToVerifiedUserContact,
      relCombo,
    });
  }
};

export default function ProfilePage() {
  const data: ProfileLoaderByHand = useLoaderData();
  console.log(data);

  return (
    <>
      {data.userToVerifiedUserContact && (
        <StatusOtherProfileToasts contact={data.userToVerifiedUserContact} />
      )}
      {data.userToVerifiedUserContact && (
        <StatusRelationshipToasts contact={data.userToVerifiedUserContact} />
      )}
      {typeof data.userQuestionFriendsAnswersPinnedByFriendCount === "number" &&
        data.userQuestionFriendsAnswersPinnedByFriendCount >=
          PINNED_BY_FRIEND_ANSWERS_LIMIT && (
          <p className="mb-2 cursor-default text-orange-500">
            You cannot pin more than {PINNED_BY_FRIEND_ANSWERS_LIMIT} of your
            friend&apos;s criteria.
          </p>
        )}
      <H1>Welcome to {data.user.appWideName}&apos;s Profile.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        {data.verifiedUser.id === data.user.id ? (
          <>
            <p className="mt-2">
              This is your profile page, the one where others can see the data
              you&apos;ve shared with them on a single URL, and eventually on
              more children paths as the application develops.
            </p>
            <div>
              <p className="mt-2">Your friend code is:</p>
              <p className="mt-2">{data.verifiedUser.friendCode}</p>
              <p className="mt-2">Share it with care.</p>
            </div>
          </>
        ) : (
          <>
            {data.verifiedUser.state === "DEACTIVATED" ? (
              <>
                <p className="mt-2">
                  You cannot see other users&apos; profiles while yours is
                  deactivated.
                </p>
              </>
            ) : (
              <>
                {data.user.state === "DEACTIVATED" ? (
                  <>
                    <p className="mt-2">
                      {data.user.username} has deactivated their profile.
                    </p>
                  </>
                ) : (
                  <>
                    {data.relCombo === "none" &&
                      data.userToVerifiedUserContact && (
                        <>
                          <RelationCombinationUserNoneExposed
                            contact={data.userToVerifiedUserContact}
                          />
                        </>
                      )}
                    {data.relCombo === "friend" &&
                      data.userToVerifiedUserContact &&
                      data.userQuestionFriendsAnswersPinnedByFriend &&
                      data.userPinnedNotIrlAnswersExposed &&
                      data.userUnpinnedNativeNotIrlAnswersExposed &&
                      data.userUnpinnedPseudonativeNotIrlAnswersExposed &&
                      data.userUnpinnedSharedToContactCustomAnswersExposed &&
                      typeof data.userQuestionFriendsAnswersPinnedByFriendCount ===
                        "number" && (
                        <>
                          <RelationCombinationUserFriendExposed
                            contact={data.userToVerifiedUserContact}
                            userQuestionFriendsAnswersPinnedByFriend={
                              data.userQuestionFriendsAnswersPinnedByFriend
                            }
                            pinnedNotIrlAnswersExposed={
                              data.userPinnedNotIrlAnswersExposed
                            }
                            unpinnedNativeNotIrlAnswersExposed={
                              data.userUnpinnedNativeNotIrlAnswersExposed
                            }
                            unpinnedPseudonativeNotIrlAnswersExposed={
                              data.userUnpinnedPseudonativeNotIrlAnswersExposed
                            }
                            unpinnedSharedToContactCustomAnswersExposed={
                              data.userUnpinnedSharedToContactCustomAnswersExposed
                            }
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                        </>
                      )}
                    {data.relCombo === "irl" &&
                      data.userToVerifiedUserContact &&
                      data.userQuestionFriendsAnswersPinnedByFriend &&
                      data.userPinnedNotAndIrlAnswersExposed &&
                      data.userUnpinnedNativeNotIrlAnswersExposed &&
                      data.userUnpinnedPseudonativeNotIrlAnswersExposed &&
                      data.userUnpinnedNativeIrlAnswersExposed &&
                      data.userUnpinnedPseudonativeIrlAnswersExposed &&
                      data.userUnpinnedSharedToContactCustomAnswersExposed &&
                      typeof data.userQuestionFriendsAnswersPinnedByFriendCount ===
                        "number" && (
                        <>
                          <RelationCombinationUserIrlExposed
                            contact={data.userToVerifiedUserContact}
                            userQuestionFriendsAnswersPinnedByFriend={
                              data.userQuestionFriendsAnswersPinnedByFriend
                            }
                            pinnedNotAndIrlAnswersExposed={
                              data.userPinnedNotAndIrlAnswersExposed
                            }
                            unpinnedNativeNotIrlAnswersExposed={
                              data.userUnpinnedNativeNotIrlAnswersExposed
                            }
                            unpinnedPseudonativeNotIrlAnswersExposed={
                              data.userUnpinnedPseudonativeNotIrlAnswersExposed
                            }
                            unpinnedNativeIrlAnswersExposed={
                              data.userUnpinnedNativeIrlAnswersExposed
                            }
                            unpinnedPseudonativeIrlAnswersExposed={
                              data.userUnpinnedPseudonativeIrlAnswersExposed
                            }
                            unpinnedSharedToContactCustomAnswersExposed={
                              data.userUnpinnedSharedToContactCustomAnswersExposed
                            }
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                        </>
                      )}
                    {data.relCombo === "i-am-blocking" &&
                      data.userToVerifiedUserContact && (
                        <>
                          <RelationCombinationUserIsBlockingExposed
                            contact={data.userToVerifiedUserContact}
                          />
                        </>
                      )}
                    {data.relCombo === "has-me-blocked" &&
                      data.userToVerifiedUserContact && (
                        <>
                          <RelationCombinationUserIsBlockedExposed
                            contact={data.userToVerifiedUserContact}
                          />
                        </>
                      )}
                    {data.relCombo === "blocking-blocked" &&
                      data.userToVerifiedUserContact && (
                        <>
                          <RelationCombinationBlockingBlockedExposed
                            contact={data.userToVerifiedUserContact}
                          />
                        </>
                      )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
