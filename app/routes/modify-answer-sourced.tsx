import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId,
  updateAnswerValueStatusPersonalInfoByIdAndUserId,
} from "~/librairies/changes/answers";
import { findAnswerByIdAndUserId } from "~/librairies/data/answers";
import { ModifyAnswerSourcedSchema } from "~/librairies/validations/answers";
import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const formAnswerId = form.get("answerid");
  const answerValue = form.get("answervalue") || "";
  const formAnswerSource = form.get("answersource");

  const validatedFields = ModifyAnswerSourcedSchema.safeParse({
    answerId: formAnswerId,
    answerModifiedValue: answerValue,
    answerSource: formAnswerSource,
  });

  if (!validatedFields.success) {
    return json(
      {
        errors: validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 }
      // no message here
      // This is voluntarily ambiguous because the user cannot do anything about a potential failure on the hidden input. That being said, a default answerId error will still be able to be console.logged.
    );
  }

  const { answerId, answerModifiedValue, answerSource } = validatedFields.data;

  const answer = await findAnswerByIdAndUserId(answerId, verifiedUser.id);

  if (!answer) {
    return json(
      {
        message: "Database Error: Could not find original answer.",
      },
      { status: 404 }
    );
  }

  if (answer.userQuestion.question.kind === "PSEUDO") {
    if (answerModifiedValue !== "") {
      await updateAnswerValueStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        answerModifiedValue,
        "CUSTOMIZEDANSWERUPDATED",
        answerSource
      );
    }
    if (answerModifiedValue === "") {
      await updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        "CUSTOMIZEDANSWERDELETED"
      );
    }

    return redirect(`/users/${answer.user.username}/personal-info/customized`);
  }

  if (answer.userQuestion.question.kind === "CUSTOM") {
    if (answerModifiedValue !== "") {
      await updateAnswerValueStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        answerModifiedValue,
        "CUSTOMANSWERUPDATED",
        answerSource
      );
      return null;
    }
    if (answerModifiedValue === "") {
      await updateAnswerStateDeletedStatusPersonalInfoByIdAndUserId(
        answerId,
        verifiedUser.id,
        "CUSTOMIZEDANSWERDELETED"
      );
      return redirect(
        `/users/${answer.user.username}/personal-info/customized`
      );
    }
  }
};

export const loader = async () => redirect("/");
