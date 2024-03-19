import { Prisma } from "@prisma/client";
import { useState } from "react";
import _ from "lodash";

import { selectUserQuestionFriends } from "~/librairies/subdata/userquestionfriends";
import { LinkButtonOnClick } from "./link-button";
import { OneUserQuestionFriendRemovable } from "./one-userquestionfriend";

export function ManyUserQuestionFriends({
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
              <ManyPaginatedUserQuestionFriends
                userQuestionFriends={userQuestionFriends}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

function ManyPaginatedUserQuestionFriends({
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
        <LinkButtonOnClick
          handleClick={handlePreviousPosition}
          disabled={position === 0}
        >
          Previous
        </LinkButtonOnClick>
        &nbsp;/&nbsp;
        <LinkButtonOnClick
          handleClick={handleNextPosition}
          disabled={position === chunkedUserQuestionFriends.length - 1}
        >
          Next
        </LinkButtonOnClick>
      </p>
    </>
  );
}
