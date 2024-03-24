import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId,
  updateAnswerValueStatusPersonalInfoByIdAndUserId,
} from "~/librairies/changes/answers";
import { findAnswerByIdAndUserId } from "~/librairies/data/answers";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const answerId = form.get("answerid");
  const answerValue = form.get("answervalue") || "";

  if (typeof answerId !== "string" || typeof answerValue !== "string") {
    return null;
  }

  const answer = await findAnswerByIdAndUserId(answerId, verifiedUser.id);

  if (!answer) {
    return null;
  }

  if (
    answer.userQuestion.question.kind === "NATIVE" ||
    answer.userQuestion.question.kind === "NATIVEIRL"
  ) {
    if (answerValue !== "") {
      await updateAnswerValueStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        answerValue,
        "STANDARDIZEDANSWERUPDATED"
      );
    }
    if (answerValue === "") {
      await updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        "STANDARDIZEDANSWERDELETED"
      );
    }

    return redirect(
      `/users/${answer.user.username}/personal-info/standardized`
    );
  }

  if (
    answer.userQuestion.question.kind === "PSEUDO" ||
    answer.userQuestion.question.kind === "CUSTOM"
  ) {
    if (answerValue !== "") {
      await updateAnswerValueStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        answerValue,
        "CUSTOMIZEDANSWERUPDATED"
      );
    }
    if (answerValue === "") {
      await updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        "CUSTOMIZEDANSWERDELETED"
      );
    }

    return redirect(`/users/${answer.user.username}/personal-info/customized`);
  }
};

export const loader = async () => redirect("/");
