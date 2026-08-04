import { Request, Response } from "express";
import authService from "../services/auth.service";

const register = async (_req: Request, res: Response) => {
  const result = await authService.registerUser();

  res.status(201).json(result);
};

export default {
  register,
};