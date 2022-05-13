import { Type } from "@sinclair/typebox";

export const CreateUserModel = Type.Object({
  email: Type.String({ format: "email" }),
  firstName: Type.String({ minLength: 2 }),
  lastName: Type.String({ minLength: 2 }),
  passwordHash: Type.String(),
  passwordSalt: Type.String(),
});
