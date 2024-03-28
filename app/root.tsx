import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { Main } from "./components/main";
import { Wrapper } from "./components/wrapper";
import { PageLink } from "./components/page-link";
import { LinkButtonOnClick } from "./components/link-button";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "/fonts/inter/inter.css" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Grevents (mixing)" },
    {
      name: "description",
      content:
        "Welcome to Grevents, this time as a first Remix development experience",
    },
  ];
};

// At this point in development, I'm limiting error handling to 404 cases. Anything else, though currently caught in a common error boundary, will eventually be handled at a later time.
export function ErrorBoundary() {
  const navigate = useNavigate();

  function handlePreviousNavigation() {
    navigate(-1);
  }

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Main>
            <Wrapper>
              {/* Same spot as Outlet in App */}
              <div className="space-y-4 my-4">
                <p className="mt-2">
                  The page you&apos;re looking for has not been found.
                </p>
              </div>
              <PageLink href={`/`}>Return home</PageLink>
              <p className="mt-2">
                <LinkButtonOnClick
                  handleClick={handlePreviousNavigation}
                  disabled={false}
                >
                  Or go back to the previous page
                </LinkButtonOnClick>
              </p>
            </Wrapper>
          </Main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Main>
          <Wrapper>
            <Outlet />
          </Wrapper>
        </Main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
