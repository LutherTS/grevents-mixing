import { Prisma } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { BackToDashboardLink } from "~/components/back-to-dashboard-link";
import { H1 } from "~/components/h1";
import { TextButtonOnClick } from "~/components/link-button";
import { ManyCriteria } from "~/components/many-criteria";
import { PageLink } from "~/components/page-link";
import { QueriedForm } from "~/components/queried-form";
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
import {
  decideContactRelCombo,
  defineContactRelCombo,
  relationCombinations,
} from "~/utilities/contacts";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

type QueriedPreviewLoaderByHand = {
  verifiedUser: Prisma.UserGetPayload<{
    select: typeof selectVerifiedUser;
  }>;
  user: Prisma.UserGetPayload<{
    select: typeof selectUser;
  }>;
  userToQueriedContact?: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  userLast?: string;
  relCombo?: string;
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
  userLastMessage?: string;
  relComboMessage?: string;
};

// This is going to be weird, or rather unexpected...
// But all validations will have to be made from the loader.
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

  if (userLast === "") {
    return json({
      verifiedUser,
      user,
    });
  }

  if (userLast === user.username) {
    return json(
      {
        verifiedUser,
        user,
        userLast,
        userLastMessage: "That's your own username you've entered.",
      },
      { status: 400 }
    );
  }

  const userToQueriedContact =
    await findContactByUserFirstIdAndUserLastUsername(user.id, userLast);

  if (!userToQueriedContact) {
    return json(
      {
        verifiedUser,
        user,
        userLast,
        userLastMessage:
          "You are not acquainted with any such user. (Usernames only.)",
      },
      { status: 404 }
    );
  }

  if (relCombo !== "" && !relationCombinations.includes(relCombo)) {
    return json(
      {
        verifiedUser,
        user,
        userToQueriedContact,
        userLast,
        relCombo,
        relComboMessage:
          "This is not a valid relation combination. (See above.)",
      },
      { status: 400 }
    );
  }

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

// Objectively speaking, the form, the action, are nothing more than intermediaries for what can be done through the URL. So since there is no controlling what people can write in the URL, there is no controlling what they should write on the form.
// The control then, should be done on what is obtained by the URL.
export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const userLast = form.get("userlast") || "";
  const relCombo = form.get("relcombo");

  const url = new URL(request.url);
  // const userLastSearchParam = url.searchParams.get("userlast") || "";
  const relComboSearchParam = url.searchParams.get("relcombo") || "";

  if (
    typeof userLast !== "string" ||
    (userLast == "" && !relCombo && relComboSearchParam === "")
  ) {
    throw redirect(`.`);
  }

  if (relCombo === null || relCombo === "") {
    throw redirect(`?userlast=${userLast}`);
  }

  if (typeof relCombo !== "string") {
    throw redirect(`.`);
  }

  throw redirect(`?userlast=${userLast}&relcombo=${relCombo}`);
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
        <TextButtonOnClick
          handleClick={handlePreviousNavigation}
          disabled={false}
        >
          Or go back to the previous page
        </TextButtonOnClick>
      </p>
    </>
  );
}

