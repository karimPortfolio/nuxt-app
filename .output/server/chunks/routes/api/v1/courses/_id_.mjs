import { k as getRouterParam, r as readBody, e as setResponseStatus } from '../../../../_/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import { d as defineProtectedHandler } from '../../../../_/defineProtectedhandler.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '@prisma/client';

const _id_ = defineProtectedHandler(async (event) => {
  var _a;
  const id = parseInt((_a = getRouterParam(event, "id")) != null ? _a : "");
  const body = await readBody(event);
  const { title, description, category, published, price } = body;
  if (!id) return setResponseStatus(event, 400);
  if (!title || !description || !category || !published || !price) return setResponseStatus(event, 422, "Missing required fields");
  const course = await prisma.course.update({
    where: {
      id
    },
    data: {
      title,
      description,
      published,
      categoryId: category,
      price,
      authorId: 3
    }
  });
  return course;
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
