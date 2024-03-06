import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  return { username };
};

export default function PreviewsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.username}&apos;s Previews.</H1>

      <PageLink href={`/users/${data.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`none`}>To &quot;none&quot; preview</PageLink>
      <PageLink href={`friend`}>To &quot;friend&quot; preview</PageLink>
      <PageLink href={`irl`}>To &quot;irl&quot; preview</PageLink>
      <PageLink href={`i-am-blocking`}>
        To &quot;i-am-blocking&quot; preview
      </PageLink>
      <PageLink href={`has-me-blocked`}>
        To &quot;has-me-blocked&quot; preview
      </PageLink>
      <PageLink href={`blocking-blocked`}>
        To &quot;blocking-blocked&quot; preview
      </PageLink>
      <PageLink href={`queried`}>To queried previews</PageLink>
      <PageLink href={`/users/${data.username}/friends/find`}>
        Search for contacts
      </PageLink>
    </>
  );
}
