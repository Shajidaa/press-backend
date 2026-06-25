import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
const loginFromDB = async (payload: any) => {
  const { email, password } = await payload;
  // console.log(result);
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }
  return user;
};

export const authService = {
  loginFromDB,
};
