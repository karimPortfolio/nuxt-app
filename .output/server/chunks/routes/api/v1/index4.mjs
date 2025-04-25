import { p as prisma } from '../../../_/prisma.mjs';
import { d as defineProtectedHandler } from '../../../_/defineProtectedhandler.mjs';
import '@prisma/client';
import '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const index = defineProtectedHandler(async (event) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false
    }
  });
  return users;
});

export { index as default };
//# sourceMappingURL=index4.mjs.map
