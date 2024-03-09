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

      <PageLink href={`modify-app-wide-name`}>App-wide name *</PageLink>
      <p className="mt-2">{data.username} (for now)</p>
      <PageLink href={`../personal-info`}>More personal info</PageLink>
      <PageLink href={`../friends`}>My friends</PageLink>
      <PageLink href={`../requests`}>My requests</PageLink>
      <PageLink href={`../notifications`}>My notifications</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
