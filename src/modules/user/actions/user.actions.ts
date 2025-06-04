"use server";

import { editUserAccountDetails } from "@/lib/db/actions/user/user.actions";
import { getUserById } from "@/lib/db/actions/user/user.actions";
import { editAccountDetailsSchema } from "../schemas/user.schemas";
import { saltAndHashPassword, verifyPassword } from "@/utils/password";

export const editAccountDetailsAction = async (prevState: unknown, formData: FormData, userId: string) => {
  const rawData = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    repeatNewPassword: formData.get("repeatNewPassword"),
  };

  const validatedFields = editAccountDetailsSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { success: false, message: "Fix the errors", errors: validatedFields.error.flatten().fieldErrors };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const user = await getUserById(userId);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const isPasswordCorrect = await verifyPassword(currentPassword, user.password);

  if (!isPasswordCorrect) {
    return { success: false, message: "Incorrect password" };
  }

  const { hash: hashedPassword } = await saltAndHashPassword(newPassword);

  await editUserAccountDetails(userId, hashedPassword);

  return { success: true, message: "Account details updated successfully" };
};
