import { z } from "zod";

export const timerSettingsSchema = z.object({
  focus: z.number().min(1),
  shortBreak: z.number().min(1),
  longBreak: z.number().min(1),
});

export type TimerSettingsFormValues = z.infer<typeof timerSettingsSchema>;
