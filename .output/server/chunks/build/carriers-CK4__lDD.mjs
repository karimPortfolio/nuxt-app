import { _ as _sfc_main$1 } from './CustomCard-D0K4LCSl.mjs';
import { withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFetch } from './fetch-97QprCh3.mjs';
import { u as useSeoMeta } from './server.mjs';
import '../_/QCardSection.mjs';
import '../_/use-dark.mjs';
import '../_/render.mjs';
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
      const _component_CustomCard = _sfc_main$1;
      _push(`<!--[--><div><h3 class="text-center font-semibold text-primary"> Welcome to the carriers page </h3><p class="text-xl text-center m-0"> This page contains information about our organization and its mission. </p></div><div class="grid grid-cols-4 px-6 gap-5 mt-10"><!--[-->`);
      ssrRenderList(unref(data), (job) => {
        _push(ssrRenderComponent(_component_CustomCard, {
          key: job.title,
          icon: "mdiBriefcase",
          title: job.title,
          subtitle: job.company,
          content: job.location
        }, null, _parent));
      });
      _push(`<!--]--></div><!--]-->`);
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
//# sourceMappingURL=carriers-CK4__lDD.mjs.map
