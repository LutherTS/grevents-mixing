import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  return { username };
};

export default function QueriedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.username}&apos;s Queried Previews.</H1>

      <PageLink href={`/users/${data.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`/users/${data.username}/previews`}>To Previews</PageLink>
      <PageLink href={`/users/${data.username}/profile`}>
        To Your Profile
      </PageLink>
    </>
  );
}
