import { Request, Response } from "express";
import { ZodError } from "zod";
import authService from "../services/auth.service";
import { registerSchema } from "../validators/auth.validator";
import { loginSchema } from "../validators/login.validator";
const register = async (req: Request, res: Response) => {
  try {
    registerSchema.parse(req.body);

    const result = await authService.registerUser(req.body);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    return res.status(409).json({
      message: (error as Error).message,
    });
  }
};
const login = async (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body);

    const result = await authService.loginUser(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    return res.status(401).json({
      message: (error as Error).message,
    });
  }
};
const uploadCv = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    const user = await authService.uploadCv(
      userId,
      req.file.path
    );

    return res.json({
      message: "CV uploaded successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
export default {
  register,
  login,
  uploadCv,
};