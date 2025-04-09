import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { c as _export_sfc, f as __nuxt_component_0, h as __nuxt_component_2, i as __nuxt_component_14 } from './server.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_q_btn = __nuxt_component_0;
  const _component_q_icon = __nuxt_component_2;
  const _component_q_input = __nuxt_component_14;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden" }, _attrs))}><div class="absolute inset-0 opacity-5"><div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl"></div><div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"></div></div><div class="container mx-auto px-4 relative z-10"><div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"><div class="transform hover:scale-105 transition-transform duration-300"><h3 class="font-bold text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">LearnHub</h3><p class="text-gray-300 mb-6 leading-relaxed">Your gateway to professional education and career advancement.</p><div class="flex space-x-4">`);
  _push(ssrRenderComponent(_component_q_btn, {
    round: "",
    flat: "",
    color: "white",
    icon: "fab fa-facebook",
    class: "bg-gray-800/50 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
  }, null, _parent));
  _push(ssrRenderComponent(_component_q_btn, {
    round: "",
    flat: "",
    color: "white",
    icon: "fab fa-twitter",
    class: "bg-gray-800/50 hover:bg-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
  }, null, _parent));
  _push(ssrRenderComponent(_component_q_btn, {
    round: "",
    flat: "",
    color: "white",
    icon: "fab fa-instagram",
    class: "bg-gray-800/50 hover:bg-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
  }, null, _parent));
  _push(ssrRenderComponent(_component_q_btn, {
    round: "",
    flat: "",
    color: "white",
    icon: "fab fa-linkedin",
    class: "bg-gray-800/50 hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
  }, null, _parent));
  _push(`</div></div><div><h4 class="font-bold text-lg mb-6 relative after:content-[&#39;&#39;] after:absolute after:w-10 after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:rounded-full">Courses</h4><ul class="space-y-3 text-gray-300"><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Web Development</a></li><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Data Science</a></li><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Business</a></li><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Design</a></li></ul></div><div><h4 class="font-bold text-lg mb-6 relative after:content-[&#39;&#39;] after:absolute after:w-10 after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:rounded-full">About</h4><ul class="space-y-3 text-gray-300"><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` About Us</a></li><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Careers</a></li><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Blog</a></li><li class="group"><a href="#" class="hover:text-blue-400 transition-all duration-300 hover:pl-2 flex items-center">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "arrow_right",
    size: "xs",
    class: "mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }, null, _parent));
  _push(` Privacy Policy</a></li></ul></div><div class="bg-gray-800/40 p-6 rounded-xl backdrop-blur-md border border-gray-700/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"><h4 class="font-bold text-lg mb-6 relative after:content-[&#39;&#39;] after:absolute after:w-10 after:h-1 after:bg-blue-500 after:left-0 after:bottom-0 after:rounded-full">Contact</h4><ul class="space-y-4 text-gray-300"><li class="flex items-center transition-all hover:translate-x-1 duration-300 group">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "email",
    class: "mr-3 text-blue-400 group-hover:text-blue-300"
  }, null, _parent));
  _push(` info@learnhub.com</li><li class="flex items-center transition-all hover:translate-x-1 duration-300 group">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "phone",
    class: "mr-3 text-blue-400 group-hover:text-blue-300"
  }, null, _parent));
  _push(` +1 234 567 890</li><li class="flex items-center transition-all hover:translate-x-1 duration-300 group">`);
  _push(ssrRenderComponent(_component_q_icon, {
    name: "place",
    class: "mr-3 text-blue-400 group-hover:text-blue-300"
  }, null, _parent));
  _push(` 123 Learn St, Education City</li></ul>`);
  _push(ssrRenderComponent(_component_q_btn, {
    unelevated: "",
    rounded: "",
    color: "primary",
    class: "mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20",
    label: "Contact Us"
  }, null, _parent));
  _push(`</div></div><div class="mb-12 p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/20"><div class="flex flex-col md:flex-row items-center justify-between"><div class="mb-4 md:mb-0 md:mr-8"><h4 class="font-bold text-xl text-white mb-2">Subscribe to our newsletter</h4><p class="text-gray-300">Get the latest news and updates delivered to your inbox</p></div><div class="w-full md:w-auto flex flex-nowrap">`);
  _push(ssrRenderComponent(_component_q_input, {
    dark: "",
    outlined: "",
    dense: "",
    class: "bg-gray-800/50 rounded-l-lg focus-within:ring-2 focus-within:ring-blue-500/50 mr-0 sm:mr-2 mb-2 sm:mb-0 w-80",
    placeholder: "Your email address"
  }, null, _parent));
  _push(ssrRenderComponent(_component_q_btn, {
    unelevated: "",
    color: "primary",
    class: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-medium transition-all duration-300",
    label: "Subscribe"
  }, null, _parent));
  _push(`</div></div></div><div class="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"><p class="hover:text-gray-300 transition-colors duration-300">\xA9 2023 LearnHub. All rights reserved.</p><div class="flex space-x-6 mt-4 md:mt-0"><a href="#" class="hover:text-blue-400 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Terms</a><a href="#" class="hover:text-blue-400 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Privacy</a><a href="#" class="hover:text-blue-400 transition-colors duration-300 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Cookies</a></div></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/FooterSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FooterSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { FooterSection as default };
//# sourceMappingURL=FooterSection-BOZ_zV1e.mjs.map
