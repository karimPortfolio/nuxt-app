import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '@prisma/client';

const index = defineEventHandler(async (event) => {
  const courses = await prisma.course.findMany({
    where: {
      published: true
    },
    select: {
      id: true,
      title: true,
      description: true,
      published: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true
        }
      },
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
  return courses;
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
