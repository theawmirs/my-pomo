"use server";
import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (password: string): Promise<{ hash: string }> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return { hash };
};

export const verifyPassword = async (password: string, storedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, storedPassword);
};
