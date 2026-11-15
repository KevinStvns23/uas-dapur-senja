"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrisma();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return reviews;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addReview(formData: FormData) {
  const name = formData.get("name") as string;
  const rating = Number(formData.get("rating"));
  const text = formData.get("text") as string;
  const tagsStr = formData.get("tags") as string;
  
  try {
    const newReview = await prisma.review.create({
      data: {
        name,
        rating,
        tags: tagsStr,
        text,
      },
    });
    return { success: true, review: newReview };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menyimpan ulasan" };
  }
}