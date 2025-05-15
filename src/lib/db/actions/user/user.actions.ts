import { prisma } from "@/lib/prisma";

export const getUserFromDb = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const createUser = async (email: string, name: string, password: string) => {
  const existingUser = await getUserFromDb(email);

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  return user;
};
