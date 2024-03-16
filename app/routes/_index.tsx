import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignOutForm } from "~/components/sign-out-form";
import { getVerifiedUser } from "~/utilities/server/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const verifiedUser = await getVerifiedUser(request);

  return json({ verifiedUser });
};

export default function HomePage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to Grevents.</H1>
      <p className="mt-2">Start the demonstration at the links below.</p>
      {data.verifiedUser ? (
        <>
          <PageLink href={`/users/${data.verifiedUser.username}/dashboard`}>
            Go to your dashboard
          </PageLink>
          <SignOutForm homepage />
        </>
      ) : (
        <>
          <PageLink href={`sign-in`}>Sign in</PageLink>
          <PageLink href={`sign-up`}>Sign up</PageLink>
        </>
      )}
      <div className="mt-8">
        <p>
          <span className="font-bold">Grevents</span> is a web application
          designed to strictly share bits of information between users.
          Visibility granted on each{" "}
          <span className="font-semibold">criteria</span> (as they&apos;re
          called in Grevents) is specific to the relation between each user,
          whether they&apos;re &quot;friends&quot; or have upgraded their
          friendship to &quot;irl.&quot;
        </p>
        <p className="mt-4">
          There are five categories of criteria.{" "}
          <span className="text-violet-500">Native criteria</span>,{" "}
          <span className="text-purple-500">native irl criteria</span>,{" "}
          <span className="text-green-500">pseudonative criteria</span>,{" "}
          <span className="text-emerald-500">pseudonative irl criteria</span>,
          and finally, <span className="text-lime-500">custom criteria</span>.
        </p>
        <p className="mt-4">
          <span className="text-violet-500">Native criteria</span> are based on
          questions pre-registered into Grevents, such as &quot;First
          name.&quot; Their answers are visible to all your friends.
        </p>
        <p className="mt-2">
          <span className="text-purple-500">Native irl criteria</span> are also
          based on questions pre-registered into Grevents, such as &quot;Last
          name.&quot; Their answers are only visible to your friends upgraded to
          irl.
        </p>
        <p className="mt-2">
          <span className="text-green-500">Pseudonative criteria</span> are
          based on questions you create yourself before answering them. Their
          answers are visible to all your friends, just like native criteria.
        </p>
        <p className="mt-2">
          <span className="text-emerald-500">Pseudonative irl criteria</span>{" "}
          are also based on questions you create yourself before answering them.
          Their answers are only visible to your friends upgraded to irl, just
          like native irl criteria.
        </p>
        <p className="mt-2">
          <span className="text-lime-500">Custom criteria</span> are based on
          questions you create yourself before answering them as well, just like
          pseudonative and pseudonative irl criteria. They differ in that you
          can manually select which friend to share them to, or choose to not
          share them and to keep these criteria for yourself if you so desire.
        </p>
        <p className="mt-4 font-bold">
          Grevents aims to be that one click you need on a loved one&apos;s
          profile to all the intelligence, trivial or essential, you need to
          remember at any random time from your friends and family.
        </p>
      </div>
    </>
  );
}
