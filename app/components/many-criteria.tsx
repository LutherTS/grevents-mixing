import { useState } from "react";
import _ from "lodash";
import { Prisma } from "@prisma/client";

import { TextButtonOnClick } from "./text-button";
import { UnionAnswerType } from "~/librairies/subdata/answers";
import {
  AnswerComponentRequired,
  OneCriteria,
  SelectContext,
} from "./one-criteria";
import { selectContacts } from "~/librairies/subdata/contacts";

export function ManyCriteria({
  answers,
  selectContext,
  pinnedAnswersForSelfCount,
  pinnedAnswersCount,
  otherPseudonativeAnswersCount,
  answerComponentRequired,
  contact,
  answersPinnedbyFriendAnswersCount,
  label,
  notLabel,
}: {
  answers: UnionAnswerType;
  selectContext?: SelectContext;
  pinnedAnswersForSelfCount?: number;
  pinnedAnswersCount?: number;
  otherPseudonativeAnswersCount?: number;
  answerComponentRequired: AnswerComponentRequired;
  contact?: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  answersPinnedbyFriendAnswersCount?: number;
  label: string;
  notLabel?: string;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold text-zinc-500">{label}</p>
        {answers.length > 0 && (
          <>
            {answers.length <= 4 ? (
              <>
                <ol className="space-y-4 mt-4">
                  {answers.map((answer) => {
                    return (
                      <li key={answer.id}>
                        <OneCriteria
                          answer={answer}
                          selectContext={selectContext}
                          pinnedAnswersForSelfCount={pinnedAnswersForSelfCount}
                          pinnedAnswersCount={pinnedAnswersCount}
                          otherPseudonativeAnswersCount={
                            otherPseudonativeAnswersCount
                          }
                          answerComponentRequired={answerComponentRequired}
                          contact={contact}
                          answersPinnedbyFriendAnswersCount={
                            answersPinnedbyFriendAnswersCount
                          }
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
                pinnedAnswersForSelfCount={pinnedAnswersForSelfCount}
                pinnedAnswersCount={pinnedAnswersCount}
                otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}
                answerComponentRequired={answerComponentRequired}
                contact={contact}
                answersPinnedbyFriendAnswersCount={
                  answersPinnedbyFriendAnswersCount
                }
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
  pinnedAnswersForSelfCount,
  pinnedAnswersCount,
  otherPseudonativeAnswersCount,
  answerComponentRequired,
  contact,
  answersPinnedbyFriendAnswersCount,
}: {
  answers: UnionAnswerType;
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
        <ol className="space-y-4 mt-4">
          {chunkedAnswers[position].map((answer) => {
            return (
              <li key={answer.id}>
                <OneCriteria
                  answer={answer}
                  selectContext={selectContext}
                  pinnedAnswersForSelfCount={pinnedAnswersForSelfCount}
                  pinnedAnswersCount={pinnedAnswersCount}
                  otherPseudonativeAnswersCount={otherPseudonativeAnswersCount}
                  answerComponentRequired={answerComponentRequired}
                  contact={contact}
                  answersPinnedbyFriendAnswersCount={
                    answersPinnedbyFriendAnswersCount
                  }
                />
              </li>
            );
          })}
        </ol>
      }
      <p className="mt-4 font-semibold">
        <TextButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedAnswers.length - 1}
        >
          Next
        </TextButtonOnClick>
      </p>
    </>
  );
}
