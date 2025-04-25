import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetchProfile, isAuthenticated } = useAuthStore();

  try {
    await fetchProfile();
  } catch (err) {
    console.error("Error during authentication:", err);
    return navigateTo({ path: "/auth/signin" });
  }

  if (to.path === "/auth/signin" || to.path === "/auth/signup") {
    if (isAuthenticated) {
      // If user is already authenticated, prevent going to signin
      return navigateTo("/");
    }
    return;
  }

  if (!isAuthenticated) {
    return navigateTo({ path: "/auth/signin" });
  }

  return to.fullPath;
});
