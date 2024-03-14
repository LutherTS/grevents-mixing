import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  countSentFriendToContactsByUserId,
  countSentIrlToContactsByUserId,
  countSentFriendFromContactsByUserId,
  countSentIrlFromContactsByUserId,
} from "~/librairies/data/contacts";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const [
    sentFriendToContactsCount,
    sentIrlToContactsCount,
    sentFriendFromContactsCount,
    sentIrlFromContactsCount,
  ] = await Promise.all([
    countSentFriendToContactsByUserId(user.id),
    countSentIrlToContactsByUserId(user.id),
    countSentFriendFromContactsByUserId(user.id),
    countSentIrlFromContactsByUserId(user.id),
  ]);

  const sentToContactsCount =
    sentFriendToContactsCount + sentIrlToContactsCount;

  const sentFromContactsCount =
    sentFriendFromContactsCount + sentIrlFromContactsCount;

  return {
    user,
    sentToContactsCount,
    sentFromContactsCount,
  };
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  // If I don't want to use "data." everywhere, I can always destructure from useLoaderData.

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Dashboard.</H1>

      <PageLink href={`modify-app-wide-name`}>App-wide name *</PageLink>
      <p className="mt-2">{data.user.appWideName}</p>
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
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
