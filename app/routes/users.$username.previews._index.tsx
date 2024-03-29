import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
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

  return json({ verifiedUser, user });
};

export default function PreviewsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Previews.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <div>
          <PageLink href={`none`}>To &quot;none&quot; preview</PageLink>
          <PageLink href={`friend`}>To &quot;friend&quot; preview</PageLink>
          <PageLink href={`irl`}>To &quot;irl&quot; preview</PageLink>
          <PageLink href={`i-am-blocking`}>
            To &quot;i-am-blocking&quot; preview
          </PageLink>
          <PageLink href={`has-me-blocked`}>
            To &quot;has-me-blocked&quot; preview
          </PageLink>
          <PageLink href={`blocking-blocked`}>
            To &quot;blocking-blocked&quot; preview
          </PageLink>
          <PageLink href={`queried`}>To queried previews</PageLink>
        </div>
      </div>
      <PageLink href={`../friends/find`}>Search for contacts</PageLink>
    </>
  );
}
