import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findUserWhoHaveMeBlockedByUserId,
  findUserWhoIAmBlockingByUserId,
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

  const [userWhoIAmBlocking, userWhoHasMeBlocked] = await Promise.all([
    findUserWhoIAmBlockingByUserId(user.id),
    findUserWhoHaveMeBlockedByUserId(user.id),
  ]);

  return { user, userWhoIAmBlocking, userWhoHasMeBlocked };
};

export default function BlocksPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Blocks.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <p className="mt-2">
        If you&apos;ve blocked each other, the other user may appear in both
        Users who I am blocking and Users who have me blocked.
      </p>
      <PageLink href={`../friends`}>See friends</PageLink>
    </>
  );
}
