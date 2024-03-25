import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { FindForm } from "~/components/find-form";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import {
  updateContactMirrorId,
  upsertContactThroughFindByOtherUserIdAndVerifiedUserId,
  upsertContactThroughFindByVerifiedUserIdAndOtherUserId,
} from "~/librairies/changes/contacts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserByFriendcode,
  findUserByUsername,
} from "~/librairies/data/users";
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

  return json({ verifiedUser, user });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const friendCode = form.get("friendcode");

  if (typeof friendCode !== "string") {
    return null;
  }

  const otherUser = await findUserByFriendcode(friendCode);

  if (!otherUser) {
    return null;
  }

  if (otherUser.id === verifiedUser.id) {
    return null;
  }

  const [otherUserToVerifiedUserContact, verifiedUserToOtherUserContact] =
    await Promise.all([
      upsertContactThroughFindByOtherUserIdAndVerifiedUserId(
        otherUser.id,
        verifiedUser.id
      ),
      upsertContactThroughFindByVerifiedUserIdAndOtherUserId(
        verifiedUser.id,
        otherUser.id
      ),
    ]);

  await Promise.all([
    updateContactMirrorId(
      otherUserToVerifiedUserContact.id,
      verifiedUserToOtherUserContact.id
    ),
    updateContactMirrorId(
      verifiedUserToOtherUserContact.id,
      otherUserToVerifiedUserContact.id
    ),
  ]);

  return redirect(`/users/${otherUser.username}/profile`);
};

export default function FindContactsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Find Contacts.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <FindForm user={data.verifiedUser} />
      </div>

      <PageLink href={`..`}>See friends</PageLink>
      <PageLink href={`../../previews`}>See previews</PageLink>
    </>
  );
}
