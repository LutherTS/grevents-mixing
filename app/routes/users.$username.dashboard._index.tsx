import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }
  return { user };
};

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Dashboard.</H1>

      <PageLink href={`modify-app-wide-name`}>App-wide name *</PageLink>
      <p className="mt-2">{data.user.appWideName}</p>
      <PageLink href={`../personal-info`}>More personal info</PageLink>
      <PageLink href={`../friends`}>My friends</PageLink>
      <PageLink href={`../requests`}>My requests</PageLink>
      <PageLink href={`../notifications`}>My notifications</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
