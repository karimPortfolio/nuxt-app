import prisma from "~/lib/prisma";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body) return setResponseStatus(event, 422, 'No body provided');

    if (!body.name) return setResponseStatus(event, 422, 'Missing required fields');

    const newCourse = await prisma.category.create({
        data: {
            ...body,
        }
    })

    return newCourse;
});
