import { z as defineNuxtRouteMiddleware, A as executeAsync, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-OUqj8N6e.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import '@prisma/client';
import './fetch-D6WZ-eiX.mjs';

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const { fetchProfile, isAuthenticated } = useAuthStore();
  try {
    ;
    [__temp, __restore] = executeAsync(() => fetchProfile()), await __temp, __restore();
    ;
  } catch (err) {
    console.error("Error during authentication:", err);
    return navigateTo({ path: "/auth/signin" });
  }
  if (to.path === "/auth/signin" || to.path === "/auth/signup") {
    if (isAuthenticated) {
      return navigateTo("/");
    }
    return;
  }
  if (!isAuthenticated) {
    return navigateTo({ path: "/auth/signin" });
  }
  return to.fullPath;
});

export { auth as default };
//# sourceMappingURL=auth-B7S04yqL.mjs.map
