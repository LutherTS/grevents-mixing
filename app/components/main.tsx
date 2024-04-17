export function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen w-full justify-center px-8 py-24 text-black dark:text-white bg-gradient-to-b from-transparent via-[96%] via-white dark:via-black bg-[#D6DBDC] dark:bg-[#080C14]">
        {children}
      </main>
    </>
  );
}
