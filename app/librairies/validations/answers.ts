import { z } from "zod";

const ANSWER_STATE = ["NONE", "LIVE", "DELETED"] as const;

const AnswerSchema = z.object({
  answerId: z.string().uuid(),
  answerState: z.enum(ANSWER_STATE),
  answerValue: z.string().min(1).max(200),
  answerCreatedAt: z.string().datetime(),
  answerUpdatedAt: z.string().datetime(),
  userQuestionId: z.string().uuid(),
  userId: z.string().uuid(),
  questionId: z
    .string({
      invalid_type_error: "Please select a question.",
    })
    .uuid({
      message: "Please select a valid question.",
    }),
  answerInitialValue: z
    .string({
      invalid_type_error: "Please type an answer.",
    })
    .min(1, {
      message: "Your answer cannot be shorter than 1 character.",
    })
    .max(200, {
      message: "Your answer cannot be longer than 200 characters.",
    }),
  questionInitialName: z
    .string()
    .min(1, {
      message: "Your question cannot be shorter than 1 character.",
    })
    .max(200, {
      message: "Your question cannot be longer than 200 characters.",
    }),
  answerModifiedValue: z
    .string({
      // no custom validation needed, because it always ends up as a string
      // const answerValue = form.get("answervalue") || "";
    })
    .max(200, {
      message: "Your answer cannot be longer than 200 characters.",
    }),
});
