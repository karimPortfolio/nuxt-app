import { k as getRouterParam, e as setResponseStatus } from '../../../../_/nitro.mjs';
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
  if (!id) return setResponseStatus(event, 400);
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });
  if (!user) return setResponseStatus(event, 404);
  return user;
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
