import { useState } from "react";
import { Prisma } from "@prisma/client";

import { TextButtonOnClick } from "./text-button";
import {
  CustomAnswerForm,
  NativeIrlAnswerForm,
  NativeNotIrlAnswerForm,
  PseudonativeIrlAnswerForm,
  PseudonativeNotIrlAnswerForm,
} from "./answer-forms";
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
      <p className="mt-4 font-semibold">
        <TextButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Native
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === 1}
        >
          Native irl
        </TextButtonOnClick>
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
      <p className="mt-4 font-semibold">
        <TextButtonOnClick
          handleClick={handlePseudonativePosition}
          disabled={position === 0}
        >
          Pseudonative
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handlePseudonativeIrlPosition}
          disabled={position === 1}
        >
          Pseudonative irl
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handleCustomPosition}
          disabled={position === 2}
        >
          Custom
        </TextButtonOnClick>
      </p>
    </>
  );
}
