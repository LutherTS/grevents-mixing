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
import { StatusPersonalInfoStandardizedToasts } from "~/components/status-personal-info-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserNativeIrlAnswersByUserId,
  countUserNativeNotIrlAnswersByUserId,
  countUserPinnedAnswersByUserId,
  countUserPinnedForSelfAnswersByUserId,
  findUserNativeIrlAnswersByUserId,
  findUserNativeNotIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findUserByUsername } from "~/librairies/data/users";
import {
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
    userNativeNotIrlAnswers,
    userNativeNotIrlAnswersCount,
    userNativeIrlAnswers,
    userNativeIrlAnswersCount,
  ] = await Promise.all([
    countUserPinnedForSelfAnswersByUserId(user.id),
    countUserPinnedAnswersByUserId(user.id),
    findUserNativeNotIrlAnswersByUserId(user.id),
    countUserNativeNotIrlAnswersByUserId(user.id),
    findUserNativeIrlAnswersByUserId(user.id),
    countUserNativeIrlAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    userPinnedForSelfAnswersCount,
    userPinnedAnswersCount,
    userNativeNotIrlAnswers,
    userNativeNotIrlAnswersCount,
    userNativeIrlAnswers,
    userNativeIrlAnswersCount,
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

export default function PersonalInfoStandardizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <StatusPersonalInfoStandardizedToasts
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
      <H1>
        Welcome to {data.user.appWideName}&apos;s Personal Info Standardized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyCriteria
          answers={data.userNativeNotIrlAnswers}
          pinnedAnswersCount={data.userPinnedAnswersCount}
          answerComponentRequired="OneAnswerPinnable"
          label="Find your native criteria below"
          notLabel="No native criteria yet."
        />
        <ManyCriteria
          answers={data.userNativeIrlAnswers}
          pinnedAnswersCount={data.userPinnedAnswersCount}
          answerComponentRequired="OneAnswerPinnable"
          label="Find your native irl criteria below"
          notLabel="No native irl criteria yet."
        />
      </div>

      <PageLink href={`modify-criteria`}>Modify</PageLink>
      <PageLink href={`add-criteria`}>Add standardized criteria</PageLink>
      <PageLink href={`..`}>To Personal Info</PageLink>
      <PageLink href={`../customized`}>To Customized criteria</PageLink>
    </>
  );
}
