import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export default function SignUpPage() {
  return (
    <>
      <H1>Welcome to the Sign Up Page.</H1>

      <PageLink href={`/sign-in`}>To sign in</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
