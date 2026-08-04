import { Router } from "express";
import jobController from "../controllers/job.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, jobController.createJob);

export default router;