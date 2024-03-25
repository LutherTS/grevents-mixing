import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import { selectUnansweredNativeQuestions } from "~/librairies/subdata/questions";

export function NativeNotIrlAnswerForm({
  nativeQuestions,
  answerCount,
}: {
  nativeQuestions: Prisma.QuestionGetPayload<{
    select: typeof selectUnansweredNativeQuestions;
  }>[];
  answerCount: number;
}) {
  const fetcher = useFetcher();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

  // fieldset disabled
  return (
    <>
      <fetcher.Form
        action="/create-native-not-irl-answer"
        method="post"
        className="flex flex-col items-center"
      >
        <fieldset disabled={fetcher.state !== "idle" || isLimitReached}>
          {isLimitReached && (
            <div>
              <p className="mt-2 text-red-500">
                Limit number of answers reached for this type of criteria (
                {DEFAULT_ANSWERS_LIMIT})
              </p>
              <p className="mt-2">
                To delete an answer, modify it by sending an empty response.
              </p>
            </div>
          )}
          <label htmlFor="native-not-irl-question" className="sr-only">
            Select a native question below
          </label>
          <label htmlFor="native-not-irl-answer">
            <p className="mt-2 font-semibold text-zinc-500">
              Select then answer a native question below
            </p>
          </label>
          {/* NativeQuestionSelect, nativeQuestions, id, name, option */}
          <NativeQuestionSelect
            nativeQuestions={nativeQuestions}
            id="native-not-irl-question"
            name="nativenotirlquestion"
            option="Select a native question"
          />
          {/* AnswerInput, id, name, placeholder */}
          <AnswerInput
            id="native-not-irl-answer"
            name="nativenotirlanswer"
            placeholder="Answer that native question"
          />
        </fieldset>
      </fetcher.Form>
    </>
  );
}

export function NativeIrlAnswerForm({
  nativeQuestions,
  answerCount,
}: {
  nativeQuestions: Prisma.QuestionGetPayload<{
    select: typeof selectUnansweredNativeQuestions;
  }>[];
  answerCount: number;
}) {
  const fetcher = useFetcher();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

  // fieldset disabled
  return (
    <>
      <fetcher.Form
        action="/create-native-irl-answer"
        method="post"
        className="flex flex-col items-center"
      >
        <fieldset disabled={fetcher.state !== "idle" || isLimitReached}>
          {isLimitReached && (
            <p className="mt-2 text-red-500">
              Limit number of answers reached for this type of criteria
            </p>
          )}
          <label htmlFor="native-irl-question" className="sr-only">
            Select a native irl question below
          </label>
          <label htmlFor="native-irl-answer">
            <p className="mt-2 font-semibold text-zinc-500">
              Select then answer a native irl question below
            </p>
          </label>
          {/* NativeQuestionSelect, nativeQuestions, id, name, option */}
          <NativeQuestionSelect
            nativeQuestions={nativeQuestions}
            id="native-irl-question"
            name="nativeirlquestion"
            option="Select a native irl question"
          />

          {/* AnswerInput, id, name, placeholder */}
          <AnswerInput
            id="native-irl-answer"
            name="nativeirlanswer"
            placeholder="Answer that native irl question"
          />
        </fieldset>
      </fetcher.Form>
    </>
  );
}

