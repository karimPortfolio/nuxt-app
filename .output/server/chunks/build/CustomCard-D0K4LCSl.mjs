import { mergeProps, withCtx, renderSlot, createVNode, withDirectives, vShow, toDisplayString, defineComponent, computed, ref, watch, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderStyle, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_4 } from '../_/QCardSection.mjs';

const cache = /* @__PURE__ */ new Map();
async function importIcon(value) {
  if (!value) {
    return "";
  }
  if (cache.has(value)) {
    return cache.get(value);
  }
  const { [value]: icon } = await import('@mdi/js');
  cache.set(value, icon);
  return icon;
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MdiIcon",
  __ssrInlineRender: true,
  props: {
    size: { default: void 0 },
    flipX: { type: Boolean, default: false },
    flipY: { type: Boolean, default: false },
    icon: {},
    preserveAspectRatio: { default: "meet" }
  },
  async setup(__props) {
    let __temp, __restore;
    const options = useRuntimeConfig().public.mdi;
    const props = __props;
    const _size = computed(() => {
      if (props.size) return props.size;
      if (options.defaultSize) return options.defaultSize;
      return "1em";
    });
    const path = ref("");
    const styles = computed(() => ({
      "--flip-x": props.flipX ? "-1" : "1",
      "--flip-y": props.flipY ? "-1" : "1"
    }));
    async function updateIcon() {
      path.value = await importIcon(props.icon);
    }
    watch(async () => props.icon, ([__temp, __restore] = withAsyncContext(() => updateIcon), __temp = await __temp, __restore(), __temp));
    [__temp, __restore] = withAsyncContext(() => updateIcon()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        viewBox: "0 0 24 24",
        style: styles.value,
        width: _size.value,
        height: _size.value,
        preserveAspectRatio: _ctx.preserveAspectRatio
      }, _attrs))} data-v-c7fbaf42><path${ssrRenderAttr("d", path.value)} data-v-c7fbaf42></path></svg>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-mdi/dist/runtime/components/MdiIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c7fbaf42"]]);
const _sfc_main = {
  __name: "CustomCard",
  __ssrInlineRender: true,
  props: {
    title: String,
    icon: String,
    subtitle: String,
    content: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_card = __nuxt_component_0$1;
      const _component_q_card_section = __nuxt_component_4;
      const _component_MdiIcon = __nuxt_component_2;
      _push(ssrRenderComponent(_component_q_card, mergeProps({
        class: "bg-gray-100 rounded-md",
        flat: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                    _push3(`<div class="flex items-center gap-3"${_scopeId2}><div style="${ssrRenderStyle(__props.icon ? null : { display: "none" })}" class="rounded-sm bg-primary text-white p-3 h-fit"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_MdiIcon, { icon: __props.icon }, null, _parent3, _scopeId2));
                    _push3(`</div><div style="${ssrRenderStyle(__props.title || __props.subtitle ? null : { display: "none" })}"${_scopeId2}><div style="${ssrRenderStyle(__props.title ? null : { display: "none" })}" class="font-medium text-xl"${_scopeId2}>${ssrInterpolate(__props.title)}</div><p style="${ssrRenderStyle(__props.subtitle ? null : { display: "none" })}" class="text-gray-500"${_scopeId2}>${ssrInterpolate(__props.subtitle)}</p></div></div>`);
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "header", {}, () => [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        withDirectives(createVNode("div", { class: "rounded-sm bg-primary text-white p-3 h-fit" }, [
                          createVNode(_component_MdiIcon, { icon: __props.icon }, null, 8, ["icon"])
                        ], 512), [
                          [vShow, __props.icon]
                        ]),
                        withDirectives(createVNode("div", null, [
                          withDirectives(createVNode("div", { class: "font-medium text-xl" }, toDisplayString(__props.title), 513), [
                            [vShow, __props.title]
                          ]),
                          withDirectives(createVNode("p", { class: "text-gray-500" }, toDisplayString(__props.subtitle), 513), [
                            [vShow, __props.subtitle]
                          ])
                        ], 512), [
                          [vShow, __props.title || __props.subtitle]
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_card_section, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                    _push3(`<div${_scopeId2}><p${_scopeId2}>${ssrInterpolate(__props.content)}</p></div>`);
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "content", {}, () => [
                      createVNode("div", null, [
                        createVNode("p", null, toDisplayString(__props.content), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "header", {}, () => [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      withDirectives(createVNode("div", { class: "rounded-sm bg-primary text-white p-3 h-fit" }, [
                        createVNode(_component_MdiIcon, { icon: __props.icon }, null, 8, ["icon"])
                      ], 512), [
                        [vShow, __props.icon]
                      ]),
                      withDirectives(createVNode("div", null, [
                        withDirectives(createVNode("div", { class: "font-medium text-xl" }, toDisplayString(__props.title), 513), [
                          [vShow, __props.title]
                        ]),
                        withDirectives(createVNode("p", { class: "text-gray-500" }, toDisplayString(__props.subtitle), 513), [
                          [vShow, __props.subtitle]
                        ])
                      ], 512), [
                        [vShow, __props.title || __props.subtitle]
                      ])
                    ])
                  ])
                ]),
                _: 3
              }),
              createVNode(_component_q_card_section, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "content", {}, () => [
                    createVNode("div", null, [
                      createVNode("p", null, toDisplayString(__props.content), 1)
                    ])
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CustomCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=CustomCard-D0K4LCSl.mjs.map
