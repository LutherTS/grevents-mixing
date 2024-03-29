import { MouseEventHandler } from "react";

export function LinkButton({
  disabled,
  children,
}: {
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        disabled={disabled}
        className="inline text-blue-500 hover:text-blue-400 disabled:!text-gray-500 disabled:hover:!text-gray-500 dark:hover:text-blue-600 dark:disabled:hover:!text-gray-500"
      >
        {children}
      </button>
    </>
  );
}

export function LinkButtonOnClick({
  handleClick,
  disabled,
  children,
}: {
  children: React.ReactNode;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}) {
  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className="inline text-blue-500 hover:text-blue-400 disabled:!text-gray-500 disabled:hover:!text-gray-500 dark:hover:text-blue-600 dark:disabled:hover:!text-gray-500"
      >
        {children}
      </button>
    </>
  );
}

export function LinkButtonMockup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="mt-2 text-sky-500">{children}</p>
    </>
  );
}
