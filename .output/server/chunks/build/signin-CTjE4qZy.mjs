import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-OUqj8N6e.mjs';
import { _ as _export_sfc, a as useQuasar } from './server.mjs';
import { _ as __nuxt_component_2$2 } from '../_/QInput.mjs';
import { _ as __nuxt_component_1$1 } from '../_/QCheckbox.mjs';
import './fetch-D6WZ-eiX.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@prisma/client';
import '../_/QIcon.mjs';
import '../_/render.mjs';
import '../_/QSpinner.mjs';
import '../_/use-dark.mjs';
import '../_/private.use-form.mjs';

const _sfc_main = {
  __name: "signin",
  __ssrInlineRender: true,
  setup(__props) {
    const credentials = ref({
      email: "",
      password: "",
      remember: false
    });
    useQuasar();
    const { loading, validationErrors, login } = useAuthStore();
    const carouselSlides = [
      {
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Modern workspace with laptop",
        title: "Digital Workspace",
        description: "Accelerate your workflow with our intuitive platform"
      },
      {
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Team collaboration",
        title: "Team Collaboration",
        description: "Connect and create with your team from anywhere"
      },
      {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
        alt: "Creative team meeting",
        title: "Creative Solutions",
        description: "Empower your ideas with powerful tools"
      }
    ];
    const currentSlide = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_input = __nuxt_component_2$2;
      const _component_q_checkbox = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex" }, _attrs))} data-v-b9640fc0><div class="hidden lg:block lg:w-1/2 relative overflow-hidden" data-v-b9640fc0><div class="carousel-container h-full" data-v-b9640fc0><!--[-->`);
      ssrRenderList(carouselSlides, (slide, index) => {
        _push(`<div class="${ssrRenderClass([{
          "opacity-100": currentSlide.value === index,
          "opacity-0": currentSlide.value !== index
        }, "carousel-slide absolute inset-0 transition-opacity duration-1000"])}" data-v-b9640fc0><img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.alt)} class="object-cover w-full h-full" data-v-b9640fc0><div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-12" data-v-b9640fc0><h3 class="text-white text-2xl font-bold mb-2" data-v-b9640fc0>${ssrInterpolate(slide.title)}</h3><p class="text-white/80" data-v-b9640fc0>${ssrInterpolate(slide.description)}</p></div></div>`);
      });
      _push(`<!--]--><div class="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-50" data-v-b9640fc0><!--[-->`);
      ssrRenderList(carouselSlides, (_, index) => {
        _push(`<button class="${ssrRenderClass([currentSlide.value === index ? "bg-white w-6" : "bg-white/50", "w-2 h-2 rounded-full transition-all duration-300"])}" aria-label="Change slide" data-v-b9640fc0></button>`);
      });
      _push(`<!--]--></div></div></div><div class="w-full lg:w-1/2 flex items-center justify-center p-8" data-v-b9640fc0><div class="max-w-md w-full" data-v-b9640fc0><div class="text-center mb-8" data-v-b9640fc0><h2 class="text-3xl font-bold text-indigo-600 text-start mb-1" data-v-b9640fc0> Welcome back </h2><p class="text-gray-600 text-start" data-v-b9640fc0>Sign in to your account</p></div>`);
      if (unref(validationErrors)) {
        _push(`<div class="text-red-500 text-sm mb-4" data-v-b9640fc0><div class="bg-red-50 border-l-4 border-red-500 rounded-md p-4 mb-4" data-v-b9640fc0><div class="ml-3" data-v-b9640fc0><h3 class="text-sm font-medium text-red-800" data-v-b9640fc0> There were errors with your submission </h3><div class="mt-2 text-sm text-red-700" data-v-b9640fc0><ul class="list-disc pl-5 space-y-1" data-v-b9640fc0><!--[-->`);
        ssrRenderList(unref(validationErrors), (error, index) => {
          _push(`<li data-v-b9640fc0>${ssrInterpolate(error)}</li>`);
        });
        _push(`<!--]--></ul></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-6" data-v-b9640fc0><div data-v-b9640fc0><label for="email" class="text-sm font-medium text-gray-700 block mb-2" data-v-b9640fc0>Email</label>`);
      _push(ssrRenderComponent(_component_q_input, {
        outlined: "",
        modelValue: credentials.value.email,
        "onUpdate:modelValue": ($event) => credentials.value.email = $event,
        type: "email",
        label: "Email",
        placeholder: "your@email.com",
        class: "w-full",
        color: "indigo"
      }, null, _parent));
      _push(`</div><div data-v-b9640fc0><label for="password" class="text-sm font-medium text-gray-700 block mb-2" data-v-b9640fc0>Password</label>`);
      _push(ssrRenderComponent(_component_q_input, {
        outlined: "",
        modelValue: credentials.value.password,
        "onUpdate:modelValue": ($event) => credentials.value.password = $event,
        type: "password",
        label: "Password",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        class: "w-full",
        color: "indigo"
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between" data-v-b9640fc0><div class="flex items-center" data-v-b9640fc0>`);
      _push(ssrRenderComponent(_component_q_checkbox, {
        modelValue: credentials.value.remember,
        "onUpdate:modelValue": ($event) => credentials.value.remember = $event,
        label: "Remember me",
        color: "indigo",
        class: "text-sm text-gray-700",
        dense: ""
      }, null, _parent));
      _push(`</div><a href="#" class="text-sm text-indigo-600 hover:text-indigo-500" data-v-b9640fc0>Forgot password?</a></div><button type="button"${ssrRenderAttr("loading", unref(loading))} class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200" data-v-b9640fc0> Sign In </button><div class="text-center" data-v-b9640fc0><p class="text-sm text-gray-600" data-v-b9640fc0> Don&#39;t have an account? <a href="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500" data-v-b9640fc0>Sign up</a></p></div><div class="relative my-4" data-v-b9640fc0><div class="absolute inset-0 flex items-center" data-v-b9640fc0><div class="w-full border-t border-gray-300" data-v-b9640fc0></div></div><div class="relative flex justify-center text-sm" data-v-b9640fc0><span class="px-2 bg-gray-50 text-gray-500" data-v-b9640fc0>Or continue with</span></div></div><div class="grid grid-cols-3 gap-3" data-v-b9640fc0><button type="button" class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-v-b9640fc0><svg class="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" data-v-b9640fc0><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" data-v-b9640fc0></path></svg></button><button type="button" class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-v-b9640fc0><svg class="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" data-v-b9640fc0><path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" data-v-b9640fc0></path></svg></button><button type="button" class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-v-b9640fc0><svg class="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" data-v-b9640fc0><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-b9640fc0></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-b9640fc0></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" data-v-b9640fc0></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-b9640fc0></path><path d="M1 1h22v22H1z" fill="none" data-v-b9640fc0></path></svg></button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/signin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9640fc0"]]);

export { signin as default };
//# sourceMappingURL=signin-CTjE4qZy.mjs.map
