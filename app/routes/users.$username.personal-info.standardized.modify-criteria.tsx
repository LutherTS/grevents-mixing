import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { ManyCriteria } from "~/components/many-criteria";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
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

  const [userNativeNotIrlAnswers, userNativeIrlAnswers] = await Promise.all([
    findUserNativeNotIrlAnswersByUserId(user.id),
    findUserNativeIrlAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    userNativeNotIrlAnswers,
    userNativeIrlAnswers,
  });
};

export default function ModifyCriteriaStandardizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Modify Criteria Standardized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyCriteria
          answers={data.userNativeNotIrlAnswers}
          answerComponentRequired="OneAnswerModify"
          label="Find your native criteria below"
          notLabel="No native criteria yet."
        />
        <ManyCriteria
          answers={data.userNativeIrlAnswers}
          answerComponentRequired="OneAnswerModify"
          label="Find your native irl criteria below"
          notLabel="No native irl criteria yet."
        />
      </div>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
