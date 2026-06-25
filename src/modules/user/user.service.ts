import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { UserPayload } from "./user.interface";

const createUserFromDB = async (payload: UserPayload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto: profilePhoto,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email,
    },
    omit: { password: true },
    include: {
      profile: true,
    },
  });
  return user;
};
const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });
  return user;
};
export const userService = {
  createUserFromDB,
  getMyProfile,
};
