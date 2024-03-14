import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findUnansweredNativeIrlQuestionsByUserId,
  findUnansweredNativeNotIrlQuestionsByUserId,
} from "~/librairies/data/questions";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const [unansweredNativeNotIrlQuestions, unansweredNativeIrlQuestions] =
    await Promise.all([
      findUnansweredNativeNotIrlQuestionsByUserId(user.id),
      findUnansweredNativeIrlQuestionsByUserId(user.id),
    ]);

  return {
    user,
    unansweredNativeNotIrlQuestions,
    unansweredNativeIrlQuestions,
  };
};

export default function AddCriteriaStandardizedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s Add Criteria Standardized.
      </H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>Cancel</PageLink>
    </>
  );
}
