import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserNativeIrlAnswersByUserId,
  countUserNativeNotIrlAnswersByUserId,
  countUserPinnedAnswersByUserId,
  findUserNativeIrlAnswersByUserId,
  findUserNativeNotIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findUserByUsername } from "~/librairies/data/users";
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

  const [
    userPinnedAnswerCount,
    userNativeNotIrlAnswers,
    userNativeNotIrlAnswersCount,
    userNativeIrlAnswers,
    userNativeIrlAnswersCount,
  ] = await Promise.all([
    countUserPinnedAnswersByUserId(user.id),
    findUserNativeNotIrlAnswersByUserId(user.id),
    countUserNativeNotIrlAnswersByUserId(user.id),
    findUserNativeIrlAnswersByUserId(user.id),
    countUserNativeIrlAnswersByUserId(user.id),
  ]);

  return {
    verifiedUser,
    user,
    userPinnedAnswerCount,
    userNativeNotIrlAnswers,
    userNativeNotIrlAnswersCount,
    userNativeIrlAnswers,
    userNativeIrlAnswersCount,
  };
};

export default function PersonalInfoStandardizedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Personal Info Standardized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <PageLink href={`modify-criteria`}>Modify</PageLink>
      <PageLink href={`add-criteria`}>Add standardized criteria</PageLink>
      <PageLink href={`..`}>To Personal Info</PageLink>
      <PageLink href={`../customized`}>To Customized criteria</PageLink>
    </>
  );
}
