import { c as defineEventHandler, u as useRuntimeConfig, i as getQuery, e as setResponseStatus, f as setCookie } from '../../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const callback = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { code } = getQuery(event);
  if (!code) {
    return setResponseStatus(event, 401);
  }
  const response = await $fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: {
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
      code
    },
    headers: {
      Accept: "application/json"
    }
  });
  const accessToken = response.access_token;
  const user = await $fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  setCookie(event, "token", accessToken, {
    httpOnly: true,
    secure: true
  });
  return {
    user
  };
});

export { callback as default };
//# sourceMappingURL=callback.mjs.map
