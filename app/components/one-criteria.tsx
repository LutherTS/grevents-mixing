import clsx from "clsx";
import { useFetcher } from "@remix-run/react";

import { PageLinkDivless } from "./page-link";
import {
  GlobalAnswerTypeByHand,
  PINNED_BY_USER_ANSWERS_LIMIT,
  DEFAULT_ANSWERS_LIMIT,
} from "~/librairies/subdata/answers";
import { PINNED_BY_FRIEND_ANSWERS_LIMIT } from "~/librairies/subdata/userquestionfriends";
import { selectContacts } from "~/librairies/subdata/contacts";
import { Prisma } from "@prisma/client";

////////

export type SelectContext =
  | "PersonalInfo"
  | "PersonalInfoCustomized"
  | "UserCriteria"
  | "ModifyCriteriaCustomized"
  | "QueriedPreview"
  | "Profile";

export type AnswerComponentRequired =
  | "OneAnswer"
  | "OneAnswerPinnable"
  | "OneAnswerPinnablePseudoable"
  | "OneAnswerModify"
  | "OneAnswerPinnableByFriend";

// FINAL TOP LEVEL COMPONENTS EXPORTED HERE

export function OneCriteria({
  answer,
  selectContext,
  pinnedAnswersCount,
  otherPseudonativeAnswersCount,
  answerComponentRequired,
  contact,
  answersPinnedbyFriendAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  selectContext?: SelectContext;
  pinnedAnswersCount?: number;
  otherPseudonativeAnswersCount?: number;
  answerComponentRequired: AnswerComponentRequired;
  contact?: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answersPinnedbyFriendAnswersCount?: number;
}) {
  return (
    <>
      <div>
        <OneQuestion answer={answer} selectContext={selectContext} />
        {answerComponentRequired === "OneAnswer" && (
          <OneAnswer answer={answer} />
        )}
        {answerComponentRequired === "OneAnswerPinnable" &&
          pinnedAnswersCount && (
            <OneAnswerPinnable
              answer={answer}
              pinnedAnswersCount={pinnedAnswersCount}
            />
          )}
        {answerComponentRequired === "OneAnswerPinnablePseudoable" &&
          pinnedAnswersCount &&
          otherPseudonativeAnswersCount && (
            <OneAnswerPinnablePseudoable
              answer={answer}
              pinnedAnswersCount={pinnedAnswersCount}
              otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}
            />
          )}
        {answerComponentRequired === "OneAnswerModify" && (
          <OneAnswerModify answer={answer} />
        )}
        {answerComponentRequired === "OneAnswerPinnableByFriend" &&
          contact &&
          typeof answersPinnedbyFriendAnswersCount === "number" &&
          answersPinnedbyFriendAnswersCount >= 0 && (
            <OneAnswerPinnableByFriend
              answer={answer}
              contact={contact}
              answersPinnedbyFriendAnswersCount={
                answersPinnedbyFriendAnswersCount
              }
            />
          )}
      </div>
    </>
  );
}

