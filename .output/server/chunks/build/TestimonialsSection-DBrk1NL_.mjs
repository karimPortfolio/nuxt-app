import { ref, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1, a as __nuxt_component_4 } from '../_/QCardSection.mjs';
import { _ as __nuxt_component_2$1 } from '../_/QIcon.mjs';
import { _ as __nuxt_component_5$1 } from '../_/QAvatar.mjs';
import { _ as __nuxt_component_5$1$1 } from '../_/QRating.mjs';
import '../_/use-dark.mjs';
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
import '../_/private.use-form.mjs';

const _sfc_main = {
  __name: "TestimonialsSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(4.5);
    const testimonials = [
      {
        name: "Sarah Johnson",
        role: "Web Developer",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        quote: "The courses here completely changed my career path. I went from knowing basic HTML to building full-stack applications in just 3 months!",
        rating: 5,
        date: "March 15, 2023"
      },
      {
        name: "Michael Chen",
        role: "UX Designer",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        quote: "The instructors are incredible and the community support is unmatched. I've tried many platforms but none compare to the quality here.",
        rating: 5,
        date: "January 8, 2023"
      },
      {
        name: "Priya Patel",
        role: "Data Scientist",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        quote: "I was skeptical at first, but the hands-on projects helped me build a portfolio that landed me my dream job. Worth every penny!",
        rating: 4,
        date: "February 22, 2023"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_card = __nuxt_component_0$1;
      const _component_q_card_section = __nuxt_component_4;
      const _component_q_icon = __nuxt_component_2$1;
      const _component_q_avatar = __nuxt_component_5$1;
      const _component_q_rating = __nuxt_component_5$1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative" }, _attrs))}><div class="container mx-auto"><div class="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div><div class="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div><div class="relative z-10"><h2 class="text-5xl font-bold mb-4 text-center text-gray-800 animate-fadeIn tracking-tight"><span class="relative inline-block"> Student <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 relative">Voices <span class="absolute -bottom-2 left-0 w-full h-2 bg-indigo-400 opacity-40 rounded-full transform -rotate-1"></span></span></span></h2><p class="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg leading-relaxed animate-fadeIn animation-delay-200"> Discover how our platform has helped <span class="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700">thousands transform</span> their careers and lives </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10"><!--[-->`);
      ssrRenderList(testimonials, (testimonial, i) => {
        _push(ssrRenderComponent(_component_q_card, {
          key: i,
          class: ["transform transition-all duration-500 rounded-2xl border-0 hover:shadow-2xl", {
            "md:translate-y-8": i === 1,
            "md:-translate-y-4": i === 2,
            "hover:-translate-y-2": true
          }],
          flat: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_q_card_section, { class: "p-8 relative overflow-hidden bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: "format_quote",
                      size: "5rem",
                      class: "text-blue-100 absolute -top-5 -right-5 opacity-70 rotate-180"
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="my-6 text-gray-700 relative z-10 italic font-light text-lg leading-relaxed"${_scopeId2}>${ssrInterpolate(testimonial.quote)}</p><div class="pt-4 mt-6 border-t border-gray-100"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_avatar, {
                      size: "3.5rem",
                      class: "ring-2 ring-blue-100 ring-offset-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img${ssrRenderAttr("src", testimonial.avatar)}${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              src: testimonial.avatar
                            }, null, 8, ["src"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div class="ml-4"${_scopeId2}><h4 class="font-bold text-gray-800"${_scopeId2}>${ssrInterpolate(testimonial.name)}</h4><span class="text-gray-500 text-sm"${_scopeId2}>${ssrInterpolate(testimonial.role)}</span></div></div><div class="mt-4 flex items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_rating, {
                      modelValue: testimonial.rating,
                      "onUpdate:modelValue": ($event) => testimonial.rating = $event,
                      max: "5",
                      size: "1.2em",
                      color: "amber-8",
                      readonly: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="ml-2 text-amber-600 font-medium"${_scopeId2}>${ssrInterpolate(testimonial.rating)}.0</span><span class="ml-auto text-sm text-gray-400"${_scopeId2}>${ssrInterpolate(testimonial.date)}</span></div></div>`);
                  } else {
                    return [
                      createVNode(_component_q_icon, {
                        name: "format_quote",
                        size: "5rem",
                        class: "text-blue-100 absolute -top-5 -right-5 opacity-70 rotate-180"
                      }),
                      createVNode("p", { class: "my-6 text-gray-700 relative z-10 italic font-light text-lg leading-relaxed" }, toDisplayString(testimonial.quote), 1),
                      createVNode("div", { class: "pt-4 mt-6 border-t border-gray-100" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_q_avatar, {
                            size: "3.5rem",
                            class: "ring-2 ring-blue-100 ring-offset-2"
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: testimonial.avatar
                              }, null, 8, ["src"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "ml-4" }, [
                            createVNode("h4", { class: "font-bold text-gray-800" }, toDisplayString(testimonial.name), 1),
                            createVNode("span", { class: "text-gray-500 text-sm" }, toDisplayString(testimonial.role), 1)
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 flex items-center" }, [
                          createVNode(_component_q_rating, {
                            modelValue: testimonial.rating,
                            "onUpdate:modelValue": ($event) => testimonial.rating = $event,
                            max: "5",
                            size: "1.2em",
                            color: "amber-8",
                            readonly: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "ml-2 text-amber-600 font-medium" }, toDisplayString(testimonial.rating) + ".0", 1),
                          createVNode("span", { class: "ml-auto text-sm text-gray-400" }, toDisplayString(testimonial.date), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_q_card_section, { class: "p-8 relative overflow-hidden bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-2xl" }, {
                  default: withCtx(() => [
                    createVNode(_component_q_icon, {
                      name: "format_quote",
                      size: "5rem",
                      class: "text-blue-100 absolute -top-5 -right-5 opacity-70 rotate-180"
                    }),
                    createVNode("p", { class: "my-6 text-gray-700 relative z-10 italic font-light text-lg leading-relaxed" }, toDisplayString(testimonial.quote), 1),
                    createVNode("div", { class: "pt-4 mt-6 border-t border-gray-100" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_component_q_avatar, {
                          size: "3.5rem",
                          class: "ring-2 ring-blue-100 ring-offset-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: testimonial.avatar
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "ml-4" }, [
                          createVNode("h4", { class: "font-bold text-gray-800" }, toDisplayString(testimonial.name), 1),
                          createVNode("span", { class: "text-gray-500 text-sm" }, toDisplayString(testimonial.role), 1)
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 flex items-center" }, [
                        createVNode(_component_q_rating, {
                          modelValue: testimonial.rating,
                          "onUpdate:modelValue": ($event) => testimonial.rating = $event,
                          max: "5",
                          size: "1.2em",
                          color: "amber-8",
                          readonly: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "ml-2 text-amber-600 font-medium" }, toDisplayString(testimonial.rating) + ".0", 1),
                        createVNode("span", { class: "ml-auto text-sm text-gray-400" }, toDisplayString(testimonial.date), 1)
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/TestimonialsSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TestimonialsSection-DBrk1NL_.mjs.map
