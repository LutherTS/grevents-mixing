import { useFetcher } from "@remix-run/react";
import { LinkButton } from "./link-button";

export function FriendCodeForm() {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/modify-friend-code" method="post" className="mt-4">
        <LinkButton disabled={fetcher.state !== "idle"}>
          Click to generate a new friend code
        </LinkButton>
      </fetcher.Form>
      <p className="mt-2">You&apos;ll see it changed on your Profile page.</p>
    </>
  );
}
