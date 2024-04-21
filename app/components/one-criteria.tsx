import clsx from "clsx";
import { useFetcher } from "@remix-run/react";
import { Prisma } from "@prisma/client";
import { JsonifyObject } from "type-fest/source/jsonify";
// import { useEffect, useRef } from "react";

import { PageLinkDivless } from "./page-link";
import {
  GlobalAnswerTypeByHand,
  PINNED_BY_USER_ANSWERS_LIMIT,
  PINNED_FOR_SELF_ANSWERS_LIMIT,
} from "~/librairies/subdata/answers";
import {
  PINNED_BY_FRIEND_ANSWERS_LIMIT,
  PINNED_OF_FRIENDS_ANSWERS_LIMIT,
} from "~/librairies/subdata/userquestionfriends";
import { selectContacts } from "~/librairies/subdata/contacts";
import { FormButton } from "./form-button";

export type SelectContext =
  | "Dashboard"
  | "PersonalInfo"
  | "PersonalInfoStandardized"
  | "PersonalInfoCustomized"
  | "UserCriteria"
  | "ModifyCriteriaStandardized" // bound for obsolescence
  | "ModifyCriteriaCustomized"
  | "QueriedPreview"
  | "Profile";

export type AnswerComponentRequired =
  | "OneAnswer"
  | "OneAnswerRePinnableForSelf"
  | "OneAnswerRePinnable"
  | "OneAnswerPinnable"
  | "OneAnswerModify"
  | "OneAnswerPinnableByFriend";

