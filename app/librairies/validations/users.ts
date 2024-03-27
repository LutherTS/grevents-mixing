import { z } from "zod";

const USER_STATE = ["NONE", "LIVE", "DEACTIVATED", "DELETED"] as const;

const USER_STATUS_TITLE = [
  "NONE",
  "WELCOMETOGREVENTS",
  "WELCOMEBACKTOGREVENTS",
] as const;

const USER_STATUS_DASHBOARD = [
  "NONE",
  "EMAILUPDATED",
  "PASSWORDUPDATED",
  "APPWIDENAMEUPDATED",
  "FRIENDCODEUPDATED",
  "NOWDEACTIVATED",
  "NOWREACTIVATED",
  "REDIRECTEDTODASHBOARD",
] as const;

const USER_STATUS_PERSONAL_INFO = [
  "NONE",
  "CRITERIAHIDDEN",
  "CRITERIAREVEALED",
  "CRITERIAPINNED",
  "CRITERIAUNPINNED",
  "STANDARDIZEDANSWERUPDATED",
  "STANDARDIZEDANSWERDELETED",
  "CUSTOMIZEDANSWERUPDATED",
  "CUSTOMIZEDANSWERDELETED",
  "CUSTOMANSWERUPDATED",
  "NATIVECRITERIANOTIRLADDED",
  "NATIVECRITERIAIRLADDED",
  "PSEUDONATIVECRITERIANOTIRLADDED",
  "PSEUDONATIVECRITERIAIRLADDED",
  "PSEUDONATIVECRITERIAUPPEDTOIRL",
  "PSEUDONATIVECRITERIADOWNEDFROMIRL",
  "CUSTOMCRITERIAADDED",
  "CUSTOMCRITERIADELETED",
  "USERQUESTIONFRIENDSHARED",
  "USERQUESTIONFRIENDUNSHARED",
  "REDIRECTEDTOPERSONALINFO",
] as const;

const CONTACT_RELCOMBO = [
  "none",
  "friend",
  "irl",
  "i-am-blocking",
  "has-me-blocked",
  "blocking-blocked",
] as const;

const UserSchema = z.object({
  userId: z.string().uuid(),
  userState: z.enum(USER_STATE),
  userStatusTitle: z.enum(USER_STATUS_TITLE),
  userStatusDashboard: z.enum(USER_STATUS_DASHBOARD),
  userStatusPersonalInfo: z.enum(USER_STATUS_PERSONAL_INFO),
  userUsername: z
    .string({
      invalid_type_error: "Please type a username.",
    })
    .min(1, {
      message: "Your username needs to be at least 1 character long.",
    })
    .max(50, {
      message: "Your username cannot be more than 50 characters long.",
    })
    .regex(/^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/gm, {
      message: "Your username needs to be slug-friendly.",
    }),
  userEmail: z
    .string({
      invalid_type_error: "Please type an e-mail.",
    })
    .email({ message: "Your e-mail needs to be of a valid e-mail format." })
    .min(1, {
      message: "Your e-mail needs to be at least 1 character long.",
    })
    .max(50, {
      message: "Your e-mail cannot be more than 50 characters long.",
    }),
  userPassword: z
    .string({
      invalid_type_error: "Please type a password.",
    })
    .min(1, {
      message: "Your password needs to be at least 1 character long.",
    })
    .max(200, {
      message: "Your password cannot be more than 200 characters long.",
    }),
  userAppWideName: z
    .string({
      invalid_type_error: "Please type an app-wide name.",
    })
    .min(1, {
      message: "Your app-wide name needs to be at least 1 character long.",
    })
    .max(50, {
      message: "Your app-wide name cannot be more than 50 characters long.",
    }),
  userFriendCode: z.string().length(12),
  userCreatedAt: z.string().datetime(),
  userUpdatedAt: z.string().datetime(),
  userUsernameOrEmail: z
    .string({
      invalid_type_error: "Please type a username or an email.",
    })
    .min(1, {
      message: "Your username or email has to be at least 1 character long.",
    })
    .max(50, {
      message:
        "Your username or email could not be more than 50 characters long.",
    }),
  userSignInPassword: z
    .string({
      invalid_type_error: "Please type a password.",
    })
    .min(1, {
      message: "Your password has to be at least 1 character long.",
    })
    .max(200, {
      message: "Your password could not be more than 200 characters long.",
    }),
  userConfirmPassword: z
    .string({
      invalid_type_error: "Please type a password confirmation.",
    })
    .min(1, {
      message:
        "Your password confirmation needs to be at least 1 character long.",
    })
    .max(200, {
      message:
        "Your password confirmation cannot be more than 200 characters long.",
    }),
  userOtherFriendCode: z
    .string({
      invalid_type_error: "Please type a friend code.",
    })
    .length(12, {
      message: "A friend code is exactly 12 characters long.",
    }),
  userOtherUsername: z
    .string({
      invalid_type_error: "Please type a username.",
    })
    .min(1, {
      message: "A username needs to be at least 1 character long.",
    })
    .max(50, {
      message: "A username cannot be more than 50 characters long.",
    })
    .regex(/^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/gm, {
      message: "A username needs to be slug-friendly.",
    }),
  contactRelCombo: z.enum(CONTACT_RELCOMBO, {
    invalid_type_error: "This is not a valid relation combination.",
  }),
});

export const SignInUserSchema = UserSchema.pick({
  userUsernameOrEmail: true,
  userSignInPassword: true,
});

export const SignUpUserSchema = UserSchema.pick({
  userUsername: true,
  userAppWideName: true,
  userEmail: true,
  userPassword: true,
  userConfirmPassword: true,
});

export const AppWideNameUserSchema = UserSchema.pick({
  userAppWideName: true,
});

export const EmailUserSchema = UserSchema.pick({
  userEmail: true,
});

export const PasswordUserSchema = UserSchema.pick({
  userSignInPassword: true,
  userPassword: true,
  userConfirmPassword: true,
});

export const FriendCodeUserSchema = UserSchema.pick({
  userOtherFriendCode: true,
});

export const QueriedOneUserSchema = UserSchema.pick({
  userOtherUsername: true,
});

export const QueriedTwoUserSchema = UserSchema.pick({
  contactRelCombo: true,
});
