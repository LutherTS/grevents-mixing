import { Prisma } from "@prisma/client";

import {
  selectUserQuestionFriends,
  selectUserQuestionFriendsAnswers,
} from "~/librairies/subdata/userquestionfriends";
import { PageLinkDivless } from "./page-link";
import { useFetcher } from "@remix-run/react";

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

// Because userQuestionFriend will be shared via hidden input, like a bind.
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
        action="/cancel-share-user-question-friend"
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
          className="h-4 w-4 rounded-full bg-pink-500 hover:bg-pink-300 disabled:!bg-gray-500 disabled:hover:bg-gray-500 dark:hover:bg-pink-700"
        />
      </fetcher.Form>
    </>
  );
}

export function OneUserQuestionFriendUnpinnable({
  userQuestionFriend,
}: {
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
                / native
              </span>
            )}
          {userQuestionFriend.userQuestion.question.kind === "NATIVEIRL" &&
            userQuestionFriend.userQuestion.kind === "NONE" && (
              <span className="text-purple-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                / native irl
              </span>
            )}
          {userQuestionFriend.userQuestion.question.kind === "PSEUDO" &&
            userQuestionFriend.userQuestion.kind === "PSEUDONATIVE" && (
              <span className="text-green-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                / pseudonative
              </span>
            )}
          {userQuestionFriend.userQuestion.question.kind === "PSEUDO" &&
            userQuestionFriend.userQuestion.kind === "PSEUDONATIVEIRL" && (
              <span className="text-emerald-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                / pseudonative irl
              </span>
            )}
          {/* no link, UserQuestionFriends not counted */}
          {userQuestionFriend.userQuestion.question.kind === "CUSTOM" &&
            userQuestionFriend.userQuestion.kind === "NONE" && (
              <span className="text-lime-500">
                <span className="font-semibold">
                  {userQuestionFriend.userQuestion.question.name}
                </span>{" "}
                / custom / shared to you
              </span>
            )}
        </p>
        <div className="mt-2 flex justify-center">
          <ButtonUnpinnableByFriendForm
            userQuestionFriend={userQuestionFriend}
          />
          <p>{userQuestionFriend.userQuestion.answer?.value}</p>
        </div>
      </div>
    </>
  );
}

// Because userQuestionFriend will be shared via hidden input, like a bind.
function ButtonUnpinnableByFriendForm({
  userQuestionFriend,
}: {
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
        <button
          disabled={fetcher.state !== "idle"}
          className="h-4 w-4 rounded-full bg-pink-500 hover:bg-pink-300 disabled:!bg-gray-500 disabled:hover:bg-gray-500 dark:hover:bg-pink-700"
        />
      </fetcher.Form>
    </>
  );
}
