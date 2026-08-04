import prisma from "../config/prisma";

type CreateCompanyData = {
  name: string;
  description?: string;
  website?: string;
  location?: string;
};

const createCompany = async (
  data: CreateCompanyData,
  userId: string
) => {
  const existingCompany = await prisma.company.findUnique({
    where: {
      ownerId: userId,
    },
  });

  if (existingCompany) {
    throw new Error("You already own a company");
  }

  const company = await prisma.company.create({
    data: {
      name: data.name,
      description: data.description,
      website: data.website,
      location: data.location,
      ownerId: userId,
    },
  });

  return company;
};

export default {
  createCompany,
};