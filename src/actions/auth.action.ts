import { authClient } from "@/lib/auth/auth-client";
import { signUpSchema } from "@/schemas/auth/auth.schema";

export const signUp = async (prevState: unknown, formData: FormData) => {
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Fix the errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { firstName, lastName, email, password } = validatedFields.data;
  const name = `${firstName} ${lastName}`;

  try {
    await authClient.signUp.email({
      email,
      password,
      name,
    });

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
