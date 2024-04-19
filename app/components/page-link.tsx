import { Link } from "@remix-run/react";

export function PageLink({
  href,
  relative,
  children,
  specifiedClasses,
}: {
  href: string;
  relative?: "route" | "path";
  children: React.ReactNode;
  specifiedClasses?: string;
}) {
  return (
    <>
      <div>
        <Link
          to={href}
          relative={relative ? relative : "path"}
          className={
            specifiedClasses ||
            "mt-2 inline-block text-blue-500 underline hover:text-blue-400 dark:hover:text-blue-600"
          }
        >
          {children}
        </Link>
      </div>
    </>
  );
}

export function PageLinkDivless({
  href,
  relative,
  children,
  specifiedClasses,
  specifiedTarget,
}: {
  href: string;
  relative?: "route" | "path";
  children: React.ReactNode;
  specifiedClasses?: string;
  specifiedTarget?: string;
}) {
  return (
    <>
      <Link
        to={href}
        relative={relative ? relative : "path"}
        className={
          specifiedClasses ||
          "mt-2 inline-block text-blue-500 underline hover:text-blue-400 dark:hover:text-blue-600"
        }
        target={specifiedTarget || undefined}
      >
        {children}
      </Link>
    </>
  );
}
