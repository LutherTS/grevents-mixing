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
import { TextButtonOnClick } from "~/components/text-button";
import { PageLink } from "~/components/page-link";
import { PaginatedCustomizedAnswerForms } from "~/components/paginated-answer-forms";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserCustomAnswersByUserId,
  countUserPseudonativeIrlAnswersByUserId,
  countUserPseudonativeNotIrlAnswersByUserId,
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
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswersCount,
    userCustomAnswersCount,
  ] = await Promise.all([
    countUserPseudonativeNotIrlAnswersByUserId(user.id),
    countUserPseudonativeIrlAnswersByUserId(user.id),
    countUserCustomAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswersCount,
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
        <TextButtonOnClick
          handleClick={handlePreviousNavigation}
          disabled={false}
        >
          Or go back to the previous page
        </TextButtonOnClick>
      </p>
    </>
  );
}

export default function AddCriteriaCustomizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Add Criteria Customized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <PaginatedCustomizedAnswerForms
          pseudonativeNotIrlAnswersCount={
            data.userPseudonativeNotIrlAnswersCount
          }
          pseudonativeIrlAnswersCount={data.userPseudonativeIrlAnswersCount}
          customAnswersCount={data.userCustomAnswersCount}
        />
      </div>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
