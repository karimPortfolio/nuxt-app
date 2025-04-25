import { g as getCookie, e as setResponseStatus, h as createError, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import { d as defineProtectedHandler } from '../../../_/defineProtectedhandler.mjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const index = defineProtectedHandler(async (event) => {
  const token = getCookie(event, "token");
  if (!token) return setResponseStatus(event, 401);
  try {
    const payload = verifyMyJWT(token);
    return { authType: "internal", user: payload };
  } catch {
  }
  try {
    const githubUser = await $fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!githubUser || !githubUser.id) {
      throw new Error("Invalid GitHub token");
    }
    return { authType: "github", user: githubUser };
  } catch (err) {
    throw createError({ statusCode: 401, message: "Invalid token" });
  }
});
function verifyMyJWT(token) {
  const config = useRuntimeConfig();
  return jwt.verify(token, config.jwt.secret);
}

export { index as default };
//# sourceMappingURL=index.mjs.map
