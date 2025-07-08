import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255, { message: "Description must be less than 255 characters" }),
  priority: z
    .string()
    .min(1, { message: "Priority is required" })
    .max(255, { message: "Priority must be less than 255 characters" }),
  dueDate: z
    .string()
    .min(1, { message: "Due date is required" })
    .transform((str) => new Date(str)),
});

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255, { message: "Description must be less than 255 characters" }),
  priority: z
    .string()
    .min(1, { message: "Priority is required" })
    .max(255, { message: "Priority must be less than 255 characters" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export type TaskFormSchema = z.infer<typeof taskFormSchema>;
