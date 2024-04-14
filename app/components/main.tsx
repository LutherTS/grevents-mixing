export function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center px-8 py-24 text-black dark:text-white bg-gradient-to-b from-transparent to-white dark:to-black bg-[#D6DBDC] dark:bg-[#080C14]">
        {children}
      </main>
    </>
  );
}
// #d6dbdc // #D6DBDC
// #080c14 // #080C14
