import { Request, Response } from "express";
import jobService from "../services/job.service";

const createJob = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const job = await jobService.createJob(
      req.body,
      userId
    );

    return res.status(201).json(job);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export default {
  createJob,
};