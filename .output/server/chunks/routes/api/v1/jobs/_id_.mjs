import { c as defineEventHandler, k as getRouterParam, e as setResponseStatus } from '../../../../_/nitro.mjs';
import { jobs } from '../../data.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const _id_ = defineEventHandler((event) => {
  var _a;
  const id = parseInt((_a = getRouterParam(event, "id")) != null ? _a : "");
  if (!id) return setResponseStatus(event, 400);
  const job = jobs.find((job2) => job2.id == id);
  if (!job) return setResponseStatus(event, 404);
  return job;
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
