import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;
  return { username };
};

export default function PersonalInfoStandardizedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <H1>Welcome to {data.username}&apos;s Personal Info Standardized.</H1>

      <PageLink href={`/users/${data.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink
        href={`/users/${data.username}/personal-info/standardized/modify-criteria`}
      >
        Modify
      </PageLink>
      <PageLink
        href={`/users/${data.username}/personal-info/standardized/add-criteria`}
      >
        Add standardized criteria
      </PageLink>
      <PageLink href={`/users/${data.username}/personal-info`}>
        To Personal Info
      </PageLink>
      <PageLink href={`/users/${data.username}/personal-info/customized`}>
        To Customized criteria
      </PageLink>
    </>
  );
}
