import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '@prisma/client';

const index = defineEventHandler(async (event) => {
  const categories = await prisma.category.findMany();
  return categories;
});

export { index as default };
//# sourceMappingURL=index.mjs.map
