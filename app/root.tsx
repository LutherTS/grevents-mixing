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
import radixStyleSheet from "@radix-ui/themes/styles.css";
// import { Theme, ThemePanel } from "@radix-ui/themes";

import tailwindStyleSheet from "~/tailwind.css";
import { Main } from "./components/main";
import { Wrapper } from "./components/wrapper";
import { PageLink } from "./components/page-link";
import { TextButtonOnClick } from "./components/link-button";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: radixStyleSheet },
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
                <TextButtonOnClick
                  handleClick={handlePreviousNavigation}
                  disabled={false}
                >
                  Or go back to the previous page
                </TextButtonOnClick>
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

/* Notes
I can import the Radix UI stylesheet without changes to my existing Tailwind look. The stylesheet only applies to what is wrapped in side the Theme component, which can effectively be wrapped and nested on any page.
https://www.radix-ui.com/themes/docs/components/theme
There are two things I'll have to do. 
This first one is, trying to use Radix Themes inside my existing code, so inside my Main and Wrapper components, but nested inside Theme components to get an early feel of the components provided.
Then I'll have to separate my code so that I can do away with Main and Wrapper in the root layout and have them only respond to the v1 of my applications, so on existing _index, sign-in, sign-up and users. pages.
*/
