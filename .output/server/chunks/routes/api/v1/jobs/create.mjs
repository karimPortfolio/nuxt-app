import { c as defineEventHandler, r as readBody, e as setResponseStatus } from '../../../../_/nitro.mjs';
import { jobs } from '../../data.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const create = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) return setResponseStatus(event, 422, "No body provided");
  if (!body.title || !body.company || !body.location) return setResponseStatus(event, 422, "Missing required fields");
  const newJob = {
    id: jobs.length + 1,
    ...body
  };
  jobs.push(newJob);
  return newJob;
});

export { create as default };
//# sourceMappingURL=create.mjs.map
