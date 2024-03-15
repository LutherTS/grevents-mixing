import { useFetcher } from "@remix-run/react";

export function ToastForm({
  action,
  specifiedClasses,
  children,
}: {
  action: string;
  specifiedClasses?: string;
  children: React.ReactNode;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action={action} method="post" className="mb-2">
        <button
          disabled={fetcher.state !== "idle"}
          className={
            specifiedClasses
              ? specifiedClasses
              : "text-green-500 disabled:text-gray-500"
          }
        >
          {children}
        </button>
      </fetcher.Form>
    </>
  );
}
