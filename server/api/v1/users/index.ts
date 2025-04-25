import prisma from "~/lib/prisma";
import { defineProtectedHandler } from "~/utils/defineProtectedhandler";

export default defineProtectedHandler( async (event) => {

    const users =  await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false,
        }
    });
    
    return users;
})