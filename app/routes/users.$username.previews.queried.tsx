import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { findContactByUserFirstIdAndUserLastUsername } from "~/librairies/data/contacts";
import { findUserByUsername } from "~/librairies/data/users";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const user = await findUserByUsername(params.username!);
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const url = new URL(request.url);
  const userlast = url.searchParams.get("userlast") || "";
  const relcombo = url.searchParams.get("relcombo") || "";

  const userToQueriedContact =
    await findContactByUserFirstIdAndUserLastUsername(user.id, userlast);

  return { user, userToQueriedContact };
};

export default function QueriedPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  /* For eventual use
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  */

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Queried Previews.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`..`}>To Previews</PageLink>
      <PageLink href={`../../profile`}>To Your Profile</PageLink>
    </>
  );
}
