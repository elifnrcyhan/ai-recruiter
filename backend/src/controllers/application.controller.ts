import { Request, Response } from "express";
import applicationService from "../services/application.service";

const applyToJob = async (
  req: Request,
  res: Response
) => {
  try {
    const { jobId } = req.params;

    if (typeof jobId !== "string") {
      return res.status(400).json({
        message: "Invalid jobId",
      });
    }

    const userId = (req as any).user.id;

    const application =
      await applicationService.applyToJob(
        userId,
        jobId
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
    const { jobId } = req.params;

    if (typeof jobId !== "string") {
      return res.status(400).json({
        message: "Invalid jobId",
      });
    }

    const userId = (req as any).user.id;

    const applications =
      await applicationService.getApplicationsByJob(
        jobId,
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
    const { applicationId } = req.params;

    if (typeof applicationId !== "string") {
      return res.status(400).json({
        message: "Invalid applicationId",
      });
    }

    const userId = (req as any).user.id;

    const application =
      await applicationService.updateApplicationStatus(
        applicationId,
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

const getMyCompanyApplicationsCount = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const count =
      await applicationService.getMyCompanyApplicationsCount(
        userId
      );

    return res.json({ count });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};

const getMyCompanyAiMatchRate = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const rate =
      await applicationService.getMyCompanyAiMatchRate(
        userId
      );

    return res.json({ rate });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export default {
  applyToJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  getMyCompanyApplicationsCount,
  getMyCompanyAiMatchRate,
};