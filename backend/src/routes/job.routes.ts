import { Router } from "express";
import jobController from "../controllers/job.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
router.get("/", jobController.getAllJobs);

router.get("/:id", jobController.getJobById);

router.post("/", authMiddleware, jobController.createJob);

router.put("/:id", authMiddleware, jobController.updateJob);

router.delete("/:id", authMiddleware, jobController.deleteJob);

export default router;