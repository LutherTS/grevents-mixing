import clsx from "clsx";
import { useFetcher } from "@remix-run/react";

import { PageLinkDivless } from "./page-link";
import {
  GlobalAnswerTypeByHand,
  PINNED_BY_USER_ANSWERS_LIMIT,
  DEFAULT_ANSWERS_LIMIT,
} from "~/librairies/subdata/answers";

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
}: {
  answer: GlobalAnswerTypeByHand;
  selectContext?: SelectContext;
  pinnedAnswersCount?: number;
  otherPseudonativeAnswersCount?: number;
  answerComponentRequired: AnswerComponentRequired;
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
      <p
        className={
          answer.userQuestion.state === "HIDDEN" ? "mt-2 text-gray-500" : "mt-2"
        }
      >
        {answer.value}
      </p>
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
        {/* Coming up */}
        {/* If you're still allowed to pin */}
        {/* {pinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT && (
          <ButtonPinnableForm answer={answer} />
        )} */}
        {/* If you're only allowed to unpin */}
        {/* {pinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT &&
          answer.userQuestion.isPinned === true && (
            <ButtonPinnableForm answer={answer} />
          )} */}
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
        {/* Coming up */}
        {/* If you're still allowed to pin */}
        {/* {pinnedAnswersCount < PINNED_BY_USER_ANSWERS_LIMIT && (
          <ButtonPinnableForm answer={answer} />
        )} */}
        {/* If you're only allowed to unpin */}
        {/* {pinnedAnswersCount >= PINNED_BY_USER_ANSWERS_LIMIT &&
          answer.userQuestion.isPinned === true && (
            <ButtonPinnableForm answer={answer} />
          )} */}
        <p>{answer.value}</p>
        {/* Also coming up */}
        {/* If you're still allowed to pin */}
        {/* {otherPseudonativeAnswersCount < DEFAULT_ANSWERS_LIMIT && (
          <ButtonPseudoableForm answer={answer} />
        )} */}
        {/* If you're only allowed to unpin */}
        {/* {otherPseudonativeAnswersCount >= DEFAULT_ANSWERS_LIMIT &&
          answer.userQuestion.isPinned === true && (
            <ButtonPseudoableForm answer={answer} />
          )} */}
      </div>
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
        <input
          className="w-[32ch] max-w-[50ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white sm:w-[40ch]"
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
            ></button>
          </form>
        )}
    </>
  );
}

////////

// function OneCriteriaAnswerModify({
//   answer,
// }: {
//   answer: GlobalAnswerTypeByHand;
// }) {
//   return (
//     <>
//       <div className="relative mt-2 inline-flex items-center justify-center">
//         <OneCriteriaAnswerModifyForm answer={answer} />
//         {answer.userQuestion.question.name === "Email address" &&
//           answer.userQuestion.question.kind === "NATIVE" && (
//             <ButtonHiddableForm answer={answer} />
//           )}
//       </div>
//     </>
//   );
// }

// export function OneCriteriaAnswerModifyForm({ answer }: { answer: Answer }) {
//   const fetcher = useFetcher();

//   return (
//     <>
//       <form className="" action={formAction}>
//         <label className="sr-only" htmlFor={answer.answer_id}>
//           Modify answer &quot;{answer.answer_value}&quot;
//         </label>
//         <OneCriteriaAnswerModifyInput answer={answer} />
//         {state && state.errors?.answerValue ? (
//           <div id={`answer-value-error-${answer.answer_id}`} aria-live="polite">
//             {state.errors.answerValue.map((error: string) => (
//               <p className="mt-2 text-red-500" key={error}>
//                 {error}
//               </p>
//             ))}
//           </div>
//         ) : null}
//         {state && state.message ? (
//           <div id={`form-error-${answer.answer_id}`} aria-live="polite">
//             <p className="mt-2 text-red-500">{state.message}</p>
//           </div>
//         ) : null}
//       </form>
//     </>
//   );
// }

// export function OneCriteriaAnswerModifyInput({ answer }: { answer: Answer }) {
//   const status = useFormStatus();

