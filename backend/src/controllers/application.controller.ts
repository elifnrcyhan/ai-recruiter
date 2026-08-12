import { Request, Response } from "express";
import applicationService from "../services/application.service";

const applyToJob = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const application =
      await applicationService.applyToJob(
        userId,
        req.params.jobId
      );

    return res.status(201).json(application);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};
const getMyApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const applications =
      await applicationService.getMyApplications(userId);

    return res.json(applications);
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
const getApplicationsByJob = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const applications =
      await applicationService.getApplicationsByJob(
        req.params.jobId,
        userId
      );

    return res.json(applications);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};
const updateApplicationStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const application =
      await applicationService.updateApplicationStatus(
        req.params.applicationId,
        req.body.status,
        userId
      );

    return res.json(application);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};
export default {
  applyToJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
};