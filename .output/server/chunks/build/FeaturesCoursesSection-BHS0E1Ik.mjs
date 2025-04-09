import { ref, withAsyncContext, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, isRef, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-HZE9mAEp.mjs';
import { h as __nuxt_component_2, f as __nuxt_component_0, g as __nuxt_component_11 } from './server.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_4 } from '../_/QCardSection.mjs';
import { a as __nuxt_component_1, _ as __nuxt_component_8 } from '../_/QTooltip.mjs';
import { _ as __nuxt_component_5 } from '../_/QRating.mjs';
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

const _sfc_main = {
  __name: "FeaturesCoursesSection",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const rating = ref(4.5);
    ref(1);
    const { data: courses } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/v1/courses", "$1PguTW8nqb")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_icon = __nuxt_component_2;
      const _component_q_card = __nuxt_component_0$1;
      const _component_q_btn = __nuxt_component_0;
      const _component_q_badge = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_4;
      const _component_q_avatar = __nuxt_component_11;
      const _component_q_rating = __nuxt_component_5;
      const _component_q_tooltip = __nuxt_component_8;
      const _component_q_ripple = resolveComponent("q-ripple");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" }, _attrs))}><div class="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div><div class="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div><div class="container mx-auto px-4 relative z-10"><div class="flex flex-col md:flex-row justify-between items-center mb-20"><div class="mb-10 md:mb-0 text-center md:text-left max-w-2xl"><span class="text-sm font-bold text-primary bg-blue-50 px-4 py-2 rounded-full mb-4 inline-block shadow-sm transform hover:scale-105 transition-transform duration-300"><span class="pulse-dot mr-1.5"></span>Top Picks </span><h2 class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4" role="heading" aria-level="2">Featured Courses</h2><p class="text-gray-600 text-lg max-w-xl leading-relaxed">Handpicked by our experts to accelerate your career journey and help you reach your full potential.</p></div><div class="flex items-center"><a href="#" class="group flex items-center font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 gap-2 px-4 py-2 rounded-full hover:bg-blue-50"> View all courses `);
      _push(ssrRenderComponent(_component_q_icon, {
        name: "arrow_forward",
        size: "xs",
        class: "text-blue-600 group-hover:text-blue-800 transform group-hover:translate-x-1 transition-all duration-300"
      }, null, _parent));
      _push(`</a></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"><!--[-->`);
      ssrRenderList(unref(courses), (course) => {
        _push(ssrRenderComponent(_component_q_card, {
          key: course.id,
          flat: "",
          class: "transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative"${_scopeId}><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=80" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" alt="Course thumbnail image" loading="lazy"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_btn, {
                flat: "",
                round: "",
                color: "white",
                icon: "play_circle",
                size: "lg",
                class: "opacity-90 hover:opacity-100 transform hover:scale-110 transition-all",
                "aria-label": "Preview course"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_q_badge, {
                color: "primary",
                class: "absolute top-4 left-4 px-4 py-2 text-xs font-bold rounded-full shadow-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Bestseller`);
                  } else {
                    return [
                      createTextVNode("Bestseller")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-xs font-medium flex items-center shadow-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_q_icon, {
                name: "schedule",
                size: "xs",
                class: "mr-1.5"
              }, null, _parent2, _scopeId));
              _push2(` 12 hours </div></div>`);
              _push2(ssrRenderComponent(_component_q_card_section, { class: "p-8" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex justify-between items-center mb-4"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_avatar, {
                      size: "2.5rem",
                      class: "ring-2 ring-primary/20 shadow-sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Instructor avatar"${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              src: "https://randomuser.me/api/portraits/men/32.jpg",
                              alt: "Instructor avatar"
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<span class="ml-3 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"${_scopeId2}>${ssrInterpolate(course.author.name)}</span></div><div class="bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm transform hover:scale-105 transition-transform"${_scopeId2}>$${ssrInterpolate(course.price)}</div></div><h3 class="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"${_scopeId2}>${ssrInterpolate(course.title)}</h3><p class="text-gray-600 mb-6 text-sm line-clamp-2 leading-relaxed"${_scopeId2}>${ssrInterpolate(course.description)}</p><div class="flex flex-wrap gap-2 mb-6"${_scopeId2}><span class="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"${_scopeId2}>HTML/CSS</span><span class="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"${_scopeId2}>JavaScript</span><span class="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"${_scopeId2}>React</span></div><div class="flex items-center justify-between mb-6"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_rating, {
                      modelValue: unref(rating),
                      "onUpdate:modelValue": ($event) => isRef(rating) ? rating.value = $event : null,
                      max: "5",
                      size: "sm",
                      color: "amber",
                      readonly: "",
                      icon: "star",
                      "icon-selected": "star"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="ml-2 text-sm text-gray-600"${_scopeId2}>4.5 (2.3k)</span></div>`);
                    _push3(ssrRenderComponent(_component_q_btn, {
                      round: "",
                      flat: "",
                      color: "primary",
                      icon: "bookmark",
                      class: "bg-blue-50 hover:bg-blue-100 transition-colors",
                      "aria-label": "Bookmark this course"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_q_tooltip, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Bookmark this course`);
                              } else {
                                return [
                                  createTextVNode("Bookmark this course")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_q_tooltip, null, {
                              default: withCtx(() => [
                                createTextVNode("Bookmark this course")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_q_btn, {
                      unelevated: "",
                      rounded: "",
                      class: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-base"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="relative z-10"${_scopeId3}>Enroll Now</span>`);
                          _push4(ssrRenderComponent(_component_q_ripple, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("span", { class: "relative z-10" }, "Enroll Now"),
                            createVNode(_component_q_ripple)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_q_avatar, {
                            size: "2.5rem",
                            class: "ring-2 ring-primary/20 shadow-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: "https://randomuser.me/api/portraits/men/32.jpg",
                                alt: "Instructor avatar"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "ml-3 text-sm font-semibold text-gray-700 hover:text-primary transition-colors" }, toDisplayString(course.author.name), 1)
                        ]),
                        createVNode("div", { class: "bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm transform hover:scale-105 transition-transform" }, "$" + toDisplayString(course.price), 1)
                      ]),
                      createVNode("h3", { class: "text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" }, toDisplayString(course.title), 1),
                      createVNode("p", { class: "text-gray-600 mb-6 text-sm line-clamp-2 leading-relaxed" }, toDisplayString(course.description), 1),
                      createVNode("div", { class: "flex flex-wrap gap-2 mb-6" }, [
                        createVNode("span", { class: "text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors" }, "HTML/CSS"),
                        createVNode("span", { class: "text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors" }, "JavaScript"),
                        createVNode("span", { class: "text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors" }, "React")
                      ]),
                      createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(_component_q_rating, {
                            modelValue: unref(rating),
                            "onUpdate:modelValue": ($event) => isRef(rating) ? rating.value = $event : null,
                            max: "5",
                            size: "sm",
                            color: "amber",
                            readonly: "",
                            icon: "star",
                            "icon-selected": "star"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", { class: "ml-2 text-sm text-gray-600" }, "4.5 (2.3k)")
                        ]),
                        createVNode(_component_q_btn, {
                          round: "",
                          flat: "",
                          color: "primary",
                          icon: "bookmark",
                          class: "bg-blue-50 hover:bg-blue-100 transition-colors",
                          "aria-label": "Bookmark this course"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_tooltip, null, {
                              default: withCtx(() => [
                                createTextVNode("Bookmark this course")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(_component_q_btn, {
                        unelevated: "",
                        rounded: "",
                        class: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-base"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "relative z-10" }, "Enroll Now"),
                          createVNode(_component_q_ripple)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "relative" }, [
                  createVNode("img", {
                    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    class: "w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105",
                    alt: "Course thumbnail image",
                    loading: "lazy"
                  }),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6" }, [
                    createVNode(_component_q_btn, {
                      flat: "",
                      round: "",
                      color: "white",
                      icon: "play_circle",
                      size: "lg",
                      class: "opacity-90 hover:opacity-100 transform hover:scale-110 transition-all",
                      "aria-label": "Preview course"
                    })
                  ]),
                  createVNode(_component_q_badge, {
                    color: "primary",
                    class: "absolute top-4 left-4 px-4 py-2 text-xs font-bold rounded-full shadow-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Bestseller")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-xs font-medium flex items-center shadow-sm" }, [
                    createVNode(_component_q_icon, {
                      name: "schedule",
                      size: "xs",
                      class: "mr-1.5"
                    }),
                    createTextVNode(" 12 hours ")
                  ])
                ]),
                createVNode(_component_q_card_section, { class: "p-8" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_component_q_avatar, {
                          size: "2.5rem",
                          class: "ring-2 ring-primary/20 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: "https://randomuser.me/api/portraits/men/32.jpg",
                              alt: "Instructor avatar"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("span", { class: "ml-3 text-sm font-semibold text-gray-700 hover:text-primary transition-colors" }, toDisplayString(course.author.name), 1)
                      ]),
                      createVNode("div", { class: "bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm transform hover:scale-105 transition-transform" }, "$" + toDisplayString(course.price), 1)
                    ]),
                    createVNode("h3", { class: "text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" }, toDisplayString(course.title), 1),
                    createVNode("p", { class: "text-gray-600 mb-6 text-sm line-clamp-2 leading-relaxed" }, toDisplayString(course.description), 1),
                    createVNode("div", { class: "flex flex-wrap gap-2 mb-6" }, [
                      createVNode("span", { class: "text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors" }, "HTML/CSS"),
                      createVNode("span", { class: "text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors" }, "JavaScript"),
                      createVNode("span", { class: "text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors" }, "React")
                    ]),
                    createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_component_q_rating, {
                          modelValue: unref(rating),
                          "onUpdate:modelValue": ($event) => isRef(rating) ? rating.value = $event : null,
                          max: "5",
                          size: "sm",
                          color: "amber",
                          readonly: "",
                          icon: "star",
                          "icon-selected": "star"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("span", { class: "ml-2 text-sm text-gray-600" }, "4.5 (2.3k)")
                      ]),
                      createVNode(_component_q_btn, {
                        round: "",
                        flat: "",
                        color: "primary",
                        icon: "bookmark",
                        class: "bg-blue-50 hover:bg-blue-100 transition-colors",
                        "aria-label": "Bookmark this course"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_tooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("Bookmark this course")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_q_btn, {
                      unelevated: "",
                      rounded: "",
                      class: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-base"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "relative z-10" }, "Enroll Now"),
                        createVNode(_component_q_ripple)
                      ]),
                      _: 1
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/FeaturesCoursesSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FeaturesCoursesSection-BHS0E1Ik.mjs.map