export function NativeQuestionSelect({
  nativeQuestions,
  id,
  name,
  option,
}: {
  nativeQuestions: Prisma.QuestionGetPayload<{
    select: typeof selectUnansweredNativeQuestions;
  }>[];
  id: string;
  name: string;
  option: string;
}) {
  return (
    <>
      <div className="mt-4 flex w-full justify-center">
        <select
          className="block truncate rounded px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-gray-400"
          id={id}
          name={name}
          defaultValue=""
        >
          <option value="" disabled>
            {option}
          </option>
          {nativeQuestions.map((nativeQuestion) => {
            return (
              <option key={nativeQuestion.id} value={nativeQuestion.id}>
                {nativeQuestion.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export function AnswerInput({
  id,
  name,
  placeholder,
}: {
  id: string;
  name: string;
  placeholder: string;
}) {
  return (
    <>
      <input
        className="mt-4 w-[32ch] max-w-[50ch] truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
}

export function PseudonativeNotIrlAnswerForm({
  answerCount,
}: {
  answerCount: number;
}) {
  const fetcher = useFetcher();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

  return (
    <>
      <fetcher.Form
        action="/create-pseudonative-not-irl-answer"
        method="post"
        className="flex flex-col items-center"
      >
        <fieldset disabled={fetcher.state !== "idle" || isLimitReached}>
          {isLimitReached && (
            <p className="mt-2 text-red-500">
              Limit number of answers reached for this type of criteria
            </p>
          )}
          <label htmlFor="pseudonative-not-irl-question">
            <p className="mt-2 font-semibold text-zinc-500">
              Create then answer a pseudonative question below
            </p>
          </label>
          <label htmlFor="pseudonative-not-irl-answer" className="sr-only">
            Answer a pseudonative question below
          </label>
          <AnswerInput
            id="pseudonative-not-irl-question"
            name="pseudonativenotirlquestion"
            placeholder="Enter a pseudonative question"
          />
          <AnswerInput
            id="pseudonative-not-irl-answer"
            name="pseudonativenotirlanswer"
            placeholder="Answer that pseudonative question"
          />
          {/* Currently necessary to send the full form via Enter */}
          <button type="submit" className="hidden">
            Submit
          </button>
        </fieldset>
      </fetcher.Form>
    </>
  );
}

export function PseudonativeIrlAnswerForm({
  answerCount,
}: {
  answerCount: number;
}) {
  const fetcher = useFetcher();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

  return (
    <>
      <fetcher.Form
        action="/create-pseudonative-irl-answer"
        method="post"
        className="flex flex-col items-center"
      >
        <fieldset disabled={fetcher.state !== "idle" || isLimitReached}>
          {isLimitReached && (
            <p className="mt-2 text-red-500">
              Limit number of answers reached for this type of criteria
            </p>
          )}
          <label htmlFor="pseudonative-irl-question">
            <p className="mt-2 font-semibold text-zinc-500">
              Create then answer a pseudonative irl question below
            </p>
          </label>
          <label htmlFor="pseudonative-irl-answer" className="sr-only">
            Answer a pseudonative irl question below
          </label>
          <AnswerInput
            id="pseudonative-irl-question"
            name="pseudonativeirlquestion"
            placeholder="Enter a pseudonative irl question"
          />
          <AnswerInput
            id="pseudonative-irl-answer"
            name="pseudonativeirlanswer"
            placeholder="Answer that pseudonative irl question"
          />
          {/* Currently necessary to send the full form via Enter */}
          <button type="submit" className="hidden">
            Submit
          </button>
        </fieldset>
      </fetcher.Form>
    </>
  );
}

export function CustomAnswerForm({ answerCount }: { answerCount: number }) {
  const fetcher = useFetcher();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

  return (
    <>
      <fetcher.Form
        action="/create-custom-answer"
        method="post"
        className="flex flex-col items-center"
      >
        <fieldset disabled={fetcher.state !== "idle" || isLimitReached}>
          {isLimitReached && (
            <p className="mt-2 text-red-500">
              Limit number of answers reached for this type of criteria
            </p>
          )}
          <label htmlFor="custom-question">
            <p className="mt-2 font-semibold text-zinc-500">
              Create then answer a custom question below
            </p>
          </label>
          <label htmlFor="custom-answer" className="sr-only">
            Answer a custom question below
          </label>
          <AnswerInput
            id="custom-question"
            name="customquestion"
            placeholder="Enter a custom question"
          />
          <AnswerInput
            id="custom-answer"
            name="customanswer"
            placeholder="Answer that custom question"
          />
          {/* Currently necessary to send the full form via Enter */}
          <button type="submit" className="hidden">
            Submit
          </button>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
