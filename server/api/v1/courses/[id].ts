import prisma from "~/lib/prisma";


export default defineEventHandler(async (event) => {
   const id  = parseInt(getRouterParam(event, 'id') ?? '');
   const body = await readBody(event);
   const { title, description, category, published, price } = body;
    if (!id) return setResponseStatus(event, 400);  
    if (!title || !description || !category || !published || !price) return setResponseStatus(event, 422, "Missing required fields");

   const course = await  prisma.course.update({
    where: {
        id: id

    },
    data: {
        title: title,
        description: description,
        published: published,
        categoryId: category,
        price: price,
        authorId: 3,
    }
   });

   return course;
});