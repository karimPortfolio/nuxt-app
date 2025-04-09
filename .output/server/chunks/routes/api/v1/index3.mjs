import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { jobs } from '../data.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const index = defineEventHandler((event) => {
  return jobs;
});

export { index as default };
//# sourceMappingURL=index3.mjs.map
