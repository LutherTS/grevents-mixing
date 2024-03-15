import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { signOut } from "~/utilities/server/session.server";

export const action = async ({ request }: ActionFunctionArgs) =>
  signOut(request);

export const loader = async () => redirect("/");
