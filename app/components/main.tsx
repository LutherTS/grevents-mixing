export function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center px-8 py-24">
        {children}
      </main>
    </>
  );
}
