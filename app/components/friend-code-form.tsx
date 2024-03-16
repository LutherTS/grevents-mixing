import { useFetcher } from "@remix-run/react";
import { LinkButton } from "./link-button";

export function FriendCodeForm() {
  const fetcher = useFetcher();
  const disabled = fetcher.state !== "idle";

  return (
    <>
      <fetcher.Form action="/modify-friend-code" method="post" className="mt-2">
        <LinkButton disabled={disabled}>
          Click to generate a new friend code
        </LinkButton>
      </fetcher.Form>
      <p className="mt-2">
        You&apos;ll see it changed on your Personal info page.
      </p>
    </>
  );
}
