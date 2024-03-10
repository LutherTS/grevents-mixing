import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utilities/db.server";

import { H1 } from "~/components/h1";
import { PageLink } from "~/components/page-link";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const username = params.username;

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      state: true,
      statusTitle: true,
      statusDashboard: true,
      statusPersonalInfo: true,
      username: true,
      appWideName: true,
      friendCode: true,
      hasTemporaryPassword: true,
    },
    where: { username: username, state: "LIVE" || "DEACTIVATED" },
  });
  if (!user) {
    throw new Response("Could not find requested user.", {
      status: 404,
    });
  }

  const pinnedAnswers = await prisma.answer.findMany({
    select: {
      userQuestion: {
        select: {
          isPinned: true,
          kind: true,
          id: true,
          question: {
            select: {
              name: true,
              kind: true,
            },
          },
          _count: {
            select: {
              userQuestionFriends: {
                where: {
                  isSharedToFriend: true,
                },
              },
            },
          },
        },
      },
      value: true,
      id: true,
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
    where: {
      userQuestion: {
        user: {
          id: user.id,
        },
        question: {
          state: "LIVE",
        },
        isPinned: true,
        state: "LIVE",
      },
      user: {
        id: user.id,
        state: "LIVE" || "DEACTIVATED",
      },
      state: "LIVE",
    },
  });

  return { user, pinnedAnswers };
};

export default function PersonalInfoPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <H1>Welcome to {data.user.appWideName}&apos;s Personal Info.</H1>

      <PageLink href={`/users/${data.user.username}/dashboard`}>
        back to dashboard (for now)
      </PageLink>

      <PageLink href={`standardized`}>To Standardized criteria</PageLink>
      <PageLink href={`customized`}>To Customized criteria</PageLink>
    </>
  );
}
