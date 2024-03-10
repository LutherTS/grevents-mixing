import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utilities/db.server";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  const user = await prisma.user.findUnique({
    where: { username: username },
    // select ...
  });
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }
  return { user };
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Modify App-Wide Name.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
