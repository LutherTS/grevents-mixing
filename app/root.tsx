import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { Main } from "./components/main";
import { Wrapper } from "./components/wrapper";

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
