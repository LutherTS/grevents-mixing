import { Prisma } from "@prisma/client";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { LinkButtonOnClick } from "~/components/link-button";
import { ManyCriteria } from "~/components/many-criteria";
import { ManyUserQuestionFriendsPinned } from "~/components/many-userquestionfriends";
import { PageLink, PageLinkDivless } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { StatusDashboardToasts } from "~/components/status-dashboard-toasts";
import { StatusTitleToasts } from "~/components/status-title-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import { findUserPinnedForSelfAnswersByUserId } from "~/librairies/data/answers";
import {
  countSentFriendToContactsByUserId,
  countSentIrlToContactsByUserId,
  countSentFriendFromContactsByUserId,
  countSentIrlFromContactsByUserId,
  countHasAccessedFromContactsByUserId,
  findContactById,
} from "~/librairies/data/contacts";
import { findUserQuestionFriendsAnswersPinnedByFriend } from "~/librairies/data/userquestionfriends";
import { findUserByUsername } from "~/librairies/data/users";
import { selectContacts } from "~/librairies/subdata/contacts";
import { selectUserQuestionFriendsAnswers } from "~/librairies/subdata/userquestionfriends";
import {
  RelationCombination,
  defineContactRelCombo,
} from "~/utilities/contacts";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const url = new URL(request.url);
  const pathname = url.pathname;

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
    sentFriendToContactsCount,
    sentIrlToContactsCount,
    sentFriendFromContactsCount,
    sentIrlFromContactsCount,
    hasAccessedFromContactsCount,
    userPinnedForSelfAnswers,
  ] = await Promise.all([
    countSentFriendToContactsByUserId(user.id),
    countSentIrlToContactsByUserId(user.id),
    countSentFriendFromContactsByUserId(user.id),
    countSentIrlFromContactsByUserId(user.id),
    countHasAccessedFromContactsByUserId(user.id),
    findUserPinnedForSelfAnswersByUserId(user.id),
  ]);

  const sentToContactsCount =
    sentFriendToContactsCount + sentIrlToContactsCount;

  const sentFromContactsCount =
    sentFriendFromContactsCount +
    sentIrlFromContactsCount +
    hasAccessedFromContactsCount;

  let userPinnedFriend: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }> | null = null;

  let userPinnedFriendAnswersPinnedByFriend:
    | Prisma.UserQuestionFriendGetPayload<{
        select: typeof selectUserQuestionFriendsAnswers;
      }>[]
    | null = null;

  let relCombo: RelationCombination | "" = "";

  if (user.pinnedFriendId) {
    userPinnedFriend = await findContactById(user.pinnedFriendId);
    if (userPinnedFriend) {
      userPinnedFriendAnswersPinnedByFriend =
        await findUserQuestionFriendsAnswersPinnedByFriend(
          userPinnedFriend.userFirst.id,
          userPinnedFriend.id
        );
      relCombo = defineContactRelCombo(userPinnedFriend);
    }
  }

  return json({
    pathname,
    verifiedUser,
    user,
    sentToContactsCount,
    sentFromContactsCount,
    userPinnedForSelfAnswers,
    userPinnedFriend,
    userPinnedFriendAnswersPinnedByFriend,
    relCombo,
  });
};

// For now I'm going to put this on every users.$username child route, but eventually it will be in its own layout to be done only once.
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

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  // If I don't want to use "data." everywhere, I can always destructure from useLoaderData.
  // If there's loader and action data, I can also then call data (loader data) loaderData and action data actionData.

  return (
    <>
      <StatusTitleToasts statusTitle={data.verifiedUser.statusTitle} />
      <StatusDashboardToasts
        statusDashboard={data.verifiedUser.statusDashboard}
      />
      <H1>Welcome to {data.user.appWideName}&apos;s Dashboard.</H1>
      {data.verifiedUser && <SignOutForm />}

      <div className="my-4 space-y-2">
        <div>
          <PageLink href={`modify`}>App-wide name *</PageLink>
          <p className="mt-2">{data.user.appWideName}</p>
        </div>
        <div>
          <PageLink href={`../personal-info`}>More personal info</PageLink>
          <PageLink href={`../profile`}>My profile</PageLink>
          <PageLink href={`../friends`}>My friends</PageLink>
          <PageLink
            href={`../requests`}
            specifiedClasses={
              data.sentToContactsCount > 0
                ? "mt-2 inline-block text-teal-500 underline hover:text-teal-400 dark:hover:text-teal-600"
                : undefined
            }
          >
            My requests
          </PageLink>
          <PageLink
            href={`../notifications`}
            specifiedClasses={
              data.sentFromContactsCount > 0
                ? "mt-2 inline-block text-cyan-500 underline hover:text-cyan-400 dark:hover:text-cyan-600"
                : undefined
            }
          >
            My notifications
          </PageLink>
        </div>
        {data.userPinnedForSelfAnswers.length > 0 && (
          <div className="py-2">
            <ManyCriteria
              answers={data.userPinnedForSelfAnswers}
              selectContext="Dashboard"
              answerComponentRequired="OneAnswerRePinnableForSelf"
              label="Find your pinned for self criteria below"
            />
          </div>
        )}
        {data.userPinnedFriend && (
          <div className="py-2">
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              <PageLinkDivless
                href={`/users/${data.userPinnedFriend.userFirst.username}/profile`}
                specifiedClasses="font-semibold text-blue-500 hover:text-blue-400 dark:hover:text-blue-600"
              >
                {data.userPinnedFriend.userFirst.appWideName}
              </PageLinkDivless>{" "}
              /{" "}
              <span className="text-zinc-600 dark:text-zinc-400">
                {data.userPinnedFriend.userFirst.username}
              </span>{" "}
              is your pinned friend
            </p>
            {data.relCombo === "friend" &&
              data.userPinnedFriendAnswersPinnedByFriend && (
                <ManyUserQuestionFriendsPinned
                  pathname={data.pathname}
                  userQuestionFriendsAnswers={
                    data.userPinnedFriendAnswersPinnedByFriend
                  }
                  label="Find their pinned by you for friend criteria below"
                  notLabel="No pinned by you criteria yet."
                />
              )}
            {data.relCombo === "irl" &&
              data.userPinnedFriendAnswersPinnedByFriend && (
                <ManyUserQuestionFriendsPinned
                  pathname={data.pathname}
                  userQuestionFriendsAnswers={
                    data.userPinnedFriendAnswersPinnedByFriend
                  }
                  label="Find their pinned by you for irl criteria below"
                  notLabel="No pinned by you criteria yet."
                />
              )}
          </div>
        )}
        <div className="py-2">
          <p className="mt-2 underline text-fuchsia-200 dark:text-fuchsia-800">
            My groups
          </p>
          <p className="mt-2 underline text-fuchsia-200 dark:text-fuchsia-800">
            My events
          </p>
        </div>
      </div>

      <PageLink href={`/`}>Return home</PageLink>
      {data.user.state === "DEACTIVATED" && (
        <p className="mt-8 font-bold text-red-500">
          You&apos;ve deactivated your profile.
        </p>
      )}
    </>
  );
}
