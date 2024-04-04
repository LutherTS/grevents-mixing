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
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserPseudonativeNotIrlAnswersByUserId,
  findUserPseudonativeIrlAnswersByUserId,
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

  const [userPseudonativeNotIrlAnswers, userPseudonativeIrlAnswers] =
    await Promise.all([
      findUserPseudonativeNotIrlAnswersByUserId(user.id),
      findUserPseudonativeIrlAnswersByUserId(user.id),
    ]);

  return json({
    verifiedUser,
    user,
    userPseudonativeNotIrlAnswers,
    userPseudonativeIrlAnswers,
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

export default function ModifyCriteriaCustomizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Modify Criteria Customized.
      </H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyCriteria
          answers={data.userPseudonativeNotIrlAnswers}
          answerComponentRequired="OneAnswerModify"
          label="Find your pseudonative criteria below"
          notLabel="No pseudonative criteria yet."
        />
        <ManyCriteria
          answers={data.userPseudonativeIrlAnswers}
          answerComponentRequired="OneAnswerModify"
          label="Find your pseudonative irl criteria below"
          notLabel="No pseudonative irl criteria yet."
        />
        <p className="mt-2">
          (Custom criteria have their own dynamic modify page directly available
          from the Personal Info Customized page.)
        </p>
      </div>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
