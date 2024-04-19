import { MouseEventHandler } from "react";

export function TextButton({
  disabled,
  children,
  specifiedClasses,
}: {
  disabled: boolean;
  children: React.ReactNode;
  specifiedClasses?: string;
}) {
  return (
    <>
      <button
        disabled={disabled}
        className={
          specifiedClasses ||
          "inline text-blue-500 hover:text-blue-400 disabled:!text-gray-500 disabled:hover:!text-gray-500 dark:hover:text-blue-600 dark:disabled:hover:!text-gray-500"
        }
      >
        {children}
      </button>
    </>
  );
}

export function TextButtonOnClick({
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
