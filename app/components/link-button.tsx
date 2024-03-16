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
        className="inline text-blue-500 hover:text-blue-400 disabled:text-gray-500 disabled:hover:text-gray-500 dark:hover:text-blue-600 disabled:dark:hover:text-gray-500"
      >
        {children}
      </button>
    </>
  );
}