//   return (
//     <>
//       <input
//         className="w-[32ch] max-w-[50ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white sm:w-[40ch]"
//         type="text"
//         id={answer.answer_id}
//         name="answervalue"
//         placeholder={answer.answer_value}
//         disabled={status.pending || answer.question_name === "Email address"}
//       />
//     </>
//   );
// }

// export function ButtonHiddableFormOld({ answer }: { answer: Answer }) {
//   return (
//     <>
//       <form
//         className="absolute right-4 flex items-center"
//         action={() => hideOrUnhideUserQuestionOfAnswer(answer)}
//       >
//         <ButtonHiddable answer={answer} />
//       </form>
//     </>
//   );
// }

// export function ButtonHiddable({ answer }: { answer: Answer }) {
//   const status = useFormStatus();

//   return (
//     <>
//       <button
//         disabled={status.pending}
//         className={clsx(
//           "h-4 w-4 rounded-full disabled:!bg-gray-400 disabled:hover:bg-gray-400 dark:disabled:!bg-gray-600 dark:disabled:hover:bg-gray-600",
//           {
//             "bg-cyan-500 hover:bg-pink-300 dark:hover:bg-pink-700":
//               answer.userquestion_state === "LIVE",
//             "bg-pink-500 hover:bg-cyan-300 dark:hover:bg-cyan-700":
//               answer.userquestion_state === "HIDDEN",
//           }
//         )}
//       ></button>
//     </>
//   );
// }

////////

// data.userCustomAnswers[0].userQuestion._count.userQuestionFriends

////////

// OneAnswer // Default
// OneAnswerModify // only answer part changes
// OneAnswerPinnable // only answer part changes
// OneAnswerPinnablePseudoable // only answer part changes
// OneAnswerPinnableByFriend // only answer part changes
// OneAnswerCancelPinnableByFriend // only answer part changes
// OneLinkAnswer // question part changes, answer part Pinnable // now obsolete

/*
I'm gonna need to rethink, not from the capabilities of the components that I thought up progressively, but rather from the situations where the components are going to be used, and that's what I need to define. 

Then even if two case have the exact same composition, it would not matter because with their names different, I'll be able to better understand watch each of them are for.

So here's the list: 
- PinnedAnswers // OneAnswer personalView true // OneAnswerPersonal
- NativeAnswers // OneAnswerPinnable
- PseudonativeAnswers // OneAnswerPinnablePseudoable
- CustomAnswers // OneLinkAnswer (NON, LE LIEN EST SUR LA QUESTION)
- AnswersModify // OneAnswerModify
- PreviewedAnswers // OneAnswer personalView false // OneAnswerPreviewed (that includes Queried which will show no number of UserQuestionFriends)
- ExposedAnswers // OneAnswerPinnableByFriend, OneAnswerCancelPinnableByFriend

Du coup comme typeof c'est du JavaScript, je pourrai l'utiliser pour router correctement en fonction du type de liste qui est fourni. À réfléchir. 
Mais pour ça il faudra que leurs types soient vraiment différents, et pas uniquement nominalement différents.

Custom ::
PinnedAnswers : sans lien, avec nombre
CustomAnswers : avec lien, avec nombre
PreviewedAnswers : sans lien, sans nombre, "share to you"
ExposedAnswers : sans lien, sans nombre, "share to you"

Je pense que je vais pouvoir utiliser des booleans sur le ManyAnswers pour définir ce comportement et plus encore.
Au lieu d'un boolean je peux faire un enum
context: 'PINNED' | 'STANDARDIZED' | 'CUSTOMIZED' | 'USERCRITERIA' | 'PREVIEWED' | 'EXPOSED'
*/
// export function OneCriteria({
//   contact,
// }: {
//   contact: Prisma.ContactGetPayload<{
//     select: typeof selectContacts;
//   }>;
// }) {
//   return (
//     <>
//       <p className="mt-2">
//         {contact.mirror?.userFirst.state === "DEACTIVATED" ? (
//           <>
//             <span className="font-semibold text-gray-500">
//               {contact.mirror?.userFirst.appWideName}
//             </span>
//           </>
//         ) : (
//           <>
//             <PageLinkDivless
//               href={`/users/${contact.mirror?.userFirst.username}/profile`}
//               specifiedClasses="font-semibold text-blue-500 hover:text-blue-400 dark:hover:text-blue-600"
//             >
//               {contact.mirror?.userFirst.appWideName}
//             </PageLinkDivless>
//           </>
//         )}{" "}
//         / {contact.mirror?.userFirst.username}
//       </p>
//     </>
//   );
// }

