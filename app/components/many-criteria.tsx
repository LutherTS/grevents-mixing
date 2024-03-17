import { Prisma } from "@prisma/client";
import { useState } from "react";
import _ from "lodash";

import { selectContacts } from "~/librairies/subdata/contacts";
import { OneContact } from "./one-contact";
import { LinkButtonOnClick } from "./link-button";

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
// // ManyUserCriteria answers={userPinnedAnswers} context="PINNED"

// ManyUserNativeNotIrlCriteria ::
// => OneUserNativeNotIrlCriteria
// ManyUserCriteriaPinnable answers={userNativeNotIrlAnswers pinnedAnswersCount={}

// ManyUserNativeIrlCriteria ::
// => OneUserNativeIrlCriteria
// ManyUserCriteriaPinnable answers={userNativeIrlAnswers} pinnedAnswersCount={}

// ManyUserNativeNotIrlCriteriaModify ::
// => OneUserNativeNotIrlCriteriaModify

// ManyUserNativeIrlCriteriaModify ::
// => OneUserNativeIrlCriteriaModify

// ManyUserPseudonativeNotIrlCriteria ::
// => OneUserPseudonativeNotIrlCriteria

// ManyUserPseudonativeIrlCriteria ::
// => OneUserPseudonativeIrlCriteria

// ManyUserCustomCriteria ::
// => OneUserCustomCriteria

// ManyUserPseudonativeNotIrlCriteriaModify ::
// => OneUserPseudonativeNotIrlCriteriaModify

// ManyUserPseudonativeIrlCriteriaModify ::
// => OneUserPseudonativeIrlCriteriaModify

// ManyUserCustomCriteriaModify ::
// => OneUserCustomCriteriaModify

// ManyUserPinnedNotIrlCriteria ::
// => OneUserPinnedNotIrlCriteria

// ManyUserUnpinnedNativeNotIrlCriteria ::
// => OneUserUnpinnedNativeNotIrlCriteria

// ManyUserUnpinnedPseudonativeNotIrlCriteria ::
// => OneUserUnpinnedPseudonativeNotIrlCriteria

// ManyUserPinnedNotAndIrlCriteria ::
// => OneUserPinnedNotAndIrlCriteria

// ManyUserUnpinnedNativeIrlCriteria ::
// => OneUserUnpinnedNativeIrlCriteria

// ManyUserUnpinnedPseudonativeIrlCriteria ::
// => OneUserUnpinnedPseudonativeIrlCriteria

// ManyUserPinnedNotIrlCriteriaQueried ::
// => OneUserPinnedNotIrlCriteriaQueried

// ManyUserPinnedNotAndIrlCriteriaQueried ::
// => OneUserPinnedNotAndIrlCriteriaQueried

// ManyUserUnpinnedSharedToContactCustomCriteria ::
// => OneUserUnpinnedSharedToContactCustomCriteria

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

// ManyUserCriteriaModify answers={} context=""
// => => OneQuestion answer={} context=""
// => => OneAnswerModify answer={}

// ManyUserCriteriaPinnablePseudoable answers={} context="" pinnedAnswersCount={}
// => => OneQuestion answer={} context=""
// => => OneAnswerPinnablePseudoable answer={} pinnedAnswersCount={}
// NEW : pseudonativeNotIrlAnswersCount={} pseudonativeIrlAnswersCount={}
// (à ajouter ainsi que leurs équivalents sur Add)
// (pour afficher une erreur disant quelque chose comme "You've already reach your max of pseudonative or pseudonative irl criteria")

// basically the db-bound names are replaced with the context
// I'm gonna need hidden input to catch former bind data in request.formData

//

export function ManyAnswers({
  answers,
  personalView,
  label,
  notLabel,
}: {
  answers: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>[];
  personalView?: boolean;
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
                      <li key={answer.answer_id}>
                        <OneCriteria
                          answer={answer}
                          personalView={personalView}
                        />
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ManyPaginatedContacts
                answers={answers}
                personalView={personalView}
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

function ManyPaginatedContacts({
  answers,
}: {
  answers: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>[];
}) {
  const chunkedContacts = _.chunk(answers, 4);

  const [position, setPosition] = useState(0);

  function handlePreviousPosition() {
    setPosition(position - 1);
  }

  function handleNextPosition() {
    setPosition(position + 1);
  }

  return (
    <>
      <ol>
        {chunkedContacts[position].map((answer) => {
          return (
            <li key={answer.id}>
              <OneContact answer={answer} />
            </li>
          );
        })}
      </ol>
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
          disabled={position === chunkedContacts.length - 1}
        >
          Next
        </LinkButtonOnClick>
      </p>
    </>
  );
}
