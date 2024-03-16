import { Link } from "@remix-run/react";

export function PageLink({
  href,
  relative,
  children,
  specifiedClasses,
}: {
  href: string;
  relative?: "route" | "path";
  specifiedClasses?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Link
          to={href}
          relative={relative ? relative : "path"}
          className={
            specifiedClasses
              ? specifiedClasses
              : "mt-2 inline-block text-blue-500 underline hover:text-blue-400 dark:hover:text-blue-600"
          }
        >
          {children}
        </Link>
      </div>
    </>
  );
}
