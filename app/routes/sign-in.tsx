import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export default function SignInPage() {
  return (
    <>
      <H1>Welcome to the Sign In Page.</H1>

      <PageLink href={`/sign-up`}>To sign up</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
