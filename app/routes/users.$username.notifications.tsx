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
import { ManyContacts } from "~/components/many-contacts";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findHasAccessedFromContactsByUserId,
  findSentFriendFromContactsByUserId,
  findSentIrlFromContactsByUserId,
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

  const [sentFriendFromContacts, sentIrlFromContacts, hasAccessedFromContacts] =
    await Promise.all([
      findSentFriendFromContactsByUserId(user.id),
      findSentIrlFromContactsByUserId(user.id),
      findHasAccessedFromContactsByUserId(user.id),
    ]);

  return json({
    verifiedUser,
    user,
    sentFriendFromContacts,
    sentIrlFromContacts,
    hasAccessedFromContacts,
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

export default function NotificationsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Notifications.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <ManyContacts
          contacts={data.sentFriendFromContacts}
          contactComponentRequired="OneContact"
          label="Friend requests received"
          notLabel="You have not received any friend requests."
        />
        <ManyContacts
          contacts={data.sentIrlFromContacts}
          contactComponentRequired="OneContact"
          label="Irl upgrade requests received"
          notLabel="You have not received any irl upgrade requests."
        />
        {data.hasAccessedFromContacts.length > 0 && (
          <div className="py-2">
            <ManyContacts
              contacts={data.hasAccessedFromContacts}
              contactComponentRequired="OneContact"
              label="Users who've found your profile through your friend code"
            />
            <p className="mt-2 text-orange-500">
              If you don't know one of the above users, feel free to block them
              and do consider generating a new friend code.
            </p>
          </div>
        )}
      </div>

      <PageLink href={`../requests`}>To requests</PageLink>
      <PageLink href={`../dashboard`}>To dashboard</PageLink>
    </>
  );
}
