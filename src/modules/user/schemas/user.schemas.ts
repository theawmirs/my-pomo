import { z } from "zod";

export const editAccountDetailsSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    repeatNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    path: ["repeatNewPassword"],
    message: "Passwords do not match",
  });

export const editUserProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
