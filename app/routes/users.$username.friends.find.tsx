import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { FindForm } from "~/components/find-form";
import { H1 } from "~/components/h1";
import { TextButtonOnClick } from "~/components/link-button";
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
import { FriendCodeUserSchema } from "~/librairies/validations/users";
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

  const validatedFields = FriendCodeUserSchema.safeParse({
    userOtherFriendCode: friendCode,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { userOtherFriendCode } = validatedFields.data;

  const otherUser = await findUserByFriendcode(userOtherFriendCode);

  if (!otherUser) {
    return json(
      {
        message:
          "Database Error: No user with this friend code could be found.",
      },
      { status: 404 }
    );
  }

  if (otherUser.id === verifiedUser.id) {
    return json(
      {
        message: "Database Error: This is your own friend code.",
      },
      { status: 400 }
    );
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

export default function FindContactsPage() {
  const data = useLoaderData<typeof loader>();

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
