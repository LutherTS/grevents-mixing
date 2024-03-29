import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { StatusDashboardToasts } from "~/components/status-dashboard-toasts";
import { StatusTitleToasts } from "~/components/status-title-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countSentFriendToContactsByUserId,
  countSentIrlToContactsByUserId,
  countSentFriendFromContactsByUserId,
  countSentIrlFromContactsByUserId,
  countHasAccessedFromContactsByUserId,
} from "~/librairies/data/contacts";
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
    sentFriendToContactsCount,
    sentIrlToContactsCount,
    sentFriendFromContactsCount,
    sentIrlFromContactsCount,
    hasAccessedFromContactsCount,
  ] = await Promise.all([
    countSentFriendToContactsByUserId(user.id),
    countSentIrlToContactsByUserId(user.id),
    countSentFriendFromContactsByUserId(user.id),
    countSentIrlFromContactsByUserId(user.id),
    countHasAccessedFromContactsByUserId(user.id),
  ]);

  const sentToContactsCount =
    sentFriendToContactsCount + sentIrlToContactsCount;

  const sentFromContactsCount =
    sentFriendFromContactsCount +
    sentIrlFromContactsCount +
    hasAccessedFromContactsCount;

  return json({
    verifiedUser,
    user,
    sentToContactsCount,
    sentFromContactsCount,
  });
  // But I still don't know what this is used for yet.
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  // If I don't want to use "data." everywhere, I can always destructure from useLoaderData.
  // If there's loader and action data, I can also then call data loaderData and action data actionData.

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
        <div className="py-2">
          <p className="mt-2 underline text-fuchsia-200 hover:text-fuchsia-100 dark:text-fuchsia-800 dark:hover:text-fuchsia-900">
            My groups
          </p>
          <p className="mt-2 underline text-fuchsia-200 hover:text-fuchsia-100 dark:text-fuchsia-800 dark:hover:text-fuchsia-900">
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
