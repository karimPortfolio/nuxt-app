export default async function checkAuth(event: any) {
  // Skip auth check for non-API routes or public API endpoints
  if (!event.path.startsWith("/api/") || event.path.startsWith("/api/auth/")) {
    return;
  }

  const token =
    getCookie(event, "token") ||
    event.node.req.headers["authorization"]?.split(" ")[1];

  if (!token || typeof token === "undefined") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
}
