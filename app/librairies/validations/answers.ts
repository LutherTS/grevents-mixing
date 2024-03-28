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
      invalid_type_error: "Please type an answer or an empty response.",
    })
    .max(200, {
      message: "Your answer cannot be longer than 200 characters.",
    }),
});

export const CreateStandardizedAnswerSchema = AnswerSchema.pick({
  questionId: true,
  answerInitialValue: true,
});

export const CreateCustomizedAnswerSchema = AnswerSchema.pick({
  questionInitialName: true,
  answerInitialValue: true,
});

export const ModifyAnswerSchema = AnswerSchema.pick({
  answerId: true,
  answerModifiedValue: true,
});
