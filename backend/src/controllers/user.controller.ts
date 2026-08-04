import { Request, Response } from "express";

const profile = (req: Request, res: Response) => {
  res.json({
    message: "Private profile",
    user: (req as any).user,
  });
};

export default {
  profile,
};