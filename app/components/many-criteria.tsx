import { useState } from "react";
import _ from "lodash";

import { LinkButtonOnClick } from "./link-button";
import { UnionAnswerType } from "~/librairies/subdata/answers";
import { OneCriteria } from "./one-criteria";

////////

// FINAL TOP LEVEL COMPONENTS EXPORTED HERE

export function ManyCriteria({
  answers,
  selectContext,
  pinnedAnswersCount,
  otherPseudonativeAnswersCount,
  answerComponentRequired,
  label,
  notLabel,
}: {
  answers: UnionAnswerType;
  selectContext?: string;
  pinnedAnswersCount?: number;
  otherPseudonativeAnswersCount?: number;
  answerComponentRequired: string;
  label: string;
  notLabel: string;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold text-zinc-500">{label}</p>
        {answers.length > 0 && (
          <>
            {answers.length <= 4 ? (
              <>
                <ol>
                  {answers.map((answer) => {
                    return (
                      <li key={answer.id}>
                        <OneCriteria
                          answer={answer}
                          selectContext={selectContext}
                          pinnedAnswersCount={pinnedAnswersCount}
                          otherPseudonativeAnswersCount={
                            otherPseudonativeAnswersCount
                          }
                          answerComponentRequired={answerComponentRequired}
                        />
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ManyPaginatedCriteria
                answers={answers}
                selectContext={selectContext}
                pinnedAnswersCount={pinnedAnswersCount}
                otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}
                answerComponentRequired={answerComponentRequired}
              />
            )}
          </>
        )}
        {answers.length === 0 && (
          <>
            <p className="mt-2">{notLabel}</p>
          </>
        )}
      </div>
    </>
  );
}

function ManyPaginatedCriteria({
  answers,
  selectContext,
  pinnedAnswersCount,
  otherPseudonativeAnswersCount,
  answerComponentRequired,
}: {
  answers: UnionAnswerType;
  selectContext?: string;
  pinnedAnswersCount?: number;
  otherPseudonativeAnswersCount?: number;
  answerComponentRequired: string;
}) {
  const chunkedAnswers = _.chunk(answers, 4);

  const [position, setPosition] = useState(0);

  function handlePreviousPosition() {
    setPosition(position - 1);
  }

  function handleNextPosition() {
    setPosition(position + 1);
  }

  return (
    <>
      {
        <ol>
          {chunkedAnswers[position].map((answer) => {
            return (
              <li key={answer.id}>
                <OneCriteria
                  answer={answer}
                  selectContext={selectContext}
                  pinnedAnswersCount={pinnedAnswersCount}
                  otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}
                  answerComponentRequired={answerComponentRequired}
                />
              </li>
            );
          })}
        </ol>
      }
      <p className="mt-2">
        <LinkButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </LinkButtonOnClick>
        &nbsp;/&nbsp;
        <LinkButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedAnswers.length - 1}
        >
          Next
        </LinkButtonOnClick>
      </p>
    </>
  );
}

////////

// export function ManyUserCriteriaPinnable({
//   answers,
//   selectContext,
//   pinnedAnswersCount,
// }: {
//   answers:
//     | Prisma.AnswerGetPayload<{
//         select: typeof selectUserNativeAnswers;
//       }>[]
//     | Prisma.AnswerGetPayload<{
//         select: typeof selectUserCustomAnswers;
//       }>[];
//   selectContext?: string;
//   pinnedAnswersCount: number;
// }) {
//   return <></>;
// }

// export function ManyUserCriteriaModify({
//   answers,
// }: {
//   answers:
//     | Prisma.AnswerGetPayload<{
//         select: typeof selectUserNativeAnswers;
//       }>[]
//     | Prisma.AnswerGetPayload<{
//         select: typeof selectUserPseudonativeAnswers;
//       }>[];
// }) {
//   return <></>;
// }

// export function ManyUserCriteriaPinnablePseudoable({
//   answers,
//   pinnedAnswersCount,
//   otherPseudonativeAnswersCount,
// }: {
//   answers: Prisma.AnswerGetPayload<{
//     select: typeof selectUserPseudonativeAnswers;
//   }>[];
//   pinnedAnswersCount: number;
//   otherPseudonativeAnswersCount: number;
// }) {
//   return <></>;
// }

////////

// This is actually going to be ManyCriteria,
// But there won't be a ManyCriteria component. Here are the top level components that this file will export below.

// PersonalInfoPage ::
// ManyUserPinnedCriteria

// PersonalInfoStandardizedPage ::
// ManyUserNativeNotIrlCriteria
// ManyUserNativeIrlCriteria

// ModifyCriteriaStandardizedPage ::
// ManyUserNativeNotIrlCriteriaModify
// ManyUserNativeIrlCriteriaModify

// PersonalInfoCustomizedPage ::
// ManyUserPseudonativeNotIrlCriteria
// ManyUserPseudonativeIrlCriteria
// ManyUserCustomCriteria

// ModifyCriteriaCustomizedPage ::
// ManyUserPseudonativeNotIrlCriteriaModify
// ManyUserPseudonativeIrlCriteriaModify
// ManyUserCustomCriteriaModify

// UserCriteriaPage :: !!
// that's to be on one-criteria.tsx

// FriendPreviewPage ::
// ManyUserPinnedNotIrlCriteria
// ManyUserUnpinnedNativeNotIrlCriteria
// ManyUserUnpinnedPseudonativeNotIrlCriteria

// FriendPreviewPage ::
// ManyUserPinnedNotAndIrlCriteria
// ManyUserUnpinnedNativeNotIrlCriteria (same)
// ManyUserUnpinnedPseudonativeNotIrlCriteria (same)
// ManyUserUnpinnedNativeIrlCriteria
// ManyUserUnpinnedPseudonativeIrlCriteria

// QueriedPreviewPage ::
// ManyUserPinnedNotIrlCriteriaQueried
// ManyUserPinnedNotAndIrlCriteriaQueried
// ManyUserUnpinnedNativeNotIrlCriteria (same)
// ManyUserUnpinnedPseudonativeNotIrlCriteria (same)
// ManyUserUnpinnedNativeIrlCriteria (same)
// ManyUserUnpinnedPseudonativeIrlCriteria (same)
// ManyUserUnpinnedSharedToContactCustomCriteria

// Profile still missing... but that's the final boss next weekend.

// ...And then I'll decompose them one-by-one.

// ManyUserPinnedCriteria ::
// => OneUserPinnedCriteria
// // ManyUserCriteria answers={userPinnedAnswers} customContext="PersonalInfo"
// => => OneQuestion answer={answer} customContext={customContext}
// => => OneAnswer answer={answer}

// ManyUserNativeNotIrlCriteria ::
// => OneUserNativeNotIrlCriteria
// ManyUserCriteriaPinnable answers={userNativeNotIrlAnswers} pinnedAnswersCount={userPinnedAnswersCount}
// => => OneQuestion answer={answer}
// => => OneAnswerPinnable answer={answer} pinnedAnswersCount={pinnedAnswersCount}

// ManyUserNativeIrlCriteria ::
// => OneUserNativeIrlCriteria
// ManyUserCriteriaPinnable answers={userNativeIrlAnswers} pinnedAnswersCount={userPinnedAnswersCount}
// => => OneQuestion answer={answer}
// => => OneAnswerPinnable answer={answer} pinnedAnswersCount={pinnedAnswersCount}

// ManyUserNativeNotIrlCriteriaModify ::
// => OneUserNativeNotIrlCriteriaModify
// ManyUserCriteriaModify answers={userNativeNotIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswerModify answer={answer}

// ManyUserNativeIrlCriteriaModify ::
// => OneUserNativeIrlCriteriaModify
// ManyUserCriteriaModify answers={userNativeIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswerModify answer={answer}

// ManyUserPseudonativeNotIrlCriteria ::
// => OneUserPseudonativeNotIrlCriteria
// ManyUserCriteriaPinnablePseudoable answers={userPseudonativeNotIrlAnswers} pinnedAnswersCount={userPinnedAnswersCount} otherPseudonativeAnswersCount={userPseudonativeIrlAnswersCount}
// => => OneQuestion answer={answer}
// => => OneAnswerPinnablePseudoable answer={answer} pinnedAnswersCount={pinnedAnswersCount} otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}

// ManyUserPseudonativeIrlCriteria ::
// => OneUserPseudonativeIrlCriteria
// ManyUserCriteriaPinnablePseudoable answers={userPseudonativeIrlAnswers} pinnedAnswersCount={userPinnedAnswersCount} otherPseudonativeAnswersCount={userPseudonativeNotIrlAnswersCount}
// => => OneQuestion answer={answer}
// => => OneAnswerPinnablePseudoable answer={answer} pinnedAnswersCount={pinnedAnswersCount} otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}

// ManyUserCustomCriteria ::
// => OneUserCustomCriteria
// ManyUserCriteriaPinnable answers={userCustomAnswers} pinnedAnswersCount={userPinnedAnswersCount} customContext="PersonalInfoCustomized"
// => => OneQuestion answer={answer}
// => => OneAnswerPinnable answer={answer} pinnedAnswersCount={pinnedAnswersCount} customContext={customContext}

// ManyUserPseudonativeNotIrlCriteriaModify ::
// => OneUserPseudonativeNotIrlCriteriaModify
// ManyUserCriteriaModify answers={userPseudonativeNotIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswerModify answer={answer}

// ManyUserPseudonativeIrlCriteriaModify ::
// => OneUserPseudonativeIrlCriteriaModify
// ManyUserCriteriaModify answers={userPseudonativeIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswerModify answer={answer}

// ManyUserPinnedNotIrlCriteria ::
// => OneUserPinnedNotIrlCriteria
// ManyUserCriteria answers={userPinnedNotIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswer answer={answer}

// ManyUserUnpinnedNativeNotIrlCriteria ::
// => OneUserUnpinnedNativeNotIrlCriteria
// ManyUserCriteria answers={userUnpinnedNativeNotIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswer answer={answer}

// ManyUserUnpinnedPseudonativeNotIrlCriteria ::
// => OneUserUnpinnedPseudonativeNotIrlCriteria
// ManyUserCriteria answers={userUnpinnedPseudonativeNotIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswer answer={answer}

// ManyUserPinnedNotAndIrlCriteria ::
// => OneUserPinnedNotAndIrlCriteria
// ManyUserCriteria answers={userPinnedNotAndIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswer answer={answer}

// ManyUserUnpinnedNativeIrlCriteria ::
// => OneUserUnpinnedNativeIrlCriteria
// ManyUserCriteria answers={userUnpinnedNativeIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswer answer={answer}

// ManyUserUnpinnedPseudonativeIrlCriteria ::
// => OneUserUnpinnedPseudonativeIrlCriteria
// ManyUserCriteria answers={userUnpinnedPseudonativeIrlAnswers}
// => => OneQuestion answer={answer}
// => => OneAnswer answer={answer}

// ManyUserPinnedNotIrlCriteriaQueried ::
// => OneUserPinnedNotIrlCriteriaQueried
// ManyUserCriteria answers={userPinnedNotIrlAnswersQueried} customContext="QueriedPreview"
// => => OneQuestion answer={answer} customContext={customContext}
// => => OneAnswer answer={answer}

// ManyUserPinnedNotAndIrlCriteriaQueried ::
// => OneUserPinnedNotAndIrlCriteriaQueried
// ManyUserCriteria answers={userPinnedNotAndIrlAnswersQueried} customContext="QueriedPreview"
// => => OneQuestion answer={answer} customContext={customContext}
// => => OneAnswer answer={answer}

// ManyUserUnpinnedSharedToContactCustomCriteria ::
// => OneUserUnpinnedSharedToContactCustomCriteria
// ManyUserCriteria answers={userUnpinnedSharedToContactCustomAnswers} customContext="QueriedPreview"
// => => OneQuestion answer={answer} customContext={customContext}
// => => OneAnswer answer={answer}

// ...

// And looking at one-criteria.tsx I actually don't need to go that far.

// All the top levels I need are :

// ManyUserCriteria answers={} context=""
// (sans passer par un OneCriteria)
// => => OneQuestion answer={} context=""
// => => OneAnswer answer={}

// ManyUserCriteriaPinnable answers={} context="" pinnedAnswersCount={}
// => => OneQuestion answer={} context=""
// => => OneAnswerPinnable answer={} pinnedAnswersCount={}

// ManyUserCriteriaModify answers={}
// => => OneQuestion answer={}
// => => OneAnswerModify answer={}

// ManyUserCriteriaPinnablePseudoable answers={} pinnedAnswersCount={}
// => => OneQuestion answer={}
// => => OneAnswerPinnablePseudoable answer={} pinnedAnswersCount={}
// NEW : pseudonativeNotIrlAnswersCount={} pseudonativeIrlAnswersCount={}
// (à ajouter ainsi que leurs équivalents sur Add)
// (pour afficher une erreur disant quelque chose comme "You've already reach your max of pseudonative or pseudonative irl criteria")

// basically the db-bound names are replaced with the context
// I'm gonna need hidden input to catch former bind data in request.formData

//
