import { Link } from "@remix-run/react";

export function PageLink({
  href,
  children,
  specifiedClasses,
}: {
  href: string;
  children: React.ReactNode;
  specifiedClasses?: string;
}) {
  return (
    <>
      <Link
        to={href}
        className={
          specifiedClasses
            ? specifiedClasses
            : "mt-2 inline-block text-blue-500 underline hover:text-blue-400 dark:hover:text-blue-600"
        }
      >
        {children}
      </Link>
    </>
  );
}
