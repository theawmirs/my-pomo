"use server";

import { createUser, getUserFromDb } from "@/lib/db/actions/user/user.actions";
import { saltAndHashPassword } from "@/utils/password";
import { signUpSchema } from "../schemas/register.schema";

export const signUp = async (prevState: unknown, formData: FormData) => {
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Fix the errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }
  const { firstName, lastName, email, password } = validatedFields.data;
  const name = `${firstName} ${lastName}`;
  const pwHash = await saltAndHashPassword(password);

  const existingUser = await getUserFromDb(email);

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }
  try {
    await createUser(email, name, pwHash.hash);

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create account",
      error: { form: [(error as Error).message] },
    };
  }
};
