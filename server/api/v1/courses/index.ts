import prisma from "~/lib/prisma";


export default defineEventHandler( async (event)=> {
    const courses =  await prisma.course.findMany({
        where: {
            published: true,
        },
        include: {
            category: true,
            author: true,
        }
    });
    return courses;
});