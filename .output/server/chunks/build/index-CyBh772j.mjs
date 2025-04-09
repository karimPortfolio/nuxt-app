import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as __nuxt_component_0$2, a as _sfc_main$1 } from './CategoriesSection-CjitmR14.mjs';
import _sfc_main$2 from './FeaturesCoursesSection-BHS0E1Ik.mjs';
import _sfc_main$4 from './CTASection-DRznes6R.mjs';
import _sfc_main$3 from './TestimonialsSection-VWFzwxJ5.mjs';
import FooterSection from './FooterSection-BOZ_zV1e.mjs';
import { e as useHead, f as __nuxt_component_0, g as __nuxt_component_11, h as __nuxt_component_2, i as __nuxt_component_14 } from './server.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_4 } from '../_/QCardSection.mjs';
import { _ as __nuxt_component_8, a as __nuxt_component_1 } from '../_/QTooltip.mjs';
import '../_/QRating.mjs';
import './fetch-HZE9mAEp.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Online Learning Platform | Expand Your Knowledge",
      link: [{ rel: "icon", type: "image/x-icon", href: "/img/brand.png" }],
      meta: [
        {
          name: "description",
          content: "Discover thousands of online courses from expert instructors around the world, designed to elevate your skills to the next level."
        },
        {
          name: "keywords",
          content: "online courses, e-learning, education, skills development, online education, professional development, learning platform"
        },
        {
          property: "og:title",
          content: "Online Learning Platform | Expand Your Knowledge"
        },
        {
          property: "og:description",
          content: "Discover thousands of online courses from expert instructors around the world, designed to elevate your skills to the next level."
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/img/brand.png" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Online Learning Platform | Expand Your Knowledge"
        },
        {
          name: "twitter:description",
          content: "Discover thousands of online courses from expert instructors around the world."
        },
        { rel: "canonical", href: "http://portfolio.futurixtech.site" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_btn = __nuxt_component_0;
      const _component_q_avatar = __nuxt_component_11;
      const _component_q_icon = __nuxt_component_2;
      const _component_q_card = __nuxt_component_0$1;
      const _component_q_card_section = __nuxt_component_4;
      const _component_q_input = __nuxt_component_14;
      const _component_q_tooltip = __nuxt_component_8;
      const _component_q_chip = __nuxt_component_0$2;
      const _component_q_badge = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 min-h-screen" }, _attrs))}><section class="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-28 relative overflow-hidden"><div class="absolute inset-0 bg-pattern opacity-20 animate-pulse-slow"></div><div class="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div><div class="absolute bottom-10 left-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div><div class="container mx-auto px-4 relative z-10"><div class="flex flex-nowrap flex-col md:flex-row items-center justify-between gap-12"><div class="mb-8 md:mb-0"><div class="inline-block px-3 py-1 bg-blue-600/30 backdrop-blur-sm rounded-full text-blue-100 font-medium text-sm mb-6 border border-blue-500/20 shadow-glow"><span class="mr-2">\u{1F680}</span> The future of online learning is here </div><h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in tracking-tight"> Expand Your <span class="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 animate-gradient">Knowledge</span></h1><p class="text-xl mb-8 text-blue-100 max-w-lg leading-relaxed"> Discover thousands of online courses from expert instructors around the world, designed to elevate your skills to the next level. </p><div class="flex flex-wrap gap-5">`);
      _push(ssrRenderComponent(_component_q_btn, {
        unelevated: "",
        rounded: "",
        "text-color": "blue-800",
        size: "lg",
        label: "Get Started",
        class: "font-medium px-10 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-700 hover:bg-yellow-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
      }, null, _parent));
      _push(ssrRenderComponent(_component_q_btn, {
        outline: "",
        rounded: "",
        color: "white",
        label: "Learn more",
        class: "hover:bg-blue-700/30 transition-all backdrop-blur-sm px-8 border-2"
      }, null, _parent));
      _push(`</div><div class="mt-10 flex items-center p-4 bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20"><div class="flex -space-x-3">`);
      _push(ssrRenderComponent(_component_q_avatar, {
        size: "46px",
        class: "border-2 border-blue-700 shadow-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="https://randomuser.me/api/portraits/women/32.jpg"${_scopeId}>`);
          } else {
            return [
              createVNode("img", { src: "https://randomuser.me/api/portraits/women/32.jpg" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_q_avatar, {
        size: "46px",
        class: "border-2 border-blue-700 shadow-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="https://randomuser.me/api/portraits/men/44.jpg"${_scopeId}>`);
          } else {
            return [
              createVNode("img", { src: "https://randomuser.me/api/portraits/men/44.jpg" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_q_avatar, {
        size: "46px",
        class: "border-2 border-blue-700 shadow-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="https://randomuser.me/api/portraits/women/42.jpg"${_scopeId}>`);
          } else {
            return [
              createVNode("img", { src: "https://randomuser.me/api/portraits/women/42.jpg" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold border-2 border-blue-700 shadow-lg"> +5k </div></div><div class="ml-4"><div class="text-white font-semibold">Join our community</div><div class="text-blue-200 text-sm"> 10K+ students enrolled this month </div></div></div></div><div><div class="relative group"><div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-3xl opacity-30 transform -rotate-6 group-hover:opacity-40 transition-all duration-700"></div><img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" class="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 relative z-10 border border-white/10" alt="Students learning online"><div class="absolute -bottom-8 -left-8 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl p-5 shadow-2xl transform group-hover:scale-110 transition-transform duration-500"><div class="flex items-center"><div class="mr-3">`);
      _push(ssrRenderComponent(_component_q_icon, {
        name: "star",
        color: "blue-900",
        size: "1.8rem"
      }, null, _parent));
      _push(`</div><div><div class="text-blue-900 font-bold text-2xl">4.9/5</div><div class="text-sm text-blue-900 font-medium"> Student satisfaction </div></div></div></div><div class="absolute top-6 -right-6 z-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl transform group-hover:scale-110 transition-transform duration-500"><div class="text-blue-900 font-bold flex items-center">`);
      _push(ssrRenderComponent(_component_q_icon, {
        name: "school",
        size: "1.8rem",
        class: "mr-3 text-blue-600"
      }, null, _parent));
      _push(`<div><div class="text-lg">500+ Courses</div><div class="text-xs text-blue-500 font-normal"> Updated weekly </div></div></div></div></div></div></div></div></section><section class="py-8 container mx-auto px-4 -mt-16 relative z-20">`);
      _push(ssrRenderComponent(_component_q_card, { class: "shadow-2xl rounded-2xl border border-gray-100 hover:shadow-blue-100/50 transition-all duration-300 backdrop-blur-sm bg-white/95" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card_section, { class: "p-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col md:flex-row items-stretch gap-6"${_scopeId2}><div class="relative w-full group flex-1"${_scopeId2}><div class="absolute -top-3 -left-3 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"${_scopeId2}></div><div class="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse-slow animation-delay-1000"${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(_component_q_input, {
                    outlined: "",
                    dense: "",
                    class: "w-full text-lg shadow-inner",
                    placeholder: "What do you want to learn today?",
                    "bg-color": "white",
                    rounded: "",
                    borderless: "",
                    style: { "box-shadow": "inset 0 0 0 1px rgba(209, 213, 219, 0.5)" }
                  }, {
                    prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "search",
                          color: "blue-600",
                          size: "1.2rem",
                          class: "ml-2 animate-bounce-subtle"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_icon, {
                            name: "search",
                            color: "blue-600",
                            size: "1.2rem",
                            class: "ml-2 animate-bounce-subtle"
                          })
                        ];
                      }
                    }),
                    append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_btn, {
                          round: "",
                          flat: "",
                          size: "sm",
                          icon: "mic",
                          color: "blue-500",
                          class: "hover:bg-blue-50 transition-colors mr-1"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_q_tooltip, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Search by voice`);
                                  } else {
                                    return [
                                      createTextVNode("Search by voice")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_q_tooltip, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Search by voice")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_btn, {
                            round: "",
                            flat: "",
                            size: "sm",
                            icon: "mic",
                            color: "blue-500",
                            class: "hover:bg-blue-50 transition-colors mr-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_tooltip, null, {
                                default: withCtx(() => [
                                  createTextVNode("Search by voice")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="absolute -bottom-6 left-3 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"${_scopeId2}><span class="font-medium text-blue-600 mr-1"${_scopeId2}>Pro tip:</span> Try &quot;Web Development&quot;, &quot;Python&quot;, &quot;UI Design&quot; </div></div>`);
                  _push3(ssrRenderComponent(_component_q_btn, {
                    rounded: "",
                    color: "primary",
                    label: "Search Courses",
                    class: "w-full md:w-auto px-8 py-2.5 text-base font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600",
                    "icon-right": "trending_flat"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-wrap gap-3 mt-10 relative"${_scopeId2}><div class="text-gray-600 mr-2 self-center text-sm font-medium flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_q_icon, {
                    name: "trending_up",
                    size: "sm",
                    color: "blue-600",
                    class: "mr-1.5 animate-pulse"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Trending:</span></div>`);
                  _push3(ssrRenderComponent(_component_q_chip, {
                    clickable: "",
                    color: "blue-50",
                    "text-color": "blue-700",
                    size: "md",
                    class: "font-medium px-2 border border-blue-100 bg-blue-100 transition-all duration-300 shadow-sm hover:shadow-blue-200 transform hover:-translate-y-1 hover:scale-105"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "code",
                          size: "xs",
                          class: "mr-1.5"
                        }, null, _parent4, _scopeId3));
                        _push4(` JavaScript `);
                        _push4(ssrRenderComponent(_component_q_badge, {
                          color: "blue-600",
                          floating: "",
                          rounded: "",
                          class: "text-xs"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Hot`);
                            } else {
                              return [
                                createTextVNode("Hot")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_icon, {
                            name: "code",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" JavaScript "),
                          createVNode(_component_q_badge, {
                            color: "blue-600",
                            floating: "",
                            rounded: "",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Hot")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_chip, {
                    clickable: "",
                    color: "indigo-50",
                    "text-color": "indigo-700",
                    size: "md",
                    class: "font-medium px-2 border border-indigo-100 bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-indigo-200 transform hover:-translate-y-1 hover:scale-105"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "design_services",
                          size: "xs",
                          class: "mr-1.5"
                        }, null, _parent4, _scopeId3));
                        _push4(` UX/UI Design `);
                      } else {
                        return [
                          createVNode(_component_q_icon, {
                            name: "design_services",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" UX/UI Design ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_chip, {
                    clickable: "",
                    color: "purple-50",
                    "text-color": "purple-700",
                    size: "md",
                    class: "font-medium px-2 border border-purple-100 bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-purple-200 transform hover:-translate-y-1 hover:scale-105"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "analytics",
                          size: "xs",
                          class: "mr-1.5"
                        }, null, _parent4, _scopeId3));
                        _push4(` Data Science `);
                        _push4(ssrRenderComponent(_component_q_badge, {
                          color: "purple-600",
                          floating: "",
                          rounded: "",
                          class: "text-xs"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`New`);
                            } else {
                              return [
                                createTextVNode("New")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_icon, {
                            name: "analytics",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" Data Science "),
                          createVNode(_component_q_badge, {
                            color: "purple-600",
                            floating: "",
                            rounded: "",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("New")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_chip, {
                    clickable: "",
                    color: "teal-50",
                    "text-color": "teal-700",
                    size: "md",
                    class: "font-medium px-2 border border-teal-100 bg-teal-100 transition-all duration-300 shadow-sm hover:shadow-teal-200 transform hover:-translate-y-1 hover:scale-105"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "psychology",
                          size: "xs",
                          class: "mr-1.5"
                        }, null, _parent4, _scopeId3));
                        _push4(` Machine Learning `);
                      } else {
                        return [
                          createVNode(_component_q_icon, {
                            name: "psychology",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" Machine Learning ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_chip, {
                    clickable: "",
                    color: "amber-50",
                    "text-color": "amber-700",
                    size: "md",
                    class: "font-medium px-2 border border-amber-100 bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-amber-200 transform hover:-translate-y-1 hover:scale-105"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_icon, {
                          name: "language",
                          size: "xs",
                          class: "mr-1.5"
                        }, null, _parent4, _scopeId3));
                        _push4(` Languages `);
                      } else {
                        return [
                          createVNode(_component_q_icon, {
                            name: "language",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" Languages ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_q_btn, {
                    flat: "",
                    round: "",
                    size: "sm",
                    color: "gray-500",
                    icon: "more_horiz",
                    class: "self-center hover:bg-gray-100 hover:text-blue-600 transition-all"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_q_tooltip, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`More trending topics`);
                            } else {
                              return [
                                createTextVNode("More trending topics")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_q_tooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("More trending topics")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col md:flex-row items-stretch gap-6" }, [
                      createVNode("div", { class: "relative w-full group flex-1" }, [
                        createVNode("div", { class: "absolute -top-3 -left-3 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" }),
                        createVNode("div", { class: "absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse-slow animation-delay-1000" }),
                        createVNode(_component_q_input, {
                          outlined: "",
                          dense: "",
                          class: "w-full text-lg shadow-inner",
                          placeholder: "What do you want to learn today?",
                          "bg-color": "white",
                          rounded: "",
                          borderless: "",
                          style: { "box-shadow": "inset 0 0 0 1px rgba(209, 213, 219, 0.5)" }
                        }, {
                          prepend: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "search",
                              color: "blue-600",
                              size: "1.2rem",
                              class: "ml-2 animate-bounce-subtle"
                            })
                          ]),
                          append: withCtx(() => [
                            createVNode(_component_q_btn, {
                              round: "",
                              flat: "",
                              size: "sm",
                              icon: "mic",
                              color: "blue-500",
                              class: "hover:bg-blue-50 transition-colors mr-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_tooltip, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Search by voice")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "absolute -bottom-6 left-3 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" }, [
                          createVNode("span", { class: "font-medium text-blue-600 mr-1" }, "Pro tip:"),
                          createTextVNode(' Try "Web Development", "Python", "UI Design" ')
                        ])
                      ]),
                      createVNode(_component_q_btn, {
                        rounded: "",
                        color: "primary",
                        label: "Search Courses",
                        class: "w-full md:w-auto px-8 py-2.5 text-base font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600",
                        "icon-right": "trending_flat"
                      })
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-3 mt-10 relative" }, [
                      createVNode("div", { class: "text-gray-600 mr-2 self-center text-sm font-medium flex items-center" }, [
                        createVNode(_component_q_icon, {
                          name: "trending_up",
                          size: "sm",
                          color: "blue-600",
                          class: "mr-1.5 animate-pulse"
                        }),
                        createVNode("span", null, "Trending:")
                      ]),
                      createVNode(_component_q_chip, {
                        clickable: "",
                        color: "blue-50",
                        "text-color": "blue-700",
                        size: "md",
                        class: "font-medium px-2 border border-blue-100 bg-blue-100 transition-all duration-300 shadow-sm hover:shadow-blue-200 transform hover:-translate-y-1 hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "code",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" JavaScript "),
                          createVNode(_component_q_badge, {
                            color: "blue-600",
                            floating: "",
                            rounded: "",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Hot")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_chip, {
                        clickable: "",
                        color: "indigo-50",
                        "text-color": "indigo-700",
                        size: "md",
                        class: "font-medium px-2 border border-indigo-100 bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-indigo-200 transform hover:-translate-y-1 hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "design_services",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" UX/UI Design ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_chip, {
                        clickable: "",
                        color: "purple-50",
                        "text-color": "purple-700",
                        size: "md",
                        class: "font-medium px-2 border border-purple-100 bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-purple-200 transform hover:-translate-y-1 hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "analytics",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" Data Science "),
                          createVNode(_component_q_badge, {
                            color: "purple-600",
                            floating: "",
                            rounded: "",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("New")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_chip, {
                        clickable: "",
                        color: "teal-50",
                        "text-color": "teal-700",
                        size: "md",
                        class: "font-medium px-2 border border-teal-100 bg-teal-100 transition-all duration-300 shadow-sm hover:shadow-teal-200 transform hover:-translate-y-1 hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "psychology",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" Machine Learning ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_chip, {
                        clickable: "",
                        color: "amber-50",
                        "text-color": "amber-700",
                        size: "md",
                        class: "font-medium px-2 border border-amber-100 bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-amber-200 transform hover:-translate-y-1 hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "language",
                            size: "xs",
                            class: "mr-1.5"
                          }),
                          createTextVNode(" Languages ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_btn, {
                        flat: "",
                        round: "",
                        size: "sm",
                        color: "gray-500",
                        icon: "more_horiz",
                        class: "self-center hover:bg-gray-100 hover:text-blue-600 transition-all"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_tooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("More trending topics")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_card_section, { class: "p-8" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col md:flex-row items-stretch gap-6" }, [
                    createVNode("div", { class: "relative w-full group flex-1" }, [
                      createVNode("div", { class: "absolute -top-3 -left-3 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" }),
                      createVNode("div", { class: "absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse-slow animation-delay-1000" }),
                      createVNode(_component_q_input, {
                        outlined: "",
                        dense: "",
                        class: "w-full text-lg shadow-inner",
                        placeholder: "What do you want to learn today?",
                        "bg-color": "white",
                        rounded: "",
                        borderless: "",
                        style: { "box-shadow": "inset 0 0 0 1px rgba(209, 213, 219, 0.5)" }
                      }, {
                        prepend: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "search",
                            color: "blue-600",
                            size: "1.2rem",
                            class: "ml-2 animate-bounce-subtle"
                          })
                        ]),
                        append: withCtx(() => [
                          createVNode(_component_q_btn, {
                            round: "",
                            flat: "",
                            size: "sm",
                            icon: "mic",
                            color: "blue-500",
                            class: "hover:bg-blue-50 transition-colors mr-1"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_tooltip, null, {
                                default: withCtx(() => [
                                  createTextVNode("Search by voice")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "absolute -bottom-6 left-3 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0" }, [
                        createVNode("span", { class: "font-medium text-blue-600 mr-1" }, "Pro tip:"),
                        createTextVNode(' Try "Web Development", "Python", "UI Design" ')
                      ])
                    ]),
                    createVNode(_component_q_btn, {
                      rounded: "",
                      color: "primary",
                      label: "Search Courses",
                      class: "w-full md:w-auto px-8 py-2.5 text-base font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600",
                      "icon-right": "trending_flat"
                    })
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-3 mt-10 relative" }, [
                    createVNode("div", { class: "text-gray-600 mr-2 self-center text-sm font-medium flex items-center" }, [
                      createVNode(_component_q_icon, {
                        name: "trending_up",
                        size: "sm",
                        color: "blue-600",
                        class: "mr-1.5 animate-pulse"
                      }),
                      createVNode("span", null, "Trending:")
                    ]),
                    createVNode(_component_q_chip, {
                      clickable: "",
                      color: "blue-50",
                      "text-color": "blue-700",
                      size: "md",
                      class: "font-medium px-2 border border-blue-100 bg-blue-100 transition-all duration-300 shadow-sm hover:shadow-blue-200 transform hover:-translate-y-1 hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_icon, {
                          name: "code",
                          size: "xs",
                          class: "mr-1.5"
                        }),
                        createTextVNode(" JavaScript "),
                        createVNode(_component_q_badge, {
                          color: "blue-600",
                          floating: "",
                          rounded: "",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Hot")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_chip, {
                      clickable: "",
                      color: "indigo-50",
                      "text-color": "indigo-700",
                      size: "md",
                      class: "font-medium px-2 border border-indigo-100 bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-indigo-200 transform hover:-translate-y-1 hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_icon, {
                          name: "design_services",
                          size: "xs",
                          class: "mr-1.5"
                        }),
                        createTextVNode(" UX/UI Design ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_chip, {
                      clickable: "",
                      color: "purple-50",
                      "text-color": "purple-700",
                      size: "md",
                      class: "font-medium px-2 border border-purple-100 bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-purple-200 transform hover:-translate-y-1 hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_icon, {
                          name: "analytics",
                          size: "xs",
                          class: "mr-1.5"
                        }),
                        createTextVNode(" Data Science "),
                        createVNode(_component_q_badge, {
                          color: "purple-600",
                          floating: "",
                          rounded: "",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("New")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_chip, {
                      clickable: "",
                      color: "teal-50",
                      "text-color": "teal-700",
                      size: "md",
                      class: "font-medium px-2 border border-teal-100 bg-teal-100 transition-all duration-300 shadow-sm hover:shadow-teal-200 transform hover:-translate-y-1 hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_icon, {
                          name: "psychology",
                          size: "xs",
                          class: "mr-1.5"
                        }),
                        createTextVNode(" Machine Learning ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_chip, {
                      clickable: "",
                      color: "amber-50",
                      "text-color": "amber-700",
                      size: "md",
                      class: "font-medium px-2 border border-amber-100 bg-amber-100 transition-all duration-300 shadow-sm hover:shadow-amber-200 transform hover:-translate-y-1 hover:scale-105"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_icon, {
                          name: "language",
                          size: "xs",
                          class: "mr-1.5"
                        }),
                        createTextVNode(" Languages ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_q_btn, {
                      flat: "",
                      round: "",
                      size: "sm",
                      color: "gray-500",
                      icon: "more_horiz",
                      class: "self-center hover:bg-gray-100 hover:text-blue-600 transition-all"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_q_tooltip, null, {
                          default: withCtx(() => [
                            createTextVNode("More trending topics")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(FooterSection, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CyBh772j.mjs.map
