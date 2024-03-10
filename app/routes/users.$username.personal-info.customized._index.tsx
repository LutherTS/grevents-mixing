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

export default function PersonalInfoCustomizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Personal Info Customized.
      </H1>

      <PageLink href={`/users/${data.user.appWideName}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`modify-criteria`}>Modify</PageLink>
      <PageLink href={`add-criteria`}>Add customized criteria</PageLink>
      <PageLink href={`..`}>To Personal Info</PageLink>
      <PageLink href={`../standardized`}>To Standardized criteria</PageLink>
    </>
  );
}
