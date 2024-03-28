import { Prisma } from "@prisma/client";
import { ContactToastForm } from "./toast-form";
import { selectContacts } from "~/librairies/subdata/contacts";

export function StatusRelationshipToasts({
  contact,
}: {
  contact: Prisma.ContactGetPayload<{
    select: typeof selectContacts;
  }>;
}) {
  return (
    <>
      {contact.mirror && contact.mirror.statusRelationship === "SENTFRIEND" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
        >
          You&apos;ve just sent a friend request to{" "}
          {contact.userFirst.appWideName}
        </ContactToastForm>
      )}
      {contact.mirror && contact.mirror.statusRelationship === "SENTIRL" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
        >
          You&apos;ve just sent an irl upgrade request to{" "}
          {contact.userFirst.appWideName}
        </ContactToastForm>
      )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "RECEIVEFRIEND" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
          >
            {contact.userFirst.appWideName} has just sent you a friend request
          </ContactToastForm>
        )}
      {contact.mirror && contact.mirror.statusRelationship === "RECEIVEIRL" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
        >
          {contact.userFirst.appWideName} has just sent you an irl upgrade
          request
        </ContactToastForm>
      )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "ANNULFRIEND" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
            specifiedClasses="text-orange-500 disabled:text-gray-500"
          >
            You&apos;ve just annulled your friend request to{" "}
            {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror && contact.mirror.statusRelationship === "ANNULIRL" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
          specifiedClasses="text-orange-500 disabled:text-gray-500"
        >
          You&apos;ve just annulled your irl upgrade request to{" "}
          {contact.userFirst.appWideName}
        </ContactToastForm>
      )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "REFUSEDFRIEND" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
          >
            You&apos;ve just refused {contact.userFirst.appWideName}&apos;s
            friend request
          </ContactToastForm>
        )}
      {contact.mirror && contact.mirror.statusRelationship === "REFUSEDIRL" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
        >
          You&apos;ve just refused {contact.userFirst.appWideName}&apos;s irl
          upgrade request
        </ContactToastForm>
      )}
      {contact.mirror && contact.mirror.statusRelationship === "NOWFRIENDS" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
        >
          You are now friends with {contact.userFirst.appWideName}
        </ContactToastForm>
      )}
      {contact.mirror && contact.mirror.statusRelationship === "NOWIRLS" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
        >
          You are now irl friends with {contact.userFirst.appWideName}
        </ContactToastForm>
      )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOLONGERFRIENDS" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
            specifiedClasses="text-orange-500 disabled:text-gray-500"
          >
            You are no longer friends with {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOLONGERIRLS" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
            specifiedClasses="text-orange-500 disabled:text-gray-500"
          >
            You are no longer irl friends with {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOWBLOCKING" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
          >
            You&apos;ve just blocked {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOWUNBLOCKING" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
          >
            You&apos;ve just unblocked {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror && contact.mirror.statusRelationship === "NOWBLOCKED" && (
        <ContactToastForm
          contact={contact}
          action="/reset-contact-status-relationship"
          specifiedClasses="text-red-500 disabled:text-gray-500"
        >
          You&apos;ve just been blocked by {contact.userFirst.appWideName}
        </ContactToastForm>
      )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOWUNBLOCKED" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
          >
            You&apos;ve just been unblocked by {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOWBLOCKINGBACK" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
            specifiedClasses="text-black dark:text-white disabled:text-gray-500"
          >
            You&apos;ve just blocked back {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
      {contact.mirror &&
        contact.mirror.statusRelationship === "NOWBLOCKEDBACK" && (
          <ContactToastForm
            contact={contact}
            action="/reset-contact-status-relationship"
            specifiedClasses="text-black dark:text-white disabled:text-gray-500"
          >
            You&apos;ve just been blocked back by{" "}
            {contact.userFirst.appWideName}
          </ContactToastForm>
        )}
    </>
  );
}

// enum ContactStatusRelationship {
//   NONE
//   SENTFRIEND
//   SENTIRL
//   RECEIVEFRIEND
//   RECEIVEIRL
//   ANNULFRIEND
//   ANNULIRL
//   REFUSEDFRIEND
//   REFUSEDIRL
//   NOWFRIENDS
//   NOWIRLS
//   NOLONGERFRIENDS
//   NOLONGERIRLS
//   NOWBLOCKING
//   NOWUNBLOCKING
//   NOWBLOCKED
//   NOWUNBLOCKED
// }
