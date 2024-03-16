import { PageLink } from "./page-link";

export function BackToDashboardLink({ href }: { href: string }) {
  return (
    <>
      <PageLink href={href}>back to dashboard</PageLink>
    </>
  );
}
