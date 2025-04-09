import prisma from "~/lib/prisma";

export default defineEventHandler( async (event) => {

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