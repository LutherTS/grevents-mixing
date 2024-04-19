import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { SignOutForm } from "~/components/sign-out-form";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { findUserByUsername } from "~/librairies/data/users";
import { findUserPinnedAnswersByUserId } from "~/librairies/data/answers";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import { ManyCriteria } from "~/components/many-criteria";
import { StatusPersonalInfoToasts } from "~/components/status-personal-info-toasts";
import { TextButtonOnClick } from "~/components/link-button";

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

  const userPinnedAnswers = await findUserPinnedAnswersByUserId(user.id);

  return json({ verifiedUser, user, userPinnedAnswers });
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

export default function PersonalInfoPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <StatusPersonalInfoToasts
        statusPersonalInfo={data.verifiedUser.statusPersonalInfo}
      />
      <H1>Welcome to {data.user.appWideName}&apos;s Personal Info.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyCriteria
          answers={data.userPinnedAnswers}
          selectContext="PersonalInfo"
          answerComponentRequired="OneAnswerRePinnable"
          label="Find your pinned criteria below"
          notLabel="No pinned criteria yet."
        />
      </div>

      <PageLink href={`standardized`}>To Standardized criteria</PageLink>
      <PageLink href={`customized`}>To Customized criteria</PageLink>
    </>
  );
}
