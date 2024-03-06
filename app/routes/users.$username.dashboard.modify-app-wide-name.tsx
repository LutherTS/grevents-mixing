import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  return { username };
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.username}&apos;s Modify App-Wide Name.</H1>

      <PageLink href={`/users/${data.username}/dashboard`}>Cancel</PageLink>
      {/* I'll find a way to make this path relative within this here paramaterized route later. */}
    </>
  );
}
