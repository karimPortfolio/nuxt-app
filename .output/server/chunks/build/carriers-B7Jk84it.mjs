import { _ as _sfc_main$1 } from './CustomCard-BwdxONrE.mjs';
import { withAsyncContext, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useFetch } from './fetch-HZE9mAEp.mjs';
import { u as useSeoMeta, _ as __nuxt_component_0, a as __nuxt_component_1, b as __nuxt_component_17 } from './server.mjs';
import '../_/QCardSection.mjs';
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
  __name: "carriers",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/jobs", "$zdxQRn6Pok")), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: "Carriers",
      description: "This page contains information about our organization and its mission.",
      image: "https://example.com/image.jpg"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_layout = __nuxt_component_0;
      const _component_q_page_container = __nuxt_component_1;
      const _component_q_page = __nuxt_component_17;
      const _component_CustomCard = _sfc_main$1;
      _push(ssrRenderComponent(_component_q_layout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_page_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_page, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><h3 class="text-center font-semibold text-primary mt-3"${_scopeId3}> Welcome to the carriers page </h3><p class="text-xl text-center m-0"${_scopeId3}> This page contains information about our organization and its mission. </p></div><div class="grid grid-cols-4 px-6 gap-5 mt-10"${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(data), (job) => {
                          _push4(ssrRenderComponent(_component_CustomCard, {
                            key: job.title,
                            icon: "mdiBriefcase",
                            title: job.title,
                            subtitle: job.company,
                            content: job.location
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-center font-semibold text-primary mt-3" }, " Welcome to the carriers page "),
                            createVNode("p", { class: "text-xl text-center m-0" }, " This page contains information about our organization and its mission. ")
                          ]),
                          createVNode("div", { class: "grid grid-cols-4 px-6 gap-5 mt-10" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (job) => {
                              return openBlock(), createBlock(_component_CustomCard, {
                                key: job.title,
                                icon: "mdiBriefcase",
                                title: job.title,
                                subtitle: job.company,
                                content: job.location
                              }, null, 8, ["title", "subtitle", "content"]);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_page, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-center font-semibold text-primary mt-3" }, " Welcome to the carriers page "),
                          createVNode("p", { class: "text-xl text-center m-0" }, " This page contains information about our organization and its mission. ")
                        ]),
                        createVNode("div", { class: "grid grid-cols-4 px-6 gap-5 mt-10" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (job) => {
                            return openBlock(), createBlock(_component_CustomCard, {
                              key: job.title,
                              icon: "mdiBriefcase",
                              title: job.title,
                              subtitle: job.company,
                              content: job.location
                            }, null, 8, ["title", "subtitle", "content"]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_page_container, null, {
                default: withCtx(() => [
                  createVNode(_component_q_page, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-center font-semibold text-primary mt-3" }, " Welcome to the carriers page "),
                        createVNode("p", { class: "text-xl text-center m-0" }, " This page contains information about our organization and its mission. ")
                      ]),
                      createVNode("div", { class: "grid grid-cols-4 px-6 gap-5 mt-10" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (job) => {
                          return openBlock(), createBlock(_component_CustomCard, {
                            key: job.title,
                            icon: "mdiBriefcase",
                            title: job.title,
                            subtitle: job.company,
                            content: job.location
                          }, null, 8, ["title", "subtitle", "content"]);
                        }), 128))
                      ])
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/carriers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=carriers-B7Jk84it.mjs.map
