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

const getAllJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await jobService.getAllJobs();
    return res.json(jobs);
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id" });
    }

    const job = await jobService.getJobById(id);
    return res.json(job);
  } catch (error) {
    return res.status(404).json({
      message: (error as Error).message,
    });
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id" });
    }

    const userId = (req as any).user.id;
    const job = await jobService.updateJob(
      id,
      req.body,
      userId
    );
    return res.json(job);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id" });
    }

    const userId = (req as any).user.id;
    const job = await jobService.deleteJob(
      id,
      userId
    );
    return res.json({
      message: "Job deleted successfully",
      job,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export default {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};