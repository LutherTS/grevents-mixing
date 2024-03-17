import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserPinnedNotIrlAnswersByUserIdQueried,
  findUserUnpinnedNativeNotIrlAnswersByUserId,
  findUserUnpinnedPseudonativeNotIrlAnswersByUserId,
  findUserUnpinnedSharedToContactCustomAnswersQueried,
  findUserPinnedNotAndIrlAnswersByUserIdQueried,
  findUserUnpinnedNativeIrlAnswersByUserId,
  findUserUnpinnedPseudonativeIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findContactByUserFirstIdAndUserLastUsername } from "~/librairies/data/contacts";
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

  if (verifiedUser.id !== user.id) {
    await updateUserStatusDashboardById(
      verifiedUser.id,
      "REDIRECTEDTODASHBOARD"
    );
    throw redirect(`/users/${verifiedUser.username}/dashboard`);
  }

  const url = new URL(request.url);
  const userLast = url.searchParams.get("userlast") || "";
  let relCombo = url.searchParams.get("relcombo") || "";

  const userToQueriedContact =
    await findContactByUserFirstIdAndUserLastUsername(user.id, userLast);

  if (userToQueriedContact && relCombo === "") {
    relCombo = defineContactRelCombo(userToQueriedContact, relCombo);
  }

  let userPinnedNotIrlAnswersQueried;
  let userPinnedNotAndIrlAnswersQueried;
  let userUnpinnedNativeNotIrlAnswers;
  let userUnpinnedPseudonativeNotIrlAnswers;
  let userUnpinnedNativeIrlAnswers;
  let userUnpinnedPseudonativeIrlAnswers;
  let userUnpinnedSharedToContactCustomAnswers;

  if (userToQueriedContact && relCombo === "friend") {
    [
      userPinnedNotIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    ] = await Promise.all([
      findUserPinnedNotIrlAnswersByUserIdQueried(
        user.id,
        userToQueriedContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedSharedToContactCustomAnswersQueried(
        user.id,
        userToQueriedContact.id
      ),
    ]);
    return json({
      verifiedUser,
      user,
      userToQueriedContact,
      userLast,
      relCombo,
      userPinnedNotIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    });
  } else if (userToQueriedContact && relCombo === "irl") {
    [
      userPinnedNotAndIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedNativeIrlAnswers,
      userUnpinnedPseudonativeIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    ] = await Promise.all([
      findUserPinnedNotAndIrlAnswersByUserIdQueried(
        user.id,
        userToQueriedContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedNativeIrlAnswersByUserId(user.id),
      findUserUnpinnedPseudonativeIrlAnswersByUserId(user.id),
      findUserUnpinnedSharedToContactCustomAnswersQueried(
        user.id,
        userToQueriedContact.id
      ),
    ]);
    return json({
      verifiedUser,
      user,
      userToQueriedContact,
      userLast,
      relCombo,
      userPinnedNotAndIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedNativeIrlAnswers,
      userUnpinnedPseudonativeIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    });
  } else {
    return json({
      verifiedUser,
      user,
      userToQueriedContact,
      userLast,
      relCombo,
    });
  }
};

export default function QueriedPreviewPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  /* For eventual use
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  */

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Queried Previews.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <PageLink href={`..`}>To Previews</PageLink>
      <PageLink href={`../../profile`}>To Your Profile</PageLink>
    </>
  );
}
