import { Router } from "express";
import applicationController from "../controllers/application.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/:jobId",
  authMiddleware,
  applicationController.applyToJob
);

router.get(
  "/my",
  authMiddleware,
  applicationController.getMyApplications
);
router.get(
  "/company/count",
  authMiddleware,
  applicationController.getMyCompanyApplicationsCount
);

router.get(
  "/company/ai-match-rate",
  authMiddleware,
  applicationController.getMyCompanyAiMatchRate
);

router.get(
  "/job/:jobId",
  authMiddleware,
  applicationController.getApplicationsByJob
);
router.patch(
  "/:applicationId/status",
  authMiddleware,
  applicationController.updateApplicationStatus
);

export default router;