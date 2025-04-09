import { c as defineEventHandler, r as readBody, e as setResponseStatus } from '../../../../_/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '@prisma/client';

const create = defineEventHandler(async (event) => {
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
      authorId: 1
    }
  });
  return newCourse;
});

export { create as default };
//# sourceMappingURL=create.mjs.map
