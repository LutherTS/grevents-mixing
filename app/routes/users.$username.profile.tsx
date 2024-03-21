import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { ManyCriteria } from "~/components/many-criteria";
import { ManyUserQuestionFriendsPinned } from "~/components/many-userquestionfriends";
import { SignOutForm } from "~/components/sign-out-form";
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
import { defineContactRelCombo } from "~/utilities/contacts";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

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

  let relCombo;

  if (userToVerifiedUserContact) {
    relCombo = defineContactRelCombo(userToVerifiedUserContact);
  }

  let userQuestionFriendsAnswersPinnedByFriend;
  let userQuestionFriendsAnswersPinnedByFriendCount;
  let userPinnedNotIrlAnswersExposed;
  let userPinnedNotAndIrlAnswersExposed;
  let userUnpinnedNativeNotIrlAnswersExposed;
  let userUnpinnedPseudonativeNotIrlAnswersExposed;
  let userUnpinnedNativeIrlAnswersExposed;
  let userUnpinnedPseudonativeIrlAnswersExposed;
  let userUnpinnedSharedToContactCustomAnswersExposed;

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
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Profile.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        {data.verifiedUser.id === data.user.id ? (
          <></>
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
                    {data.relCombo === "none" && <></>}
                    {data.relCombo === "friend" &&
                      data.userToVerifiedUserContact && (
                        <>
                          <ManyUserQuestionFriendsPinned
                            userQuestionFriendsAnswers={
                              data.userQuestionFriendsAnswersPinnedByFriend
                            }
                            label="Find their pinned by you for friend criteria below"
                            notLabel="No pinned by you criteria yet."
                          />
                          <ManyCriteria
                            answers={data.userPinnedNotIrlAnswersExposed}
                            selectContext="Profile"
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their pinned for friend criteria below"
                            notLabel="No pinned criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          <ManyCriteria
                            answers={
                              data.userUnpinnedNativeNotIrlAnswersExposed
                            }
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their (other) native criteria below"
                            notLabel="No native criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          <ManyCriteria
                            answers={
                              data.userUnpinnedPseudonativeNotIrlAnswersExposed
                            }
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their (other) pseudonative criteria below"
                            notLabel="No pseudonative criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          {data.userUnpinnedSharedToContactCustomAnswersExposed &&
                            data.userUnpinnedSharedToContactCustomAnswersExposed
                              .length > 0 && (
                              <ManyCriteria
                                answers={
                                  data.userUnpinnedSharedToContactCustomAnswersExposed
                                }
                                selectContext="Profile"
                                answerComponentRequired="OneAnswerPinnableByFriend"
                                label="See their (other) custom answers shared to you below"
                                contact={data.userToVerifiedUserContact}
                                answersPinnedbyFriendAnswersCount={
                                  data.userQuestionFriendsAnswersPinnedByFriendCount
                                }
                              />
                            )}
                        </>
                      )}
                    {data.relCombo === "irl" &&
                      data.userToVerifiedUserContact && (
                        <>
                          <ManyUserQuestionFriendsPinned
                            userQuestionFriendsAnswers={
                              data.userQuestionFriendsAnswersPinnedByFriend
                            }
                            label="Find their pinned by you for irl criteria below"
                            notLabel="No pinned by you criteria yet."
                          />
                          <ManyCriteria
                            answers={data.userPinnedNotAndIrlAnswersExposed}
                            selectContext="Profile"
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their pinned for irl criteria below"
                            notLabel="No pinned criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          <ManyCriteria
                            answers={
                              data.userUnpinnedNativeNotIrlAnswersExposed
                            }
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their (other) native criteria below"
                            notLabel="No native criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          <ManyCriteria
                            answers={
                              data.userUnpinnedPseudonativeNotIrlAnswersExposed
                            }
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their (other) pseudonative criteria below"
                            notLabel="No pseudonative criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          <ManyCriteria
                            answers={data.userUnpinnedNativeIrlAnswersExposed}
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their (other) native irl criteria below"
                            notLabel="No native irl criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          <ManyCriteria
                            answers={
                              data.userUnpinnedPseudonativeIrlAnswersExposed
                            }
                            answerComponentRequired="OneAnswerPinnableByFriend"
                            label="Find their (other) pseudonative irl criteria below"
                            notLabel="No pseudonative irl criteria yet."
                            contact={data.userToVerifiedUserContact}
                            answersPinnedbyFriendAnswersCount={
                              data.userQuestionFriendsAnswersPinnedByFriendCount
                            }
                          />
                          {data.userUnpinnedSharedToContactCustomAnswersExposed &&
                            data.userUnpinnedSharedToContactCustomAnswersExposed
                              .length > 0 && (
                              <ManyCriteria
                                answers={
                                  data.userUnpinnedSharedToContactCustomAnswersExposed
                                }
                                selectContext="Profile"
                                answerComponentRequired="OneAnswerPinnableByFriend"
                                label="See their (other) custom answers shared to you below"
                                contact={data.userToVerifiedUserContact}
                                answersPinnedbyFriendAnswersCount={
                                  data.userQuestionFriendsAnswersPinnedByFriendCount
                                }
                              />
                            )}
                        </>
                      )}
                    {data.relCombo === "i-am-blocking" && <></>}
                    {data.relCombo === "has-me-blocked" && <></>}
                    {data.relCombo === "blocking-blocked" && <></>}
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
