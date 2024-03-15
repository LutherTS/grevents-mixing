import { ActionFunctionArgs } from "@remix-run/node";
import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";
import { SignUpForm } from "~/components/sign-up-form";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const username = form.get("username");
  const appWideName = form.get("appwidename");
  const email = form.get("email");
  const signUpPassword = form.get("signuppassword");
  const confirmPassword = form.get("confirmpassword");
  console.log(username);
  console.log(appWideName);
  console.log(email);
  console.log(signUpPassword);
  console.log(confirmPassword);

  if (
    typeof username !== "string" ||
    typeof appWideName !== "string" ||
    typeof email !== "string" ||
    typeof signUpPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return null;
  }
  return null;
};

export default function SignUpPage() {
  return (
    <>
      <H1>Welcome to the Sign Up Page.</H1>
      <SignUpForm />
      <PageLink href={`/sign-in`}>To sign in</PageLink>
      <PageLink href={`/`}>Return home</PageLink>
    </>
  );
}
