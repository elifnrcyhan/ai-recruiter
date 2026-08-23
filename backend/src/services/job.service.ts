import prisma from "../config/prisma";

type CreateJobData = {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salaryMin?: number;
  salaryMax?: number;
};

const createJob = async (
  data: CreateJobData,
  userId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      ownerId: userId,
    },
  });

  if (!company) {
    throw new Error("Create a company first");
  }

  const job = await prisma.job.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      employmentType: data.employmentType,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      companyId: company.id,
    },
  });

  return job;
};
const getAllJobs = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      isActive: true,
    },
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
};
const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};
const updateJob = async (
  id: string,
  data: CreateJobData,
  userId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      ownerId: userId,
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.companyId !== company.id) {
    throw new Error("Unauthorized");
  }

  const updatedJob = await prisma.job.update({
    where: {
      id,
    },
    data,
  });

  return updatedJob;
};
const deleteJob = async (id: string, userId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      ownerId: userId,
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.companyId !== company.id) {
    throw new Error("Unauthorized");
  }

  return prisma.job.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};

export default {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};