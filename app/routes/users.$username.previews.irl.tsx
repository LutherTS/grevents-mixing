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
import { TextButtonOnClick } from "~/components/link-button";
import { PageLink } from "~/components/page-link";
import { RelationCombinationIrlPreviewed } from "~/components/relcombos-previewed";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserPinnedNotAndIrlAnswersByUserId,
  findUserUnpinnedNativeIrlAnswersByUserId,
  findUserUnpinnedNativeNotIrlAnswersByUserId,
  findUserUnpinnedPseudonativeIrlAnswersByUserId,
  findUserUnpinnedPseudonativeNotIrlAnswersByUserId,
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
    userPinnedNotAndIrlAnswers,
    userUnpinnedNativeNotIrlAnswers,
    userUnpinnedPseudonativeNotIrlAnswers,
    userUnpinnedNativeIrlAnswers,
    userUnpinnedPseudonativeIrlAnswers,
  ] = await Promise.all([
    findUserPinnedNotAndIrlAnswersByUserId(user.id),
    findUserUnpinnedNativeNotIrlAnswersByUserId(user.id),
    findUserUnpinnedPseudonativeNotIrlAnswersByUserId(user.id),
    findUserUnpinnedNativeIrlAnswersByUserId(user.id),
    findUserUnpinnedPseudonativeIrlAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    userPinnedNotAndIrlAnswers,
    userUnpinnedNativeNotIrlAnswers,
    userUnpinnedPseudonativeNotIrlAnswers,
    userUnpinnedNativeIrlAnswers,
    userUnpinnedPseudonativeIrlAnswers,
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

export default function IrlPreviewPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Irl Preview.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <RelationCombinationIrlPreviewed
          pinnedNotAndIrlAnswers={data.userPinnedNotAndIrlAnswers}
          unpinnedNativeNotIrlAnswers={data.userUnpinnedNativeNotIrlAnswers}
          unpinnedPseudonativeNotIrlAnswers={
            data.userUnpinnedPseudonativeNotIrlAnswers
          }
          unpinnedNativeIrlAnswers={data.userUnpinnedNativeIrlAnswers}
          unpinnedPseudonativeIrlAnswers={
            data.userUnpinnedPseudonativeIrlAnswers
          }
        />
      </div>

      <PageLink href={`..`}>To Previews</PageLink>
    </>
  );
}
