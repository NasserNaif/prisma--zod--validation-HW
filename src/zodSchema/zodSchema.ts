import { z } from "zod";

export const addUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "username is required !" })
      .min(3, "username must be more than 2 Chars"),
    password: z
      .string({ required_error: "password is required !" })
      .min(6, "password must be more than 5 Chars"),
  }),
});

export const addBooksSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required !" })
      .min(3, "name must be more than 2 Chars"),
    genre: z
      .string({ required_error: "genre is required !" })
      .min(3, "genre must be more than 2 Chars"),
  }),
});

export const addLoanSchema = z.object({
  body: z.object({
    book_id: z.string({ required_error: "book id is required !" }),
    user_id: z.string({ required_error: "user id is required !" }),
  }),
});

export const paramSchema = z.object({
  params: z.object({
    userid: z.string(),
  }),
});

export type paramsType = z.infer<typeof paramSchema>['params'];
