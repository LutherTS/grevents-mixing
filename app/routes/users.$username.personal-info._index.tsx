import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { findUserByUsername } from "~/librairies/data/users";
import { findUserPinnedAnswersByUserId } from "~/librairies/data/answers";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const pinnedAnswers = await findUserPinnedAnswersByUserId(user.id);

  return { user, pinnedAnswers };
};

export default function PersonalInfoPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Personal Info.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`standardized`}>To Standardized criteria</PageLink>
      <PageLink href={`customized`}>To Customized criteria</PageLink>
    </>
  );
}
