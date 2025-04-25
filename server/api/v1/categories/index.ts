import prisma from "~/lib/prisma";
import { defineProtectedHandler } from "~/utils/defineProtectedhandler";

export default defineProtectedHandler(async (event) => {
    const categories = await prisma.category.findMany();

    return categories;
});
