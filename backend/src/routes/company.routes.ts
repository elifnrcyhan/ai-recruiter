import { Router } from "express";
import companyController from "../controllers/company.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, companyController.createCompany);

export default router;