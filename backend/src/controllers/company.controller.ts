import { Request, Response } from "express";
import companyService from "../services/company.service";

const createCompany = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const company = await companyService.createCompany(
      req.body,
      userId
    );

    return res.status(201).json(company);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export default {
  createCompany,
};