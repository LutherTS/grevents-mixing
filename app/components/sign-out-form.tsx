import { Form } from "@remix-run/react";

export function SignOutForm({ homepage }: { homepage?: boolean }) {
  return (
    <>
      <Form action="/sign-out" method="post">
        <button
          type="submit"
          className="mt-2 inline-block text-blue-500 underline hover:text-blue-400 dark:hover:text-blue-600"
        >
          {homepage ? "Sign out" : "sign out"}
        </button>
      </Form>
    </>
  );
}
