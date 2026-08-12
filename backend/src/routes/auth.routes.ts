import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import upload from "../config/multer";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post(
  "/upload-cv",
  authMiddleware,
  upload.single("cv"),
  authController.uploadCv
);

export default router;