export function OneQuestion({
  answer,
  selectContext,
}: {
  answer: GlobalAnswerTypeByHand;
  // a type by hand is the only viable solution at this time
  // given variable depth and a variable number of arguments
  // https://dev.to/lucianbc/union-type-merging-in-typescript-9al
  selectContext?: string;
}) {
  return (
    <>
      <p className="mt-2">
        {answer.userQuestion.question.kind === "NATIVE" &&
          answer.userQuestion.kind === "NONE" && (
            <span className="text-violet-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / native
            </span>
          )}
        {answer.userQuestion.question.kind === "NATIVEIRL" &&
          answer.userQuestion.kind === "NONE" && (
            <span className="text-purple-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / native irl
            </span>
          )}
        {answer.userQuestion.question.kind === "PSEUDO" &&
          answer.userQuestion.kind === "PSEUDONATIVE" && (
            <span className="text-green-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / pseudonative
            </span>
          )}
        {answer.userQuestion.question.kind === "PSEUDO" &&
          answer.userQuestion.kind === "PSEUDONATIVEIRL" && (
            <span className="text-emerald-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / pseudonative irl
            </span>
          )}
        {/* no link, UserQuestionFriends counted */}
        {answer.userQuestion.question.kind === "CUSTOM" &&
          answer.userQuestion.kind === "NONE" &&
          answer.userQuestion._count &&
          (selectContext === "PersonalInfo" ||
            selectContext === "UserCriteria" ||
            selectContext === "ModifyCriteriaCustomized") && (
            <span className="text-lime-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / custom{" "}
              {answer.userQuestion._count.userQuestionFriends &&
              answer.userQuestion._count.userQuestionFriends >= 1 ? (
                <>/ shared ({answer.userQuestion._count.userQuestionFriends})</>
              ) : (
                <>/ not shared</>
              )}
            </span>
          )}
        {/* no link, UserQuestionFriends not counted */}
        {answer.userQuestion.question.kind === "CUSTOM" &&
          answer.userQuestion.kind === "NONE" &&
          (selectContext === "QueriedPreview" ||
            selectContext === "Profile") && (
            <span className="text-lime-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / custom / shared to you
            </span>
          )}
        {/* link, UserQuestionFriends counted */}
        {/* basically the only unused use case is: link, UserQuestionFriends not counted */}
        {answer.userQuestion.question.kind === "CUSTOM" &&
          answer.userQuestion.kind === "NONE" &&
          selectContext === "PersonalInfoCustomized" && (
            <PageLinkDivless
              href={`/users/${answer.user.username}/personal-info/customized/user-criteria/${answer.userQuestion.id}`}
              specifiedClasses="inline-block underline"
            >
              <span className="text-lime-500 underline hover:text-lime-400 dark:hover:text-lime-600">
                <span className="font-semibold">
                  {answer.userQuestion.question.name}
                </span>{" "}
                / custom{" "}
                {answer.userQuestion._count &&
                answer.userQuestion._count.userQuestionFriends >= 1 ? (
                  <>
                    / shared ({answer.userQuestion._count.userQuestionFriends})
                  </>
                ) : (
                  <>/ not shared</>
                )}
              </span>
            </PageLinkDivless>
          )}
      </p>
    </>
  );
}

export function OneAnswer({ answer }: { answer: GlobalAnswerTypeByHand }) {
  return (
    <>
      <div>
        <p
          className={
            answer.userQuestion.state === "HIDDEN"
              ? "mt-2 text-gray-500"
              : "mt-2"
          }
        >
          {answer.value}
        </p>
      </div>
    </>
  );
}

export function OneAnswerPinnable({
  answer,
  pinnedAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  pinnedAnswersCount: number;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {/* If you're still allowed to pin */}
        {pinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT && (
          <ButtonPinnableForm answer={answer} />
        )}
        {/* If you're only allowed to unpin */}
        {pinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT &&
          answer.userQuestion.isPinned === true && (
            <ButtonPinnableForm answer={answer} />
          )}
        <p
          className={
            answer.userQuestion.state === "HIDDEN"
              ? "text-gray-300 dark:text-gray-700"
              : "text-inherit"
          }
        >
          {answer.value}
        </p>
      </div>
    </>
  );
}

function ButtonPinnableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/pin-answer"
        method="post"
        className="me-2 flex items-center"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className={clsx(
            "h-4 w-4 rounded-full disabled:!bg-gray-500 disabled:hover:!bg-gray-500",
            {
              "bg-cyan-500 hover:bg-pink-300 dark:hover:bg-pink-700":
                answer.userQuestion.isPinned === true,
              "bg-pink-500 hover:bg-cyan-300 dark:hover:bg-cyan-700":
                answer.userQuestion.isPinned === false,
            }
          )}
        />
      </fetcher.Form>
    </>
  );
}

export function OneAnswerPinnablePseudoable({
  answer,
  pinnedAnswersCount,
  otherPseudonativeAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  pinnedAnswersCount: number;
  otherPseudonativeAnswersCount: number;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {/* If you're still allowed to pin */}
        {pinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT && (
          <ButtonPinnableForm answer={answer} />
        )}
        {/* If you're only allowed to unpin */}
        {pinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT &&
          answer.userQuestion.isPinned === true && (
            <ButtonPinnableForm answer={answer} />
          )}
        <p>{answer.value}</p>
        {/* If both are max out, you'll have to delete an "otherPseudonativeAnswer" to re-access pseudo-answer. */}
        {otherPseudonativeAnswersCount < DEFAULT_ANSWERS_LIMIT && (
          <ButtonPseudoableForm answer={answer} />
        )}
      </div>
    </>
  );
}

function ButtonPseudoableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/pseudo-answer"
        method="post"
        className="ms-2 flex items-center"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className={clsx(
            "h-4 w-4 rounded-full bg-yellow-500 disabled:!bg-gray-500 disabled:hover:bg-gray-500",
            {
              "hover:bg-emerald-300 dark:hover:bg-emerald-700":
                answer.userQuestion.question.kind === "PSEUDO" &&
                answer.userQuestion.kind === "PSEUDONATIVE",
              "hover:bg-green-300 dark:hover:bg-green-700":
                answer.userQuestion.question.kind === "PSEUDO" &&
                answer.userQuestion.kind === "PSEUDONATIVEIRL",
            }
          )}
        />
      </fetcher.Form>
    </>
  );
}

export function OneAnswerModify({
  answer,
}: {
  answer: GlobalAnswerTypeByHand;
}) {
  return (
    <>
      <div className="relative mt-2 inline-flex items-center justify-center">
        <OneAnswerModifyForm answer={answer} />
        <ButtonHiddableForm answer={answer} />
      </div>
    </>
  );
}

function OneAnswerModifyForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/modify-answer" method="post">
        <label className="sr-only" htmlFor={answer.id}>
          Modify answer &quot;{answer.value}&quot;
        </label>
        <input type="hidden" name="answerid" value={answer.id} />
        <input
          className="w-[32ch] max-w-[50ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id={answer.id}
          name="answervalue"
          placeholder={answer.value}
          disabled={
            fetcher.state !== "idle" ||
            (answer.userQuestion.question.kind === "NATIVE" &&
              answer.userQuestion.question.name === "Email address")
          }
        />
        {/* Currently necessary to send the full form via Enter */}
        <button type="submit" className="hidden">
          Submit
        </button>
      </fetcher.Form>
    </>
  );
}

function ButtonHiddableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
  const fetcher = useFetcher();

  return (
    <>
      {answer.userQuestion.question.kind === "NATIVE" &&
        answer.userQuestion.question.name === "Email address" && (
          <form
            action="/hide-user-question"
            method="post"
            className="absolute right-4 flex items-center"
          >
            <input type="hidden" name="answerid" value={answer.id} />
            <button
              disabled={fetcher.state !== "idle"}
              className={clsx(
                "h-4 w-4 rounded-full disabled:!bg-gray-400 disabled:hover:bg-gray-400 dark:disabled:!bg-gray-600 dark:disabled:hover:bg-gray-600",
                {
                  "bg-cyan-500 hover:bg-pink-300 dark:hover:bg-pink-700":
                    answer.userQuestion.state === "LIVE",
                  "bg-pink-500 hover:bg-cyan-300 dark:hover:bg-cyan-700":
                    answer.userQuestion.state === "HIDDEN",
                }
              )}
            />
          </form>
        )}
    </>
  );
}

export function OneAnswerPinnableByFriend({
  answer,
  contact,
  answersPinnedbyFriendAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answersPinnedbyFriendAnswersCount: number;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {answersPinnedbyFriendAnswersCount < PINNED_BY_FRIEND_ANSWERS_LIMIT && (
          <ButtonPinnableByFriendForm answer={answer} contact={contact} />
        )}
        <p>{answer.value}</p>
      </div>
    </>
  );
}

function ButtonPinnableByFriendForm({
  answer,
  contact,
}: {
  answer: GlobalAnswerTypeByHand;
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/pin-user-question-friend"
        method="post"
        className="me-2 flex items-center"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <input type="hidden" name="contactid" value={contact.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className="h-4 w-4 rounded-full bg-cyan-500 hover:bg-cyan-300 disabled:!bg-gray-500 disabled:hover:bg-gray-500 dark:hover:bg-cyan-700"
        />
      </fetcher.Form>
    </>
  );
}
