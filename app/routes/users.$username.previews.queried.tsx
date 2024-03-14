import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import {
  findUserPinnedNotIrlAnswersByUserIdQueried,
  findUserUnpinnedNativeNotIrlAnswersByUserIdQueried,
  findUserUnpinnedPseudonativeNotIrlAnswersByUserIdQueried,
  findUserUnpinnedSharedToContactCustomAnswersQueried,
  findUserPinnedNotAndIrlAnswersByUserIdQueried,
  findUserUnpinnedNativeIrlAnswersByUserIdQueried,
  findUserUnpinnedPseudonativeIrlAnswersByUserIdQueried,
} from "~/librairies/data/answers";
import { findContactByUserFirstIdAndUserLastUsername } from "~/librairies/data/contacts";
import { findUserByUsername } from "~/librairies/data/users";
import { defineContactRelCombo } from "~/utilities/contacts";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const url = new URL(request.url);
  const userLast = url.searchParams.get("userlast") || "";
  let relCombo = url.searchParams.get("relcombo") || "";

  const userToQueriedContact =
    await findContactByUserFirstIdAndUserLastUsername(user.id, userLast);

  if (userToQueriedContact && relCombo === "") {
    relCombo = defineContactRelCombo(userToQueriedContact, relCombo);
  }

  // let [a, b, c, d] = Array(4);
  // let [u, v, w, x, y, z] = Array(6);
  let userPinnedNotIrlAnswers;
  let userPinnedNotAndIrlAnswers;
  let userUnpinnedNativeNotIrlAnswers;
  let userUnpinnedPseudonativeNotIrlAnswers;
  let userUnpinnedNativeIrlAnswers;
  let userUnpinnedPseudonativeIrlAnswers;
  let userUnpinnedSharedToContactCustomAnswers;

  if (userToQueriedContact && relCombo === "friend") {
    [
      userPinnedNotIrlAnswers,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    ] = await Promise.all([
      findUserPinnedNotIrlAnswersByUserIdQueried(
        user.id,
        userToQueriedContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserIdQueried(user.id),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserIdQueried(user.id),
      findUserUnpinnedSharedToContactCustomAnswersQueried(
        user.id,
        userToQueriedContact.id
      ),
    ]);
    return {
      user,
      userToQueriedContact,
      userLast,
      relCombo,
      userPinnedNotIrlAnswers,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    };
  } else if (userToQueriedContact && relCombo === "irl") {
    [
      userPinnedNotAndIrlAnswers,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedNativeIrlAnswers,
      userUnpinnedPseudonativeIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    ] = await Promise.all([
      findUserPinnedNotAndIrlAnswersByUserIdQueried(
        user.id,
        userToQueriedContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserIdQueried(user.id),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserIdQueried(user.id),
      findUserUnpinnedNativeIrlAnswersByUserIdQueried(user.id),
      findUserUnpinnedPseudonativeIrlAnswersByUserIdQueried(user.id),
      findUserUnpinnedSharedToContactCustomAnswersQueried(
        user.id,
        userToQueriedContact.id
      ),
    ]);
    return {
      user,
      userToQueriedContact,
      userLast,
      relCombo,
      userPinnedNotAndIrlAnswers,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedNativeIrlAnswers,
      userUnpinnedPseudonativeIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    };
  } else {
    return { user, userToQueriedContact, userLast, relCombo };
  }
};

export default function QueriedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  /* For eventual use
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  */

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Queried Previews.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>To Previews</PageLink>
      <PageLink href={`../../profile`}>To Your Profile</PageLink>
    </>
  );
}
