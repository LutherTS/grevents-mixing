import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { LinkButtonOnClick } from "~/components/link-button";
import { ManyContacts } from "~/components/many-contacts";
import { ManyUserQuestionFriendsShared } from "~/components/many-userquestionfriends";
import { OneCriteria } from "~/components/one-criteria";
import { PageLink } from "~/components/page-link";
import { PseudoForm } from "~/components/pseudo-form";
import { SignOutForm } from "~/components/sign-out-form";
import { StatusPersonalInfoCustomizedUserCriteriaToasts } from "~/components/status-personal-info-toasts";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  countUserPseudonativeIrlAnswersByUserId,
  countUserPseudonativeNotIrlAnswersByUserId,
  findAnswerByUserQuestionIDAndUserID,
} from "~/librairies/data/answers";
import { findUserFriendsNotToUserQuestionByUserQuestionIdAndUserId } from "~/librairies/data/contacts";
import { findUserQuestionFriendsByUserQuestionId } from "~/librairies/data/userquestionfriends";
import { findUserByUsername } from "~/librairies/data/users";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
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

  const [
    userQuestionFriends,
    userFriendsNotToUserQuestion,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswersCount,
  ] = await Promise.all([
    findUserQuestionFriendsByUserQuestionId(userQuestionAnswer.userQuestion.id),
    findUserFriendsNotToUserQuestionByUserQuestionIdAndUserId(
      userQuestionAnswer.userQuestion.id,
      user.id
    ),
    countUserPseudonativeNotIrlAnswersByUserId(user.id),
    countUserPseudonativeIrlAnswersByUserId(user.id),
  ]);

  return json({
    verifiedUser,
    user,
    userQuestionAnswer,
    userQuestionFriends,
    userFriendsNotToUserQuestion,
    userPseudonativeNotIrlAnswersCount,
    userPseudonativeIrlAnswersCount,
  });
};

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else {
    errorMessage = "Unknown error";
  }

  const navigate = useNavigate();

  function handlePreviousNavigation() {
    navigate(-1);
  }

  return (
    <>
      <div className="space-y-4 my-4">
        <p className="mt-2">{errorMessage}</p>
      </div>
      <PageLink href={`/`}>Return home</PageLink>
      <p className="mt-2">
        <LinkButtonOnClick
          handleClick={handlePreviousNavigation}
          disabled={false}
        >
          Or go back to the previous page
        </LinkButtonOnClick>
      </p>
    </>
  );
}

export default function UserCriteriaPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <StatusPersonalInfoCustomizedUserCriteriaToasts
        statusPersonalInfo={data.verifiedUser.statusPersonalInfo}
      />
      {data.userQuestionAnswer.userQuestion.kind === "PSEUDONATIVE" &&
        data.userPseudonativeIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT && (
          <p className="mb-2 cursor-default text-gray-500">
            You cannot have more than {DEFAULT_ANSWERS_LIMIT} of a given kind of
            criteria, pseudonative irl in this case, which is why you cannot up
            this pseudo criteria to irl at this time.
          </p>
        )}
      {data.userQuestionAnswer.userQuestion.kind === "PSEUDONATIVEIRL" &&
        data.userPseudonativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT && (
          <p className="mb-2 cursor-default text-gray-500">
            You cannot have more than {DEFAULT_ANSWERS_LIMIT} of a given kind of
            criteria, pseudonative in this case, which is why you cannot down
            this pseudo criteria from irl at this time.
          </p>
        )}
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
        {data.userQuestionAnswer.userQuestion.question.kind === "PSEUDO" &&
          data.userQuestionAnswer.userQuestion.kind === "PSEUDONATIVE" &&
          data.userPseudonativeIrlAnswersCount < DEFAULT_ANSWERS_LIMIT && (
            <>
              <PseudoForm answer={data.userQuestionAnswer} />
            </>
          )}
        {data.userQuestionAnswer.userQuestion.question.kind === "PSEUDO" &&
          data.userQuestionAnswer.userQuestion.kind === "PSEUDONATIVEIRL" &&
          data.userPseudonativeNotIrlAnswersCount < DEFAULT_ANSWERS_LIMIT && (
            <>
              <PseudoForm answer={data.userQuestionAnswer} />
            </>
          )}
        {data.userQuestionAnswer.userQuestion.question.kind === "CUSTOM" && (
          <div className="pt-2 space-y-4">
            {/* spacing to accomodate for new button Modify criteria */}
            <ManyContacts
              contacts={data.userFriendsNotToUserQuestion}
              answer={data.userQuestionAnswer}
              contactComponentRequired="OneContactAddable"
              label="Find your list of friend(s) to share to below"
              notLabel="No remaining friends yet."
            />
            <ManyUserQuestionFriendsShared
              userQuestionFriends={data.userQuestionFriends}
            />
          </div>
        )}
      </div>

      {(data.userQuestionAnswer.userQuestion.question.kind === "NATIVE" ||
        data.userQuestionAnswer.userQuestion.question.kind === "NATIVEIRL") && (
        <PageLink href={`../../standardized`}>
          To Standardized criteria
        </PageLink>
      )}
      {(data.userQuestionAnswer.userQuestion.question.kind === "PSEUDO" ||
        data.userQuestionAnswer.userQuestion.question.kind === "CUSTOM") && (
        <PageLink href={`../../customized`}>To Customized criteria</PageLink>
      )}
      <PageLink href={`../..`}>To Personal Info</PageLink>
    </>
  );
}
