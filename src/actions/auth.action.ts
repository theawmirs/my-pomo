"use server";

import { createUser } from "@/lib/db/actions/user/user.actions";
import { signIn as signInAuth } from "@/lib/auth/auth";
import { signInSchema, signUpSchema } from "@/schemas/auth/auth.schema";
import { saltAndHashPassword } from "@/utils/password";
import { AuthError } from "next-auth";

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

export const signIn = async (prevState: unknown, formData: FormData) => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const validatedFields = signInSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Fix the errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInAuth("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return {
            success: false,
            message: "Invalid credentials",
          };
        default:
          return {
            success: false,
            message: "Something went wrong",
          };
      }
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
