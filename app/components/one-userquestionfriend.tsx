import { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";

import {
  selectUserQuestionFriends,
  selectUserQuestionFriendsAnswers,
} from "~/librairies/subdata/userquestionfriends";
import { PageLinkDivless } from "./page-link";

export function OneUserQuestionFriendRemovable({
  userQuestionFriend,
}: {
  userQuestionFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriends;
  }>;
}) {
  return (
    <>
      <div className="mt-2 flex justify-center">
        <ButtonCancelShareUserQuestionFriendForm
          userQuestionFriend={userQuestionFriend}
        />
        <p>
          {userQuestionFriend.contact.userLast.state === "DEACTIVATED" ? (
            <>
              <span className="font-semibold text-gray-500">
                {userQuestionFriend.contact.userLast.appWideName}
              </span>
            </>
          ) : (
            <>
              <PageLinkDivless
                href={`/users/${userQuestionFriend.contact.userLast.username}/profile`}
                specifiedClasses="font-semibold text-blue-500 hover:text-blue-400 dark:hover:text-blue-600"
              >
                {userQuestionFriend.contact.userLast.appWideName}
              </PageLinkDivless>
            </>
          )}{" "}
          / {userQuestionFriend.contact.userLast.username}
        </p>
      </div>
    </>
  );
}

export function ButtonCancelShareUserQuestionFriendForm({
  userQuestionFriend,
}: {
  userQuestionFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriends;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/unshare-user-question-friend"
        method="post"
        className="me-2 flex items-center"
      >
        <input
          type="hidden"
          name="userquestionfriendid"
          value={userQuestionFriend.id}
        />
        <button
          disabled={fetcher.state !== "idle"}
          className="h-4 w-4 rounded-full bg-pink-500 hover:bg-pink-300 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-pink-700"
        />
      </fetcher.Form>
    </>
  );
}

export function OneUserQuestionFriendUnpinnable({
  pathname,
  userQuestionFriend,
}: {
  pathname: string;
  userQuestionFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>;
}) {
  return (
    <>
      <div>
        <p className="mt-2">
          {userQuestionFriend.userQuestion.question.kind === "NATIVE" &&
            userQuestionFriend.userQuestion.kind === "NONE" && (
              <span className="text-violet-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                {/* / native */}
              </span>
            )}
          {userQuestionFriend.userQuestion.question.kind === "NATIVEIRL" &&
            userQuestionFriend.userQuestion.kind === "NONE" && (
              <span className="text-purple-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                {/* / native irl */}
              </span>
            )}
          {userQuestionFriend.userQuestion.question.kind === "PSEUDO" &&
            userQuestionFriend.userQuestion.kind === "PSEUDONATIVE" && (
              <span className="text-green-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                {/* / pseudonative */}
              </span>
            )}
          {userQuestionFriend.userQuestion.question.kind === "PSEUDO" &&
            userQuestionFriend.userQuestion.kind === "PSEUDONATIVEIRL" && (
              <span className="text-emerald-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                {/* / pseudonative irl */}
              </span>
            )}
          {/* no link, UserQuestionFriends not counted */}
          {userQuestionFriend.userQuestion.question.kind === "CUSTOM" &&
            userQuestionFriend.userQuestion.kind === "NONE" && (
              <span className="text-lime-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                {/* / custom  */}/ shared to you
              </span>
            )}
        </p>
        <div className="mt-2 flex justify-center">
          <ButtonUnpinnableByFriendForm
            pathname={pathname}
            userQuestionFriend={userQuestionFriend}
          />
          {userQuestionFriend.userQuestion.answer?.source ? (
            <>
              <PageLinkDivless
                href={userQuestionFriend.userQuestion.answer?.source}
                specifiedClasses="inline-block text-black dark:text-white underline hover:text-neutral-500 dark:hover:text-neutral-500"
                specifiedTarget="_blank"
              >
                {userQuestionFriend.userQuestion.answer?.value}
              </PageLinkDivless>
            </>
          ) : (
            <>{userQuestionFriend.userQuestion.answer?.value}</>
          )}
          <ButtonRePinnableByFriendForm
            pathname={pathname}
            userQuestionFriend={userQuestionFriend}
          />
        </div>
      </div>
    </>
  );
}

function ButtonUnpinnableByFriendForm({
  pathname,
  userQuestionFriend,
}: {
  pathname: string;
  userQuestionFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/unpin-user-question-friend"
        method="post"
        className="me-2 flex items-center"
      >
        <input type="hidden" name="pathname" value={pathname} />
        <input
          type="hidden"
          name="userquestionfriendid"
          value={userQuestionFriend.id}
        />
        <button
          disabled={fetcher.state !== "idle"}
          className="h-4 w-4 rounded-full bg-cyan-500 hover:bg-pink-300 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-pink-700"
        />
      </fetcher.Form>
    </>
  );
}

function ButtonRePinnableByFriendForm({
  pathname,
  userQuestionFriend,
}: {
  pathname: string;
  userQuestionFriend: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>;
}) {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form
        action="/re-pin-user-question-friend"
        method="post"
        className="ms-2 flex items-center"
      >
        <input type="hidden" name="pathname" value={pathname} />
        <input
          type="hidden"
          name="userquestionfriendid"
          value={userQuestionFriend.id}
        />
        <button
          disabled={fetcher.state !== "idle"}
          className="h-4 w-4 rounded-full bg-indigo-500 hover:bg-indigo-300 disabled:!bg-gray-500 disabled:hover:!bg-gray-500 dark:hover:bg-indigo-700"
        />
      </fetcher.Form>
    </>
  );
}
