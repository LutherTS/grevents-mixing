import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { LinkButtonOnClick } from "~/components/link-button";
import { ManyCriteria } from "~/components/many-criteria";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { StatusPersonalInfoCustomizedToasts } from "~/components/status-personal-info-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserCustomAnswersByUserId,
  countUserPinnedAnswersByUserId,
  countUserPinnedForSelfAnswersByUserId,
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
  PINNED_FOR_SELF_ANSWERS_LIMIT,
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
    userPinnedForSelfAnswersCount,
    userPinnedAnswersCount,
    userPseudonativeNotIrlAnswers,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswers,
    userPseudonativeIrlAnswersCount,
    userCustomAnswers,
    userCustomAnswersCount,
  ] = await Promise.all([
    countUserPinnedForSelfAnswersByUserId(user.id),
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
    userPinnedForSelfAnswersCount,
    userPinnedAnswersCount,
    userPseudonativeNotIrlAnswers,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswers,
    userPseudonativeIrlAnswersCount,
    userCustomAnswers,
    userCustomAnswersCount,
  });
};

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else {
    errorMessage = "Unknown error";
  }

  const navigate = useNavigate();

  function handlePreviousNavigation() {
    navigate(-1);
  }

  return (
    <>
      <div className="space-y-4 my-4">
        <p className="mt-2">{errorMessage}</p>
      </div>
      <PageLink href={`/`}>Return home</PageLink>
      <p className="mt-2">
        <LinkButtonOnClick
          handleClick={handlePreviousNavigation}
          disabled={false}
        >
          Or go back to the previous page
        </LinkButtonOnClick>
      </p>
    </>
  );
}

export default function PersonalInfoCustomizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <StatusPersonalInfoCustomizedToasts
        statusPersonalInfo={data.verifiedUser.statusPersonalInfo}
      />
      {data.userPinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT && (
        <p className="mb-2 cursor-default text-orange-500">
          You cannot pin more than {PINNED_BY_USER_ANSWERS_LIMIT} of your own
          criteria.
        </p>
      )}
      {data.userPinnedForSelfAnswersCount >= PINNED_FOR_SELF_ANSWERS_LIMIT && (
        <p className="mb-2 cursor-default text-orange-500">
          You cannot pin for self more than {PINNED_FOR_SELF_ANSWERS_LIMIT} of
          your own criteria.
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
          selectContext="PersonalInfoCustomized"
          pinnedAnswersForSelfCount={data.userPinnedForSelfAnswersCount}
          pinnedAnswersCount={data.userPinnedAnswersCount}
          otherPseudonativeAnswersCount={data.userPseudonativeIrlAnswersCount}
          answerComponentRequired="OneAnswerPinnable"
          label="Find your pseudonative criteria below"
          notLabel="No pseudonative criteria yet."
        />
        <ManyCriteria
          answers={data.userPseudonativeIrlAnswers}
          selectContext="PersonalInfoCustomized"
          pinnedAnswersForSelfCount={data.userPinnedForSelfAnswersCount}
          pinnedAnswersCount={data.userPinnedAnswersCount}
          otherPseudonativeAnswersCount={
            data.userPseudonativeNotIrlAnswersCount
          }
          answerComponentRequired="OneAnswerPinnable"
          label="Find your pseudonative irl criteria below"
          notLabel="No pseudonative irl criteria yet."
        />
        <ManyCriteria
          answers={data.userCustomAnswers}
          selectContext="PersonalInfoCustomized"
          pinnedAnswersForSelfCount={data.userPinnedForSelfAnswersCount}
          pinnedAnswersCount={data.userPinnedAnswersCount}
          answerComponentRequired="OneAnswerPinnable"
          label="Find your custom criteria below"
          notLabel="No custom criteria yet."
        />
      </div>

      {/* <PageLink href={`modify-criteria`}>Modify</PageLink> */}
      <PageLink href={`add-criteria`}>Add customized criteria</PageLink>
      <PageLink href={`..`}>To Personal Info</PageLink>
      <PageLink href={`../standardized`}>To Standardized Criteria</PageLink>
    </>
  );
}