export function OneCriteria({
  answer,
  selectContext,
  pinnedAnswersForSelfCount,
  pinnedAnswersCount,
  answerComponentRequired,
  contact,
  answersPinnedbyFriendAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  selectContext?: SelectContext;
  pinnedAnswersForSelfCount?: number;
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
        {answerComponentRequired === "OneAnswerRePinnableForSelf" && (
          <OneAnswerRePinnableForSelf answer={answer} />
        )}
        {answerComponentRequired === "OneAnswerRePinnable" && (
          <OneAnswerRePinnable answer={answer} />
        )}
        {answerComponentRequired === "OneAnswerPinnable" &&
          typeof pinnedAnswersForSelfCount === "number" &&
          typeof pinnedAnswersCount === "number" && (
            <OneAnswerPinnable
              answer={answer}
              pinnedAnswersForSelfCount={pinnedAnswersForSelfCount}
              pinnedAnswersCount={pinnedAnswersCount}
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
  selectContext?: SelectContext;
}) {
  return (
    <>
      <p className="mt-2">
        {/* native */}
        {answer.userQuestion.question.kind === "NATIVE" &&
          answer.userQuestion.kind === "NONE" && (
            <span className="text-violet-500">
              {selectContext === "Dashboard" ||
              selectContext === "PersonalInfo" ||
              selectContext === "PersonalInfoStandardized" ? (
                <>
                  <PageLinkDivless
                    href={`/users/${answer.user.username}/personal-info/user-criteria/${answer.userQuestion.id}`}
                    specifiedClasses="inline-block underline hover:text-violet-400 dark:hover:text-violet-600 font-semibold decoration-dotted"
                  >
                    {answer.userQuestion.question.name}
                  </PageLinkDivless>
                </>
              ) : (
                <>
                  <span className="font-semibold">
                    {answer.userQuestion.question.name}
                  </span>
                </>
              )}
            </span>
          )}
        {/* native irl */}
        {answer.userQuestion.question.kind === "NATIVEIRL" &&
          answer.userQuestion.kind === "NONE" && (
            <span className="text-purple-500">
              {selectContext === "Dashboard" ||
              selectContext === "PersonalInfo" ||
              selectContext === "PersonalInfoStandardized" ? (
                <>
                  <PageLinkDivless
                    href={`/users/${answer.user.username}/personal-info/user-criteria/${answer.userQuestion.id}`}
                    specifiedClasses="inline-block underline hover:text-purple-400 dark:hover:text-purple-600 font-semibold decoration-dotted"
                  >
                    {answer.userQuestion.question.name}
                  </PageLinkDivless>
                </>
              ) : (
                <>
                  <span className="font-semibold">
                    {answer.userQuestion.question.name}
                  </span>
                </>
              )}
            </span>
          )}
        {/* pseudonative */}
        {answer.userQuestion.question.kind === "PSEUDO" &&
          answer.userQuestion.kind === "PSEUDONATIVE" && (
            <span className="text-green-500">
              {selectContext === "Dashboard" ||
              selectContext === "PersonalInfo" ||
              selectContext === "PersonalInfoCustomized" ? (
                <>
                  <PageLinkDivless
                    href={`/users/${answer.user.username}/personal-info/user-criteria/${answer.userQuestion.id}`}
                    specifiedClasses="inline-block underline hover:text-green-400 dark:hover:text-green-600 font-semibold decoration-dashed"
                  >
                    {answer.userQuestion.question.name}
                  </PageLinkDivless>
                </>
              ) : (
                <>
                  <span className="font-semibold">
                    {answer.userQuestion.question.name}
                  </span>
                </>
              )}
            </span>
          )}
        {/* pseudonative irl */}
        {answer.userQuestion.question.kind === "PSEUDO" &&
          answer.userQuestion.kind === "PSEUDONATIVEIRL" && (
            <span className="text-emerald-500">
              {selectContext === "Dashboard" ||
              selectContext === "PersonalInfo" ||
              selectContext === "PersonalInfoCustomized" ? (
                <>
                  <PageLinkDivless
                    href={`/users/${answer.user.username}/personal-info/user-criteria/${answer.userQuestion.id}`}
                    specifiedClasses="inline-block underline hover:text-emerald-400 dark:hover:text-emerald-600 font-semibold decoration-dashed"
                  >
                    {answer.userQuestion.question.name}
                  </PageLinkDivless>
                </>
              ) : (
                <>
                  <span className="font-semibold">
                    {answer.userQuestion.question.name}
                  </span>
                </>
              )}
            </span>
          )}
        {/* custom, no link, UserQuestionFriends counted */}
        {answer.userQuestion.question.kind === "CUSTOM" &&
          answer.userQuestion.kind === "NONE" &&
          answer.userQuestion._count &&
          (selectContext === "UserCriteria" ||
            selectContext === "ModifyCriteriaCustomized") && (
            <span className="text-lime-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              {typeof answer.userQuestion._count.userQuestionFriends ===
                "number" &&
              answer.userQuestion._count.userQuestionFriends >= 1 ? (
                <>/ shared ({answer.userQuestion._count.userQuestionFriends})</>
              ) : (
                <>/ not shared</>
              )}
            </span>
          )}
        {/* custom, no link, UserQuestionFriends not counted */}
        {answer.userQuestion.question.kind === "CUSTOM" &&
          answer.userQuestion.kind === "NONE" &&
          (selectContext === "QueriedPreview" ||
            selectContext === "Profile") && (
            <span className="text-lime-500">
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              / shared to you
            </span>
          )}
        {/* custom, link, UserQuestionFriends counted */}
        {answer.userQuestion.question.kind === "CUSTOM" &&
          answer.userQuestion.kind === "NONE" &&
          answer.userQuestion._count &&
          (selectContext === "Dashboard" ||
            selectContext === "PersonalInfo" ||
            selectContext === "PersonalInfoCustomized") && (
            <PageLinkDivless
              href={`/users/${answer.user.username}/personal-info/user-criteria/${answer.userQuestion.id}`}
              specifiedClasses="inline-block underline text-lime-500 hover:text-lime-400 dark:hover:text-lime-600"
            >
              <span className="font-semibold">
                {answer.userQuestion.question.name}
              </span>{" "}
              {typeof answer.userQuestion._count.userQuestionFriends ===
                "number" &&
              answer.userQuestion._count.userQuestionFriends >= 1 ? (
                <>/ shared ({answer.userQuestion._count.userQuestionFriends})</>
              ) : (
                <>/ not shared</>
              )}
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
              ? "mt-2 text-gray-300 dark:text-gray-700"
              : "mt-2 text-inherit"
          }
        >
          {/* Adding a source is currently only available on customized criteria. */}
          {answer.source ? (
            <>
              <PageLinkDivless
                href={answer.source}
                specifiedClasses="inline-block text-black dark:text-white underline hover:text-neutral-500 dark:hover:text-neutral-500"
                specifiedTarget="_blank"
              >
                {answer.value}
              </PageLinkDivless>
            </>
          ) : (
            <>{answer.value}</>
          )}
        </p>
      </div>
    </>
  );
}

export function OneAnswerRePinnableForSelf({
  answer,
}: {
  answer: GlobalAnswerTypeByHand;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {/* old */}
        {/* <ButtonPinnableForSelfForm answer={answer} /> */}
        <p
          className={
            answer.userQuestion.state === "HIDDEN"
              ? "text-gray-300 dark:text-gray-700"
              : "text-inherit"
          }
        >
          {answer.source ? (
            <>
              <PageLinkDivless
                href={answer.source}
                specifiedClasses="inline-block text-black dark:text-white underline hover:text-neutral-500 dark:hover:text-neutral-500"
                specifiedTarget="_blank"
              >
                {answer.value}
              </PageLinkDivless>
            </>
          ) : (
            <>{answer.value}</>
          )}
        </p>
        {/* old */}
        {/* <ButtonRePinnableForSelfForm answer={answer} /> */}
      </div>
      {/* new */}
      <p className="mt-2">
        <TextButtonPinnableForSelfForm answer={answer} /> /{" "}
        <TextButtonRePinnableForSelfForm answer={answer} />
      </p>
    </>
  );
}

// For style purposes I'm going to have to render two buttons,
// because span colors override those of disabled.
function TextButtonPinnableForSelfForm({
  answer,
  pinnedAnswersForSelfCount,
}: {
  answer: GlobalAnswerTypeByHand;
  pinnedAnswersForSelfCount?: number;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/pin-answer-for-self"
        method="post"
        className="inline"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={
            fetcher.state !== "idle" ||
            (typeof pinnedAnswersForSelfCount === "number" &&
              pinnedAnswersForSelfCount >= PINNED_FOR_SELF_ANSWERS_LIMIT &&
              answer.userQuestion.isPinnedForSelf === false)
          }
          className={clsx(
            "disabled:!text-gray-500 disabled:hover:!text-gray-500",
            {
              "text-cyan-500 hover:text-cyan-300 dark:hover:text-cyan-700":
                answer.userQuestion.isPinnedForSelf === true,
              "text-sky-500 hover:text-sky-300 dark:hover:text-sky-700":
                answer.userQuestion.isPinnedForSelf === false,
            }
          )}
        >
          {answer.userQuestion.isPinnedForSelf === true && <>Unpin for self</>}
          {answer.userQuestion.isPinnedForSelf === false && <>Pin for self</>}
        </button>
      </fetcher.Form>
    </>
  );
}

function TextButtonRePinnableForSelfForm({
  answer,
}: {
  answer: GlobalAnswerTypeByHand;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/re-pin-answer-for-self"
        method="post"
        className="inline"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className="disabled:!text-gray-500 disabled:hover:!text-gray-500 text-indigo-500 hover:text-indigo-300 dark:hover:text-indigo-700"
        >
          Repin for self
        </button>
      </fetcher.Form>
    </>
  );
}

export function OneAnswerRePinnable({
  answer,
}: {
  answer: GlobalAnswerTypeByHand;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {/* old */}
        {/* <ButtonUnpinnableForm answer={answer} /> */}
        <p
          className={
            answer.userQuestion.state === "HIDDEN"
              ? "text-gray-300 dark:text-gray-700"
              : "text-inherit"
          }
        >
          {answer.source ? (
            <>
              <PageLinkDivless
                href={answer.source}
                specifiedClasses="inline-block text-black dark:text-white underline hover:text-neutral-500 dark:hover:text-neutral-500"
                specifiedTarget="_blank"
              >
                {answer.value}
              </PageLinkDivless>
            </>
          ) : (
            <>{answer.value}</>
          )}
        </p>
        {/* old */}
        {/* <ButtonRePinnableForm answer={answer} /> */}
      </div>
      {/* new */}
      <p className="mt-2">
        <TextButtonPinnableForm answer={answer} /> /{" "}
        <TextButtonRePinnableForm answer={answer} />
      </p>
    </>
  );
}

function TextButtonPinnableForm({
  answer,
  pinnedAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  pinnedAnswersCount?: number;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/pin-answer" method="post" className="inline">
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={
            fetcher.state !== "idle" ||
            (typeof pinnedAnswersCount === "number" &&
              pinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT &&
              answer.userQuestion.isPinned === false)
          }
          className={clsx(
            "disabled:!text-gray-500 disabled:hover:!text-gray-500",
            {
              "text-cyan-500 hover:text-cyan-300 dark:hover:text-cyan-700":
                answer.userQuestion.isPinned === true,
              "text-sky-500 hover:text-sky-300 dark:hover:text-sky-700":
                answer.userQuestion.isPinned === false,
            }
          )}
        >
          {answer.userQuestion.isPinned === true && <>Unpin</>}
          {answer.userQuestion.isPinned === false && <>Pin</>}
        </button>
      </fetcher.Form>
    </>
  );
}

function TextButtonRePinnableForm({
  answer,
}: {
  answer: GlobalAnswerTypeByHand;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/re-pin-answer" method="post" className="inline">
        <input type="hidden" name="answerid" value={answer.id} />
        <button
          disabled={fetcher.state !== "idle"}
          className="disabled:!text-gray-500 disabled:hover:!text-gray-500 text-indigo-500 hover:text-indigo-300 dark:hover:text-indigo-700"
        >
          Repin
        </button>
      </fetcher.Form>
    </>
  );
}

export function OneAnswerPinnable({
  answer,
  pinnedAnswersForSelfCount,
  pinnedAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  pinnedAnswersForSelfCount: number;
  pinnedAnswersCount: number;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        {/* old */}
        {/* if you're still allowed to pin for self */}
        {/* {pinnedAnswersForSelfCount < PINNED_FOR_SELF_ANSWERS_LIMIT && (
          <ButtonPinnableForSelfForm answer={answer} />
        )} */}
        {/* if you're only allowed to unpin for self */}
        {/* {pinnedAnswersForSelfCount >= PINNED_FOR_SELF_ANSWERS_LIMIT &&
          answer.userQuestion.isPinnedForSelf === true && (
            <ButtonPinnableForSelfForm answer={answer} />
          )} */}
        <p
          className={
            answer.userQuestion.state === "HIDDEN"
              ? "text-gray-300 dark:text-gray-700"
              : "text-inherit"
          }
        >
          {answer.source ? (
            <>
              <PageLinkDivless
                href={answer.source}
                specifiedClasses="inline-block text-black dark:text-white underline hover:text-neutral-500 dark:hover:text-neutral-500"
                specifiedTarget="_blank"
              >
                {answer.value}
              </PageLinkDivless>
            </>
          ) : (
            <>{answer.value}</>
          )}
        </p>
        {/* old */}
        {/* if you're still allowed to pin */}
        {/* {pinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT && (
          <ButtonPinnableForm answer={answer} />
        )} */}
        {/* if you're only allowed to unpin */}
        {/* {pinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT &&
          answer.userQuestion.isPinned === true && (
            <ButtonPinnableForm answer={answer} />
          )} */}
      </div>
      {/* new */}
      <p className="mt-2">
        <TextButtonPinnableForm
          answer={answer}
          pinnedAnswersCount={pinnedAnswersCount}
        />{" "}
        /{" "}
        <TextButtonPinnableForSelfForm
          answer={answer}
          pinnedAnswersForSelfCount={pinnedAnswersForSelfCount}
        />
      </p>
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
        {(answer.userQuestion.question.kind === "NATIVE" ||
          answer.userQuestion.question.kind === "NATIVEIRL") && (
          <OneAnswerModifyForm answer={answer} />
        )}
        {(answer.userQuestion.question.kind === "PSEUDO" ||
          answer.userQuestion.question.kind === "CUSTOM") && (
          <OneAnswerModifySourcedForm answer={answer} />
        )}
        {/* old */}
        {/* <ButtonHiddableForm answer={answer} /> */}
      </div>
    </>
  );
}

type ModifyAnswerByHand = JsonifyObject<{
  errors?: {
    answerId?: string[];
    answerModifiedValue?: string[];
  };
  message?: string;
}>;

function OneAnswerModifyForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
  const fetcher = useFetcher<ModifyAnswerByHand>();

  // const resetRef = useRef<HTMLFormElement>(null);
  // // const focusRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   if (fetcher.state !== "submitting") {
  //     resetRef.current?.reset();
  //     // focusRef.current?.focus();
  //   }
  // }, [fetcher.state === "submitting"]);
  // // https://www.youtube.com/watch?v=bMLej7bg5Zo
  // // https://sergiodxa.com/tutorials/reset-a-form-on-success-in-remix

  return (
    <>
      <fetcher.Form
        // ref={resetRef}
        action="/modify-answer"
        method="post"
      >
        <label className="sr-only" htmlFor={answer.id}>
          Modify answer &quot;{answer.value}&quot;
        </label>
        <input type="hidden" name="answerid" value={answer.id} />
        <input
          // // ref={focusRef}
          className="w-[32ch] max-w-[50ch] placeholder:truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id={answer.id}
          name="answervalue"
          placeholder={answer.value}
          defaultValue={answer.value} // new way to go
          disabled={
            fetcher.state !== "idle" ||
            (answer.userQuestion.question.kind === "NATIVE" &&
              answer.userQuestion.question.name === "Email address")
          }
        />
        {fetcher.data?.errors?.answerModifiedValue ? (
          <div id={`${answer.id}-error`} aria-live="polite">
            {fetcher.data.errors.answerModifiedValue.map((error) => (
              <p className="mt-2 text-red-500 font-light" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
        {answer.userQuestion.question.kind === "NATIVE" &&
        answer.userQuestion.question.name === "Email address" ? (
          <>
            {/* necessary to send the full form via Enter */}
            <button type="submit" className="hidden">
              Submit
            </button>
          </>
        ) : (
          <>
            <FormButton
              disabled={fetcher.state !== "idle"}
              specifiedClasses="mt-4 w-full max-w-[40ch] rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-blue-600 dark:disabled:hover:!bg-gray-500"
            >
              Modify criteria
            </FormButton>
          </>
        )}
        {fetcher.data?.message ? (
          <div id={`${answer.id}-form-error`} aria-live="polite">
            <p className="mt-2 text-red-500">{fetcher.data.message}</p>
          </div>
        ) : null}
      </fetcher.Form>
    </>
  );
}

type ModifyAnswerSourcedByHand = JsonifyObject<{
  errors?: {
    answerId?: string[];
    answerModifiedValue?: string[];
    answerSource?: string[];
  };
  message?: string;
}>;

function OneAnswerModifySourcedForm({
  answer,
}: {
  answer: GlobalAnswerTypeByHand;
}) {
  const fetcher = useFetcher<ModifyAnswerSourcedByHand>();

  return (
    <>
      <fetcher.Form action="/modify-answer-sourced" method="post">
        <label className="sr-only" htmlFor={answer.id}>
          Modify answer &quot;{answer.value}&quot;
        </label>
        <input type="hidden" name="answerid" value={answer.id} />
        <input
          className="w-[32ch] max-w-[50ch] placeholder:truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id={`${answer.id}-value`}
          name="answervalue"
          placeholder={answer.value}
          defaultValue={answer.value}
          disabled={fetcher.state !== "idle"}
        />
        {fetcher.data?.errors?.answerModifiedValue ? (
          <div id={`${answer.id}-value-error`} aria-live="polite">
            {fetcher.data.errors.answerModifiedValue.map((error) => (
              <p className="mt-2 text-red-500 font-light" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
        <input
          className="mt-4 w-[32ch] max-w-[50ch] placeholder:truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
          type="text"
          id={`${answer.id}-source`}
          name="answersource"
          placeholder={answer.source || "optional URL source"}
          defaultValue={answer.source || undefined}
          disabled={fetcher.state !== "idle"}
        />
        {fetcher.data?.errors?.answerSource ? (
          <div id={`${answer.id}-source-error`} aria-live="polite">
            {fetcher.data.errors.answerSource.map((error) => (
              <p className="mt-2 text-red-500 font-light" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
        <FormButton
          disabled={fetcher.state !== "idle"}
          specifiedClasses="mt-4 w-full max-w-[40ch] rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-blue-600 dark:disabled:hover:!bg-gray-500"
        >
          Modify criteria
        </FormButton>
        {fetcher.data?.message ? (
          <div id={`${answer.id}-form-error`} aria-live="polite">
            <p className="mt-2 text-red-500">{fetcher.data.message}</p>
          </div>
        ) : null}
      </fetcher.Form>
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
        {/* old */}
        {/* {answersPinnedbyFriendAnswersCount < PINNED_BY_FRIEND_ANSWERS_LIMIT && (
          <ButtonPinnableByFriendForm answer={answer} contact={contact} />
        )} */}
        <p>
          {answer.source ? (
            <>
              <PageLinkDivless
                href={answer.source}
                specifiedClasses="inline-block text-black dark:text-white underline hover:text-neutral-500 dark:hover:text-neutral-500"
                specifiedTarget="_blank"
              >
                {answer.value}
              </PageLinkDivless>
            </>
          ) : (
            <>{answer.value}</>
          )}
        </p>
      </div>
      {/* new */}
      {/* <p className="mt-2">
        <TextButtonPinnableByFriendForm
          answer={answer}
          contact={contact}
          answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
        />
      </p> */}
      {/* working on pinnedOfFriends */}
      <p className="mt-2">
        <TextButtonPinnableByFriendForm
          answer={answer}
          contact={contact}
          answersPinnedbyFriendAnswersCount={answersPinnedbyFriendAnswersCount}
        />{" "}
        /{" "}
        <TextButtonPinnableOfFriendsForm
          answer={answer}
          contact={contact}
          answersPinnedOfFriendsAnswersCount={answersPinnedbyFriendAnswersCount}
        />
      </p>
    </>
  );
}

function TextButtonPinnableByFriendForm({
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
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/pin-user-question-friend"
        method="post"
        className="inline"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <input type="hidden" name="contactid" value={contact.id} />
        <button
          disabled={
            fetcher.state !== "idle" ||
            answersPinnedbyFriendAnswersCount >= PINNED_BY_FRIEND_ANSWERS_LIMIT
          }
          className="disabled:!text-gray-500 disabled:hover:!text-gray-500 text-sky-500 hover:text-sky-300 dark:hover:text-sky-700"
        >
          Pin for you
        </button>
      </fetcher.Form>
    </>
  );
}

function TextButtonPinnableOfFriendsForm({
  answer,
  contact,
  answersPinnedOfFriendsAnswersCount,
}: {
  answer: GlobalAnswerTypeByHand;
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answersPinnedOfFriendsAnswersCount: number;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/pin-user-question-friend"
        method="post"
        className="inline"
      >
        <input type="hidden" name="answerid" value={answer.id} />
        <input type="hidden" name="contactid" value={contact.id} />
        <button
          disabled={
            fetcher.state !== "idle" ||
            answersPinnedOfFriendsAnswersCount >=
              PINNED_OF_FRIENDS_ANSWERS_LIMIT
          }
          className="disabled:!text-gray-500 disabled:hover:!text-gray-500 text-sky-500 hover:text-sky-300 dark:hover:text-sky-700"
        >
          Pin of friends
        </button>
      </fetcher.Form>
    </>
  );
}

/* ARCHIVES
All previous buttons will be kept as comments below. And their implementation will still remain in the code above as comments, until I manage to find a solution the problem I showcased here: https://play.tailwindcss.com/ID2X1qT2KU.
*/

// function ButtonPinnableForSelfForm({
//   answer,
// }: {
//   answer: GlobalAnswerTypeByHand;
// }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/pin-answer-for-self"
//         method="post"
//         className="me-2 flex items-center"
//       >
//         <input type="hidden" name="answerid" value={answer.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className={clsx(
//             "h-4 w-4 rounded-full disabled:!bg-gray-500 disabled:hover:!bg-gray-500",
//             {
//               "bg-sky-500 hover:bg-rose-300 dark:hover:bg-rose-700":
//                 answer.userQuestion.isPinnedForSelf === true,
//               "bg-rose-500 hover:bg-sky-300 dark:hover:bg-sky-700":
//                 answer.userQuestion.isPinnedForSelf === false,
//             }
//           )}
//         />
//       </fetcher.Form>
//     </>
//   );
// }

// function ButtonRePinnableForSelfForm({
//   answer,
// }: {
//   answer: GlobalAnswerTypeByHand;
// }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/re-pin-answer-for-self"
//         method="post"
//         className="ms-2 flex items-center"
//       >
//         <input type="hidden" name="answerid" value={answer.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className="h-4 w-4 rounded-full disabled:!bg-gray-500 disabled:hover:!bg-gray-500 bg-indigo-500 hover:bg-indigo-300 dark:hover:bg-indigo-700"
//         />
//       </fetcher.Form>
//     </>
//   );
// }

// function ButtonUnpinnableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/pin-answer"
//         method="post"
//         className="me-2 flex items-center"
//       >
//         <input type="hidden" name="answerid" value={answer.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className="h-4 w-4 rounded-full disabled:!bg-gray-500 disabled:hover:!bg-gray-500 bg-cyan-500 hover:bg-pink-300 dark:hover:bg-pink-700"
//         />
//       </fetcher.Form>
//     </>
//   );
// }

// function ButtonRePinnableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/re-pin-answer"
//         method="post"
//         className="ms-2 flex items-center"
//       >
//         <input type="hidden" name="answerid" value={answer.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className="h-4 w-4 rounded-full disabled:!bg-gray-500 disabled:hover:!bg-gray-500 bg-indigo-500 hover:bg-indigo-300 dark:hover:bg-indigo-700"
//         />
//       </fetcher.Form>
//     </>
//   );
// }

// function ButtonPinnableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/pin-answer"
//         method="post"
//         className="ms-2 flex items-center"
//       >
//         <input type="hidden" name="answerid" value={answer.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className={clsx(
//             "h-4 w-4 rounded-full disabled:!bg-gray-500 disabled:hover:!bg-gray-500",
//             {
//               "bg-cyan-500 hover:bg-pink-300 dark:hover:bg-pink-700":
//                 answer.userQuestion.isPinned === true,
//               "bg-pink-500 hover:bg-cyan-300 dark:hover:bg-cyan-700":
//                 answer.userQuestion.isPinned === false,
//             }
//           )}
//         />
//       </fetcher.Form>
//     </>
//   );
// }

// function ButtonHiddableForm({ answer }: { answer: GlobalAnswerTypeByHand }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       {answer.userQuestion.question.kind === "NATIVE" &&
//         answer.userQuestion.question.name === "Email address" && (
//           <form
//             action="/hide-user-question"
//             method="post"
//             className="absolute right-4 flex items-center"
//           >
//             <input type="hidden" name="answerid" value={answer.id} />
//             <button
//               disabled={fetcher.state !== "idle"}
//               className={clsx(
//                 "h-4 w-4 rounded-full disabled:!bg-gray-400 disabled:hover:!bg-gray-400 dark:disabled:!bg-gray-600 dark:disabled:hover:!bg-gray-600",
//                 {
//                   "bg-cyan-500 hover:bg-pink-300 dark:hover:bg-pink-700":
//                     answer.userQuestion.state === "LIVE",
//                   "bg-pink-500 hover:bg-cyan-300 dark:hover:bg-cyan-700":
//                     answer.userQuestion.state === "HIDDEN",
//                 }
//               )}
//             />
//           </form>
//         )}
//     </>
//   );
// }

// function ButtonPinnableByFriendForm({
//   answer,
//   contact,
// }: {
//   answer: GlobalAnswerTypeByHand;
//   contact: Prisma.ContactGetPayload<{
//     select: typeof selectContacts;
//   }>;
// }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <fetcher.Form
//         action="/pin-user-question-friend"
//         method="post"
//         className="me-2 flex items-center"
//       >
//         <input type="hidden" name="answerid" value={answer.id} />
//         <input type="hidden" name="contactid" value={contact.id} />
//         <button
//           disabled={fetcher.state !== "idle"}
//           className="h-4 w-4 rounded-full bg-pink-500 hover:bg-cyan-300 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-cyan-700"
//         />
//       </fetcher.Form>
//     </>
//   );
// }
