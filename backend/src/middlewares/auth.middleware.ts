import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
  return res.status(401).json({
    message: "Access denied. No token provided.",
  });
}

const token = authHeader.split(" ")[1];

try {
  jwt.verify(token, process.env.JWT_SECRET as string);

  next();
} catch {
  return res.status(401).json({
    message: "Invalid token",
  });
}
};

export default authMiddleware;
