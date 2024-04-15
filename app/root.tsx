import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
// import radixStyleSheet from "@radix-ui/themes/styles.css";
// import { Theme, ThemePanel } from "@radix-ui/themes";

import tailwindStyleSheet from "~/tailwind.css";
import { Main } from "./components/main";
import { Wrapper } from "./components/wrapper";
import { PageLink } from "./components/page-link";
import { LinkButtonOnClick } from "./components/link-button";

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: radixStyleSheet },
  { rel: "stylesheet", href: tailwindStyleSheet },
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

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error) && error.status === 404) {
    errorMessage = "The page you're looking for has not been found.";
  } else if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else {
    errorMessage = "Unknown error";
  }

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
          {/* <Theme> */}
          <Main>
            <Wrapper>
              {/* Same spot as Outlet in App */}
              <div className="space-y-4 my-4">
                <p className="mt-2">{errorMessage}</p>
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
          {/* </Theme> */}
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
        {/* <Theme> */}
        <Main>
          <Wrapper>
            <Outlet />
          </Wrapper>
        </Main>
        {/* <ThemePanel /> */}
        {/* </Theme> */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
