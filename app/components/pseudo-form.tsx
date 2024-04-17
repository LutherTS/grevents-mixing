import { useFetcher } from "@remix-run/react";

import { LinkButton } from "./link-button";
import { Prisma } from "@prisma/client";
import { selectUserQuestionAnswer } from "~/librairies/subdata/answers";

export function PseudoForm({
  answer,
}: {
  answer: Prisma.AnswerGetPayload<{
    select: typeof selectUserQuestionAnswer;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/pseudo-answer" method="post" className="mt-4">
        <input type="hidden" name="answerid" value={answer.id} />
        <LinkButton
          disabled={fetcher.state !== "idle"}
          specifiedClasses="inline text-yellow-500 hover:text-yellow-400 disabled:!text-gray-500 disabled:hover:!text-gray-500 dark:hover:text-yellow-600 dark:disabled:hover:!text-gray-500"
        >
          {answer.userQuestion.kind === "PSEUDONATIVE" && (
            <>To up pseudo criteria to irl, click here</>
          )}
          {answer.userQuestion.kind === "PSEUDONATIVEIRL" && (
            <>To down pseudo criteria from irl, click here</>
          )}
        </LinkButton>
      </fetcher.Form>
    </>
  );
}