// OneAnswerQuestion
// OneAnswerValue

/* TOUT ÇA LÀ DOIT ÊTRE DANS UN FICHIER ONEQUESTION, one-question.tsx.
Finalement tu restes. */
// function OneCriteriaQuestion({
//   answer,
//   context,
// }: {
//   answer: Answer;
//   context?: string;
// }) {
//   return (
//     <>
//       <p className="mt-2">
//         {answer.question_kind === "NATIVE" && (
//           <span className="text-violet-500">
//             <span className="font-semibold">{answer.question_name}</span> /
//             native
//           </span>
//         )}
//         {answer.question_kind === "NATIVEIRL" && (
//           <span className="text-purple-500">
//             <span className="font-semibold">{answer.question_name}</span> /
//             native irl
//           </span>
//         )}
//         {answer.question_kind === "PSEUDO" &&
//           answer.userquestion_kind === "PSEUDONATIVE" && (
//             <span className="text-green-500">
//               <span className="font-semibold">{answer.question_name}</span> /
//               pseudonative
//             </span>
//           )}
//         {answer.question_kind === "PSEUDO" &&
//           answer.userquestion_kind === "PSEUDONATIVEIRL" && (
//             <span className="text-emerald-500">
//               <span className="font-semibold">{answer.question_name}</span> /
//               pseudonative irl
//             </span>
//           )}
//         {/* no link, UserQuestionFriends counted */}
//         {answer.question_kind === "CUSTOM" &&
//           context ===
//             ("PersonalInfo" ||
//               "UserCriteria" ||
//               "ModifyCriteriaCustomized") && (
//             <span className="text-lime-500">
//               <span className="font-semibold">{answer.question_name}</span> /
//               custom{" "}
//               {answer.userquestionfriends_count &&
//               answer.userquestionfriends_count >= 1 ? (
//                 <>/ shared ({answer.userquestionfriends_count})</>
//               ) : (
//                 <>/ not shared</>
//               )}
//             </span>
//           )}
//         {/* no link, UserQuestionFriends not counted */}
//         {answer.question_kind === "CUSTOM" &&
//           context === ("QueriedPreview" || "Profile") && (
//             <span className="text-lime-500">
//               <span className="font-semibold">{answer.question_name}</span> /
//               custom / shared to you
//             </span>
//           )}
//         {/* link, UserQuestionFriends counted */}
//         {/* basically the only unused case is: link, UserQuestionFriends not counted */}
//         {answer.question_kind === "CUSTOM" &&
//           context === "PersonalInfoCustomized" && (
//             <div>
//               <Link
//                 href={`/users/${answer.user_username}/personal-info/user-criteria/${answer.userquestion_id}`}
//                 className="inline-block underline"
//               >
//                 <span className="text-lime-500 underline hover:text-lime-400 dark:hover:text-lime-600">
//                   <span className="font-semibold">{answer.question_name}</span>{" "}
//                   / custom{" "}
//                   {answer.userquestionfriends_count &&
//                   answer.userquestionfriends_count >= 1 ? (
//                     <>/ shared ({answer.userquestionfriends_count})</>
//                   ) : (
//                     <>/ not shared</>
//                   )}
//                 </span>
//               </Link>
//             </div>
//           )}
//       </p>
//     </>
//   );
// }

// function OneLinkCriteriaQuestion({ answer }: { answer: Answer }) {
//   return (
//     <>
//       <p className="mt-2">
//         {answer.question_kind === "CUSTOM" && (
//           <span className="text-lime-500 underline hover:text-lime-400 dark:hover:text-lime-600">
//             <span className="font-semibold">{answer.question_name}</span> /
//             custom{" "}
//             {answer.userquestionfriends_count &&
//             answer.userquestionfriends_count >= 1 ? (
//               <>/ shared ({answer.userquestionfriends_count})</>
//             ) : (
//               <>/ not shared</>
//             )}
//           </span>
//         )}
//       </p>
//     </>
//   );
// }

