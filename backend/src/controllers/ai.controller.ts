import { Request, Response } from "express";
import prisma from "../config/prisma";
import jobService from "../services/job.service";
import aiService from "../services/ai.service";
import pdfService from "../services/pdf.service";
import path from "path";

const analyzeCv = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    if (typeof jobId !== "string") {
      return res.status(400).json({ message: "Invalid jobId" });
    }

    const user = (req as any).user;
    if (!user?.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const job = await jobService.getJobById(jobId);

    const application = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: user.id,
          jobId,
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "You have not applied for this job",
      });
    }

    const candidate = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        fullName: true,
        cvUrl: true,
      },
    });

    if (!candidate) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!candidate.cvUrl) {
      return res.status(400).json({
        message: "Please upload your CV first",
      });
    }

    const cvPath = path.resolve(candidate.cvUrl);

    const cvText = await pdfService.extractTextFromPdf(cvPath);

    const jobDescription = `
Job Title: ${job.title}

Description:
${job.description}

Location:
${job.location}

Employment Type:
${job.employmentType}
`;

    const result = await aiService.analyzeCv(
      cvText,
      jobDescription
    );

    const analysis = await prisma.aiAnalysis.upsert({
      where: {
        applicationId: application.id,
      },
      update: {
        score: result.score,
        summary: result.summary,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        missingSkills: result.missingSkills,
      },
      create: {
        applicationId: application.id,
        score: result.score,
        summary: result.summary,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        missingSkills: result.missingSkills,
      },
    });

    return res.status(200).json({
      candidate: {
        id: candidate.id,
        fullName: candidate.fullName,
      },
      job: {
        id: job.id,
        title: job.title,
      },
      analysis,
    });
  } catch (error) {
    console.error("AI analysis error:", error);

    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export default {
  analyzeCv,
};