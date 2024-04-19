import { useFetcher } from "@remix-run/react";

import { TextButton } from "./text-button";

export function FriendCodeForm() {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/modify-friend-code" method="post" className="mt-4">
        <TextButton disabled={fetcher.state !== "idle"}>
          Click to generate a new friend code
        </TextButton>
      </fetcher.Form>
      <p className="mt-2">You&apos;ll see it changed on your Profile page.</p>
    </>
  );
}
