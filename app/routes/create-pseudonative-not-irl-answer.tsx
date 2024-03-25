import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
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

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  if (!verifiedUser) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const pseudonativeNotIrlQuestionName = form.get("pseudonativenotirlquestion");
  const pseudonativeNotIrlAnswerValue = form.get("pseudonativenotirlanswer");

  if (
    typeof pseudonativeNotIrlQuestionName !== "string" ||
    typeof pseudonativeNotIrlAnswerValue !== "string"
  ) {
    return null;
  }

  const question = await findPseudoQuestionByName(
    pseudonativeNotIrlQuestionName
  );

  //

  // Here's the thing. Normally I update an existing answer when accidentally the answer already existed but was a different kind of pseudonative. However, I realize now that should take into account whether or not the max of the other pseudonative kind has been reached as well. So since this is accidental, and being optimistic risks breaking my system, what should I do?
  // Shouldn't I simply tell the user that they've already answered the question as a different kind of pseudonative?
  // At this point I think this is the best approach, because it can then remind the user of a "are you sure you want to modify the visibility of a data you've already answered". So that's the approach I will go through.

  //

  if (!question) {
    // Il va falloir que je fasse le même travail d'effacement à l'emplacement de la question.
    // ... Mais ce sera demain matin.
    // Ou pas. Il peut y avoir une question dans le même genre qui a été mal créée, c'est vrai. Mais à ce niveau-là ça ne regarde plus l'utilisateur. Dans le cas d'une userQuestion, comme userid et questionid sont uniques, ce problème peut créer un blocage. C'est pourquoi il est impératif de le gérer. Mais dans le cadre d'une question, ça ne crée aucun blocage et demeure donc un problème qui d'éventualité sera à gérer au niveau de la santé régulière de la base de données.

    // If the question doesn't exist at all as a "PSEUDO", meaning if there really isn't a single user of the app yet who've came up with this question, then you can just create your question-userquestion-answer flow without any possible issue, ...
    await createCustomizedQuestionUserQuestionAnswerByNameValueUserIdAndKind(
      pseudonativeNotIrlQuestionName,
      pseudonativeNotIrlAnswerValue,
      verifiedUser.id,
      "PSEUDONATIVE"
    );
    // ... and end it all with a ...
    await updateUserStatusPersonalInfoById(
      verifiedUser.id,
      "PSEUDONATIVECRITERIANOTIRLADDED"
    );
    // ... and a
    return redirect(`/users/${verifiedUser.username}/personal-info/customized`);
    // happy path
  }

  // Maintenant si la question existe, you know how it goes.

  const userQuestion = await findPreExistingUserQuestionByUserIdAndQuestionId(
    verifiedUser.id,
    question.id
  );

  // Here it's going to be more complicated from the get-go, because I'll have to take into consideration the case where the pseudo answer is on the userQuestion from a different kind of pseudo.

  if (
    userQuestion &&
    userQuestion.kind === "PSEUDONATIVEIRL" &&
    userQuestion.question.kind === "PSEUDO" &&
    userQuestion.state === "LIVE" &&
    userQuestion.answer?.state === "LIVE"
  ) {
    return null;
  }

  const userPseudonativeNotIrlAnswersCount =
    await countUserPseudonativeNotIrlAnswersByUserId(verifiedUser.id);

  if (userPseudonativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
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
    pseudonativeNotIrlAnswerValue,
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
