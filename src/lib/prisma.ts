import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if PrismaClient has been initialized already, otherwise, initialize it
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Only assign it to the global object in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
