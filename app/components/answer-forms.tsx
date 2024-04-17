import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import { selectUnansweredNativeQuestions } from "~/librairies/subdata/questions";

type CreateStardardizedAnswerByHand = JsonifyObject<{
  errors?: {
    questionId?: string[];
    answerInitialValue?: string[];
  };
  message: string;
}>;

export function NativeNotIrlAnswerForm({
  nativeQuestions,
  answerCount,
}: {
  nativeQuestions: Prisma.QuestionGetPayload<{
    select: typeof selectUnansweredNativeQuestions;
  }>[];
  answerCount: number;
}) {
  const fetcher = useFetcher<CreateStardardizedAnswerByHand>();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

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
            <p className="inline-block mt-2 font-semibold text-zinc-500">
              Select then answer a native question below
            </p>
          </label>
          <NativeQuestionSelect
            nativeQuestions={nativeQuestions}
            id="native-not-irl-question"
            name="nativenotirlquestion"
            option="Select a native question"
          />
          {fetcher.data?.errors?.questionId ? (
            <div id="native-not-irl-question-error" aria-live="polite">
              {fetcher.data.errors.questionId.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <AnswerInput
            id="native-not-irl-answer"
            name="nativenotirlanswer"
            placeholder="Answer that native question"
          />
          {fetcher.data?.errors?.answerInitialValue ? (
            <div id="native-not-irl-answer-error" aria-live="polite">
              {fetcher.data.errors.answerInitialValue.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="native-not-irl-answer-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
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
  const fetcher = useFetcher<CreateStardardizedAnswerByHand>();
  const isLimitReached = answerCount >= DEFAULT_ANSWERS_LIMIT;

  return (
    <>
      <fetcher.Form
        action="/create-native-irl-answer"
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
          <label htmlFor="native-irl-question" className="sr-only">
            Select a native irl question below
          </label>
          <label htmlFor="native-irl-answer">
            <p className="inline-block mt-2 font-semibold text-zinc-500">
              Select then answer a native irl question below
            </p>
          </label>
          <NativeQuestionSelect
            nativeQuestions={nativeQuestions}
            id="native-irl-question"
            name="nativeirlquestion"
            option="Select a native irl question"
          />
          {fetcher.data?.errors?.questionId ? (
            <div id="native-irl-question-error" aria-live="polite">
              {fetcher.data.errors.questionId.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <AnswerInput
            id="native-irl-answer"
            name="nativeirlanswer"
            placeholder="Answer that native irl question"
          />
          {fetcher.data?.errors?.answerInitialValue ? (
            <div id="native-irl-answer-error" aria-live="polite">
              {fetcher.data.errors.answerInitialValue.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="native-irl-answer-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
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
          className="block cursor-pointer rounded px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-gray-400"
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
  specifiedType,
}: {
  id: string;
  name: string;
  placeholder: string;
  specifiedType?: string;
}) {
  return (
    <>
      <input
        className="mt-4 w-[32ch] max-w-[50ch] placeholder:truncate rounded bg-gray-50 px-2 text-center text-black disabled:!bg-gray-500 disabled:!text-white disabled:placeholder:!text-gray-400 sm:w-[40ch]"
        type={specifiedType || "text"}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
}

type CreateCustomizedAnswerByHand = JsonifyObject<{
  errors?: {
    questionInitialName?: string[];
    answerInitialValue?: string[];
    answerSource?: string[];
  };
  message: string;
}>;

export function PseudonativeNotIrlAnswerForm({
  answerCount,
}: {
  answerCount: number;
}) {
  const fetcher = useFetcher<CreateCustomizedAnswerByHand>();
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
          <label htmlFor="pseudonative-not-irl-question">
            <p className="inline-block mt-2 font-semibold text-zinc-500">
              Create then answer a pseudonative question below
            </p>
          </label>
          <AnswerInput
            id="pseudonative-not-irl-question"
            name="pseudonativenotirlquestion"
            placeholder="Enter a pseudonative question"
          />
          {fetcher.data?.errors?.questionInitialName ? (
            <div id="pseudonative-not-irl-question-error" aria-live="polite">
              {fetcher.data.errors.questionInitialName.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="pseudonative-not-irl-answer" className="sr-only">
            Answer a pseudonative question below
          </label>
          <AnswerInput
            id="pseudonative-not-irl-answer"
            name="pseudonativenotirlanswer"
            placeholder="Answer that pseudonative question"
          />
          {fetcher.data?.errors?.answerInitialValue ? (
            <div id="pseudonative-not-irl-answer-error" aria-live="polite">
              {fetcher.data.errors.answerInitialValue.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="pseudonative-not-irl-source" className="sr-only">
            Add an optional URL source
          </label>
          <AnswerInput
            id="pseudonative-not-irl-source"
            name="pseudonativenotirlsource"
            placeholder="Add an optional URL source"
            // specifiedType="url"
            // correct but I prefer formatting my own validations
          />
          {fetcher.data?.errors?.answerSource ? (
            <div id="pseudonative-not-irl-source-error" aria-live="polite">
              {fetcher.data.errors.answerSource.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="pseudonative-not-irl-answer-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
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
  const fetcher = useFetcher<CreateCustomizedAnswerByHand>();
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
          <label htmlFor="pseudonative-irl-question">
            <p className="inline-block mt-2 font-semibold text-zinc-500">
              Create then answer a pseudonative irl question below
            </p>
          </label>
          <AnswerInput
            id="pseudonative-irl-question"
            name="pseudonativeirlquestion"
            placeholder="Enter a pseudonative irl question"
          />
          {fetcher.data?.errors?.questionInitialName ? (
            <div id="pseudonative-irl-question-error" aria-live="polite">
              {fetcher.data.errors.questionInitialName.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="pseudonative-irl-answer" className="sr-only">
            Answer a pseudonative irl question below
          </label>
          <AnswerInput
            id="pseudonative-irl-answer"
            name="pseudonativeirlanswer"
            placeholder="Answer that pseudonative irl question"
          />
          {fetcher.data?.errors?.answerInitialValue ? (
            <div id="pseudonative-irl-answer-error" aria-live="polite">
              {fetcher.data.errors.answerInitialValue.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="pseudonative-irl-source" className="sr-only">
            Add an optional URL source
          </label>
          <AnswerInput
            id="pseudonative-irl-source"
            name="pseudonativeirlsource"
            placeholder="Add an optional URL source"
          />
          {fetcher.data?.errors?.answerSource ? (
            <div id="pseudonative-irl-source-error" aria-live="polite">
              {fetcher.data.errors.answerSource.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="pseudonative-irl-answer-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
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
  const fetcher = useFetcher<CreateCustomizedAnswerByHand>();
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
          <label htmlFor="custom-question">
            <p className="inline-block mt-2 font-semibold text-zinc-500">
              Create then answer a custom question below
            </p>
          </label>
          <AnswerInput
            id="custom-question"
            name="customquestion"
            placeholder="Enter a custom question"
          />
          {fetcher.data?.errors?.questionInitialName ? (
            <div id="custom-question-error" aria-live="polite">
              {fetcher.data.errors.questionInitialName.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="custom-answer" className="sr-only">
            Answer a custom question below
          </label>
          <AnswerInput
            id="custom-answer"
            name="customanswer"
            placeholder="Answer that custom question"
          />
          {fetcher.data?.errors?.answerInitialValue ? (
            <div id="custom-answer-error" aria-live="polite">
              {fetcher.data.errors.answerInitialValue.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          <label htmlFor="custom-source" className="sr-only">
            Add an optional URL source
          </label>
          <AnswerInput
            id="custom-source"
            name="customsource"
            placeholder="Add an optional URL source"
          />
          {fetcher.data?.errors?.answerSource ? (
            <div id="custom-source-error" aria-live="polite">
              {fetcher.data.errors.answerSource.map((error) => (
                <p className="mt-2 text-red-500 font-light" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
          {fetcher.data?.message ? (
            <div id="custom-answer-form-error" aria-live="polite">
              <p className="mt-2 text-red-500">{fetcher.data.message}</p>
            </div>
          ) : null}
          {/* Currently necessary to send the full form via Enter */}
          <button type="submit" className="hidden">
            Submit
          </button>
        </fieldset>
      </fetcher.Form>
    </>
  );
}
