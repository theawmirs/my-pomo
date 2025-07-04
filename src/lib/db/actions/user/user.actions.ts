"use server";

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
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const setUserOnline = async (userId: string, online: boolean) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { online },
  });

  return user;
};

export const editUserAccountDetails = async (userId: string, password: string) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });

  return user;
};

export const editUserProfile = async (userId: string, name: string, imageUrl: string) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      image: imageUrl,
    },
  });

  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return user;
};

export const changeProfileVisibility = async (userId: string, isProfilePublic: boolean) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { isProfilePublic },
  });

  return user;
};
