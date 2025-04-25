import { g as getCookie, h as createError, c as defineEventHandler } from './nitro.mjs';

async function checkAuth(event) {
  var _a;
  if (!event.path.startsWith("/api/") || event.path.startsWith("/api/auth/")) {
    return;
  }
  const token = getCookie(event, "token") || ((_a = event.node.req.headers["authorization"]) == null ? void 0 : _a.split(" ")[1]);
  if (!token || typeof token === "undefined") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
}

const defineProtectedHandler = (handler) => defineEventHandler(async (event) => {
  await checkAuth(event);
  return handler(event);
});

export { defineProtectedHandler as d };
//# sourceMappingURL=defineProtectedhandler.mjs.map
