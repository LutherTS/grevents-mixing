export function FormButton({ children }: { children: React.ReactNode }) {
  return (
    <>
      <button className="mt-6 w-full max-w-[40ch] rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400 disabled:!bg-gray-500 disabled:hover:bg-gray-500 dark:hover:bg-blue-600 disabled:dark:hover:bg-gray-500">
        {children}
      </button>
    </>
  );
}
