import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getVerifiedUserId, kickOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const verifiedUserId = await getVerifiedUserId(request);

  if (!verifiedUserId) {
    throw await kickOut(request);
  }

  const form = await request.formData();
  const userQuestionId = form.get("userquestionid");
  console.log(userQuestionId);

  if (typeof userQuestionId !== "string") {
    return null;
  }

  // return redirect(`/users/${verifiedUser.username}/dashboard`);

  return null;
};

export const loader = async () => redirect("/");
