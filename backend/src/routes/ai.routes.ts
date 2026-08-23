import { Router } from "express";
import aiController from "../controllers/ai.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/analyze/:jobId",
  authMiddleware,
  aiController.analyzeCv
);

export default router;