// Here is what survives.
// OneAnswer // default
// OneAnswerModify // only answer part changes
// OneAnswerPinnable // only answer part changes
// OneAnswerPinnablePseudoable // only answer part changes
// OneAnswerPinnableByFriend // only answer part changes
// OneAnswerCancelPinnableByFriend // only answer part changes

// The HIDDEN thing is OK as a global because:
// HIDDEN userquestion will only show on the previous personal view contexts
// and wherever they show in that context, this is how they should be presented in a default OneAnswer
// function OneAnswerOriginal({ answer }: { answer: Answer }) {
//   return (
//     <>
//       <p
//         className={
//           answer.userquestion_state === "HIDDEN" ? "mt-2 text-gray-500" : "mt-2"
//         }
//       >
//         {answer.answer_value}
//       </p>
//     </>
//   );
// }

// OneCriteria (no such component as OneCriteria though)
// OneQuestion
// OneAnswer

// Where in question I was needing context, I think in answer it's just going to have to remain what it can do, and therefore be different OneAnswer.
// Ensuite en effet je nomme le haut de mes composants en fonction de ce que je recherche. ManyUserPinnedCriteria made of OneQuestion and OneUserPinnedAnswer.

// So, what, other than default, survives, and what they need

// OneAnswerModify ::
// OneCriteriaAnswerModifyForm
// ButtonHiddableForm

// OneAnswerPinnable ::
// ButtonPinnableForm

// OneAnswerPinnablePseudoable ::
// ButtonPinnableForm
// ButtonPseudoableForm

// OneAnswerPinnableByFriend ::
// ButtonPinUserQuestionFriendForm

// OneAnswerCancelPinnableByFriend ::
// ButtonCancelPinUserQuestionFriendForm

//

// Here's the list now without profile and UserCriteriaPage

// ManyUserCriteria
// ManyUserPinnedCriteria :: (original)
// => OneUserPinnedCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserCriteriaPinnable
// ManyUserNativeNotIrlCriteria :: (original)
// => OneUserNativeNotIrlCriteria
// => => OneQuestion
// => => OneAnswerPinnable

// ManyUserNativeIrlCriteria :: (same)
// => OneUserNativeIrlCriteria
// => => OneQuestion
// => => OneAnswerPinnable

// ManyUserCriteriaModify
// ManyUserNativeNotIrlCriteriaModify :: (original)
// => OneUserNativeNotIrlCriteriaModify
// => => OneQuestion
// => => OneAnswerModify

// ManyUserNativeIrlCriteriaModify :: (same)
// => OneUserNativeIrlCriteriaModify
// => => OneQuestion
// => => OneAnswerModify

// ManyUserCriteriaPinnablePseudoable
// ManyUserPseudonativeNotIrlCriteria :: (original)
// => OneUserPseudonativeNotIrlCriteria
// => => OneQuestion
// => => OneAnswerPinnablePseudoable

// ManyUserPseudonativeIrlCriteria :: (same)
// => OneUserPseudonativeIrlCriteria
// => => OneQuestion
// => => OneAnswerPinnablePseudoable

// ManyUserCustomCriteria :: (same)
// => OneUserCustomCriteria
// => => OneQuestion
// => => OneAnswerPinnable

// ManyUserPseudonativeNotIrlCriteriaModify :: (same)
// => OneUserPseudonativeNotIrlCriteriaModify
// => => OneQuestion
// => => OneAnswerModify

// ManyUserPseudonativeIrlCriteriaModify :: (same)
// => OneUserPseudonativeIrlCriteriaModify
// => => OneQuestion
// => => OneAnswerModify

// ManyUserCustomCriteriaModify :: (same)
// => OneUserCustomCriteriaModify
// => => OneQuestion
// => => OneAnswerModify

// ManyUserPinnedNotIrlCriteria :: (same)
// => OneUserPinnedNotIrlCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserUnpinnedNativeNotIrlCriteria :: (same)
// => OneUserUnpinnedNativeNotIrlCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserUnpinnedPseudonativeNotIrlCriteria :: (same)
// => OneUserUnpinnedPseudonativeNotIrlCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserPinnedNotAndIrlCriteria :: (same)
// => OneUserPinnedNotAndIrlCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserUnpinnedNativeIrlCriteria :: (same)
// => OneUserUnpinnedNativeIrlCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserUnpinnedPseudonativeIrlCriteria :: (same)
// => OneUserUnpinnedPseudonativeIrlCriteria
// => => OneQuestion
// => => OneAnswer

