import { Prisma } from "@prisma/client";
import { ContactToastForm } from "./toast-form";
import { selectContacts } from "~/librairies/subdata/contacts";
// import { selectUser, selectVerifiedUser } from "~/librairies/subdata/users";

export function StatusOtherProfileToasts({
  contact,
}: // user,
// verifiedUser,
{
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
  // verifiedUser: Prisma.UserGetPayload<{
  //   select: typeof selectVerifiedUser;
  // }>;
  // user: Prisma.UserGetPayload<{
  //   select: typeof selectUser;
  // }>;
}) {
  return (
    <>
      {contact.statusOtherProfile === "USERQUESTIONFRIENDPINNED" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          Friend criteria pinned by you
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "USERQUESTIONFRIENDUNPINNED" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          Friend criteria unpinned by you
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "FIRSTACCESSEDTHROUGHFIND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          {contact.userFirst.appWideName}&apos;s profile found
        </ContactToastForm>
      )}
      {contact.statusOtherProfile === "REACCESSEDTHROUGHFIND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-other-profile"
        >
          {contact.userFirst.appWideName}&apos;s profile found once more
        </ContactToastForm>
      )}
      {/* The below should show up under only two conditions.
      user.id === contact.userFirst.id
      verifiedUser.id === contact.mirror.userFirst.id
      This also lets me know that the only reason why these first iterations above did not need such two conditions is because userToVerifiedUserContact doesn't not exist on your own profile. 
       */}
      {contact.mirror &&
        // correct below, now I need to know why
        // user.id === contact.mirror.userFirst.id &&
        // verifiedUser.id === contact.userFirst.id &&
        contact.statusOtherProfile === "HASFIRSTACCESSEDTHROUGHFIND" && (
          <ContactToastForm
            contact={contact}
            // action="/reset-contact-status_my_profile"
            action="/reset-contact-status-other-profile"
            specifiedClasses="text-orange-500 disabled:text-gray-500"
          >
            {contact.mirror.userFirst.username} has found your profile
          </ContactToastForm>
        )}
      {contact.mirror &&
        // it's because it's contact.mirror.statusOtherProfile (.MIRROR.)
        // user.id === contact.mirror.userFirst.id &&
        // verifiedUser.id === contact.userFirst.id &&
        contact.statusOtherProfile === "HASREACCESSEDTHROUGHFIND" && (
          <ContactToastForm
            contact={contact}
            // action="/reset-contact-status_my_profile"
            action="/reset-contact-status-other-profile"
            specifiedClasses="text-orange-500 disabled:text-gray-500"
          >
            {contact.userFirst.username} has found your profile once more
          </ContactToastForm>
        )}
      {/* Keeping the comments for now because... I didn't realized my system was making this a lot more implicit than I thought. */}
    </>
  );
}
