import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { findAnswerByUserQuestionIDAndUserID } from "~/librairies/data/answers";
import { findUserFriendsNotToUserQuestionByUserQuestionIdAndUserId } from "~/librairies/data/contacts";
import { findUserQuestionFriendsByUserQuestionId } from "~/librairies/data/userquestionfriends";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const userQuestionAnswer = await findAnswerByUserQuestionIDAndUserID(
    params.usercriteriaid!,
    user.id
  );
  if (!userQuestionAnswer) {
    throw new Response("Could not find requested user question or answer.", {
      status: 404,
    });
  }

  const [userQuestionFriends, userFriendsNotToUserQuestion] = await Promise.all(
    [
      findUserQuestionFriendsByUserQuestionId(
        userQuestionAnswer.userQuestion.id
      ),
      findUserFriendsNotToUserQuestionByUserQuestionIdAndUserId(
        userQuestionAnswer.userQuestion.id,
        user.id
      ),
    ]
  );

  return {
    user,
    userQuestionAnswer,
    userQuestionFriends,
    userFriendsNotToUserQuestion,
  };
};

export default function UserCriteriaPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>
        Welcome to {data.user.appWideName}&apos;s &quot;
        {data.userQuestionAnswer.userQuestion.question.name}&quot; User
        Criteria.
      </H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`../..`}>To Customized criteria</PageLink>
      <PageLink href={`../../..`}>To Personal Info</PageLink>
    </>
  );
}