// ManyUserPinnedNotIrlCriteriaQueried :: (same)
// => OneUserPinnedNotIrlCriteriaQueried
// => => OneQuestion
// => => OneAnswer

// ManyUserPinnedNotAndIrlCriteriaQueried :: (same)
// => OneUserPinnedNotAndIrlCriteriaQueried
// => => OneQuestion
// => => OneAnswer

// ManyUserUnpinnedSharedToContactCustomCriteria :: (same)
// => OneUserUnpinnedSharedToContactCustomCriteria
// => => OneQuestion
// => => OneAnswer

// function OneCriteriaAnswerModify({ answer }: { answer: Answer }) {
//   return (
//     <>
//       <div className="relative mt-2 inline-flex items-center justify-center">
//         <OneCriteriaAnswerModifyForm answer={answer} />
//         {answer.question_name === "Email address" &&
//           answer.question_kind === "NATIVE" && (
//             <ButtonHiddableForm answer={answer} />
//           )}
//       </div>
//     </>
//   );
// }

// function OneCriteriaAnswerPinnable({
//   answer,
//   pinnedAnswersCount,
// }: {
//   answer: Answer;
//   pinnedAnswersCount: number;
// }) {
//   return (
//     <>
//       <div className="mt-2 flex justify-center">
//         {/* <ButtonPinnableForm answer={answer} /> */}
//         {pinnedAnswersCount < ANSWERS_PINNED_BY_USER_LIMIT && (
//           <ButtonPinnableForm answer={answer} />
//         )}
//         {pinnedAnswersCount >= ANSWERS_PINNED_BY_USER_LIMIT &&
//           answer.userquestion_is_pinned === true && (
//             <ButtonPinnableForm answer={answer} />
//           )}
//         <p
//           className={
//             answer.userquestion_state === "HIDDEN"
//               ? "text-gray-300 dark:text-gray-700"
//               : "text-inherit"
//           }
//         >
//           {answer.answer_value}
//         </p>
//       </div>
//     </>
//   );
// }

// function OneCriteriaAnswerPinnablePseudoable({
//   answer,
//   pinnedAnswersCount,
// }: {
//   answer: Answer;
//   pinnedAnswersCount: number;
// }) {
//   return (
//     <>
//       <div className="mt-2 flex justify-center">
//         {/* <ButtonPinnableForm answer={answer} /> */}
//         {pinnedAnswersCount < ANSWERS_PINNED_BY_USER_LIMIT && (
//           <ButtonPinnableForm answer={answer} />
//         )}
//         {pinnedAnswersCount >= ANSWERS_PINNED_BY_USER_LIMIT &&
//           answer.userquestion_is_pinned === true && (
//             <ButtonPinnableForm answer={answer} />
//           )}
//         <p>{answer.answer_value}</p>
//         <ButtonPseudoableForm answer={answer} />
//       </div>
//     </>
//   );
// }

// function OneCriteriaAnswerPinnableByFriend({
//   answer,
//   contact,
//   pinnedbyFriendAnswersLength,
// }: {
//   answer: Answer;
//   contact: FoundContact;
//   pinnedbyFriendAnswersLength: number;
// }) {
//   return (
//     <>
//       <div className="mt-2 flex justify-center">
//         {pinnedbyFriendAnswersLength < ANSWERS_PINNED_BY_FRIEND_LIMIT && (
//           <ButtonPinUserQuestionFriendForm answer={answer} contact={contact} />
//         )}
//         <p>{answer.answer_value}</p>
//       </div>
//     </>
//   );
// }

// function OneCriteriaAnswerCancelPinnableByFriend({
//   answer,
//   contact,
// }: {
//   answer: Answer;
//   contact: FoundContact;
// }) {
//   return (
//     <>
//       <div className="mt-2 flex justify-center">
//         <ButtonCancelPinUserQuestionFriendForm
//           answer={answer}
//           contact={contact}
//         />
//         <p>{answer.answer_value}</p>
//       </div>
//     </>
//   );
// }
