import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findUserPseudonativeNotIrlAnswersByUserId,
  findUserPseudonativeIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const [userPseudonativeNotIrlAnswers, userPseudonativeIrlAnswers] =
    await Promise.all([
      findUserPseudonativeNotIrlAnswersByUserId(user.id),
      findUserPseudonativeIrlAnswersByUserId(user.id),
    ]);

  return {
    user,
    userPseudonativeNotIrlAnswers,
    userPseudonativeIrlAnswers,
  };
};

export default function ModifyCriteriaCustomizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Modify Criteria Customized.
      </H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
