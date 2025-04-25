import prisma from "~/lib/prisma";
import { defineProtectedHandler } from "~/utils/defineProtectedhandler";

export default defineEventHandler(async (event) => {
  
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      published: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true,
        }
      },
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  
  return courses;
});
