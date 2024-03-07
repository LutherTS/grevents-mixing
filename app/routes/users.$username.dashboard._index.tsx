import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  return { username };
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.username}&apos;s Dashboard.</H1>

      <PageLink href={`/users/${data.username}/dashboard/modify-app-wide-name`}>
        App-wide name *
      </PageLink>
      <p className="mt-2">{data.username} (for now)</p>
      <PageLink href={`/users/${data.username}/personal-info`}>
        More personal info
      </PageLink>
      <PageLink href={`/users/${data.username}/friends`}>My friends</PageLink>
      <PageLink href={`/users/${data.username}/requests`}>My requests</PageLink>
      <PageLink href={`/users/${data.username}/notifications`}>
        My notifications
      </PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
