import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { createCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind } from "~/librairies/changes/questions";
import {
  deleteUserQuestionAtUserIdAndQuestionId,
  upsertUserQuestionAndAnswerByUserIdQuestionIdValueAndKind,
} from "~/librairies/changes/userquestions";
import { updateUserStatusPersonalInfoById } from "~/librairies/changes/users";
import { countUserPseudonativeNotIrlAnswersByUserId } from "~/librairies/data/answers";
import { findPseudoQuestionByName } from "~/librairies/data/questions";
import {
  findDeletablePreExistingUserQuestionAnswerAtUserIdAndQuestionId,
  findDeletablePreExistingUserQuestionAtUserIdAndQuestionId,
  findPreExistingUserQuestionByUserIdAndQuestionId,
} from "~/librairies/data/userquestions";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import { CreateCustomizedAnswerSchema } from "~/librairies/validations/answers";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const pseudonativeNotIrlQuestionName = form.get("pseudonativenotirlquestion");
  const pseudonativeNotIrlAnswerValue = form.get("pseudonativenotirlanswer");

  const validatedFields = CreateCustomizedAnswerSchema.safeParse({
    questionInitialName: pseudonativeNotIrlQuestionName,
    answerInitialValue: pseudonativeNotIrlAnswerValue,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Pseudonative Answer.",
      },
      { status: 400 }
    );
  }

  const { questionInitialName, answerInitialValue } = validatedFields.data;

  const question = await findPseudoQuestionByName(questionInitialName);

  if (!question) {
    await createCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
      questionInitialName,
      answerInitialValue,
      verifiedUser.id,
      "PSEUDONATIVE"
    );

    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "PSEUDONATIVECRITERIANOTIRLADDED"
    );

    return redirect(`/users/${verifiedUser.username}/personal-info/customized`);
  }

  const userQuestion = await findPreExistingUserQuestionByUserIdAndQuestionId(
    verifiedUser.id,
    question.id
  );

  if (
    userQuestion &&
    userQuestion.kind === "PSEUDONATIVEIRL" &&
    userQuestion.question.kind === "PSEUDO" &&
    userQuestion.state === "LIVE" &&
    userQuestion.answer?.state === "LIVE"
  ) {
    return json(
      {
        message: `Database Error: You've already answered this question as a pseudonative irl criteria`,
      },
      { status: 403 }
    );
  }

  const userPseudonativeNotIrlAnswersCount =
    await countUserPseudonativeNotIrlAnswersByUserId(verifiedUser.id);

  if (userPseudonativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
    return json(
      {
        message: `Database Error: Limit number of answers reached for this type of criteria (${DEFAULT_ANSWERS_LIMIT}).`,
      },
      { status: 403 }
    );
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
    answerInitialValue,
    "PSEUDONATIVE"
  );

  if (
    userQuestion &&
    userQuestion.kind === "PSEUDONATIVE" &&
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
      "PSEUDONATIVECRITERIANOTIRLADDED"
    );
  }

  return redirect(`/users/${verifiedUser.username}/personal-info/customized`);
};

export const loader = async () => redirect("/");
