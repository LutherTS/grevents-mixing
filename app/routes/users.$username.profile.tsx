import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
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
import { findUserQuestionFriendsAnswersPinnedByFriend } from "~/librairies/data/userquestionfriends";
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
    ]);
    return json({
      verifiedUser,
      user,
      userToVerifiedUserContact,
      userQuestionFriendsAnswersPinnedByFriend,
      userPinnedNotIrlAnswersExposed,
      userUnpinnedNativeNotIrlAnswersExposed,
      userUnpinnedPseudonativeNotIrlAnswersExposed,
      userUnpinnedSharedToContactCustomAnswersExposed,
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
    ]);
    return json({
      verifiedUser,
      user,
      userToVerifiedUserContact,
      userQuestionFriendsAnswersPinnedByFriend,
      userPinnedNotAndIrlAnswersExposed,
      userUnpinnedNativeNotIrlAnswersExposed,
      userUnpinnedPseudonativeNotIrlAnswersExposed,
      userUnpinnedNativeIrlAnswersExposed,
      userUnpinnedPseudonativeIrlAnswersExposed,
      userUnpinnedSharedToContactCustomAnswersExposed,
    });
  } else {
    return json({
      verifiedUser,
      user,
      userToVerifiedUserContact,
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
    </>
  );
}
