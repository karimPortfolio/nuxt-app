import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    
    const id = parseInt(getRouterParam(event, 'id') ?? '');

    if (!id) return setResponseStatus(event, 400);

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!user) return setResponseStatus(event, 404);
    
    return user;
});