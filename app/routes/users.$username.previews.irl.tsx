import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { LinkButtonOnClick } from "~/components/link-button";
import { ManyCriteria } from "~/components/many-criteria";
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
  const navigate = useNavigate();

  function handlePreviousNavigation() {
    navigate(-1);
  }

  return (
    <>
      <div className="space-y-4 my-4">
        <p className="mt-2">Could not find requested user.</p>
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

export default function IrlPreviewPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

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
