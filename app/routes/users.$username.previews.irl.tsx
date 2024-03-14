import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findUserPinnedNotAndIrlAnswersByUserId,
  findUserUnpinnedNativeIrlAnswersByUserId,
  findUserUnpinnedNativeNotIrlAnswersByUserId,
  findUserUnpinnedPseudonativeIrlAnswersByUserId,
  findUserUnpinnedPseudonativeNotIrlAnswersByUserId,
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

  const [
    userPinnedNotAndIrlAnswers,
    userUnpinnedNativeNotIrlAnswers,
    userUnpinnedPseudonativeNotIrlAnswers,
    userUnpinnedNativeIrlAnswers,
    userUnpinnedPseudonativeIrlAnswers,
  ] = await Promise.all([
    findUserPinnedNotAndIrlAnswersByUserId(user.id),
    findUserUnpinnedNativeNotIrlAnswersByUserId(user.id),
    findUserUnpinnedPseudonativeNotIrlAnswersByUserId(user.id),
    findUserUnpinnedNativeIrlAnswersByUserId(user.id),
    findUserUnpinnedPseudonativeIrlAnswersByUserId(user.id),
  ]);

  return {
    user,
    userPinnedNotAndIrlAnswers,
    userUnpinnedNativeNotIrlAnswers,
    userUnpinnedPseudonativeNotIrlAnswers,
    userUnpinnedNativeIrlAnswers,
    userUnpinnedPseudonativeIrlAnswers,
  };
};

export default function IrlPreviewPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Irl Preview.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>To Previews</PageLink>
    </>
  );
}
