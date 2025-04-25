import { Cookies } from "quasar";
import { defineProtectedHandler } from "~/utils/defineProtectedhandler";
import jwt from "jsonwebtoken";

export default defineProtectedHandler(async (event) => {
  const token = getCookie(event, "token");

  if (!token) return setResponseStatus(event, 401);

  // Try to verify as internal JWT
  try {
    const payload = verifyMyJWT(token); // Replace with your real verify function
    return { authType: "internal", user: payload };
  } catch {}

  // Try to validate as GitHub access token
  try {
    const githubUser = await $fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!githubUser || !githubUser.id) {
      throw new Error("Invalid GitHub token");
    }

    return { authType: "github", user: githubUser };
  } catch (err) {

    throw createError({ statusCode: 401, message: "Invalid token" });
  }
});

function verifyMyJWT(token: string) {
  const config = useRuntimeConfig();
  return jwt.verify(token, config.jwt.secret);
}
