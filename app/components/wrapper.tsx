export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col justify-center rounded-lg bg-transparent px-8 py-16 text-center sm:min-h-[70vh] sm:min-w-[55ch] sm:max-w-prose sm:bg-white sm:px-16 sm:dark:bg-neutral-900">
        {children}
      </div>
    </>
  );
}
