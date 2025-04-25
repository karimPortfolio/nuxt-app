import { r as readBody, e as setResponseStatus } from '../../../../_/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
import { d as defineProtectedHandler } from '../../../../_/defineProtectedhandler.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '@prisma/client';

const create = defineProtectedHandler(async (event) => {
  const body = await readBody(event);
  if (!body) return setResponseStatus(event, 422, "No body provided");
  if (!body.email || !body.name || !body.password) return setResponseStatus(event, 422, "Missing required fields");
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  });
  return user;
});

export { create as default };
//# sourceMappingURL=create.mjs.map
