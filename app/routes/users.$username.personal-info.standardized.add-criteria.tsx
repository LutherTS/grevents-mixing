import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import {
  NativeIrlAnswerForm,
  NativeNotIrlAnswerForm,
} from "~/components/answer-forms";
import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserNativeIrlAnswersByUserId,
  countUserNativeNotIrlAnswersByUserId,
} from "~/librairies/data/answers";
import {
  findUnansweredNativeIrlQuestionsByUserId,
  findUnansweredNativeNotIrlQuestionsByUserId,
} from "~/librairies/data/questions";
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
    unansweredNativeNotIrlQuestions,
    unansweredNativeIrlQuestions,
    userNativeNotIrlAnswersCount,
    userNativeIrlAnswersCount,
  ] = await Promise.all([
    findUnansweredNativeNotIrlQuestionsByUserId(user.id),
    findUnansweredNativeIrlQuestionsByUserId(user.id),
    countUserNativeNotIrlAnswersByUserId(user.id),
    countUserNativeIrlAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    unansweredNativeNotIrlQuestions,
    unansweredNativeIrlQuestions,
    userNativeNotIrlAnswersCount,
    userNativeIrlAnswersCount,
  });
};

export default function AddCriteriaStandardizedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Add Criteria Standardized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <NativeNotIrlAnswerForm
          answerCount={data.userNativeNotIrlAnswersCount}
          nativeQuestions={data.unansweredNativeNotIrlQuestions}
        />
        <NativeIrlAnswerForm
          answerCount={data.userNativeIrlAnswersCount}
          nativeQuestions={data.unansweredNativeIrlQuestions}
        />
      </div>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
