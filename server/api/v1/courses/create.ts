import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) return setResponseStatus(event, 422, "No body provided");

  if (!body.title || !body.description || !body.published || !body.category || !body.price)
    return setResponseStatus(event, 422, "Missing required fields");

  const newCourse = await prisma.course.create({
    data: {
      title: body.title,
      description: body.description,
      published: body.published,
      categoryId: body.category,
      price: body.price,
      authorId: 1,
    },
  });

  return newCourse;
});

// to test in postman, use the following body in the request
// {
//     "title":"Mastering Javascript",
//     "description": "The mastering javascript course is reach of videos covering everytging you need to master javascript programming language",
//     "price": 90
// }
