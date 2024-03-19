import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { ManyContacts } from "~/components/many-contacts";
import { ManyUserQuestionFriends } from "~/components/many-userquestionfriends";
import { OneCriteria } from "~/components/one-criteria";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import { findAnswerByUserQuestionIDAndUserID } from "~/librairies/data/answers";
import { findUserFriendsNotToUserQuestionByUserQuestionIdAndUserId } from "~/librairies/data/contacts";
import { findUserQuestionFriendsByUserQuestionId } from "~/librairies/data/userquestionfriends";
import { findUserByUsername } from "~/librairies/data/users";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");
  invariant(params.usercriteriaid, "Expected params.usercriteriaid");

  const verifiedUser = await getVerifiedUser(request);
  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const user = await findUserByUsername(params.username);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  if (verifiedUser.id !== user.id) {
    await updateUserStatusDashboardById(
      verifiedUser.id,
      "REDIRECTEDTODASHBOARD"
    );
    throw redirect(`/users/${verifiedUser.username}/dashboard`);
  }

  const userQuestionAnswer = await findAnswerByUserQuestionIDAndUserID(
    params.usercriteriaid,
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

  return json({
    verifiedUser,
    user,
    userQuestionAnswer,
    userQuestionFriends,
    userFriendsNotToUserQuestion,
  });
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
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <OneCriteria
          answer={data.userQuestionAnswer}
          selectContext="UserCriteria"
          answerComponentRequired="OneAnswerModify"
        />
        <ManyContacts
          contacts={data.userFriendsNotToUserQuestion}
          answer={data.userQuestionAnswer}
          contactComponentRequired="OneContactAddable"
          label="Find your list of friend(s) to share to below"
          notLabel="No remaining friends yet."
        />
        <ManyUserQuestionFriends
          userQuestionFriends={data.userQuestionFriends}
        />
      </div>

      <PageLink href={`../..`}>To Customized criteria</PageLink>
      <PageLink href={`../../..`}>To Personal Info</PageLink>
    </>
  );
}
