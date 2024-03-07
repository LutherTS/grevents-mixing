import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  return { username };
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.username}&apos;s Modify App-Wide Name.</H1>

      <PageLink href={`/users/${data.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>
      <PageLink href={`..`}>Cancel</PageLink>
      {/* I'll find a way to make this path relative within this here paramaterized route later. 
      Here's the solution below:
      import { useLocation } from "@remix-run/react";
      const location = useLocation();
      console.log(location); //
      Object { pathname: "/users/LePapier/blocks", search: "", hash: "", state: null, key: "7jg8tp51" }
      const parentPath = location.pathname.split("/").slice(0, -1).join("/");
      console.log(parentPath); //
      /users/LePapier
      But that's not a solution to me. If it truly is that relative paths can go backwards at all, I'm honestly better of not confusing myself including them in this project.
      Alright. I'm reverting this right now.
      */}
    </>
  );
}
