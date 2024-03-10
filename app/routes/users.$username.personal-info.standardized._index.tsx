import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { countUserPinnedAnswersByUserId } from "~/librairies/data/answers";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const pinnedAnswerCount = await countUserPinnedAnswersByUserId(user.id);

  return { user, pinnedAnswerCount };
};

export default function PersonalInfoStandardizedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Personal Info Standardized.
      </H1>

      <PageLink href={`/users/${data.user.appWideName}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`modify-criteria`}>Modify</PageLink>
      <PageLink href={`add-criteria`}>Add standardized criteria</PageLink>
      <PageLink href={`..`}>To Personal Info</PageLink>
      <PageLink href={`../customized`}>To Customized criteria</PageLink>
    </>
  );
}
