import { Prisma } from "@prisma/client";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { ManyCriteria } from "~/components/many-criteria";
import { PageLink } from "~/components/page-link";
import {
  RelationCombinationBlockingBlockedPreviewed,
  RelationCombinationHasMeBlockedPreviewed,
  RelationCombinationIAmBlockingPreviewed,
  RelationCombinationNonePreviewed,
} from "~/components/relcombos-previewed";
import { SignOutForm } from "~/components/sign-out-form";
import { updateUserStatusDashboardById } from "~/librairies/changes/users";
import {
  findUserPinnedNotIrlAnswersByUserIdQueried,
  findUserUnpinnedNativeNotIrlAnswersByUserId,
  findUserUnpinnedPseudonativeNotIrlAnswersByUserId,
  findUserUnpinnedSharedToContactCustomAnswersQueried,
  findUserPinnedNotAndIrlAnswersByUserIdQueried,
  findUserUnpinnedNativeIrlAnswersByUserId,
  findUserUnpinnedPseudonativeIrlAnswersByUserId,
} from "~/librairies/data/answers";
import { findContactByUserFirstIdAndUserLastUsername } from "~/librairies/data/contacts";
import { findUserByUsername } from "~/librairies/data/users";
import { selectAnswers } from "~/librairies/subdata/answers";
import { selectContacts } from "~/librairies/subdata/contacts";
import { selectUser, selectVerifiedUser } from "~/librairies/subdata/users";
import { decideContactRelCombo } from "~/utilities/contacts";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

type QueriedPreviewLoaderByHand = {
  // because TypeScript Union Types are once again failing.
  verifiedUser: Prisma.UserGetPayload<{
    select: typeof selectVerifiedUser;
  }>;
  user: Prisma.UserGetPayload<{
    select: typeof selectUser;
  }>;
  userToQueriedContact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  userLast: string;
  relCombo: string;
  userPinnedNotIrlAnswersQueried?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userPinnedNotAndIrlAnswersQueried?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedNativeNotIrlAnswers?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedPseudonativeNotIrlAnswers?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedNativeIrlAnswers?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedPseudonativeIrlAnswers?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
  userUnpinnedSharedToContactCustomAnswers?: Prisma.AnswerGetPayload<{
    select: typeof selectAnswers;
  }>[];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.username, "Expected params.username");

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

  const url = new URL(request.url);
  const userLast = url.searchParams.get("userlast") || "";
  let relCombo = url.searchParams.get("relcombo") || "";

  const userToQueriedContact =
    await findContactByUserFirstIdAndUserLastUsername(user.id, userLast);

  if (userToQueriedContact && relCombo === "") {
    relCombo = decideContactRelCombo(userToQueriedContact, relCombo);
  }

  let userPinnedNotIrlAnswersQueried;
  let userPinnedNotAndIrlAnswersQueried;
  let userUnpinnedNativeNotIrlAnswers;
  let userUnpinnedPseudonativeNotIrlAnswers;
  let userUnpinnedNativeIrlAnswers;
  let userUnpinnedPseudonativeIrlAnswers;
  let userUnpinnedSharedToContactCustomAnswers;

  if (userToQueriedContact && relCombo === "friend") {
    [
      userPinnedNotIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    ] = await Promise.all([
      findUserPinnedNotIrlAnswersByUserIdQueried(
        user.id,
        userToQueriedContact.id
      ),
      findUserUnpinnedNativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedSharedToContactCustomAnswersQueried(
        user.id,
        userToQueriedContact.id
      ),
    ]);
    return json({
      verifiedUser,
      user,
      userToQueriedContact,
      userLast,
      relCombo,
      userPinnedNotIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    });
  } else if (userToQueriedContact && relCombo === "irl") {
    [
      userPinnedNotAndIrlAnswersQueried,
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
      findUserUnpinnedNativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedPseudonativeNotIrlAnswersByUserId(user.id),
      findUserUnpinnedNativeIrlAnswersByUserId(user.id),
      findUserUnpinnedPseudonativeIrlAnswersByUserId(user.id),
      findUserUnpinnedSharedToContactCustomAnswersQueried(
        user.id,
        userToQueriedContact.id
      ),
    ]);
    return json({
      verifiedUser,
      user,
      userToQueriedContact,
      userLast,
      relCombo,
      userPinnedNotAndIrlAnswersQueried,
      userUnpinnedNativeNotIrlAnswers,
      userUnpinnedPseudonativeNotIrlAnswers,
      userUnpinnedNativeIrlAnswers,
      userUnpinnedPseudonativeIrlAnswers,
      userUnpinnedSharedToContactCustomAnswers,
    });
  } else {
    return json({
      verifiedUser,
      user,
      userToQueriedContact,
      userLast,
      relCombo,
    });
  }
};

