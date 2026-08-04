import prisma from "../config/prisma";

const registerUser = async () => {
  const user = await prisma.user.create({
    data: {
      fullName: "Ali Veli",
      email: "ali@test.com",
      password: "123456",
    },
  });

  return user;
};

export default {
  registerUser,
};