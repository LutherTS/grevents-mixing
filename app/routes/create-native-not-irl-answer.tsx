import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateUserStatusPersonalInfoById } from "~/librairies/changes/users";
import { countUserNativeNotIrlAnswersByUserId } from "~/librairies/data/answers";
import { findQuestionById } from "~/librairies/data/questions";
import { DEFAULT_ANSWERS_LIMIT } from "~/librairies/subdata/answers";

import { getVerifiedUser, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  // This right here, should have been in every API endpoint.
  // And will be.
  // Replacing the simple getVerifiedUserId which getVerifiedUser includes.

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

  // Everything that has to do with the database needs to be verified one way or the other before interaction. This way, I can send the proper error message every step of the way. For example, if here there actually is not a question with nativeNotIrlQuestionId, I can say so right away, instead of having to somehow dismantle the wide error of Prisma when such an question is not found. (That's some if/elses I don't even know I'll be able to produce.)
  // Because this is an insert, that actually includes the user, who in update situation was verified by their relationship with the matter to be updated. Here, I first checked whether the user is connected, but I have not checked whether they correspond to an ID in the data base. I'm going to have...

  const question = await findQuestionById(nativeNotIrlQuestionId);

  if (!question) {
    return null;
  }

  // L'analyse du count doit être au plus proche de la création de sorte que l'écart de temps entre les deux soient le plus minime possible, même en millisecondes.

  const userNativeNotIrlAnswersCount =
    await countUserNativeNotIrlAnswersByUserId(verifiedUser.id);

  // Et c'est aussi de cette façon que ce traitement aurait dû être fait, renvoyer ici null mais plus tard une erreur lorsque la limite est atteinte, au lieu de faire l'opération à l'inverse sans avoir la possibilité de renvoyer d'erreur.

  if (userNativeNotIrlAnswersCount >= DEFAULT_ANSWERS_LIMIT) {
    return null;
  }

  // Le système que j'utilise va requérir que je fasse toutes mes modifications une à une à la main, parce que je n'efface pas mes entrées, je leur donne un statut "DELETED". Je ne les efface que lorsque je sais que selon mon sytème, elles ne peuvent qu'être erronées, en fait surtout vu que SQLite ne supporte pas les enums, donc je peux avoir une entrée au statut "CHARABIA" sans que je ne me rende compte, quand bien même ce serait impossible avec Postgres.
  // Du coup je peux garder pour l'instant le update updateUserStatusPersonalInfoById, mais pour tout le reste j'efface.

  await updateUserStatusPersonalInfoById(
    verifiedUser.id,
    "NATIVECRITERIANOTIRLADDED"
  );

  return redirect(`/users/${verifiedUser.username}/personal-info/standardized`);
};

export const loader = async () => redirect("/");
