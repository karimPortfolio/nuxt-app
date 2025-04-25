import { c as defineEventHandler, u as useRuntimeConfig, j as sendRedirect } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const index = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&scope=user:email`;
  return sendRedirect(event, redirectUrl);
});

export { index as default };
//# sourceMappingURL=index.mjs.map
