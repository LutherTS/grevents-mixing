import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findUserNativeIrlAnswersByUserId,
  findUserNativeNotIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const [userNativeNotIrlAnswers, userNativeIrlAnswers] = await Promise.all([
    findUserNativeNotIrlAnswersByUserId(user.id),
    findUserNativeIrlAnswersByUserId(user.id),
  ]);

  return {
    user,
    userNativeNotIrlAnswers,
    userNativeIrlAnswers,
  };
};

export default function ModifyCriteriaStandardizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Modify Criteria Standardized.
      </H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
