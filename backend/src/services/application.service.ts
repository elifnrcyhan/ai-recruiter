import prisma from "../config/prisma";

const applyToJob = async (
  userId: string,
  jobId: string
) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job || !job.isActive) {
    throw new Error("Job not found");
  }

  const existingApplication =
    await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
    });

  if (existingApplication) {
    throw new Error("You already applied for this job");
  }

  const application =
    await prisma.application.create({
      data: {
        userId,
        jobId,
      },
    });

  return application;
};
const getMyApplications = async (userId: string) => {
  const applications = await prisma.application.findMany({
    where: {
      userId,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};
const getApplicationsByJob = async (
  jobId: string,
  userId: string
) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.company.ownerId !== userId) {
    throw new Error("Unauthorized");
  }

  const applications =
    await prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return applications;
};
const updateApplicationStatus = async (
  applicationId: string,
  status: string,
  userId: string
) => {
  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  if (application.job.company.ownerId !== userId) {
    throw new Error("Unauthorized");
  }

  const updatedApplication =
    await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    });

  return updatedApplication;
};
export default {
  applyToJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
};