"use server";

import { AuthError } from "next-auth";
import { signInSchema } from "../schemas/login.schema";
import { signIn as signInAuth, signOut } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

export const logout = async () => {
  await signOut();
  revalidatePath("/");
};
