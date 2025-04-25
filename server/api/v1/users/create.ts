import prisma from "~/lib/prisma";
import { defineProtectedHandler } from "~/utils/defineProtectedhandler";

export default defineProtectedHandler(async (event) => {

    const body = await readBody(event);

    if (!body) return setResponseStatus(event, 422, 'No body provided');

    if (!body.email || !body.name || !body.password) return setResponseStatus(event, 422, 'Missing required fields');

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    });

    return user;

});