import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const categories = await prisma.category.findMany();

    return categories;
});
