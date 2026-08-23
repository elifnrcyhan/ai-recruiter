import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/profile", authMiddleware, userController.profile);

export default router;
