import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind } from "~/librairies/changes/questions";
import {
  deleteUserQuestionAtUserIdAndQuestionId,
  upsertUserQuestionAndAnswerByUserIdQuestionIdValueAndKind,
} from "~/librairies/changes/userquestions";
import { updateUserStatusPersonalInfoById } from "~/librairies/changes/users";
import { countUserPseudonativeIrlAnswersByUserId } from "~/librairies/data/answers";
import { findPseudoQuestionByName } from "~/librairies/data/questions";
import {
  findDeletablePreExistingUserQuestionAnswerAtUserIdAndQuestionId,
  findDeletablePreExistingUserQuestionAtUserIdAndQuestionId,
  findPreExistingUserQuestionByUserIdAndQuestionId,
} from "~/librairies/data/userquestions";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const pseudonativeIrlQuestionName = form.get("pseudonativeirlquestion");
  const pseudonativeIrlAnswerValue = form.get("pseudonativeirlanswer");

  if (
    typeof pseudonativeIrlQuestionName !== "string" ||
    typeof pseudonativeIrlAnswerValue !== "string"
  ) {
    return null;
  }

  const question = await findPseudoQuestionByName(pseudonativeIrlQuestionName);

  if (!question) {
    await createCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
      pseudonativeIrlQuestionName,
      pseudonativeIrlAnswerValue,
      verifiedUser.id,
      "PSEUDONATIVEIRL"
    );

    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "PSEUDONATIVECRITERIAIRLADDED"
    );

    return redirect(`/users/${verifiedUser.username}/personal-info/customized`);
  }

  const userQuestion = await findPreExistingUserQuestionByUserIdAndQuestionId(
    verifiedUser.id,
    question.id
  );

  if (
    userQuestion &&
    userQuestion.kind === "PSEUDONATIVE" &&
    userQuestion.question.kind === "PSEUDO" &&
    userQuestion.state === "LIVE" &&
    userQuestion.answer?.state === "LIVE"
  ) {
    return null;
  }

  const userPseudonativeIrlAnswersCount =
    await countUserPseudonativeIrlAnswersByUserId(verifiedUser.id);

  if (userPseudonativeIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
    return null;
  }

  // This is all the BS I have to do because Prisma currently does not support "delete if exists"
  if (!userQuestion) {
    // First, I find if there is an incorrect userQuestion regarding only its userQuestion fields.
    let deletableUserQuestion =
      await findDeletablePreExistingUserQuestionAtUserIdAndQuestionId(
        verifiedUser.id,
        question.id
      );

    if (!deletableUserQuestion) {
      // Second, if that test is passed, I find if there is an incorrect userQuestion regarding only its answer fields.
      deletableUserQuestion =
        await findDeletablePreExistingUserQuestionAnswerAtUserIdAndQuestionId(
          verifiedUser.id,
          question.id
        );
    }

    if (deletableUserQuestion) {
      // Then, if either tests return such an incorrect userQuestion, then I delete it.
      await deleteUserQuestionAtUserIdAndQuestionId(
        verifiedUser.id,
        question.id
      );
    }
  }
  // And now that I know for sure any incorrect userQuestion at userId and questionId is deleted if it existed, that's when I can create or update the new userQuestion and answer I initially intended to simply create.

  await upsertUserQuestionAndAnswerByUserIdQuestionIdValueAndKind(
    verifiedUser.id,
    question.id,
    pseudonativeIrlAnswerValue,
    "PSEUDONATIVEIRL"
  );

  if (
    userQuestion &&
    userQuestion.kind === "PSEUDONATIVEIRL" &&
    userQuestion.question.kind === "PSEUDO" &&
    userQuestion.state === "LIVE" &&
    userQuestion.answer?.state === "LIVE"
  ) {
    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "CUSTOMIZEDANSWERUPDATED"
    );
  } else {
    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "PSEUDONATIVECRITERIAIRLADDED"
    );
  }

  return redirect(`/users/${verifiedUser.username}/personal-info/customized`);
};

export const loader = async () => redirect("/");
