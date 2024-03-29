import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { ManyCriteria } from "~/components/many-criteria";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { StatusPersonalInfoCustomizedToasts } from "~/components/status-personal-info-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserCustomAnswersByUserId,
  countUserPinnedAnswersByUserId,
  countUserPseudonativeIrlAnswersByUserId,
  countUserPseudonativeNotIrlAnswersByUserId,
  findUserCustomAnswersByUserId,
  findUserPseudonativeIrlAnswersByUserId,
  findUserPseudonativeNotIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findUserByUsername } from "~/librairies/data/users";
import {
  DEFAULT_ANSWERS_LIMIT,
  PINNED_BY_USER_ANSWERS_LIMIT,
} from "~/librairies/subdata/answers";
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
    userPseudonativeNotIrlAnswers,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswers,
    userPseudonativeIrlAnswersCount,
    userCustomAnswers,
    userCustomAnswersCount,
  ] = await Promise.all([
    countUserPinnedAnswersByUserId(user.id),
    findUserPseudonativeNotIrlAnswersByUserId(user.id),
    countUserPseudonativeNotIrlAnswersByUserId(user.id),
    findUserPseudonativeIrlAnswersByUserId(user.id),
    countUserPseudonativeIrlAnswersByUserId(user.id),
    findUserCustomAnswersByUserId(user.id),
    countUserCustomAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    userPinnedAnswerCount,
    userPseudonativeNotIrlAnswers,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswers,
    userPseudonativeIrlAnswersCount,
    userCustomAnswers,
    userCustomAnswersCount,
  });
};

export default function PersonalInfoCustomizedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <StatusPersonalInfoCustomizedToasts
        statusPersonalInfo={data.verifiedUser.statusPersonalInfo}
      />
      {data.userPinnedAnswerCount >= PINNED_BY_USER_ANSWERS_LIMIT && (
        <p className="mb-2 cursor-default text-orange-500">
          You cannot pin more than {PINNED_BY_USER_ANSWERS_LIMIT} of your own
          criteria.
        </p>
      )}
      {(data.userPseudonativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT ||
        data.userPseudonativeIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT ||
        data.userCustomAnswersCount >= DEFAULT_ANSWERS_LIMIT) && (
        <p className="mb-2 cursor-default text-orange-500">
          You cannot have more than {DEFAULT_ANSWERS_LIMIT} of a given kind of
          criteria.
        </p>
      )}
      <H1>
        Welcome to {data.user.appWideName}&apos;s Personal Info Customized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyCriteria
          answers={data.userPseudonativeNotIrlAnswers}
          pinnedAnswersCount={data.userPinnedAnswerCount}
          otherPseudonativeAnswersCount={data.userPseudonativeIrlAnswersCount}
          answerComponentRequired="OneAnswerPinnablePseudoable"
          label="Find your pseudonative criteria below"
          notLabel="No pseudonative criteria yet."
        />
        <ManyCriteria
          answers={data.userPseudonativeIrlAnswers}
          pinnedAnswersCount={data.userPinnedAnswerCount}
          otherPseudonativeAnswersCount={
            data.userPseudonativeNotIrlAnswersCount
          }
          answerComponentRequired="OneAnswerPinnablePseudoable"
          label="Find your pseudonative irl criteria below"
          notLabel="No pseudonative irl criteria yet."
        />
        <ManyCriteria
          answers={data.userCustomAnswers}
          selectContext="PersonalInfoCustomized"
          pinnedAnswersCount={data.userPinnedAnswerCount}
          answerComponentRequired="OneAnswerPinnable"
          label="Find your custom criteria below"
          notLabel="No custom criteria yet."
        />
      </div>

      <PageLink href={`modify-criteria`}>Modify</PageLink>
      <PageLink href={`add-criteria`}>Add customized criteria</PageLink>
      <PageLink href={`..`}>To Personal Info</PageLink>
      <PageLink href={`../standardized`}>To Standardized criteria</PageLink>
    </>
  );
}
