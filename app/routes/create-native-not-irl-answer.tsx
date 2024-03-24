import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  deleteUserQuestionAtUserIdAndQuestionId,
  upsertNativeNotIrlUserQuestionAndAnswerByUserIdQuestionIdAndValue,
} from "~/librairies/changes/userquestions";
import { updateUserStatusPersonalInfoById } from "~/librairies/changes/users";
import { countUserNativeNotIrlAnswersByUserId } from "~/librairies/data/answers";
import { findQuestionById } from "~/librairies/data/questions";
import { findPreExistingUserQuestionByUserIdAndQuestionId } from "~/librairies/data/userquestions";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const nativeNotIrlQuestionId = form.get("nativenotirlquestion");
  const nativeNotIrlAnswerValue = form.get("nativenotirlanswer");

  if (
    typeof nativeNotIrlQuestionId !== "string" ||
    typeof nativeNotIrlAnswerValue !== "string"
  ) {
    return null;
  }

  const question = await findQuestionById(nativeNotIrlQuestionId);

  if (!question) {
    return null;
  }

  const userQuestion = await findPreExistingUserQuestionByUserIdAndQuestionId(
    verifiedUser.id,
    question.id
  );

  const userNativeNotIrlAnswersCount =
    await countUserNativeNotIrlAnswersByUserId(verifiedUser.id);

  if (userNativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
    return null;
  }

  if (!userQuestion) {
    await deleteUserQuestionAtUserIdAndQuestionId(verifiedUser.id, question.id);
  }

  await upsertNativeNotIrlUserQuestionAndAnswerByUserIdQuestionIdAndValue(
    verifiedUser.id,
    question.id,
    nativeNotIrlAnswerValue
  );

  if (
    userQuestion &&
    userQuestion.kind === "NONE" &&
    userQuestion.question.kind === "NATIVE" &&
    (userQuestion.state === "DELETED" ||
      userQuestion.answer?.state === "DELETED")
  ) {
    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "NATIVECRITERIANOTIRLADDED"
    );
  }

  if (
    userQuestion &&
    userQuestion.kind === "NONE" &&
    userQuestion.question.kind === "NATIVE" &&
    userQuestion.state === "LIVE" &&
    userQuestion.answer?.state === "LIVE"
  ) {
    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "STANDARDIZEDANSWERUPDATED"
    );
  }

  return redirect(`/users/${verifiedUser.username}/personal-info/standardized`);
};

export const loader = async () => redirect("/");
