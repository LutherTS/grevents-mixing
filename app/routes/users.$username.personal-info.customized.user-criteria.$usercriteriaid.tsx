import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  const usercriteriaid = params.usercriteriaid;
  return { username, usercriteriaid };
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.username}&apos;s User Criteria ID {data.usercriteriaid}
        .
      </H1>

      <PageLink href={`/users/${data.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>To Customized criteria</PageLink>
      <PageLink href={`../..`}>To Personal Info</PageLink>
    </>
  );
}