export default function QueriedPreviewPage() {
  const data: QueriedPreviewLoaderByHand = useLoaderData();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Queried Previews.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        {data.user.state === "DEACTIVATED" && data.userToQueriedContact && (
          <>
            <div>
              <p className="mt-2 font-semibold text-red-500">IMPORTANT</p>
              <p className="mt-2 text-red-500">
                You have deactivated your profile.
              </p>
              <p className="mt-2">
                This means the only user interface other users such as{" "}
                {data.userToQueriedContact.mirror?.userFirst.username} are able
                to see at this time is the following:
              </p>
              <p className="my-4">
                {data.user.username} has deactivated their profile.
              </p>
              <p className="mt-2">
                What you see now is what{" "}
                {data.userToQueriedContact.mirror?.userFirst.username} will be
                able to see once you'll have reactivated your profile.
              </p>
              <p className="mt-2">
                Specifically, this feature is designed to give you full control
                over what you want{" "}
                {data.userToQueriedContact.mirror?.userFirst.username} in this
                case and other users for that matter to have access to, before
                you make the decision to lift the veil on your profile.
              </p>
            </div>
            <div className="py-4">
              <div className="h-[1px] bg-black dark:bg-white w-[90%] mx-auto" />
            </div>
          </>
        )}
        {/* TypeScript desperately needs to get an upgrade. */}
        {data.user && data.userLast && data.relCombo === "none" && (
          <RelationCombinationNonePreviewed />
        )}
        {data.userPinnedNotIrlAnswersQueried && (
          <ManyCriteria
            answers={data.userPinnedNotIrlAnswersQueried}
            selectContext="QueriedPreview"
            answerComponentRequired="OneAnswer"
            label="Find their pinned for friend criteria below"
            notLabel="No pinned criteria yet."
          />
        )}
        {data.userPinnedNotAndIrlAnswersQueried && (
          <ManyCriteria
            answers={data.userPinnedNotAndIrlAnswersQueried}
            selectContext="QueriedPreview"
            answerComponentRequired="OneAnswer"
            label="Find their pinned for irl criteria below"
            notLabel="No pinned criteria yet."
          />
        )}
        {data.userUnpinnedNativeNotIrlAnswers && (
          <ManyCriteria
            answers={data.userUnpinnedNativeNotIrlAnswers}
            answerComponentRequired="OneAnswer"
            label="Find their (other) native criteria below"
            notLabel="No native criteria yet."
          />
        )}
        {data.userUnpinnedPseudonativeNotIrlAnswers && (
          <ManyCriteria
            answers={data.userUnpinnedPseudonativeNotIrlAnswers}
            answerComponentRequired="OneAnswer"
            label="Find their (other) pseudonative criteria below"
            notLabel="No pseudonative criteria yet."
          />
        )}
        {data.userUnpinnedNativeIrlAnswers && (
          <ManyCriteria
            answers={data.userUnpinnedNativeIrlAnswers}
            answerComponentRequired="OneAnswer"
            label="Find their (other) native irl criteria below"
            notLabel="No native irl criteria yet."
          />
        )}
        {data.userUnpinnedPseudonativeIrlAnswers && (
          <ManyCriteria
            answers={data.userUnpinnedPseudonativeIrlAnswers}
            answerComponentRequired="OneAnswer"
            label="Find their (other) pseudonative irl criteria below"
            notLabel="No pseudonative irl criteria yet."
          />
        )}
        {data.userUnpinnedSharedToContactCustomAnswers &&
          data.userUnpinnedSharedToContactCustomAnswers.length > 0 && (
            <ManyCriteria
              answers={data.userUnpinnedSharedToContactCustomAnswers}
              selectContext="QueriedPreview"
              answerComponentRequired="OneAnswer"
              label="See their (other) custom answers shared to you below"
              notLabel="No custom criteria yet."
            />
          )}
        {data.user && data.userLast && data.relCombo === "i-am-blocking" && (
          <RelationCombinationIAmBlockingPreviewed user={data.user} />
        )}
        {data.user && data.userLast && data.relCombo === "has-me-blocked" && (
          <RelationCombinationHasMeBlockedPreviewed user={data.user} />
        )}
        {data.user && data.userLast && data.relCombo === "blocking-blocked" && (
          <RelationCombinationBlockingBlockedPreviewed user={data.user} />
        )}
      </div>

      <PageLink href={`..`}>To Previews</PageLink>
      <PageLink href={`../../profile`}>To Your Profile</PageLink>
    </>
  );
}
