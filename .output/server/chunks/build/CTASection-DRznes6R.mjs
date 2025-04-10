import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from '../_/QBtn.mjs';
import { _ as __nuxt_component_2$1 } from '../_/QIcon.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@prisma/client';
import '../_/render.mjs';

const _sfc_main = {
  __name: "CTASection",
  __ssrInlineRender: true,
  setup(__props) {
    const trustLogos = [
      { src: "https://cdn.worldvectorlogo.com/logos/slack-1.svg", alt: "Slack" },
      {
        src: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
        alt: "Spotify"
      },
      { src: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg", alt: "Adobe" },
      {
        src: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
        alt: "Salesforce"
      },
      { src: "https://cdn.worldvectorlogo.com/logos/ibm-1.svg", alt: "IBM" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_btn = __nuxt_component_0$1;
      const _component_q_icon = __nuxt_component_2$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-24 bg-gradient-to-br from-purple-700 via-violet-600 to-blue-700 text-white overflow-hidden relative" }, _attrs))}><div class="absolute inset-0 bg-[url(&#39;https://www.transparenttextures.com/patterns/cubes.png&#39;)] opacity-5 animate-pulse"></div><div class="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div><div class="absolute top-60 right-20 w-60 h-60 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div><div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div><div class="container mx-auto px-6 text-center relative z-10"><h2 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"> Ready to Start Learning? </h2><p class="text-xl mb-10 max-w-2xl mx-auto font-light opacity-90 leading-relaxed"> Join thousands of students who are already learning on our platform and advance your career today. </p><div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">`);
      _push(ssrRenderComponent(_component_q_btn, {
        unelevated: "",
        rounded: "",
        color: "white",
        "text-color": "purple-700",
        size: "lg",
        label: "Sign Up For Free",
        class: "text-lg font-bold px-8 py-3 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
      }, null, _parent));
      _push(ssrRenderComponent(_component_q_btn, {
        flat: "",
        rounded: "",
        color: "white",
        outline: "",
        size: "lg",
        label: "Learn More",
        class: "text-lg font-medium px-8 py-3 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
      }, null, _parent));
      _push(`</div><div class="flex flex-col md:flex-row justify-center items-center mt-12 gap-6"><div class="flex items-center"><div class="flex -space-x-3 mr-4"><img class="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-400 border-2 border-purple-700 transform transition hover:scale-110 cursor-pointer" src="https://randomuser.me/api/portraits/women/17.jpg" alt="User"><img class="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-400 border-2 border-purple-700 transform transition hover:scale-110 cursor-pointer" src="https://randomuser.me/api/portraits/men/15.jpg" alt="User"><img class="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-400 border-2 border-purple-700 transform transition hover:scale-110 cursor-pointer" src="https://randomuser.me/api/portraits/women/10.jpg" alt="User"><span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 ring-2 ring-indigo-400 border-2 border-purple-700 text-sm font-medium"> +2k </span></div><div class="text-left"><div class="text-lg font-semibold">Join our community</div><div class="text-blue-200 text-sm">2,000+ students enrolled</div></div></div><div class="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">`);
      _push(ssrRenderComponent(_component_q_icon, {
        name: "credit_card_off",
        size: "sm",
        class: "text-white mr-2"
      }, null, _parent));
      _push(`<p class="text-sm font-medium text-white"> No credit card required \u2022 Cancel anytime </p></div></div><div class="mt-14 pt-10 border-t border-white/20 max-w-4xl mx-auto"><p class="text-sm mb-6 text-white uppercase tracking-wider font-semibold flex items-center justify-center before:content-[&#39;&#39;] before:h-[1px] before:w-8 before:bg-blue-200/60 before:mr-3 after:content-[&#39;&#39;] after:h-[1px] after:w-8 after:bg-blue-200/60 after:ml-3"> Trusted by leading companies worldwide </p><div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"><!--[-->`);
      ssrRenderList(trustLogos, (logo, index) => {
        _push(`<div class="group relative transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"><div class="absolute inset-0 bg-gradient-to-r from-white/10 to-blue-300/10 rounded-lg filter blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div><img${ssrRenderAttr("src", logo.src)}${ssrRenderAttr("alt", logo.alt)} class="h-8 md:h-10 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"><div class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${ssrInterpolate(logo.alt)}</div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/CTASection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CTASection-DRznes6R.mjs.map
