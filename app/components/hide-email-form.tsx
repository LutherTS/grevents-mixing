import { useFetcher } from "@remix-run/react";
import { Prisma } from "@prisma/client";

import { TextButton } from "./text-button";
import { selectUserQuestionAnswer } from "~/librairies/subdata/answers";

export function HideEmailForm({
  answer,
}: {
  answer: Prisma.AnswerGetPayload<{
    select: typeof selectUserQuestionAnswer;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/hide-user-question" method="post" className="mt-4">
        <input type="hidden" name="answerid" value={answer.id} />
        <TextButton
          disabled={fetcher.state !== "idle"}
          specifiedClasses="inline text-blue-500 hover:text-blue-400 disabled:!text-gray-500 disabled:hover:!text-gray-500 dark:hover:text-blue-600 dark:disabled:hover:!text-gray-500"
        >
          {answer.userQuestion.state === "LIVE" && (
            <>To hide your email address, click here</>
          )}
          {answer.userQuestion.state === "HIDDEN" && (
            <>To reveal your email address, click here</>
          )}
        </TextButton>
      </fetcher.Form>
    </>
  );
}
