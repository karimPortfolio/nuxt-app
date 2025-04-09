import { _ as _sfc_main$1 } from './CustomCard-BwdxONrE.mjs';
import { withAsyncContext, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-HZE9mAEp.mjs';
import { u as useSeoMeta } from './server.mjs';
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
  __name: "about",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const cardsInfo = [
      {
        icon: "mdiAccount",
        title: "Our Mission",
        subtitle: "What we do",
        content: "Our mission is to provide quality services to our customers and to make a positive impact on the community."
      },
      {
        icon: "mdiEye",
        title: "Our Vision",
        subtitle: "Where we are going",
        content: "Our vision is to become the leading organization in our industry and to be recognized for our commitment to excellence."
      },
      {
        icon: "mdiHeart",
        title: "Our Values",
        subtitle: "What we believe in",
        content: "Our values are integrity, respect, and teamwork. We believe in treating others with honesty and fairness."
      },
      {
        icon: "mdiAccountGroup",
        title: "Our Team",
        subtitle: "Who we are",
        content: "Our team is made up of dedicated professionals who are passionate about their work and who are committed to serving our customers."
      }
    ];
    const { data: users } = ([__temp, __restore] = withAsyncContext(() => useFetch("https://jsonplaceholder.typicode.com/users", {
      server: false
    }, "$c6wy8KmN8o")), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: "About us",
      description: "Learn more about our organization and its mission."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CustomCard = _sfc_main$1;
      _push(`<!--[--><h3 class="text-center font-semibold text-primary mt-3">Welcome to the about page</h3><p class="text-xl text-center m-0">This page contains information about our organization and its mission.</p><div class="mt-6 px-5 grid grid-cols-1 gap-6 md:grid-cols-4"><!--[-->`);
      ssrRenderList(cardsInfo, (card) => {
        _push(ssrRenderComponent(_component_CustomCard, {
          key: card.title,
          title: card.title,
          icon: card.icon,
          subtitle: card.subtitle,
          content: card.content
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="mt-10"><h3 class="text-center font-semibold text-primary mt-3">Our Team</h3><p class="text-xl text-center m-0">Meet the team that makes it all possible.</p><div class="mt-6 px-5 grid grid-cols-1 gap-6 md:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(users), (user) => {
        _push(ssrRenderComponent(_component_CustomCard, {
          key: user.id,
          title: user.name,
          subtitle: user.email
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><div class="flex gap-3"${_scopeId}><div class="font-medium"${_scopeId}>Company</div><div class="text-gray-700"${_scopeId}>${ssrInterpolate(user.company.name)}</div></div><div class="flex gap-3"${_scopeId}><div class="font-medium"${_scopeId}>Phone</div><div class="text-gray-700"${_scopeId}>${ssrInterpolate(user.phone)}</div></div><div class="flex gap-3"${_scopeId}><div class="font-medium"${_scopeId}>Website</div><div class="text-gray-700"${_scopeId}>${ssrInterpolate(user.website)}</div></div></div>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "font-medium" }, "Company"),
                    createVNode("div", { class: "text-gray-700" }, toDisplayString(user.company.name), 1)
                  ]),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "font-medium" }, "Phone"),
                    createVNode("div", { class: "text-gray-700" }, toDisplayString(user.phone), 1)
                  ]),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "font-medium" }, "Website"),
                    createVNode("div", { class: "text-gray-700" }, toDisplayString(user.website), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div> ${ssrInterpolate(_ctx.data)}</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-DsrmdhxK.mjs.map
