import { useFetcher } from "@remix-run/react";
import { LinkButton } from "./link-button";

export function DeactivateReactivateForms({ state }: { state: string }) {
  return (
    <>
      {state === "LIVE" && <DeactivateForm />}
      {state === "DEACTIVATED" && <ReactivateForm />}
    </>
  );
}

export function DeactivateForm() {
  const fetcher = useFetcher();
  const disabled = fetcher.state !== "idle";

  return (
    <>
      <fetcher.Form action="/deactivate-profile" method="post" className="mt-2">
        <LinkButton disabled={disabled}>
          Click to deactivate your profile
        </LinkButton>
      </fetcher.Form>
      <p className="mt-2">
        All other users will no longer be able to see your profile.
      </p>
    </>
  );
}

export function ReactivateForm() {
  const fetcher = useFetcher();
  const disabled = fetcher.state !== "idle";

  return (
    <>
      <fetcher.Form action="/reactivate-profile" method="post" className="mt-2">
        <LinkButton disabled={disabled}>
          Click to reactivate your profile
        </LinkButton>
      </fetcher.Form>
      <p className="mt-2">
        All other users will no longer be able to see your profile.
      </p>
    </>
  );
}
