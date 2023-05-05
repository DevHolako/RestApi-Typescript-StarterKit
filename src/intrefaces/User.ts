import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }).min(2, "username too short"),
    password: string({
      required_error: "password is required",
    }).min(6, "password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
