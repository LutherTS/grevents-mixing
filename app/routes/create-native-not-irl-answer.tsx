import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  deleteUserQuestionAtUserIdAndQuestionId,
  upsertUserQuestionAndAnswerByUserIdQuestionIdValueAndKind,
} from "~/librairies/changes/userquestions";
import { updateUserStatusPersonalInfoById } from "~/librairies/changes/users";
import { countUserNativeNotIrlAnswersByUserId } from "~/librairies/data/answers";
import { findQuestionById } from "~/librairies/data/questions";
import {
  findDeletablePreExistingUserQuestionAnswerAtUserIdAndQuestionId,
  findDeletablePreExistingUserQuestionAtUserIdAndQuestionId,
  findPreExistingUserQuestionByUserIdAndQuestionId,
} from "~/librairies/data/userquestions";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";
import { CreateStandardizedAnswerSchema } from "~/librairies/validations/answers";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const nativeNotIrlQuestionId = form.get("nativenotirlquestion");
  const nativeNotIrlAnswerValue = form.get("nativenotirlanswer");

  const validatedFields = CreateStandardizedAnswerSchema.safeParse({
    questionId: nativeNotIrlQuestionId,
    answerInitialValue: nativeNotIrlAnswerValue,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Native Answer.",
      },
      { status: 400 }
    );
  }

  const { questionId, answerInitialValue } = validatedFields.data;

  const question = await findQuestionById(questionId);

  if (!question) {
    return json(
      {
        message: "Database Error: Could not find selected question.",
      },
      { status: 404 }
    );
  }

  const userQuestion = await findPreExistingUserQuestionByUserIdAndQuestionId(
    verifiedUser.id,
    question.id
  );

  const userNativeNotIrlAnswersCount =
    await countUserNativeNotIrlAnswersByUserId(verifiedUser.id);

  if (userNativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
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
    answerInitialValue
  );

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
  } else {
    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "NATIVECRITERIANOTIRLADDED"
    );
  }

  return redirect(`/users/${verifiedUser.username}/personal-info/standardized`);
};

export const loader = async () => redirect("/");
