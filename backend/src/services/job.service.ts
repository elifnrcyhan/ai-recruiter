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

export default {
  createJob,
};