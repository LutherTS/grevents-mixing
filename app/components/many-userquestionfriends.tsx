import { Prisma } from "@prisma/client";
import { useState } from "react";
import _ from "lodash";

import {
  selectUserQuestionFriends,
  selectUserQuestionFriendsAnswers,
} from "~/librairies/subdata/userquestionfriends";
import { TextButtonOnClick } from "./link-button";
import {
  OneUserQuestionFriendRemovable,
  OneUserQuestionFriendUnpinnable,
} from "./one-userquestionfriend";

export function ManyUserQuestionFriendsShared({
  userQuestionFriends,
}: {
  userQuestionFriends: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriends;
  }>[];
}) {
  return (
    <>
      {userQuestionFriends.length > 0 && (
        <>
          <div>
            {userQuestionFriends.length >= 2 ? (
              <p className="mt-2 font-semibold text-zinc-500">
                Shared with the following friends ({userQuestionFriends.length})
              </p>
            ) : (
              <p className="mt-2 font-semibold text-zinc-500">
                Shared with the following friend ({userQuestionFriends.length})
              </p>
            )}
            {userQuestionFriends.length <= 4 ? (
              <>
                <ol>
                  {userQuestionFriends.map((userQuestionFriend) => {
                    return (
                      <li key={userQuestionFriend.id}>
                        <OneUserQuestionFriendRemovable
                          userQuestionFriend={userQuestionFriend}
                        />
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ManyPaginatedUserQuestionFriendsShared
                userQuestionFriends={userQuestionFriends}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

function ManyPaginatedUserQuestionFriendsShared({
  userQuestionFriends,
}: {
  userQuestionFriends: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriends;
  }>[];
}) {
  const chunkedUserQuestionFriends = _.chunk(userQuestionFriends, 4);

  const [position, setPosition] = useState(0);

  function handlePreviousPosition() {
    setPosition(position - 1);
  }

  function handleNextPosition() {
    setPosition(position + 1);
  }

  return (
    <>
      <ol>
        {chunkedUserQuestionFriends[position].map((userQuestionFriend) => {
          return (
            <li key={userQuestionFriend.id}>
              <OneUserQuestionFriendRemovable
                userQuestionFriend={userQuestionFriend}
              />
            </li>
          );
        })}
      </ol>
      <p className="mt-2">
        <TextButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedUserQuestionFriends.length - 1}
        >
          Next
        </TextButtonOnClick>
      </p>
    </>
  );
}

export function ManyUserQuestionFriendsPinned({
  pathname,
  userQuestionFriendsAnswers,
  label,
  notLabel,
}: {
  pathname: string;
  userQuestionFriendsAnswers: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>[];
  label: string;
  notLabel: string;
}) {
  return (
    <>
      <div>
        <p className="mt-2 font-semibold text-zinc-500">{label}</p>
        {userQuestionFriendsAnswers.length > 0 && (
          <>
            {userQuestionFriendsAnswers.length <= 4 ? (
              <>
                <ol className="space-y-4 mt-4">
                  {userQuestionFriendsAnswers.map((answer) => {
                    return (
                      <li key={answer.id}>
                        <OneUserQuestionFriendUnpinnable
                          pathname={pathname}
                          userQuestionFriend={answer}
                        />
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <ManyPaginatedUserQuestionFriendsPinned
                pathname={pathname}
                userQuestionFriendsAnswers={userQuestionFriendsAnswers}
              />
            )}
          </>
        )}
        {userQuestionFriendsAnswers.length === 0 && (
          <>
            <p className="mt-2">{notLabel}</p>
          </>
        )}
      </div>
    </>
  );
}

function ManyPaginatedUserQuestionFriendsPinned({
  pathname,
  userQuestionFriendsAnswers,
}: {
  pathname: string;
  userQuestionFriendsAnswers: Prisma.UserQuestionFriendGetPayload<{
    select: typeof selectUserQuestionFriendsAnswers;
  }>[];
}) {
  const chunkedUserQuestionFriendsAnswers = _.chunk(
    userQuestionFriendsAnswers,
    4
  );

  const [position, setPosition] = useState(0);

  function handlePreviousPosition() {
    setPosition(position - 1);
  }

  function handleNextPosition() {
    setPosition(position + 1);
  }

  return (
    <>
      {
        <ol className="space-y-4 mt-4">
          {chunkedUserQuestionFriendsAnswers[position].map((answer) => {
            return (
              <li key={answer.id}>
                <OneUserQuestionFriendUnpinnable
                  pathname={pathname}
                  userQuestionFriend={answer}
                />
              </li>
            );
          })}
        </ol>
      }
      <p className="mt-2">
        <TextButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </TextButtonOnClick>
        &nbsp;/&nbsp;
        <TextButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedUserQuestionFriendsAnswers.length - 1}
        >
          Next
        </TextButtonOnClick>
      </p>
    </>
  );
}
