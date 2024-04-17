import { useState } from "react";

import { LinkButtonOnClick } from "./link-button";
import {
  CustomAnswerForm,
  NativeIrlAnswerForm,
  NativeNotIrlAnswerForm,
  PseudonativeIrlAnswerForm,
  PseudonativeNotIrlAnswerForm,
} from "./answer-forms";
import { Prisma } from "@prisma/client";
import { selectUnansweredNativeQuestions } from "~/librairies/subdata/questions";

export function PaginatedStandardizedAnswerForms({
  nativeNotIrlQuestions,
  nativeNotIrlAnswersCount,
  nativeIrlQuestions,
  nativeIrlAnswersCount,
}: {
  nativeNotIrlQuestions: Prisma.QuestionGetPayload<{
    select: typeof selectUnansweredNativeQuestions;
  }>[];
  nativeIrlQuestions: Prisma.QuestionGetPayload<{
    select: typeof selectUnansweredNativeQuestions;
  }>[];
  nativeNotIrlAnswersCount: number;
  nativeIrlAnswersCount: number;
}) {
  const [position, setPosition] = useState(0);

  function handlePreviousPosition() {
    setPosition(position - 1);
  }

  function handleNextPosition() {
    setPosition(position + 1);
  }

  return (
    <>
      {position === 0 && (
        <>
          <NativeNotIrlAnswerForm
            nativeQuestions={nativeNotIrlQuestions}
            answerCount={nativeNotIrlAnswersCount}
          />
        </>
      )}
      {position === 1 && (
        <>
          <NativeIrlAnswerForm
            answerCount={nativeIrlAnswersCount}
            nativeQuestions={nativeIrlQuestions}
          />
        </>
      )}
      <p className="mt-4">
        <LinkButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Native
        </LinkButtonOnClick>
        &nbsp;/&nbsp;
        <LinkButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === 1}
        >
          Native irl
        </LinkButtonOnClick>
      </p>
    </>
  );
}

export function PaginatedCustomizedAnswerForms({
  pseudonativeNotIrlAnswersCount,
  pseudonativeIrlAnswersCount,
  customAnswersCount,
}: {
  pseudonativeNotIrlAnswersCount: number;
  pseudonativeIrlAnswersCount: number;
  customAnswersCount: number;
}) {
  const [position, setPosition] = useState(0);

  function handlePseudonativePosition() {
    setPosition(0);
  }

  function handlePseudonativeIrlPosition() {
    setPosition(1);
  }

  function handleCustomPosition() {
    setPosition(2);
  }

  return (
    <>
      {position === 0 && (
        <>
          <PseudonativeNotIrlAnswerForm
            answerCount={pseudonativeNotIrlAnswersCount}
          />
        </>
      )}
      {position === 1 && (
        <>
          <PseudonativeIrlAnswerForm
            answerCount={pseudonativeIrlAnswersCount}
          />
        </>
      )}
      {position === 2 && (
        <>
          <CustomAnswerForm answerCount={customAnswersCount} />
        </>
      )}
      <p className="mt-4">
        <LinkButtonOnClick
          handleClick={handlePseudonativePosition}
          disabled={position === 0}
        >
          Pseudonative
        </LinkButtonOnClick>
        &nbsp;/&nbsp;
        <LinkButtonOnClick
          handleClick={handlePseudonativeIrlPosition}
          disabled={position === 1}
        >
          Pseudonative irl
        </LinkButtonOnClick>
        &nbsp;/&nbsp;
        <LinkButtonOnClick
          handleClick={handleCustomPosition}
          disabled={position === 2}
        >
          Custom
        </LinkButtonOnClick>
      </p>
    </>
  );
}
