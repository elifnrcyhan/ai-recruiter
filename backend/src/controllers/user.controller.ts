import { Request, Response } from "express";

const profile = (_req: Request, res: Response) => {
  res.json({
    message: "Private profile",
  });
};

export default {
  profile,
};