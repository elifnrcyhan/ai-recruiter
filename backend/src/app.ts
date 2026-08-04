import companyRoutes from "./routes/company.routes";
import jobRoutes from "./routes/job.routes";
import authRoutes from "./routes/auth.routes";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./config/prisma";
import userRoutes from "./routes/user.routes";
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/company", companyRoutes);
app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "OK",
      database: "Connected",
      message: "AI Recruiter API is running",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
      message: "Database connection failed",
    });
  }
});

export default app;