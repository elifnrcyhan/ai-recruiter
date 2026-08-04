import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

type RegisterUserData = {
  fullName: string;
  email: string;
  password: string;
};

const registerUser = async (data: RegisterUserData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
};
type LoginUserData = {
  email: string;
  password: string;
};

const loginUser = async (data: LoginUserData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET || "mysecretkey",
  {
    expiresIn: "7d",
  }
);

const { password, ...userWithoutPassword } = user;

return {
  message: "Login successful",
  token,
  user: userWithoutPassword,
};
};

export default {
  registerUser,
  loginUser,
};