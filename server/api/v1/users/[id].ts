import prisma from "~/lib/prisma";
import { defineProtectedHandler } from "~/utils/defineProtectedhandler";

export default defineProtectedHandler(async (event) => {
    
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