export default function QueriedPreviewPage() {
  const data: QueriedPreviewLoaderByHand = useLoaderData();

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Queried Previews.</H1>
      <BackToDashboardLink
        href={`/users/${data.verifiedUser.username}/dashboard`}
      />
      {data.verifiedUser && <SignOutForm />}

      <div className="space-y-4 my-4">
        <QueriedForm
          contact={data.userToQueriedContact}
          userLast={data.userLast}
          relCombo={data.relCombo}
          userLastMessage={data.userLastMessage}
          relComboMessage={data.relComboMessage}
        />
        <>
          {data.user.state === "DEACTIVATED" &&
            data.userToQueriedContact &&
            data.relCombo &&
            relationCombinations.includes(data.relCombo) && (
              <>
                <div>
                  <p className="mt-2 font-semibold text-red-500">IMPORTANT</p>
                  <p className="mt-2 text-red-500">
                    You have deactivated your profile.
                  </p>
                  <p className="mt-2">
                    This means the only user interface other users such as{" "}
                    {data.userToQueriedContact.mirror?.userFirst.username} are
                    able to see at this time is the following:
                  </p>
                  <p className="my-4">
                    {data.user.username} has deactivated their profile.
                  </p>
                  <p className="mt-2">
                    What you see now is what{" "}
                    {data.userToQueriedContact.mirror?.userFirst.username} will
                    be able to see once you'll have reactivated your profile.
                  </p>
                  <p className="mt-2">
                    Specifically, this feature is designed to give you full
                    control over what you want{" "}
                    {data.userToQueriedContact.mirror?.userFirst.username} in
                    this case and other users for that matter to have access to,
                    before you make the decision to lift the veil on your
                    profile.
                  </p>
                </div>
                <div className="py-4">
                  <div className="h-[1px] bg-black dark:bg-white w-[90%] mx-auto" />
                </div>
              </>
            )}
          {data.userToQueriedContact &&
            data.relCombo &&
            relationCombinations.includes(data.relCombo) && (
              <>
                {/* py-2 as makeshift styling */}
                <div className="py-2">
                  {data.userToQueriedContact.mirror?.userFirst.state ===
                  "DEACTIVATED" ? (
                    <>
                      <span className="font-semibold text-gray-500">
                        To{" "}
                        {
                          data.userToQueriedContact.mirror?.userFirst
                            .appWideName
                        }
                        &apos;s Profile
                      </span>
                    </>
                  ) : (
                    <>
                      <PageLink
                        href={`/users/${data.userToQueriedContact.mirror?.userFirst.username}/profile`}
                      >
                        To{" "}
                        {
                          data.userToQueriedContact.mirror?.userFirst
                            .appWideName
                        }
                        &apos;s Profile
                      </PageLink>
                      {data.userToQueriedContact.userFirst.state !==
                        "DEACTIVATED" && (
                        <>
                          <p className="mt-2">
                            Here&apos;s how{" "}
                            {
                              data.userToQueriedContact.mirror?.userFirst
                                .appWideName
                            }{" "}
                            {defineContactRelCombo(
                              data.userToQueriedContact
                            ) === data.relCombo ? (
                              <>is</>
                            ) : (
                              <>would be</>
                            )}{" "}
                            seeing yours.
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
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
              notLabel="No (other) native criteria yet."
            />
          )}
          {data.userUnpinnedPseudonativeNotIrlAnswers && (
            <ManyCriteria
              answers={data.userUnpinnedPseudonativeNotIrlAnswers}
              answerComponentRequired="OneAnswer"
              label="Find their (other) pseudonative criteria below"
              notLabel="No (other) pseudonative criteria yet."
            />
          )}
          {data.userUnpinnedNativeIrlAnswers && (
            <ManyCriteria
              answers={data.userUnpinnedNativeIrlAnswers}
              answerComponentRequired="OneAnswer"
              label="Find their (other) native irl criteria below"
              notLabel="No (other) native irl criteria yet."
            />
          )}
          {data.userUnpinnedPseudonativeIrlAnswers && (
            <ManyCriteria
              answers={data.userUnpinnedPseudonativeIrlAnswers}
              answerComponentRequired="OneAnswer"
              label="Find their (other) pseudonative irl criteria below"
              notLabel="No (other) pseudonative irl criteria yet."
            />
          )}
          {data.userUnpinnedSharedToContactCustomAnswers &&
            data.userUnpinnedSharedToContactCustomAnswers.length > 0 && (
              <ManyCriteria
                answers={data.userUnpinnedSharedToContactCustomAnswers}
                selectContext="QueriedPreview"
                answerComponentRequired="OneAnswer"
                label="See their (other) custom answers shared to you below"
                notLabel="No (other) custom criteria yet."
              />
            )}
          {data.user && data.userLast && data.relCombo === "i-am-blocking" && (
            <RelationCombinationIAmBlockingPreviewed user={data.user} />
          )}
          {data.user && data.userLast && data.relCombo === "has-me-blocked" && (
            <RelationCombinationHasMeBlockedPreviewed user={data.user} />
          )}
          {data.user &&
            data.userLast &&
            data.relCombo === "blocking-blocked" && (
              <RelationCombinationBlockingBlockedPreviewed user={data.user} />
            )}
        </>
      </div>

      <PageLink href={`..`}>To previews</PageLink>
      <PageLink href={`../../profile`}>To your profile</PageLink>
    </>
  );
}
