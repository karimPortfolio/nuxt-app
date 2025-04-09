import { markRaw, defineComponent, inject, unref, watch, getCurrentInstance, onMounted, onBeforeUnmount, h, withDirectives, ref, computed, reactive, provide, Transition, nextTick, onDeactivated, onBeforeUpdate, onActivated, hasInjectionContext, watchEffect, version, shallowReactive, Suspense, Fragment, createApp, defineAsyncComponent, toRef, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, effectScope, shallowRef, isReadonly, isRef, isShallow, isReactive, toRaw, mergeProps, withCtx, getCurrentScope, createTextVNode, createBlock, openBlock, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { i as createError$1, n as hasProtocol, o as isScriptProtocol, p as joinURL, w as withQuery, q as sanitizeStatusCode, v as getContext, $ as $fetch, x as createHooks, y as defuFn, z as toRouteMatcher, A as createRouter$1, B as defu, C as klona } from '../_/nitro.mjs';
import { b as baseURL, p as publicAssetsURL } from '../routes/renderer.mjs';
import { getActiveHead, CapoPlugin } from 'unhead';
import { unpackMeta, defineHeadPlugin, composableNames } from '@unhead/shared';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { PrismaClient } from '@prisma/client';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderSlot } from 'vue/server-renderer';

const lang = {
  isoName: 'en-US',
  nativeName: 'English (US)',
  label: {
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    set: 'Set',
    select: 'Select',
    reset: 'Reset',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh',
    expand: label => (label ? `Expand "${ label }"` : 'Expand'),
    collapse: label => (label ? `Collapse "${ label }"` : 'Collapse')
  },
  date: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: 'days'
  },
  table: {
    noData: 'No data available',
    noResults: 'No matching records found',
    loading: 'Loading...',
    selectedRecords: rows => (
      rows === 1
        ? '1 record selected.'
        : (rows === 0 ? 'No' : rows) + ' records selected.'
    ),
    recordsPerPage: 'Records per page:',
    allRows: 'All',
    pagination: (start, end, total) => start + '-' + end + ' of ' + total,
    columns: 'Columns'
  },
  editor: {
    url: 'URL',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    unorderedList: 'Unordered List',
    orderedList: 'Ordered List',
    subscript: 'Subscript',
    superscript: 'Superscript',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Toggle Fullscreen',
    quote: 'Quote',
    left: 'Left align',
    center: 'Center align',
    right: 'Right align',
    justify: 'Justify align',
    print: 'Print',
    outdent: 'Decrease indentation',
    indent: 'Increase indentation',
    removeFormat: 'Remove formatting',
    formatting: 'Formatting',
    fontSize: 'Font Size',
    align: 'Align',
    hr: 'Insert Horizontal Rule',
    undo: 'Undo',
    redo: 'Redo',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    heading4: 'Heading 4',
    heading5: 'Heading 5',
    heading6: 'Heading 6',
    paragraph: 'Paragraph',
    code: 'Code',
    size1: 'Very small',
    size2: 'A bit small',
    size3: 'Normal',
    size4: 'Medium-large',
    size5: 'Big',
    size6: 'Very big',
    size7: 'Maximum',
    defaultFont: 'Default Font',
    viewSource: 'View Source'
  },
  tree: {
    noNodes: 'No nodes available',
    noResults: 'No matching nodes found'
  }
};

const iconSet = {
  name: 'material-icons',
  type: {
    positive: 'check_circle',
    negative: 'warning',
    info: 'info',
    warning: 'priority_high'
  },
  arrow: {
    up: 'arrow_upward',
    right: 'arrow_forward',
    down: 'arrow_downward',
    left: 'arrow_back',
    dropdown: 'arrow_drop_down'
  },
  chevron: {
    left: 'chevron_left',
    right: 'chevron_right'
  },
  colorPicker: {
    spectrum: 'gradient',
    tune: 'tune',
    palette: 'style'
  },
  pullToRefresh: {
    icon: 'refresh'
  },
  carousel: {
    left: 'chevron_left',
    right: 'chevron_right',
    up: 'keyboard_arrow_up',
    down: 'keyboard_arrow_down',
    navigationIcon: 'lens'
  },
  chip: {
    remove: 'cancel',
    selected: 'check'
  },
  datetime: {
    arrowLeft: 'chevron_left',
    arrowRight: 'chevron_right',
    now: 'access_time',
    today: 'today'
  },
  editor: {
    bold: 'format_bold',
    italic: 'format_italic',
    strikethrough: 'strikethrough_s',
    underline: 'format_underlined',
    unorderedList: 'format_list_bulleted',
    orderedList: 'format_list_numbered',
    subscript: 'vertical_align_bottom',
    superscript: 'vertical_align_top',
    hyperlink: 'link',
    toggleFullscreen: 'fullscreen',
    quote: 'format_quote',
    left: 'format_align_left',
    center: 'format_align_center',
    right: 'format_align_right',
    justify: 'format_align_justify',
    print: 'print',
    outdent: 'format_indent_decrease',
    indent: 'format_indent_increase',
    removeFormat: 'format_clear',
    formatting: 'text_format',
    fontSize: 'format_size',
    align: 'format_align_left',
    hr: 'remove',
    undo: 'undo',
    redo: 'redo',
    heading: 'format_size',
    code: 'code',
    size: 'format_size',
    font: 'font_download',
    viewSource: 'code'
  },
  expansionItem: {
    icon: 'keyboard_arrow_down',
    denseIcon: 'arrow_drop_down'
  },
  fab: {
    icon: 'add',
    activeIcon: 'close'
  },
  field: {
    clear: 'cancel',
    error: 'error'
  },
  pagination: {
    first: 'first_page',
    prev: 'keyboard_arrow_left',
    next: 'keyboard_arrow_right',
    last: 'last_page'
  },
  rating: {
    icon: 'grade'
  },
  stepper: {
    done: 'check',
    active: 'edit',
    error: 'warning'
  },
  tabs: {
    left: 'chevron_left',
    right: 'chevron_right',
    up: 'keyboard_arrow_up',
    down: 'keyboard_arrow_down'
  },
  table: {
    arrowUp: 'arrow_upward',
    warning: 'warning',
    firstPage: 'first_page',
    prevPage: 'chevron_left',
    nextPage: 'chevron_right',
    lastPage: 'last_page'
  },
  tree: {
    icon: 'play_arrow'
  },
  uploader: {
    done: 'done',
    clear: 'clear',
    add: 'add_box',
    upload: 'cloud_upload',
    removeQueue: 'clear_all',
    removeUploaded: 'done_all'
  }
};

function injectProp (target, propName, get, set) {
  Object.defineProperty(target, propName, {
    get,
    set,
    enumerable: true
  });
  return target
}

/* eslint-disable no-useless-escape */


/**
 * __ QUASAR_SSR __            -> runs on SSR on client or server
 * __ QUASAR_SSR_SERVER __     -> runs on SSR on server
 * __ QUASAR_SSR_CLIENT __     -> runs on SSR on client
 * __ QUASAR_SSR_PWA __        -> built with SSR+PWA; may run on SSR on client or on PWA client
 *                              (needs runtime detection)
 */

const isRuntimeSsrPreHydration = { value: true }
  ;

function getMatch (userAgent, platformMatch) {
  const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent)
    || /(opr)[\/]([\w.]+)/.exec(userAgent)
    || /(vivaldi)[\/]([\w.]+)/.exec(userAgent)
    || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent)
    || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent)
    || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent)
    || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent)
    || /(webkit)[\/]([\w.]+)/.exec(userAgent)
    || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent)
    || [];

  return {
    browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || '',
    version: match[ 4 ] || match[ 2 ] || '0',
    platform: platformMatch[ 0 ] || ''
  }
}

function getPlatformMatch (userAgent) {
  return /(ipad)/.exec(userAgent)
    || /(ipod)/.exec(userAgent)
    || /(windows phone)/.exec(userAgent)
    || /(iphone)/.exec(userAgent)
    || /(kindle)/.exec(userAgent)
    || /(silk)/.exec(userAgent)
    || /(android)/.exec(userAgent)
    || /(win)/.exec(userAgent)
    || /(mac)/.exec(userAgent)
    || /(linux)/.exec(userAgent)
    || /(cros)/.exec(userAgent)
    // TODO: Remove BlackBerry detection. BlackBerry OS, BlackBerry 10, and BlackBerry PlayBook OS
    // is officially dead as of January 4, 2022 (https://www.blackberry.com/us/en/support/devices/end-of-life)
    || /(playbook)/.exec(userAgent)
    || /(bb)/.exec(userAgent)
    || /(blackberry)/.exec(userAgent)
    || []
}

function getPlatform (UA) {
  const userAgent = UA.toLowerCase();
  const platformMatch = getPlatformMatch(userAgent);
  const matched = getMatch(userAgent, platformMatch);
  const browser = {
    mobile: false,
    desktop: false,

    cordova: false,
    capacitor: false,
    nativeMobile: false,
    // nativeMobileWrapper: void 0,
    electron: false,
    bex: false,

    linux: false,
    mac: false,
    win: false,
    cros: false,

    chrome: false,
    firefox: false,
    opera: false,
    safari: false,
    vivaldi: false,
    edge: false,
    edgeChromium: false,
    ie: false,
    webkit: false,

    android: false,
    ios: false,
    ipad: false,
    iphone: false,
    ipod: false,
    kindle: false,
    winphone: false,
    blackberry: false,
    playbook: false,
    silk: false
  };

  if (matched.browser) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version, 10);
  }

  if (matched.platform) {
    browser[ matched.platform ] = true;
  }

  const knownMobiles = browser.android
    || browser.ios
    || browser.bb
    || browser.blackberry
    || browser.ipad
    || browser.iphone
    || browser.ipod
    || browser.kindle
    || browser.playbook
    || browser.silk
    || browser[ 'windows phone' ];

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (
    knownMobiles === true
    || userAgent.indexOf('mobile') !== -1
  ) {
    browser.mobile = true;
  }
  // If it's not mobile we should consider it's desktop platform, meaning it runs a desktop browser
  // It's a workaround for anonymized user agents
  // (browser.cros || browser.mac || browser.linux || browser.win)
  else {
    browser.desktop = true;
  }

  if (browser[ 'windows phone' ]) {
    browser.winphone = true;
    delete browser[ 'windows phone' ];
  }

  if (browser.edga || browser.edgios || browser.edg) {
    browser.edge = true;
    matched.browser = 'edge';
  }
  else if (browser.crios) {
    browser.chrome = true;
    matched.browser = 'chrome';
  }
  else if (browser.fxios) {
    browser.firefox = true;
    matched.browser = 'firefox';
  }

  // Set iOS if on iPod, iPad or iPhone
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }

  if (browser.vivaldi) {
    matched.browser = 'vivaldi';
    browser.vivaldi = true;
  }

  // TODO: The assumption about WebKit based browsers below is not completely accurate.
  // Google released Blink(a fork of WebKit) engine on April 3, 2013, which is really different than WebKit today.
  // Today, one might want to check for WebKit to deal with its bugs, which is used on all browsers on iOS, and Safari browser on all platforms.
  if (
    // Chrome, Opera 15+, Vivaldi and Safari are webkit based browsers
    browser.chrome
    || browser.opr
    || browser.safari
    || browser.vivaldi
    // we expect unknown, non iOS mobile browsers to be webkit based
    || (
      browser.mobile === true
      && browser.ios !== true
      && knownMobiles !== true
    )
  ) {
    browser.webkit = true;
  }

  // Opera 15+ are identified as opr
  if (browser.opr) {
    matched.browser = 'opera';
    browser.opera = true;
  }

  // Some browsers are marked as Safari but are not
  if (browser.safari) {
    if (browser.blackberry || browser.bb) {
      matched.browser = 'blackberry';
      browser.blackberry = true;
    }
    else if (browser.playbook) {
      matched.browser = 'playbook';
      browser.playbook = true;
    }
    else if (browser.android) {
      matched.browser = 'android';
      browser.android = true;
    }
    else if (browser.kindle) {
      matched.browser = 'kindle';
      browser.kindle = true;
    }
    else if (browser.silk) {
      matched.browser = 'silk';
      browser.silk = true;
    }
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;

  return browser
}

const ssrClient = {
  has: {
    touch: false,
    webStorage: false
  },
  within: { iframe: false }
};

// We export "client" for hydration error-free parts,
// like touch directives who do not (and must NOT) wait
// for the client takeover;
// Do NOT import this directly in your app, unless you really know
// what you are doing.
const client = ssrClient
  ;

const Platform = {
  install (opts) {
    const { $q } = opts;

    {
      $q.platform = this.parseSSR(opts.ssrContext);
    }
  }
};

{
  Platform.parseSSR = (ssrContext) => {
    const userAgent = ssrContext.req.headers[ 'user-agent' ] || ssrContext.req.headers[ 'User-Agent' ] || '';
    return {
      ...client,
      userAgent,
      is: getPlatform(userAgent)
    }
  };
}

function createComponent (raw) { return markRaw(defineComponent(raw)) }
function createDirective (raw) { return markRaw(raw) }

const createReactivePlugin = (state, plugin) => {
      Object.assign(plugin, state);
      return plugin
    }
  ;

const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
};

try {
  const opts = Object.defineProperty({}, 'passive', {
    get () {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      });
    }
  });
  window.addEventListener('qtest', null, opts);
  window.removeEventListener('qtest', null, opts);
}
catch (_) {}

function noop () {}

function position (e) {
  if (e.touches && e.touches[ 0 ]) {
    e = e.touches[ 0 ];
  }
  else if (e.changedTouches && e.changedTouches[ 0 ]) {
    e = e.changedTouches[ 0 ];
  }
  else if (e.targetTouches && e.targetTouches[ 0 ]) {
    e = e.targetTouches[ 0 ];
  }

  return {
    top: e.clientY,
    left: e.clientX
  }
}

function stop (e) {
  e.stopPropagation();
}

function prevent (e) {
  e.cancelable !== false && e.preventDefault();
}

function stopAndPrevent (e) {
  e.cancelable !== false && e.preventDefault();
  e.stopPropagation();
}

function addEvt (ctx, targetName, events) {
  const name = `__q_${ targetName }_evt`;

  ctx[ name ] = ctx[ name ] !== void 0
    ? ctx[ name ].concat(events)
    : events;

  events.forEach(evt => {
    evt[ 0 ].addEventListener(evt[ 1 ], ctx[ evt[ 2 ] ], listenOpts[ evt[ 3 ] ]);
  });
}

function cleanEvt (ctx, targetName) {
  const name = `__q_${ targetName }_evt`;

  if (ctx[ name ] !== void 0) {
    ctx[ name ].forEach(evt => {
      evt[ 0 ].removeEventListener(evt[ 1 ], ctx[ evt[ 2 ] ], listenOpts[ evt[ 3 ] ]);
    });
    ctx[ name ] = void 0;
  }
}

function debounce (fn, wait = 250, immediate) {
  let timer = null;

  function debounced (/* ...args */) {
    const args = arguments;

    const later = () => {
      timer = null;
      {
        fn.apply(this, args);
      }
    };

    if (timer !== null) {
      clearTimeout(timer);
    }
    else if (immediate === true) {
      fn.apply(this, args);
    }

    timer = setTimeout(later, wait);
  }

  debounced.cancel = () => {
    timer !== null && clearTimeout(timer);
  };

  return debounced
}

const { passive: passive$1 } = listenOpts;

const Screen = createReactivePlugin({
  width: 0,
  height: 0,
  name: 'xs',

  sizes: {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  },

  lt: {
    sm: true,
    md: true,
    lg: true,
    xl: true
  },
  gt: {
    xs: false,
    sm: false,
    md: false,
    lg: false
  },

  xs: true,
  sm: false,
  md: false,
  lg: false,
  xl: false
}, {
  setSizes: noop,
  setDebounce: noop,

  install ({ $q, onSSRHydrated }) {
    $q.screen = this;

    return
  }
});

const Plugin$2 = createReactivePlugin({
  isActive: false,
  mode: false
}, {
  __media: void 0,

  set (val) {
    return
  },

  toggle () {
  },

  install ({ $q, ssrContext }) {
    const { dark } = $q.config;

    {
      this.isActive = dark === true;

      $q.dark = {
        isActive: false,
        mode: false,
        set: val => {
          ssrContext._meta.bodyClasses = ssrContext._meta.bodyClasses
            .replace(' body--light', '')
            .replace(' body--dark', '') + ` body--${ val === true ? 'dark' : 'light' }`;

          $q.dark.isActive = val === true;
          $q.dark.mode = val;
        },
        toggle: () => {
          $q.dark.set($q.dark.isActive === false);
        }
      };

      $q.dark.set(dark);
      return
    }
  }
});

function shouldIgnoreKey (evt) {
  return evt !== Object(evt)
    || evt.isComposing === true
    || evt.qKeyEvent === true
}

function isKeyCode (evt, keyCodes) {
  return shouldIgnoreKey(evt) === true
    ? false
    : [].concat(keyCodes).includes(evt.keyCode)
}

function getMobilePlatform (is) {
  if (is.ios === true) return 'ios'
  if (is.android === true) return 'android'
}

function getBodyClasses ({ is, has, within }, cfg) {
  const cls = [
    is.desktop === true ? 'desktop' : 'mobile',
    `${ has.touch === false ? 'no-' : '' }touch`
  ];

  if (is.mobile === true) {
    const mobile = getMobilePlatform(is);
    mobile !== void 0 && cls.push('platform-' + mobile);
  }

  if (is.nativeMobile === true) {
    const type = is.nativeMobileWrapper;

    cls.push(type);
    cls.push('native-mobile');

    if (
      is.ios === true
      && (cfg[ type ] === void 0 || cfg[ type ].iosStatusBarPadding !== false)
    ) {
      cls.push('q-ios-padding');
    }
  }
  else if (is.electron === true) {
    cls.push('electron');
  }
  else if (is.bex === true) {
    cls.push('bex');
  }

  within.iframe === true && cls.push('within-iframe');

  return cls
}

const Body = {
  install (opts) {
    {
      const { $q, ssrContext } = opts;
      const cls = getBodyClasses($q.platform, $q.config);

      if ($q.config.screen !== void 0 && $q.config.screen.bodyClass === true) {
        cls.push('screen--xs');
      }

      ssrContext._meta.bodyClasses += cls.join(' ');

      const brand = $q.config.brand;
      if (brand !== void 0) {
        const vars = Object.keys(brand)
          .map(key => `--q-${ key }:${ brand[ key ] };`)
          .join('');

        ssrContext._meta.endingHeadTags += `<style>:root{${ vars }}</style>`;
      }

      return
    }
  }
};

const History = {
  __history: [],
  add: noop,
  remove: noop,

  install ({ $q }) {
    return
  }
};

function getLocale () {
  return
}

const Plugin$1 = createReactivePlugin({
  __qLang: {}
}, {
  // props: object
  // __langConfig: object

  getLocale,

  set (langObject = lang, ssrContext) {
    const lang = {
      ...langObject,
      rtl: langObject.rtl === true,
      getLocale
    };

    {
      if (ssrContext === void 0) {
        console.error('SSR ERROR: second param required: Lang.set(lang, ssrContext)');
        return
      }

      lang.set = ssrContext.$q.lang.set;

      if (ssrContext.$q.config.lang === void 0 || ssrContext.$q.config.lang.noHtmlAttrs !== true) {
        const dir = lang.rtl === true ? 'rtl' : 'ltr';
        const attrs = `lang=${ lang.isoName } dir=${ dir }`;

        ssrContext._meta.htmlAttrs = ssrContext.__qPrevLang !== void 0
          ? ssrContext._meta.htmlAttrs.replace(ssrContext.__qPrevLang, attrs)
          : attrs;

        ssrContext.__qPrevLang = attrs;
      }

      ssrContext.$q.lang = lang;
    }
  },

  install ({ $q, lang: lang$1, ssrContext }) {
    {
      const initialLang = lang$1 || lang;

      $q.lang = {};
      $q.lang.set = langObject => {
        this.set(langObject, ssrContext);
      };

      $q.lang.set(initialLang);

      // one-time SSR server operation
      if (
        this.props === void 0
        || this.props.isoName !== initialLang.isoName
      ) {
        this.props = { ...initialLang };
      }
    }
  }
});

const Plugin = createReactivePlugin({
  iconMapFn: null,
  __qIconSet: {}
}, {
  // props: object

  set (setObject, ssrContext) {
    const def = { ...setObject };

    {
      if (ssrContext === void 0) {
        console.error('SSR ERROR: second param required: IconSet.set(iconSet, ssrContext)');
        return
      }

      def.set = ssrContext.$q.iconSet.set;
      Object.assign(ssrContext.$q.iconSet, def);
    }
  },

  install ({ $q, iconSet: iconSet$1, ssrContext }) {
    {
      const initialSet = iconSet$1 || iconSet;

      $q.iconMapFn = ssrContext.$q.config.iconMapFn || this.iconMapFn || null;
      $q.iconSet = {};
      $q.iconSet.set = setObject => {
        this.set(setObject, ssrContext);
      };

      $q.iconSet.set(initialSet);

      // one-time SSR server operation
      if (
        this.props === void 0
        || this.props.name !== initialSet.name
      ) {
        this.props = { ...initialSet };
      }
    }
  }
});

const quasarKey = '_q_';
const layoutKey = '_q_l_';
const pageContainerKey = '_q_pc_';
const formKey = '_q_fo_';

function emptyRenderFn () {}

// not perfect, but what we ARE interested is for Arrays not to slip in
// as spread operator will mess things up in various areas
function isObject (v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) !== true
}

/**
 * If the list below changes, make sure
 * to also edit /ui/testing/specs/generators/generator.plugin.js
 * on the "autoInstalledPlugins" array
 */
const autoInstalledPlugins = [
  Platform,
  Body,
  Plugin$2,
  Screen,
  History,
  Plugin$1,
  Plugin
];

function installPlugins (pluginOpts, pluginList) {
  pluginList.forEach(Plugin => {
    Plugin.install(pluginOpts);
    Plugin.__installed = true;
  });
}

function prepareApp (app, uiOpts, pluginOpts) {
  app.config.globalProperties.$q = pluginOpts.$q;
  app.provide(quasarKey, pluginOpts.$q);

  installPlugins(pluginOpts, autoInstalledPlugins);

  uiOpts.components !== void 0 && Object.values(uiOpts.components).forEach(c => {
    if (isObject(c) === true && c.name !== void 0) {
      app.component(c.name, c);
    }
  });

  uiOpts.directives !== void 0 && Object.values(uiOpts.directives).forEach(d => {
    if (isObject(d) === true && d.name !== void 0) {
      app.directive(d.name, d);
    }
  });

  uiOpts.plugins !== void 0 && installPlugins(
    pluginOpts,
    Object.values(uiOpts.plugins).filter(
      p => typeof p.install === 'function' && autoInstalledPlugins.includes(p) === false
    )
  );

  if (isRuntimeSsrPreHydration.value === true) {
    pluginOpts.$q.onSSRHydrated = () => {
      pluginOpts.onSSRHydrated.forEach(fn => { fn(); });
      pluginOpts.$q.onSSRHydrated = () => {};
    };
  }
}

const installQuasar = function (parentApp, opts = {}, ssrContext) {
    const $q = {
      version: '2.17.7',
      config: opts.config || {}
    };

    Object.assign(ssrContext, {
      $q,
      _meta: {
        htmlAttrs: '',
        headTags: '',
        endingHeadTags: '',
        bodyClasses: '',
        bodyAttrs: 'data-server-rendered',
        bodyTags: ''
      }
    });

    if (ssrContext._modules === void 0) {
      // not OK. means the SSR build is not using @quasar/ssr-helpers,
      // but we shouldn't crash the app
      ssrContext._modules = [];
    }

    if (ssrContext.onRendered === void 0) {
      // not OK. means the SSR build is not using @quasar/ssr-helpers,
      // but we shouldn't crash the app
      ssrContext.onRendered = () => {};
    }

    parentApp.config.globalProperties.ssrContext = ssrContext;

    prepareApp(parentApp, opts, {
      parentApp,
      $q,
      lang: opts.lang,
      iconSet: opts.iconSet,
      ssrContext
    });
  }

const Quasar = {
  name: 'Quasar',
  version: '2.17.7',

  install: installQuasar,

  // TODO: remove in Qv3 (should only be used through the plugin)
  // We provide a deprecated fallback here
  lang: Plugin$1,

  // TODO: remove in Qv3 (should only be used through the plugin)
  // We provide a deprecated fallback here
  iconSet: Plugin
};

/**
 * Returns the $q instance.
 * Equivalent to `this.$q` inside templates.
 */
function useQuasar () {
  return inject(quasarKey)
}

function css (element, css) {
  const style = element.style;

  for (const prop in css) {
    style[ prop ] = css[ prop ];
  }
}

// internal
function getElement (el) {
  if (el === void 0 || el === null) {
    return void 0
  }

  if (typeof el === 'string') {
    try {
      return document.querySelector(el) || void 0
    }
    catch (err) {
      return void 0
    }
  }

  const target = unref(el);
  if (target) {
    return target.$el || target
  }
}

// internal
function childHasFocus (el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true
  }

  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true
    }
  }

  return false
}

const scrollTargetProp = {} /* SSR does not know about Element */
  ;

const scrollTargets = []
  ;

function getScrollTarget (el, targetEl) {
  let target = getElement(targetEl);

  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window
    }

    target = el.closest('.scroll,.scroll-y,.overflow-auto');
  }

  return scrollTargets.includes(target)
    ? window
    : target
}

function getVerticalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : scrollTarget.scrollTop
}

function getHorizontalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : scrollTarget.scrollLeft
}

let size;
function getScrollbarWidth () {
  if (size !== undefined) {
    return size
  }

  const
    inner = document.createElement('p'),
    outer = document.createElement('div');

  css(inner, {
    width: '100%',
    height: '200px'
  });
  css(outer, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  outer.remove();
  size = w1 - w2;

  return size
}

const { passive } = listenOpts;
const axisValues = [ 'both', 'horizontal', 'vertical' ];

const QScrollObserver = createComponent({
  name: 'QScrollObserver',

  props: {
    axis: {
      type: String,
      validator: v => axisValues.includes(v),
      default: 'vertical'
    },

    debounce: [ String, Number ],

    scrollTarget: scrollTargetProp
  },

  emits: [ 'scroll' ],

  setup (props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },

      direction: 'down',
      directionChanged: false,

      delta: {
        top: 0,
        left: 0
      },

      inflectionPoint: {
        top: 0,
        left: 0
      }
    };

    let clearTimer = null, localScrollTarget, parentEl;

    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });

    function emitEvent () {
      clearTimer !== null && clearTimer();

      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);

      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };

      if (
        (props.axis === 'vertical' && delta.top === 0)
        || (props.axis === 'horizontal' && delta.left === 0)
      ) return

      const curDir = Math.abs(delta.top) >= Math.abs(delta.left)
        ? (delta.top < 0 ? 'up' : 'down')
        : (delta.left < 0 ? 'left' : 'right');

      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;

      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }

      emit('scroll', { ...scroll });
    }

    function configureScrollTarget () {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener('scroll', trigger, passive);
      trigger(true);
    }

    function unconfigureScrollTarget () {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener('scroll', trigger, passive);
        localScrollTarget = void 0;
      }
    }

    function trigger (immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === '0') {
        emitEvent();
      }
      else if (clearTimer === null) {
        const [ timer, fn ] = props.debounce
          ? [ setTimeout(emitEvent, props.debounce), clearTimeout ]
          : [ requestAnimationFrame(emitEvent), cancelAnimationFrame ];

        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }

    const { proxy } = getCurrentInstance();

    watch(() => proxy.$q.lang.rtl, emitEvent);

    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });

    onBeforeUnmount(() => {
      clearTimer !== null && clearTimer();
      unconfigureScrollTarget();
    });

    // expose public methods
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });

    return noop
  }
});

const QResizeObserver = createComponent({
  name: 'QResizeObserver',

  props: {
    debounce: {
      type: [ String, Number ],
      default: 100
    }
  },

  emits: [ 'resize' ],

  setup (props, { emit }) {
    { return noop }
  }
});

function hSlot (slot, otherwise) {
  return slot !== void 0
    ? slot() || otherwise
    : otherwise
}

function hUniqueSlot (slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice()
    }
  }

  return otherwise
}

/**
 * Source definitely exists,
 * so it's merged with the possible slot
 */
function hMergeSlot (slot, source) {
  return slot !== void 0
    ? source.concat(slot())
    : source
}

/**
 * Merge with possible slot,
 * even if source might not exist
 */
function hMergeSlotSafely (slot, source) {
  if (slot === void 0) {
    return source
  }

  return source !== void 0
    ? source.concat(slot())
    : slot()
}

/*
 * (String)  key       - unique vnode key
 * (Boolean) condition - should change ONLY when adding/removing directive
 */
function hDir (
  tag,
  data,
  children,
  key,
  condition,
  getDirsFn
) {
  data.key = key + condition;

  const vnode = h(tag, data, children);

  return condition === true
    ? withDirectives(vnode, getDirsFn())
    : vnode
}

const __nuxt_component_0$2 = createComponent({
  name: 'QLayout',

  props: {
    container: Boolean,
    view: {
      type: String,
      default: 'hhh lpr fff',
      validator: v => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },

    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const rootRef = ref(null);

    // page related
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: 'down', inflectionPoint: 0 });

    // container only prop
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());

    const classes = computed(() =>
      'q-layout q-layout--'
      + (props.container === true ? 'containerized' : 'standard')
    );

    const style = computed(() => (
      props.container === false
        ? { minHeight: $q.screen.height + 'px' }
        : null
    ));

    // used by container only
    const targetStyle = computed(() => (
      scrollbarWidth.value !== 0
        ? { [ $q.lang.rtl === true ? 'left' : 'right' ]: `${ scrollbarWidth.value }px` }
        : null
    ));

    const targetChildStyle = computed(() => (
      scrollbarWidth.value !== 0
        ? {
            [ $q.lang.rtl === true ? 'right' : 'left' ]: 0,
            [ $q.lang.rtl === true ? 'left' : 'right' ]: `-${ scrollbarWidth.value }px`,
            width: `calc(100% + ${ scrollbarWidth.value }px)`
          }
        : null
    ));

    function onPageScroll (data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };

        scroll.value = info;
        props.onScroll !== void 0 && emit('scroll', info);
      }
    }

    function onPageResize (data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;

      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit('scrollHeight', newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }

      if (resized === true && props.onResize !== void 0) {
        emit('resize', data);
      }
    }

    function onContainerResize ({ height }) {
      if (containerHeight.value !== height) {
        containerHeight.value = height;
        updateScrollbarWidth();
      }
    }

    function updateScrollbarWidth () {
      if (props.container === true) {
        const width = height.value > containerHeight.value
          ? getScrollbarWidth()
          : 0;

        if (scrollbarWidth.value !== width) {
          scrollbarWidth.value = width;
        }
      }
    }

    let animateTimer = null;

    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),

      rootRef,

      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),

      rows: computed(() => {
        const rows = props.view.toLowerCase().split(' ');
        return {
          top: rows[ 0 ].split(''),
          middle: rows[ 1 ].split(''),
          bottom: rows[ 2 ].split('')
        }
      }),

      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),

      scroll,

      animate () {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        }
        else {
          document.body.classList.add('q-body--layout-animate');
        }

        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove('q-body--layout-animate');
        }, 155);
      },

      update (part, prop, val) {
        $layout[ part ][ prop ] = val;
      }
    };

    provide(layoutKey, $layout);

    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);

      const layout = h('div', {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);

      if (props.container === true) {
        return h('div', {
          class: 'q-layout-container overflow-hidden',
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h('div', {
            class: 'absolute-full',
            style: targetStyle.value
          }, [
            h('div', {
              class: 'scroll',
              style: targetChildStyle.value
            }, [ layout ])
          ])
        ])
      }

      return layout
    }
  }
});

const __nuxt_component_1 = createComponent({
  name: 'QPageContainer',

  setup (_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QPageContainer needs to be child of QLayout');
      return emptyRenderFn
    }

    provide(pageContainerKey, true);

    const style = computed(() => {
      const css = {};

      if ($layout.header.space === true) {
        css.paddingTop = `${ $layout.header.size }px`;
      }
      if ($layout.right.space === true) {
        css[ `padding${ $q.lang.rtl === true ? 'Left' : 'Right' }` ] = `${ $layout.right.size }px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${ $layout.footer.size }px`;
      }
      if ($layout.left.space === true) {
        css[ `padding${ $q.lang.rtl === true ? 'Right' : 'Left' }` ] = `${ $layout.left.size }px`;
      }

      return css
    });

    return () => h('div', {
      class: 'q-page-container',
      style: style.value
    }, hSlot(slots.default))
  }
});

const __nuxt_component_2$1 = createComponent({
  name: 'QHeader',

  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,

    heightHint: {
      type: [ String, Number ],
      default: 50
    }
  },

  emits: [ 'reveal', 'focusin' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QHeader needs to be child of QLayout');
      return emptyRenderFn
    }

    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);

    const fixed = computed(() =>
      props.reveal === true
      || $layout.view.value.indexOf('H') !== -1
      || ($q.platform.is.ios && $layout.isContainer.value === true)
    );

    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0
      }
      const offset = size.value - $layout.scroll.value.position;
      return offset > 0 ? offset : 0
    });

    const hidden = computed(() => props.modelValue !== true
      || (fixed.value === true && revealed.value !== true)
    );

    const revealOnFocus = computed(() =>
      props.modelValue === true && hidden.value === true && props.reveal === true
    );

    const classes = computed(() =>
      'q-header q-layout__section--marginal '
      + (fixed.value === true ? 'fixed' : 'absolute') + '-top'
      + (props.bordered === true ? ' q-header--bordered' : '')
      + (hidden.value === true ? ' q-header--hidden' : '')
      + (props.modelValue !== true ? ' q-layout--prevent-focus' : '')
    );

    const style = computed(() => {
      const
        view = $layout.rows.value.top,
        css = {};

      if (view[ 0 ] === 'l' && $layout.left.space === true) {
        css[ $q.lang.rtl === true ? 'right' : 'left' ] = `${ $layout.left.size }px`;
      }
      if (view[ 2 ] === 'r' && $layout.right.space === true) {
        css[ $q.lang.rtl === true ? 'left' : 'right' ] = `${ $layout.right.size }px`;
      }

      return css
    });

    function updateLayout (prop, val) {
      $layout.update('header', prop, val);
    }

    function updateLocal (prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }

    function onResize ({ height }) {
      updateLocal(size, height);
      updateLayout('size', height);
    }

    function onFocusin (evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }

      emit('focusin', evt);
    }

    watch(() => props.modelValue, val => {
      updateLayout('space', val);
      updateLocal(revealed, true);
      $layout.animate();
    });

    watch(offset, val => {
      updateLayout('offset', val);
    });

    watch(() => props.reveal, val => {
      val === false && updateLocal(revealed, props.modelValue);
    });

    watch(revealed, val => {
      $layout.animate();
      emit('reveal', val);
    });

    watch($layout.scroll, scroll => {
      props.reveal === true && updateLocal(revealed,
        scroll.direction === 'up'
        || scroll.position <= props.revealOffset
        || scroll.position - scroll.inflectionPoint < 100
      );
    });

    const instance = {};

    $layout.instances.header = instance;
    props.modelValue === true && updateLayout('size', size.value);
    updateLayout('space', props.modelValue);
    updateLayout('offset', offset.value);

    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout('size', 0);
        updateLayout('offset', 0);
        updateLayout('space', false);
      }
    });

    return () => {
      const child = hUniqueSlot(slots.default, []);

      props.elevated === true && child.push(
        h('div', {
          class: 'q-layout__shadow absolute-full overflow-hidden no-pointer-events'
        })
      );

      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );

      return h('header', {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child)
    }
  }
});

const __nuxt_component_3 = createComponent({
  name: 'QToolbar',

  props: {
    inset: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-toolbar row no-wrap items-center'
      + (props.inset === true ? ' q-toolbar--inset' : '')
    );

    return () => h('div', { class: classes.value, role: 'toolbar' }, hSlot(slots.default))
  }
});

const __nuxt_component_4 = createComponent({
  name: 'QToolbarTitle',

  props: {
    shrink: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-toolbar__title ellipsis'
      + (props.shrink === true ? ' col-shrink' : '')
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_5 = createComponent({
  name: 'QSpace',

  setup () {
    const space = h('div', { class: 'q-space' });
    return () => space
  }
});

const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};

const useSizeProps = {
  size: String
};

function useSize (props, sizes = useSizeDefaults) {
  // return sizeStyle
  return computed(() => (
    props.size !== void 0
      ? { fontSize: props.size in sizes ? `${ sizes[ props.size ] }px` : props.size }
      : null
  ))
}

const defaultViewBox = '0 0 24 24';

const sameFn = i => i;
const ionFn = i => `ionicons ${ i }`;

const libMap = {
  'mdi-': i => `mdi ${ i }`,
  'icon-': sameFn, // fontawesome equiv
  'bt-': i => `bt ${ i }`,
  'eva-': i => `eva ${ i }`,
  'ion-md': ionFn,
  'ion-ios': ionFn,
  'ion-logo': ionFn,
  'iconfont ': sameFn,
  'ti-': i => `themify-icon ${ i }`,
  'bi-': i => `bootstrap-icons ${ i }`
};

const matMap = {
  o_: '-outlined',
  r_: '-round',
  s_: '-sharp'
};

const symMap = {
  sym_o_: '-outlined',
  sym_r_: '-rounded',
  sym_s_: '-sharp'
};

const libRE = new RegExp('^(' + Object.keys(libMap).join('|') + ')');
const matRE = new RegExp('^(' + Object.keys(matMap).join('|') + ')');
const symRE = new RegExp('^(' + Object.keys(symMap).join('|') + ')');
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;

const __nuxt_component_2 = createComponent({
  name: 'QIcon',

  props: {
    ...useSizeProps,

    tag: {
      type: String,
      default: 'i'
    },

    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },

  setup (props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);

    const classes = computed(() =>
      'q-icon'
      + (props.left === true ? ' on-left' : '') // TODO Qv3: drop this
      + (props.right === true ? ' on-right' : '')
      + (props.color !== void 0 ? ` text-${ props.color }` : '')
    );

    const type = computed(() => {
      let cls;
      let icon = props.name;

      if (icon === 'none' || !icon) {
        return { none: true }
      }

      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === 'none' || !icon) {
              return { none: true }
            }
          }
          else {
            return {
              cls: res.cls,
              content: res.content !== void 0
                ? res.content
                : ' '
            }
          }
        }
      }

      if (mRE.test(icon) === true) {
        const [ def, viewBox = defaultViewBox ] = icon.split('|');

        return {
          svg: true,
          viewBox,
          nodes: def.split('&&').map(path => {
            const [ d, style, transform ] = path.split('@@');
            return h('path', { style, d, transform })
          })
        }
      }

      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        }
      }

      if (svgUseRE.test(icon) === true) {
        const [ def, viewBox = defaultViewBox ] = icon.split('|');

        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        }
      }

      let content = ' ';
      const matches = icon.match(libRE);

      if (matches !== null) {
        cls = libMap[ matches[ 1 ] ](icon);
      }
      else if (faRE.test(icon) === true) {
        cls = icon;
      }
      else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${ $q.platform.is.ios === true ? 'ios' : 'md' }${ icon.substring(3) }`;
      }
      else if (symRE.test(icon) === true) {
        // "notranslate" class is for Google Translate
        // to avoid tampering with Material Symbols ligature font
        //
        // Caution: To be able to add suffix to the class name,
        // keep the 'material-symbols' at the end of the string.
        cls = 'notranslate material-symbols';

        const matches = icon.match(symRE);
        if (matches !== null) {
          icon = icon.substring(6);
          cls += symMap[ matches[ 1 ] ];
        }

        content = icon;
      }
      else {
        // "notranslate" class is for Google Translate
        // to avoid tampering with Material Icons ligature font
        //
        // Caution: To be able to add suffix to the class name,
        // keep the 'material-icons' at the end of the string.
        cls = 'notranslate material-icons';

        const matches = icon.match(matRE);
        if (matches !== null) {
          icon = icon.substring(2);
          cls += matMap[ matches[ 1 ] ];
        }

        content = icon;
      }

      return {
        cls,
        content
      }
    });

    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        'aria-hidden': 'true',
        role: 'presentation'
      };

      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default))
      }

      if (type.value.img === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('img', { src: type.value.src })
        ]))
      }

      if (type.value.svg === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('svg', {
            viewBox: type.value.viewBox || '0 0 24 24'
          }, type.value.nodes)
        ]))
      }

      if (type.value.svguse === true) {
        return h(props.tag, data, hMergeSlot(slots.default, [
          h('svg', {
            viewBox: type.value.viewBox
          }, [
            h('use', { 'xlink:href': type.value.src })
          ])
        ]))
      }

      if (type.value.cls !== void 0) {
        data.class += ' ' + type.value.cls;
      }

      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]))
    }
  }
});

const useSpinnerProps = {
  size: {
    type: [ String, Number ],
    default: '1em'
  },
  color: String
};

function useSpinner (props) {
  return {
    cSize: computed(() => (
      props.size in useSizeDefaults
        ? `${ useSizeDefaults[ props.size ] }px`
        : props.size
    )),

    classes: computed(() =>
      'q-spinner' + (props.color ? ` text-${ props.color }` : '')
    )
  }
}

const QSpinner = createComponent({
  name: 'QSpinner',

  props: {
    ...useSpinnerProps,

    thickness: {
      type: Number,
      default: 5
    }
  },

  setup (props) {
    const { cSize, classes } = useSpinner(props);

    return () => h('svg', {
      class: classes.value + ' q-spinner-mat',
      width: cSize.value,
      height: cSize.value,
      viewBox: '25 25 50 50'
    }, [
      h('circle', {
        class: 'path',
        cx: '50',
        cy: '50',
        r: '20',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': props.thickness,
        'stroke-miterlimit': '10'
      })
    ])
  }
});

const getSSRProps = () => ({});

const __q_directive_0 = createDirective({ name: 'ripple', getSSRProps }
  
);

const alignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
  between: 'between',
  around: 'around',
  evenly: 'evenly',
  stretch: 'stretch'
};

const alignValues = Object.keys(alignMap);

const useAlignProps = {
  align: {
    type: String,
    validator: v => alignValues.includes(v)
  }
};

function useAlign (props) {
  // return alignClass
  return computed(() => {
    const align = props.align === void 0
      ? props.vertical === true ? 'stretch' : 'left'
      : props.align;

    return `${ props.vertical === true ? 'items' : 'justify' }-${ alignMap[ align ] }`
  })
}

// copied to docs too
function getParentProxy (proxy) {
  if (Object(proxy.$parent) === proxy.$parent) {
    return proxy.$parent
  }

  let { parent } = proxy.$;

  while (Object(parent) === parent) {
    if (Object(parent.proxy) === parent.proxy) {
      return parent.proxy
    }

    parent = parent.parent;
  }
}

function vmHasRouter (vm) {
  return vm.appContext.config.globalProperties.$router !== void 0
}

function vmIsDestroyed (vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true
}

/*
 * Inspired by RouterLink from Vue Router
 *  --> API should match!
 */


// Get the original path value of a record by following its aliasOf
function getOriginalPath (record) {
  return record
    ? (
        record.aliasOf
          ? record.aliasOf.path
          : record.path
      ) : ''
}

function isSameRouteRecord (a, b) {
  // since the original record has an undefined value for aliasOf
  // but all aliases point to the original record, this will always compare
  // the original record
  return (a.aliasOf || a) === (b.aliasOf || b)
}

function includesParams (outer, inner) {
  for (const key in inner) {
    const
      innerValue = inner[ key ],
      outerValue = outer[ key ];

    if (typeof innerValue === 'string') {
      if (innerValue !== outerValue) {
        return false
      }
    }
    else if (
      Array.isArray(outerValue) === false
      || outerValue.length !== innerValue.length
      || innerValue.some((value, i) => value !== outerValue[ i ])
    ) {
      return false
    }
  }

  return true
}

function isEquivalentArray (a, b) {
  return Array.isArray(b) === true
    ? a.length === b.length && a.every((value, i) => value === b[ i ])
    : a.length === 1 && a[ 0 ] === b
}

function isSameRouteLocationParamsValue (a, b) {
  return Array.isArray(a) === true
    ? isEquivalentArray(a, b)
    : (
        Array.isArray(b) === true
          ? isEquivalentArray(b, a)
          : a === b
      )
}

function isSameRouteLocationParams (a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[ key ], b[ key ]) === false) {
      return false
    }
  }

  return true
}

const useRouterLinkNonMatchingProps = {
  // router-link
  to: [ String, Object ],
  replace: Boolean,

  // regular <a> link
  href: String,
  target: String,

  // state
  disable: Boolean
};

const useRouterLinkProps = {
  ...useRouterLinkNonMatchingProps,

  // router-link
  exact: Boolean,
  activeClass: {
    type: String,
    default: 'q-router-link--active'
  },
  exactActiveClass: {
    type: String,
    default: 'q-router-link--exact-active'
  }
};

// external props: type, tag

function useRouterLink ({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;

  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);

  // for perf reasons, we use minimum amount of runtime work
  const hasRouterLinkProps = useDisableForRouterLinkProps === true
    ? computed(() =>
      hasRouter === true
      && props.disable !== true
      && hasHrefLink.value !== true
      && props.to !== void 0 && props.to !== null && props.to !== ''
    )
    : computed(() =>
      hasRouter === true
      && hasHrefLink.value !== true
      && props.to !== void 0 && props.to !== null && props.to !== ''
    );

  const resolvedLink = computed(() => (
    hasRouterLinkProps.value === true
      ? getLink(props.to)
      : null
  ));

  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);

  const linkTag = computed(() => (
    props.type === 'a' || hasLink.value === true
      ? 'a'
      : (props.tag || fallbackTag || 'div')
  ));

  const linkAttrs = computed(() => (
    hasHrefLink.value === true
      ? {
          href: props.href,
          target: props.target
        }
      : (
          hasRouterLink.value === true
            ? {
                href: resolvedLink.value.href,
                target: props.target
              }
            : {}
        )
  ));

  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1
    }

    const
      { matched } = resolvedLink.value,
      { length } = matched,
      routeMatched = matched[ length - 1 ];

    if (routeMatched === void 0) {
      return -1
    }

    const currentMatched = proxy.$route.matched;

    if (currentMatched.length === 0) {
      return -1
    }

    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );

    if (index !== -1) {
      return index
    }

    // possible parent record
    const parentRecordPath = getOriginalPath(matched[ length - 2 ]);

    return (
      // we are dealing with nested routes
      length > 1
      // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      && getOriginalPath(routeMatched) === parentRecordPath
      // avoid comparing the child with its parent
      && currentMatched[ currentMatched.length - 1 ].path !== parentRecordPath
        ? currentMatched.findIndex(
          isSameRouteRecord.bind(null, matched[ length - 2 ])
        )
        : index
    )
  });

  const linkIsActive = computed(() =>
    hasRouterLink.value === true
    && linkActiveIndex.value !== -1
    && includesParams(proxy.$route.params, resolvedLink.value.params)
  );

  const linkIsExactActive = computed(() =>
    linkIsActive.value === true
      && linkActiveIndex.value === proxy.$route.matched.length - 1
      && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );

  const linkClass = computed(() => (
    hasRouterLink.value === true
      ? (
          linkIsExactActive.value === true
            ? ` ${ props.exactActiveClass } ${ props.activeClass }`
            : (
                props.exact === true
                  ? ''
                  : (linkIsActive.value === true ? ` ${ props.activeClass }` : '')
              )
        )
      : ''
  ));

  function getLink (to) {
    try { return proxy.$router.resolve(to) }
    catch (_) {}

    return null
  }

  /**
   * @returns Promise<RouterError | false | undefined>
   */
  function navigateToRouterLink (
    e,
    { returnRouterError, to = props.to, replace = props.replace } = {}
  ) {
    if (props.disable === true) {
      // ensure native navigation is prevented in all cases,
      // like when useDisableForRouterLinkProps === false (QRouteTab)
      e.preventDefault();
      return Promise.resolve(false)
    }

    if (
      // don't redirect with control keys;
      // should match RouterLink from Vue Router
      e.metaKey || e.altKey || e.ctrlKey || e.shiftKey

      // don't redirect on right click
      || (e.button !== void 0 && e.button !== 0)

      // don't redirect if it should open in a new window
      || props.target === '_blank'
    ) {
      return Promise.resolve(false)
    }

    // hinder the native navigation
    e.preventDefault();

    // then() can also return a "soft" router error (Vue Router behavior)
    const promise = proxy.$router[ replace === true ? 'replace' : 'push' ](to);

    return returnRouterError === true
      ? promise
      // else catching hard errors and also "soft" ones - then(err => ...)
      : promise.then(() => {}).catch(() => {})
  }

  // warning! ensure that the component using it has 'click' included in its 'emits' definition prop
  function navigateOnClick (e) {
    if (hasRouterLink.value === true) {
      const go = opts => navigateToRouterLink(e, opts);

      emit('click', e, go);
      e.defaultPrevented !== true && go();
    }
    else {
      emit('click', e);
    }
  }

  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,

    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,

    getLink,
    navigateToRouterLink,
    navigateOnClick
  }
}

const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};

const formTypes = [ 'button', 'submit', 'reset' ];
const mediaTypeRE = /[^\s]\/[^\s]/;

const btnDesignOptions = [ 'flat', 'outline', 'push', 'unelevated' ];

function getBtnDesign (props, defaultValue) {
  if (props.flat === true) return 'flat'
  if (props.outline === true) return 'outline'
  if (props.push === true) return 'push'
  if (props.unelevated === true) return 'unelevated'
  return defaultValue
}

function getBtnDesignAttr (props) {
  const design = getBtnDesign(props);
  return design !== void 0
    ? { [ design ]: true }
    : {}
}

const nonRoundBtnProps = {
  ...useSizeProps,
  ...useRouterLinkNonMatchingProps,

  type: {
    type: String,
    default: 'button'
  },

  label: [ Number, String ],
  icon: String,
  iconRight: String,

  ...btnDesignOptions.reduce(
    (acc, val) => (acc[ val ] = Boolean) && acc,
    {}
  ),

  square: Boolean,
  rounded: Boolean,
  glossy: Boolean,

  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,

  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,

  tabindex: [ Number, String ],

  ripple: {
    type: [ Boolean, Object ],
    default: true
  },

  align: {
    ...useAlignProps.align,
    default: 'center'
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};

const useBtnProps = {
  ...nonRoundBtnProps,
  round: Boolean
};

function useBtn (props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: 'button'
  });

  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false
      ? sizeStyle.value
      : {};

    return props.padding !== void 0
      ? Object.assign({}, obj, {
        padding: props.padding
          .split(/\s+/)
          .map(v => (v in btnPadding ? btnPadding[ v ] + 'px' : v))
          .join(' '),
        minWidth: '0',
        minHeight: '0'
      })
      : obj
  });

  const isRounded = computed(() =>
    props.rounded === true || props.fab === true || props.fabMini === true
  );

  const isActionable = computed(() =>
    props.disable !== true && props.loading !== true
  );

  const tabIndex = computed(() => (
    isActionable.value === true ? props.tabindex || 0 : -1
  ));

  const design = computed(() => getBtnDesign(props, 'standard'));

  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };

    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    }
    else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }

    if (linkTag.value === 'a') {
      if (props.disable === true) {
        acc[ 'aria-disabled' ] = 'true';
      }
      else if (acc.href === void 0) {
        acc.role = 'button';
      }

      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    }
    else if (props.disable === true) {
      acc.disabled = '';
      acc[ 'aria-disabled' ] = 'true';
    }

    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': props.percentage
      });
    }

    return acc
  });

  const classes = computed(() => {
    let colors;

    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${ props.textColor || props.color }`;
      }
      else {
        colors = `bg-${ props.color } text-${ props.textColor || 'white' }`;
      }
    }
    else if (props.textColor) {
      colors = `text-${ props.textColor }`;
    }

    const shape = props.round === true
      ? 'round'
      : `rectangle${ isRounded.value === true ? ' q-btn--rounded' : (props.square === true ? ' q-btn--square' : '') }`;

    return `q-btn--${ design.value } q-btn--${ shape }`
      + (colors !== void 0 ? ' ' + colors : '')
      + (isActionable.value === true ? ' q-btn--actionable q-focusable q-hoverable' : (props.disable === true ? ' disabled' : ''))
      + (props.fab === true ? ' q-btn--fab' : (props.fabMini === true ? ' q-btn--fab-mini' : ''))
      + (props.noCaps === true ? ' q-btn--no-uppercase' : '')
      + (props.dense === true ? ' q-btn--dense' : '')
      + (props.stretch === true ? ' no-border-radius self-stretch' : '')
      + (props.glossy === true ? ' glossy' : '')
      + (props.square ? ' q-btn--square' : '')
  });

  const innerClasses = computed(() =>
    alignClass.value + (props.stack === true ? ' column' : ' row')
    + (props.noWrap === true ? ' no-wrap text-no-wrap' : '')
    + (props.loading === true ? ' q-btn__content--hidden' : '')
  );

  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  }
}

const { passiveCapture } = listenOpts;

let
  touchTarget = null,
  keyboardTarget = null,
  mouseTarget = null;

const __nuxt_component_0$1 = createComponent({
  name: 'QBtn',

  props: {
    ...useBtnProps,

    percentage: Number,
    darkPercentage: Boolean,

    onTouchstart: [ Function, Array ]
  },

  emits: [ 'click', 'keydown', 'mousedown', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();

    const {
      classes, style, innerClasses,
      attributes,
      hasLink, linkTag, navigateOnClick,
      isActionable
    } = useBtn(props);

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;

    const hasLabel = computed(() =>
      props.label !== void 0 && props.label !== null && props.label !== ''
    );

    const ripple = computed(() => (
      props.disable === true || props.ripple === false
        ? false
        : {
            keyCodes: hasLink.value === true ? [ 13, 32 ] : [ 13 ],
            ...(props.ripple === true ? {} : props.ripple)
          }
    ));

    const rippleProps = computed(() => ({ center: props.round }));

    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0
        ? { transition: 'transform 0.6s', transform: `translateX(${ val - 100 }%)` }
        : {}
    });

    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        }
      }

      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };

        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0
            ? ''
            : 'Passive';

          acc[ `onTouchstart${ suffix }` ] = onTouchstart;
        }

        return acc
      }

      return {
        // needed; especially for disabled <a> tags
        onClick: stopAndPrevent
      }
    });

    const nodeProps = computed(() => ({
      ref: rootRef,
      class: 'q-btn q-btn-item non-selectable no-outline ' + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));

    function onClick (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      if (e !== void 0) {
        if (e.defaultPrevented === true) return

        const el = document.activeElement;
        // focus button if it came from ENTER on form
        // prevent the new submit (already done)
        if (
          props.type === 'submit'
          && el !== document.body
          && rootRef.value.contains(el) === false
          // required for iOS and desktop Safari
          && el.contains(rootRef.value) === false
        ) {
          rootRef.value.focus();

          const onClickCleanup = () => {
            document.removeEventListener('keydown', stopAndPrevent, true);
            document.removeEventListener('keyup', onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener('blur', onClickCleanup, passiveCapture);
          };

          document.addEventListener('keydown', stopAndPrevent, true);
          document.addEventListener('keyup', onClickCleanup, passiveCapture);
          rootRef.value.addEventListener('blur', onClickCleanup, passiveCapture);
        }
      }

      navigateOnClick(e);
    }

    function onKeydown (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      emit('keydown', e);

      if (isKeyCode(e, [ 13, 32 ]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();

        if (e.defaultPrevented !== true) {
          // focus external button if the focus helper was focused before
          rootRef.value.focus();

          keyboardTarget = rootRef.value;
          rootRef.value.classList.add('q-btn--active');
          document.addEventListener('keyup', onPressEnd, true);
          rootRef.value.addEventListener('blur', onPressEnd, passiveCapture);
        }

        stopAndPrevent(e);
      }
    }

    function onTouchstart (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      emit('touchstart', e);

      if (e.defaultPrevented === true) return

      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;

        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener('touchcancel', onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener('touchend', onPressEnd, passiveCapture);
      }

      // avoid duplicated mousedown event
      // triggering another early ripple
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }

    function onMousedown (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      e.qSkipRipple = avoidMouseRipple === true;
      emit('mousedown', e);

      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add('q-btn--active');
        document.addEventListener('mouseup', onPressEnd, passiveCapture);
      }
    }

    function onPressEnd (e) {
      // is it already destroyed?
      if (rootRef.value === null) return

      // needed for IE (because it emits blur when focusing button from focus helper)
      if (
        e !== void 0
        && e.type === 'blur'
        && document.activeElement === rootRef.value
      ) return

      if (e !== void 0 && e.type === 'keyup') {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [ 13, 32 ]) === true) {
          // for click trigger
          const evt = new MouseEvent('click', e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);

          stopAndPrevent(e);

          // for ripple
          e.qKeyEvent = true;
        }

        emit('keyup', e);
      }

      cleanup();
    }

    function cleanup (destroying) {
      const blurTarget = blurTargetRef.value;

      if (
        destroying !== true
        && (touchTarget === rootRef.value || mouseTarget === rootRef.value)
        && blurTarget !== null
        && blurTarget !== document.activeElement
      ) {
        blurTarget.setAttribute('tabindex', -1);
        blurTarget.focus();
      }

      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener('touchcancel', onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener('touchend', onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }

      if (mouseTarget === rootRef.value) {
        document.removeEventListener('mouseup', onPressEnd, passiveCapture);
        mouseTarget = null;
      }

      if (keyboardTarget === rootRef.value) {
        document.removeEventListener('keyup', onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener('blur', onPressEnd, passiveCapture);
        keyboardTarget = null;
      }

      rootRef.value !== null && rootRef.value.classList.remove('q-btn--active');
    }

    function onLoadingEvt (evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }

    onBeforeUnmount(() => {
      cleanup(true);
    });

    // expose public methods
    Object.assign(proxy, {
      click: e => {
        if (isActionable.value === true) {
          onClick(e);
        }
      }
    });

    return () => {
      let inner = [];

      props.icon !== void 0 && inner.push(
        h(__nuxt_component_2, {
          name: props.icon,
          left: props.stack !== true && hasLabel.value === true,
          role: 'img'
        })
      );

      hasLabel.value === true && inner.push(
        h('span', { class: 'block' }, [ props.label ])
      );

      inner = hMergeSlot(slots.default, inner);

      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(__nuxt_component_2, {
            name: props.iconRight,
            right: props.stack !== true && hasLabel.value === true,
            role: 'img'
          })
        );
      }

      const child = [
        h('span', {
          class: 'q-focus-helper',
          ref: blurTargetRef
        })
      ];

      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h('span', {
            class: 'q-btn__progress absolute-full overflow-hidden' + (props.darkPercentage === true ? ' q-btn__progress--dark' : '')
          }, [
            h('span', {
              class: 'q-btn__progress-indicator fit block',
              style: percentageStyle.value
            })
          ])
        );
      }

      child.push(
        h('span', {
          class: 'q-btn__content text-center col items-center q-anchor--skip ' + innerClasses.value
        }, inner)
      );

      props.loading !== null && child.push(
        h(Transition, {
          name: 'q-transition--fade'
        }, () => (
          props.loading === true
            ? [
                h('span', {
                  key: 'loading',
                  class: 'absolute-full flex flex-center'
                }, slots.loading !== void 0 ? slots.loading() : [ h(QSpinner) ])
              ]
            : null
        ))
      );

      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [ [
          __q_directive_0,
          ripple.value,
          void 0,
          rippleProps.value
        ] ]
      )
    }
  }
});

const QBtnGroup = createComponent({
  name: 'QBtnGroup',

  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() => {
      const cls = [ 'unelevated', 'outline', 'flat', 'rounded', 'square', 'push', 'stretch', 'glossy' ]
        .filter(t => props[ t ] === true)
        .map(t => `q-btn-group--${ t }`).join(' ');

      return `q-btn-group row no-wrap${ cls.length !== 0 ? ' ' + cls : '' }`
        + (props.spread === true ? ' q-btn-group--spread' : ' inline')
    });

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

function clearSelection () {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    }
    else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  }
  else if (document.selection !== void 0) {
    document.selection.empty();
  }
}

const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: { default: true }
    ,

  noParentEvent: Boolean
};

const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean
};

function useAnchor ({
  showing,
  avoidEmit, // required for QPopupProxy (true)
  configureAnchorEl // optional
}) {
  const { props, proxy, emit } = getCurrentInstance();

  const anchorEl = ref(null);

  let touchTimer = null;

  function canShow (evt) {
    // abort with no parent configured or on multi-touch
    return anchorEl.value === null
      ? false
      : (evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1)
  }

  const anchorEvents = {};

  if (configureAnchorEl === void 0) {
    // default configureAnchorEl is designed for
    // QMenu & QPopupProxy (which is why it's handled here)

    Object.assign(anchorEvents, {
      hide (evt) {
        proxy.hide(evt);
      },

      toggle (evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },

      toggleKey (evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },

      contextClick (evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },

      prevent,

      mobileTouch (evt) {
        anchorEvents.mobileCleanup(evt);

        if (canShow(evt) !== true) return

        proxy.hide(evt);
        anchorEl.value.classList.add('non-selectable');

        const target = evt.target;
        addEvt(anchorEvents, 'anchor', [
          [ target, 'touchmove', 'mobileCleanup', 'passive' ],
          [ target, 'touchend', 'mobileCleanup', 'passive' ],
          [ target, 'touchcancel', 'mobileCleanup', 'passive' ],
          [ anchorEl.value, 'contextmenu', 'prevent', 'notPassive' ]
        ]);

        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },

      mobileCleanup (evt) {
        anchorEl.value.classList.remove('non-selectable');

        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }

        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });

    configureAnchorEl = function (context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return

      let evts;

      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [ anchorEl.value, 'touchstart', 'mobileTouch', 'passive' ]
          ];
        }
        else {
          evts = [
            [ anchorEl.value, 'mousedown', 'hide', 'passive' ],
            [ anchorEl.value, 'contextmenu', 'contextClick', 'notPassive' ]
          ];
        }
      }
      else {
        evts = [
          [ anchorEl.value, 'click', 'toggle', 'passive' ],
          [ anchorEl.value, 'keyup', 'toggleKey', 'passive' ]
        ];
      }

      addEvt(anchorEvents, 'anchor', evts);
    };
  }

  function unconfigureAnchorEl () {
    cleanEvt(anchorEvents, 'anchor');
  }

  function setAnchorEl (el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains('q-anchor--skip')) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }

  function pickAnchorEl () {
    if (props.target === false || props.target === '' || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    }
    else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    }
    else {
      let el = props.target;

      if (typeof props.target === 'string') {
        try {
          el = document.querySelector(props.target);
        }
        catch (err) {
          el = void 0;
        }
      }

      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      }
      else {
        anchorEl.value = null;
        console.error(`Anchor: target "${ props.target }" not found`);
      }
    }
  }

  watch(() => props.contextMenu, val => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });

  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }

    pickAnchorEl();
  });

  watch(() => props.noParentEvent, val => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      }
      else {
        configureAnchorEl();
      }
    }
  });

  onMounted(() => {
    pickAnchorEl();

    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit('update:modelValue', false);
    }
  });

  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });

  return {
    anchorEl,
    canShow,
    anchorEvents
  }
}

function useScrollTarget (props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;

  function changeScrollEvent (scrollTarget, fn) {
    const fnProp = `${ fn !== void 0 ? 'add' : 'remove' }EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;

    if (scrollTarget !== window) {
      scrollTarget[ fnProp ]('scroll', fnHandler, listenOpts.passive);
    }

    window[ fnProp ]('scroll', fnHandler, listenOpts.passive);

    scrollFn = fn;
  }

  function unconfigureScrollTarget () {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }

  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });

  onBeforeUnmount(noParentEventWatcher);

  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  }
}

const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },

  'onUpdate:modelValue': [ Function, Array ]
};

const useModelToggleEmits = [
  'beforeShow', 'show', 'beforeHide', 'hide'
];

// handleShow/handleHide -> removeTick(), self (& emit show)

function useModelToggle ({
  showing,
  canShow, // optional
  hideOnRouteChange, // optional
  handleShow, // optional
  handleHide, // optional
  processOnMount // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;

  let payload;

  function toggle (evt) {
    if (showing.value === true) ;
    else {
      show(evt);
    }
  }

  function show (evt) {
    if (
      props.disable === true
      || (evt !== void 0 && evt.qAnchorHandled === true)
      || (canShow !== void 0 && canShow(evt) !== true)
    ) return

    const listener = props[ 'onUpdate:modelValue' ] !== void 0;

    if (props.modelValue === null || listener === false || true) {
      processShow(evt);
    }
  }

  function processShow (evt) {
    if (showing.value === true) return

    showing.value = true;

    emit('beforeShow', evt);

    if (handleShow !== void 0) {
      handleShow(evt);
    }
    else {
      emit('show', evt);
    }
  }

  function hide (evt) {
    return
  }

  function processHide (evt) {
    if (showing.value === false) return

    showing.value = false;

    emit('beforeHide', evt);

    if (handleHide !== void 0) {
      handleHide(evt);
    }
    else {
      emit('hide', evt);
    }
  }

  function processModelChange (val) {
    if (props.disable === true && val === true) {
      if (props[ 'onUpdate:modelValue' ] !== void 0) {
        emit('update:modelValue', false);
      }
    }
    else if ((val === true) !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }

  watch(() => props.modelValue, processModelChange);

  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) ;
    });
  }

  onMounted(() => {
    processModelChange(props.modelValue);
  });

  // expose public methods
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);

  return publicMethods
}

const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};

function useDark (props, $q) {
  // return isDark
  return computed(() => (
    props.dark === null
      ? $q.dark.isActive
      : props.dark
  ))
}

let queue = [];
let waitFlags = [];

function addFocusFn (fn) {
  if (waitFlags.length === 0) {
    fn();
  }
  else {
    queue.push(fn);
  }
}

function removeFocusFn (fn) {
  queue = queue.filter(entry => entry !== fn);
}

const portalProxyList = [];

function closePortalMenus (proxy, evt) {
  do {
    if (proxy.$options.name === 'QMenu') {
      proxy.hide(evt);

      // is this a point of separation?
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy)
      }
    }
    else if (proxy.__qPortal === true) {
      // treat it as point of separation if parent is QPopupProxy
      // (so mobile matches desktop behavior)
      // and hide it too
      const parent = getParentProxy(proxy);

      if (parent !== void 0 && parent.$options.name === 'QPopupProxy') {
        proxy.hide(evt);
        return parent
      }
      else {
        return proxy
      }
    }

    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null)
}

/**
 * Noop internal component to ease testing
 * of the teleported content.
 *
 * const wrapper = mount(QDialog, { ... })
 * const teleportedWrapper = wrapper.findComponent({ name: 'QPortal' })
 */
createComponent({
  name: 'QPortal',
  setup (_, { slots }) {
    return () => slots.default()
  }
});

// Warning!
// You MUST specify "inheritAttrs: false" in your component

function usePortal (vm, innerRef, renderPortalContent, type) {
  // showing, including while in show/hide transition
  const portalIsActive = ref(false);

  // showing & not in any show/hide transition
  const portalIsAccessible = ref(false);

  {
    return {
      portalIsActive,
      portalIsAccessible,

      showPortal: noop,
      hidePortal: noop,
      renderPortal: noop
    }
  }
}

const useTransitionProps = {
  transitionShow: {
    type: String,
    default: 'fade'
  },

  transitionHide: {
    type: String,
    default: 'fade'
  },

  transitionDuration: {
    type: [ String, Number ],
    default: 300
  }
};

function useTransition (props, defaultShowFn = () => {}, defaultHideFn = () => {}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${ props.transitionShow || defaultShowFn() }`;
      const hide = `q-transition--${ props.transitionHide || defaultHideFn() }`;

      return {
        appear: true,

        enterFromClass: `${ show }-enter-from`,
        enterActiveClass: `${ show }-enter-active`,
        enterToClass: `${ show }-enter-to`,

        leaveFromClass: `${ hide }-leave-from`,
        leaveActiveClass: `${ hide }-leave-active`,
        leaveToClass: `${ hide }-leave-to`
      }
    }),

    transitionStyle: computed(() => `--q-transition-duration: ${ props.transitionDuration }ms`)
  }
}

/*
 * Usage:
 *    registerTick(fn)
 *    removeTick()
 */

function useTick () {
  let tickFn;
  const vm = getCurrentInstance();

  function removeTick () {
    tickFn = void 0;
  }

  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);

  return {
    removeTick,

    registerTick (fn) {
      tickFn = fn;

      nextTick(() => {
        if (tickFn === fn) {
          // we also check if VM is destroyed, since if it
          // got to trigger one nextTick() we cannot stop it
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  }
}

/*
 * Usage:
 *    registerTimeout(fn[, delay])
 *    removeTimeout()
 */

function useTimeout () {
  let timer = null;
  const vm = getCurrentInstance();

  function removeTimeout () {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);

  return {
    removeTimeout,

    registerTimeout (fn, delay) {
      removeTimeout();

      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  }
}

const handlers$1 = [];
let escDown;

function onKeydown (evt) {
  escDown = evt.keyCode === 27;
}

function onBlur () {
  if (escDown === true) {
    escDown = false;
  }
}

function onKeyup (evt) {
  if (escDown === true) {
    escDown = false;

    if (isKeyCode(evt, 27) === true) {
      handlers$1[ handlers$1.length - 1 ](evt);
    }
  }
}

function update (action) {
  window[ action ]('keydown', onKeydown);
  window[ action ]('blur', onBlur);
  window[ action ]('keyup', onKeyup);
  escDown = false;
}

function addEscapeKey (fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);

    if (handlers$1.length === 1) {
      update('addEventListener');
    }
  }
}

function removeEscapeKey (fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);

    if (handlers$1.length === 0) {
      update('removeEventListener');
    }
  }
}

const handlers = [];

function trigger (e) {
  handlers[ handlers.length - 1 ](e);
}

function addFocusout (fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);

    if (handlers.length === 1) {
      document.body.addEventListener('focusin', trigger);
    }
  }
}

function removeFocusout (fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);

    if (handlers.length === 0) {
      document.body.removeEventListener('focusin', trigger);
    }
  }
}

const
  { notPassiveCapture } = listenOpts,
  registeredList = [];

function globalHandler (evt) {

  const target = evt.target;

  if (
    target === void 0
    || target.nodeType === 8
    || target.classList.contains('no-pointer-events') === true
  ) return

  // check last portal vm if it's
  // a QDialog and not in seamless mode
  let portalIndex = portalProxyList.length - 1;

  while (portalIndex >= 0) {
    const proxy = portalProxyList[ portalIndex ].$;

    // skip QTooltip portals
    if (proxy.type.name === 'QTooltip') {
      portalIndex--;
      continue
    }

    if (proxy.type.name !== 'QDialog') {
      break
    }

    if (proxy.props.seamless !== true) return

    portalIndex--;
  }

  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[ i ];

    if (
      (
        state.anchorEl.value === null
        || state.anchorEl.value.contains(target) === false
      )
      && (
        target === document.body
        || (
          state.innerRef.value !== null
          && state.innerRef.value.contains(target) === false
        )
      )
    ) {
      // mark the event as being processed by clickOutside
      // used to prevent refocus after menu close
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    }
    else {
      return
    }
  }
}

function addClickOutside (clickOutsideProps) {
  registeredList.push(clickOutsideProps);

  if (registeredList.length === 1) {
    document.addEventListener('mousedown', globalHandler, notPassiveCapture);
    document.addEventListener('touchstart', globalHandler, notPassiveCapture);
  }
}

function removeClickOutside (clickOutsideProps) {
  const index = registeredList.findIndex(h => h === clickOutsideProps);

  if (index !== -1) {
    registeredList.splice(index, 1);

    if (registeredList.length === 0) {

      document.removeEventListener('mousedown', globalHandler, notPassiveCapture);
      document.removeEventListener('touchstart', globalHandler, notPassiveCapture);
    }
  }
}

let vpLeft, vpTop;

function validatePosition (pos) {
  const parts = pos.split(' ');
  if (parts.length !== 2) {
    return false
  }
  if ([ 'top', 'center', 'bottom' ].includes(parts[ 0 ]) !== true) {
    console.error('Anchor/Self position must start with one of top/center/bottom');
    return false
  }
  if ([ 'left', 'middle', 'right', 'start', 'end' ].includes(parts[ 1 ]) !== true) {
    console.error('Anchor/Self position must end with one of left/middle/right/start/end');
    return false
  }
  return true
}

function validateOffset (val) {
  if (!val) { return true }
  if (val.length !== 2) { return false }
  if (typeof val[ 0 ] !== 'number' || typeof val[ 1 ] !== 'number') {
    return false
  }
  return true
}

const horizontalPos = {
  'start#ltr': 'left',
  'start#rtl': 'right',
  'end#ltr': 'right',
  'end#rtl': 'left'
}

;[ 'left', 'middle', 'right' ].forEach(pos => {
  horizontalPos[ `${ pos }#ltr` ] = pos;
  horizontalPos[ `${ pos }#rtl` ] = pos;
});

function parsePosition (pos, rtl) {
  const parts = pos.split(' ');
  return {
    vertical: parts[ 0 ],
    horizontal: horizontalPos[ `${ parts[ 1 ] }#${ rtl === true ? 'rtl' : 'ltr' }` ]
  }
}

function getAnchorProps (el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();

  if (offset !== void 0) {
    top -= offset[ 1 ];
    left -= offset[ 0 ];
    bottom += offset[ 1 ];
    right += offset[ 0 ];

    width += offset[ 0 ];
    height += offset[ 1 ];
  }

  return {
    top, bottom, height,
    left, right, width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  }
}

function getAbsoluteAnchorProps (el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();

  top += absoluteOffset.top;
  left += absoluteOffset.left;

  if (offset !== void 0) {
    top += offset[ 1 ];
    left += offset[ 0 ];
  }

  return {
    top, bottom: top + 1, height: 1,
    left, right: left + 1, width: 1,
    middle: left,
    center: top
  }
}

function getTargetProps (width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  }
}

function getTopLeftProps (anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[ anchorOrigin.vertical ] - targetProps[ selfOrigin.vertical ],
    left: anchorProps[ anchorOrigin.horizontal ] - targetProps[ selfOrigin.horizontal ]
  }
}

function setPosition (cfg, retryNumber = 0) {
  if (
    cfg.targetEl === null
    || cfg.anchorEl === null
    || retryNumber > 5 // we should try only a few times
  ) return

  // some browsers report zero height or width because
  // we are trying too early to get these dimensions
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return
  }

  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;

  if (client.is.ios === true && window.visualViewport !== void 0) {
    // uses the q-position-engine CSS class

    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;

    if (left !== vpLeft) {
      el.setProperty('--q-pe-left', left + 'px');
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty('--q-pe-top', top + 'px');
      vpTop = top;
    }
  }

  // scroll position might change
  // if max-height/-width changes, so we
  // need to restore it after we calculate
  // the new positioning
  const { scrollLeft, scrollTop } = targetEl;

  const anchorProps = absoluteOffset === void 0
    ? getAnchorProps(anchorEl, cover === true ? [ 0, 0 ] : offset)
    : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);

  /**
   * We "reset" the critical CSS properties
   * so we can take an accurate measurement.
   *
   * Ensure that targetEl has a max-width & max-height
   * set in CSS and that the value does NOT exceeds 100vw/vh.
   * All users of the position-engine (currently QMenu & QTooltip)
   * have CSS for this.
   */
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: 'visible'
  });

  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true
    ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight }
    : { elWidth: origElWidth, elHeight: origElHeight };

  let elStyle = { maxWidth, maxHeight };

  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + 'px';
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + 'px';
    }
  }

  Object.assign(targetEl.style, elStyle);

  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);

  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  }
  else { // we have touch position or context menu with offset
    const { top, left } = props; // cache initial values

    // apply initial boundaries
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);

    let hasChanged = false;

    // did it flip vertically?
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[ 1 ];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }

    // did it flip horizontally?
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[ 0 ];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }

    if (hasChanged === true) {
      // re-calculate props with the new anchor
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);

      // and re-apply boundaries
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }

  elStyle = {
    top: props.top + 'px',
    left: props.left + 'px'
  };

  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + 'px';

    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + 'px';

    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }

  Object.assign(targetEl.style, elStyle);

  // restore scroll position
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}

function applyBoundaries (props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const
    currentHeight = targetProps.bottom,
    currentWidth = targetProps.right,
    margin = getScrollbarWidth(),
    innerHeight = window.innerHeight - margin,
    innerWidth = document.body.clientWidth;

  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === 'center') {
      props.top = anchorProps[ anchorOrigin.vertical ] > innerHeight / 2
        ? Math.max(0, innerHeight - currentHeight)
        : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    }
    else if (anchorProps[ anchorOrigin.vertical ] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === 'center'
          ? anchorProps.center
          : (anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top)
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    }
    else {
      props.top = Math.max(0, anchorOrigin.vertical === 'center'
        ? anchorProps.center
        : (anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom)
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }

  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === 'middle') {
      props.left = anchorProps[ anchorOrigin.horizontal ] > innerWidth / 2
        ? Math.max(0, innerWidth - currentWidth)
        : 0;
    }
    else if (anchorProps[ anchorOrigin.horizontal ] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === 'middle'
          ? anchorProps.middle
          : (anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left)
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    }
    else {
      props.left = Math.max(0, anchorOrigin.horizontal === 'middle'
        ? anchorProps.middle
        : (anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right)
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}

const __nuxt_component_15 = createComponent({
  name: 'QMenu',

  inheritAttrs: false,

  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,

    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,

    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,

    fit: Boolean,
    cover: Boolean,

    square: Boolean,

    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },

    scrollTarget: scrollTargetProp,

    touchPosition: Boolean,

    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },

  emits: [
    ...useModelToggleEmits,
    'click', 'escapeKey'
  ],

  setup (props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;

    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;

    const innerRef = ref(null);
    const showing = ref(false);

    const hideOnRouteChange = computed(() =>
      props.persistent !== true
      && props.noRouteDismiss !== true
    );

    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);

    const { anchorEl, canShow } = useAnchor({ showing });

    const { hide } = useModelToggle({
      showing, canShow, handleShow, handleHide,
      hideOnRouteChange,
      processOnMount: true
    });

    const { showPortal, hidePortal, renderPortal } = usePortal();

    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside (e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);

          if (
            // always prevent touch event
            e.type === 'touchstart'
            // prevent click if it's on a dialog backdrop
            || e.target.classList.contains('q-dialog__backdrop')
          ) {
            stopAndPrevent(e);
          }

          return true
        }
      }
    };

    const anchorOrigin = computed(() =>
      parsePosition(
        props.anchor || (
          props.cover === true ? 'center middle' : 'bottom start'
        ),
        $q.lang.rtl
      )
    );

    const selfOrigin = computed(() => (
      props.cover === true
        ? anchorOrigin.value
        : parsePosition(props.self || 'top start', $q.lang.rtl)
    ));

    computed(() =>
      (props.square === true ? ' q-menu--square' : '')
      + (isDark.value === true ? ' q-menu--dark q-dark' : '')
    );

    computed(() => (
      props.autoClose === true
        ? { onClick: onAutoClose }
        : {}
    ));

    const handlesFocus = computed(() =>
      showing.value === true && props.persistent !== true
    );

    watch(handlesFocus, val => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      }
      else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });

    function focus () {
      addFocusFn(() => {
        let node = innerRef.value;

        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')
            || node.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')
            || node.querySelector('[autofocus], [data-autofocus]')
            || node;
          node.focus({ preventScroll: true });
        }
      });
    }

    function handleShow (evt) {
      refocusTarget = props.noRefocus === false
        ? document.activeElement
        : null;

      addFocusout(onFocusout);

      showPortal();
      configureScrollTarget();

      absoluteOffset = void 0;

      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);

        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }

      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + '|' + $q.screen.height + '|' + props.self + '|' + props.anchor + '|' + $q.lang.rtl,
          updatePosition
        );
      }

      if (props.noFocus !== true) {
        document.activeElement.blur();
      }

      // should removeTick() if this gets removed
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        // required in order to avoid the "double-tap needed" issue
        if ($q.platform.is.ios === true) {
          // if auto-close, then this click should
          // not close the menu
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }

        updatePosition();
        showPortal(true); // done showing portal
        emit('show', evt);
      }, props.transitionDuration);
    }

    function handleHide (evt) {
      removeTick();
      hidePortal();

      anchorCleanup(true);

      if (
        refocusTarget !== null
        && (
          // menu was hidden from code or ESC plugin
          evt === void 0
          // menu was not closed from a mouse or touch clickOutside
          || evt.qClickOutside !== true
        )
      ) {
        ((evt && evt.type.indexOf('key') === 0
          ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])')
          : void 0
        ) || refocusTarget).focus();
        refocusTarget = null;
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        hidePortal(true); // done hiding, now destroy
        emit('hide', evt);
      }, props.transitionDuration);
    }

    function anchorCleanup (hiding) {
      absoluteOffset = void 0;

      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }

      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }

      if (hiding !== true) {
        refocusTarget = null;
      }
    }

    function configureScrollTarget () {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }

    function onAutoClose (e) {
      // if auto-close, then the ios double-tap fix which
      // issues a click should not close the menu
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit('click', e);
      }
      else {
        avoidAutoClose = false;
      }
    }

    function onFocusout (evt) {
      // the focus is not in a vue child component
      if (
        handlesFocus.value === true
        && props.noFocus !== true
        && childHasFocus(innerRef.value, evt.target) !== true
      ) {
        focus();
      }
    }

    function onEscapeKey (evt) {
      emit('escapeKey');
      hide(evt);
    }

    function updatePosition () {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }

    onBeforeUnmount(anchorCleanup);

    // expose public methods
    Object.assign(proxy, { focus, updatePosition });

    return renderPortal
  }
});

/**
 * Based on the work of https://github.com/jchook/uuid-random
 */

let
  buf,
  bufIdx = 0;
const hexBytes = new Array(256);

// Pre-calculate toString(16) for speed
for (let i = 0; i < 256; i++) {
  hexBytes[ i ] = (i + 0x100).toString(16).substring(1);
}

// Use best available PRNG
const randomBytes = (() => {
  // Node & Browser support
  const lib = typeof crypto !== 'undefined'
    ? crypto
    : (
        void 0
      );

  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes
    }
    if (lib.getRandomValues !== void 0) {
      return n => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes
      }
    }
  }

  return n => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r
  }
})();

// Buffer random numbers for speed
// Reduce memory usage by decreasing this number (min 16)
// or improve speed by increasing this number (try 16384)
const BUFFER_SIZE = 4096;

function uid () {
  // Buffer some random bytes for speed
  if (buf === void 0 || (bufIdx + 16 > BUFFER_SIZE)) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }

  const b = Array.prototype.slice.call(buf, bufIdx, (bufIdx += 16));
  b[ 6 ] = (b[ 6 ] & 0x0f) | 0x40;
  b[ 8 ] = (b[ 8 ] & 0x3f) | 0x80;

  return hexBytes[ b[ 0 ] ] + hexBytes[ b[ 1 ] ]
    + hexBytes[ b[ 2 ] ] + hexBytes[ b[ 3 ] ] + '-'
    + hexBytes[ b[ 4 ] ] + hexBytes[ b[ 5 ] ] + '-'
    + hexBytes[ b[ 6 ] ] + hexBytes[ b[ 7 ] ] + '-'
    + hexBytes[ b[ 8 ] ] + hexBytes[ b[ 9 ] ] + '-'
    + hexBytes[ b[ 10 ] ] + hexBytes[ b[ 11 ] ]
    + hexBytes[ b[ 12 ] ] + hexBytes[ b[ 13 ] ]
    + hexBytes[ b[ 14 ] ] + hexBytes[ b[ 15 ] ]
}

function parseValue (val) {
  return val === void 0 || val === null
    ? null
    : val
}

function getId (val, required) {
  return val === void 0 || val === null
    ? (required === true ? `f_${ uid() }` : null)
    : val
}

/**
 * Returns an "id" which is a ref() that can be used as
 * a unique identifier to apply to a DOM node attribute.
 *
 * On SSR, it takes care of generating the id on the client side (only) to
 * avoid hydration errors.
 */
function useId ({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0
      ? ref(parseValue(getValue()))
      : ref(null);

    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${ uid() }`; // getId(null, true)
      });
    }

    if (getValue !== void 0) {
      watch(getValue, newId => {
        id.value = getId(newId, required);
      });
    }

    return id
  }

  return getValue !== void 0
    ? computed(() => getId(getValue(), required))
    : ref(`f_${ uid() }`) // getId(null, true)
}

const btnPropsList = Object.keys(nonRoundBtnProps);

function passBtnProps (props) {
  return btnPropsList.reduce((acc, key) => {
    const val = props[ key ];
    if (val !== void 0) {
      acc[ key ] = val;
    }
    return acc
  }, {})
}

const __nuxt_component_7 = createComponent({
  name: 'QBtnDropdown',

  props: {
    ...nonRoundBtnProps,
    ...useTransitionProps,

    modelValue: Boolean,
    split: Boolean,
    dropdownIcon: String,

    contentClass: [ Array, String, Object ],
    contentStyle: [ Array, String, Object ],

    cover: Boolean,
    persistent: Boolean,
    noRouteDismiss: Boolean,
    autoClose: Boolean,

    menuAnchor: {
      type: String,
      default: 'bottom end'
    },
    menuSelf: {
      type: String,
      default: 'top end'
    },
    menuOffset: Array,

    disableMainBtn: Boolean,
    disableDropdown: Boolean,

    noIconAnimation: Boolean,

    toggleAriaLabel: String
  },

  emits: [ 'update:modelValue', 'click', 'beforeShow', 'show', 'beforeHide', 'hide' ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();

    const showing = ref(props.modelValue);
    const menuRef = ref(null);
    const targetUid = useId();

    const ariaAttrs = computed(() => {
      const acc = {
        'aria-expanded': showing.value === true ? 'true' : 'false',
        'aria-haspopup': 'true',
        'aria-controls': targetUid.value,
        'aria-label': props.toggleAriaLabel || proxy.$q.lang.label[ showing.value === true ? 'collapse' : 'expand' ](props.label)
      };

      if (
        props.disable === true
        || (
          (props.split === false && props.disableMainBtn === true)
          || props.disableDropdown === true
        )
      ) {
        acc[ 'aria-disabled' ] = 'true';
      }

      return acc
    });

    const iconClass = computed(() =>
      'q-btn-dropdown__arrow'
      + (showing.value === true && props.noIconAnimation === false ? ' rotate-180' : '')
      + (props.split === false ? ' q-btn-dropdown__arrow-container' : '')
    );

    const btnDesignAttr = computed(() => getBtnDesignAttr(props));
    const btnProps = computed(() => passBtnProps(props));

    watch(() => props.modelValue, val => {
      menuRef.value !== null && menuRef.value[ val ? 'show' : 'hide' ]();
    });

    watch(() => props.split, hide);

    function onBeforeShow (e) {
      showing.value = true;
      emit('beforeShow', e);
    }

    function onShow (e) {
      emit('show', e);
      emit('update:modelValue', true);
    }

    function onBeforeHide (e) {
      showing.value = false;
      emit('beforeHide', e);
    }

    function onHide (e) {
      emit('hide', e);
      emit('update:modelValue', false);
    }

    function onClick (e) {
      emit('click', e);
    }

    function onClickHide (e) {
      stop(e);
      hide();
      emit('click', e);
    }

    function toggle (evt) {
      menuRef.value !== null && menuRef.value.toggle(evt);
    }

    function show (evt) {
      menuRef.value !== null && menuRef.value.show(evt);
    }

    function hide (evt) {
      menuRef.value !== null && menuRef.value.hide(evt);
    }

    // expose public methods
    Object.assign(proxy, {
      show, hide, toggle
    });

    onMounted(() => {
      props.modelValue === true && show();
    });

    return () => {
      const Arrow = [
        h(__nuxt_component_2, {
          class: iconClass.value,
          name: props.dropdownIcon || proxy.$q.iconSet.arrow.dropdown
        })
      ];

      props.disableDropdown !== true && Arrow.push(
        h(__nuxt_component_15, {
          ref: menuRef,
          id: targetUid.value,
          class: props.contentClass,
          style: props.contentStyle,
          cover: props.cover,
          fit: true,
          persistent: props.persistent,
          noRouteDismiss: props.noRouteDismiss,
          autoClose: props.autoClose,
          anchor: props.menuAnchor,
          self: props.menuSelf,
          offset: props.menuOffset,
          separateClosePopup: true,
          transitionShow: props.transitionShow,
          transitionHide: props.transitionHide,
          transitionDuration: props.transitionDuration,
          onBeforeShow,
          onShow,
          onBeforeHide,
          onHide
        }, slots.default)
      );

      if (props.split === false) {
        return h(__nuxt_component_0$1, {
          class: 'q-btn-dropdown q-btn-dropdown--simple',
          ...btnProps.value,
          ...ariaAttrs.value,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          onClick
        }, {
          default: () => hSlot(slots.label, []).concat(Arrow),
          loading: slots.loading
        })
      }

      return h(QBtnGroup, {
        class: 'q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item',
        rounded: props.rounded,
        square: props.square,
        ...btnDesignAttr.value,
        glossy: props.glossy,
        stretch: props.stretch
      }, () => [
        h(__nuxt_component_0$1, {
          class: 'q-btn-dropdown--current',
          ...btnProps.value,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          onClick: onClickHide
        }, {
          default: slots.label,
          loading: slots.loading
        }),

        h(__nuxt_component_0$1, {
          class: 'q-btn-dropdown__arrow-container q-anchor--skip',
          ...ariaAttrs.value,
          ...btnDesignAttr.value,
          disable: props.disable === true || props.disableDropdown === true,
          rounded: props.rounded,
          color: props.color,
          textColor: props.textColor,
          dense: props.dense,
          size: props.size,
          padding: props.padding,
          ripple: props.ripple
        }, () => Arrow)
      ])
    }
  }
});

const roleAttrExceptions = [ 'ul', 'ol' ];

const __nuxt_component_8 = createComponent({
  name: 'QList',

  props: {
    ...useDarkProps,

    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,

    tag: {
      type: String,
      default: 'div'
    }
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const role = computed(() => (
      roleAttrExceptions.includes(props.tag) ? null : 'list')
    );

    const classes = computed(() =>
      'q-list'
      + (props.bordered === true ? ' q-list--bordered' : '')
      + (props.dense === true ? ' q-list--dense' : '')
      + (props.separator === true ? ' q-list--separator' : '')
      + (isDark.value === true ? ' q-list--dark' : '')
      + (props.padding === true ? ' q-list--padding' : '')
    );

    return () => h(props.tag, { class: classes.value, role: role.value }, hSlot(slots.default))
  }
});

const __nuxt_component_9 = createComponent({
  name: 'QItem',

  props: {
    ...useDarkProps,
    ...useRouterLinkProps,

    tag: {
      type: String,
      default: 'div'
    },

    active: {
      type: Boolean,
      default: null
    },

    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,

    tabindex: [ String, Number ],

    focused: Boolean,
    manualFocus: Boolean
  },

  emits: [ 'click', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    const isActionable = computed(() =>
      props.clickable === true
        || hasLink.value === true
        || props.tag === 'label'
    );

    const isClickable = computed(() =>
      props.disable !== true && isActionable.value === true
    );

    const classes = computed(() =>
      'q-item q-item-type row no-wrap'
      + (props.dense === true ? ' q-item--dense' : '')
      + (isDark.value === true ? ' q-item--dark' : '')
      + (
        hasLink.value === true && props.active === null
          ? linkClass.value
          : (
              props.active === true
                ? ` q-item--active${ props.activeClass !== void 0 ? ` ${ props.activeClass }` : '' }`
                : ''
            )
      )
      + (props.disable === true ? ' disabled' : '')
      + (
        isClickable.value === true
          ? ' q-item--clickable q-link cursor-pointer '
            + (props.manualFocus === true ? 'q-manual-focusable' : 'q-focusable q-hoverable')
            + (props.focused === true ? ' q-manual-focusable--focused' : '')
          : ''
      )
    );

    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null
      }

      const dir = $q.lang.rtl === true ? 'Right' : 'Left';
      return {
        [ 'padding' + dir ]: (16 + props.insetLevel * 56) + 'px'
      }
    });

    function onClick (e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          }
          else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }

        navigateOnClick(e);
      }
    }

    function onKeyup (e) {
      if (isClickable.value === true && isKeyCode(e, [ 13, 32 ]) === true) {
        stopAndPrevent(e);

        // for ripple
        e.qKeyEvent = true;

        // for click trigger
        const evt = new MouseEvent('click', e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }

      emit('keyup', e);
    }

    function getContent () {
      const child = hUniqueSlot(slots.default, []);

      isClickable.value === true && child.unshift(
        h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef })
      );

      return child
    }

    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: 'listitem',
        onClick,
        onKeyup
      };

      if (isClickable.value === true) {
        data.tabindex = props.tabindex || '0';
        Object.assign(data, linkAttrs.value);
      }
      else if (isActionable.value === true) {
        data[ 'aria-disabled' ] = 'true';
      }

      return h(
        linkTag.value,
        data,
        getContent()
      )
    }
  }
});

const __nuxt_component_10 = createComponent({
  name: 'QItemSection',

  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-item__section column'
      + ` q-item__section--${ props.avatar === true || props.side === true || props.thumbnail === true ? 'side' : 'main' }`
      + (props.top === true ? ' q-item__section--top justify-start' : ' justify-center')
      + (props.avatar === true ? ' q-item__section--avatar' : '')
      + (props.thumbnail === true ? ' q-item__section--thumbnail' : '')
      + (props.noWrap === true ? ' q-item__section--nowrap' : '')
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const __nuxt_component_11 = createComponent({
  name: 'QAvatar',

  props: {
    ...useSizeProps,

    fontSize: String,

    color: String,
    textColor: String,

    icon: String,
    square: Boolean,
    rounded: Boolean
  },

  setup (props, { slots }) {
    const sizeStyle = useSize(props);

    const classes = computed(() =>
      'q-avatar'
      + (props.color ? ` bg-${ props.color }` : '')
      + (props.textColor ? ` text-${ props.textColor } q-chip--colored` : '')
      + (
        props.square === true
          ? ' q-avatar--square'
          : (props.rounded === true ? ' rounded-borders' : '')
      )
    );

    const contentStyle = computed(() => (
      props.fontSize
        ? { fontSize: props.fontSize }
        : null
    ));

    return () => {
      const icon = props.icon !== void 0
        ? [ h(__nuxt_component_2, { name: props.icon }) ]
        : void 0;

      return h('div', {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h('div', {
          class: 'q-avatar__content row flex-center overflow-hidden',
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ])
    }
  }
});

const __nuxt_component_13 = createComponent({
  name: 'QItemLabel',

  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [ Number, String ]
  },

  setup (props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));

    const classes = computed(() =>
      'q-item__label'
      + (props.overline === true ? ' q-item__label--overline text-overline' : '')
      + (props.caption === true ? ' q-item__label--caption text-caption' : '')
      + (props.header === true ? ' q-item__label--header' : '')
      + (parsedLines.value === 1 ? ' ellipsis' : '')
    );

    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1
        ? {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': parsedLines.value
          }
        : null
    });

    return () => h('div', {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default))
  }
});

const listenerRE = /^on[A-Z]/;

function useSplitAttrs () {
  const { attrs, vnode } = getCurrentInstance();

  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };

  function update () {
    const attributes = {};
    const listeners = {};

    for (const key in attrs) {
      if (key !== 'class' && key !== 'style' && listenerRE.test(key) === false) {
        attributes[ key ] = attrs[ key ];
      }
    }

    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[ key ] = vnode.props[ key ];
      }
    }

    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }

  onBeforeUpdate(update);

  update();

  return acc
}

function useFormChild ({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);

  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();

    // export public method (so it can be used in QForm)
    Object.assign(proxy, { validate, resetValidation });

    watch(() => props.disable, val => {
      if (val === true) {
        typeof resetValidation === 'function' && resetValidation();
        $form.unbindComponent(proxy);
      }
      else {
        $form.bindComponent(proxy);
      }
    });

    onMounted(() => {
      // register to parent QForm
      props.disable !== true && $form.bindComponent(proxy);
    });

    onBeforeUnmount(() => {
      // un-register from parent QForm
      props.disable !== true && $form.unbindComponent(proxy);
    });
  }
  else if (requiresQForm === true) {
    console.error('Parent QForm not found on useFormChild()!');
  }
}

// file referenced from docs

const
  hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;

// Keep in sync with ui/types/api/validation.d.ts
const testPattern = {
  date: v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),

  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),

  hexColor: v => hex.test(v),
  hexaColor: v => hexa.test(v),
  hexOrHexaColor: v => hexOrHexa.test(v),

  rgbColor: v => rgb.test(v),
  rgbaColor: v => rgba.test(v),
  rgbOrRgbaColor: v => rgb.test(v) || rgba.test(v),

  hexOrRgbColor: v => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: v => hexa.test(v) || rgba.test(v),
  anyColor: v => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};

const lazyRulesValues = [ true, false, 'ondemand' ];

const useValidateProps = {
  modelValue: {},

  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,

  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [ Boolean, String ],
    default: false, // statement unneeded but avoids future vue implementation changes
    validator: v => lazyRulesValues.includes(v)
  }
};

function useValidate (focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();

  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);

  useFormChild({ validate, resetValidation });

  let validateIndex = 0, unwatchRules;

  const hasRules = computed(() =>
    props.rules !== void 0
    && props.rules !== null
    && props.rules.length !== 0
  );

  const canDebounceValidate = computed(() => (
    props.disable !== true
    && hasRules.value === true
    // Should not have a validation in progress already;
    // It might mean that focus switched to submit btn and
    // QForm's submit() has been called already (ENTER key)
    && innerLoading.value === false
  ));

  const hasError = computed(() =>
    props.error === true || innerError.value === true
  );

  const errorMessage = computed(() => (
    typeof props.errorMessage === 'string' && props.errorMessage.length !== 0
      ? props.errorMessage
      : innerErrorMessage.value
  ));

  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;

    if (
      canDebounceValidate.value === true
      // trigger validation if not using any kind of lazy-rules
      && props.lazyRules === false
    ) {
      debouncedValidate();
    }
  });

  function onRulesChange () {
    if (
      props.lazyRules !== 'ondemand'
      && canDebounceValidate.value === true
      && isDirtyModel.value === true
    ) {
      debouncedValidate();
    }
  }

  watch(() => props.reactiveRules, val => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    }
    else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });

  watch(() => props.lazyRules, onRulesChange);

  watch(focused, val => {
    if (val === true) {
      isDirtyModel.value = true;
    }
    else if (
      canDebounceValidate.value === true
      && props.lazyRules !== 'ondemand'
    ) {
      debouncedValidate();
    }
  });

  function resetValidation () {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }

  /*
   * Return value
   *   - true (validation succeeded)
   *   - false (validation failed)
   *   - Promise (pending async validation)
   */
  function validate (val = props.modelValue) {
    if (
      props.disable === true
      || hasRules.value === false
    ) {
      return true
    }

    const index = ++validateIndex;

    const setDirty = innerLoading.value !== true
      ? () => { isDirtyModel.value = true; }
      : () => {};

    const update = (err, msg) => {
      err === true && setDirty();

      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };

    const promises = [];

    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[ i ];
      let res;

      if (typeof rule === 'function') {
        res = rule(val, testPattern);
      }
      else if (typeof rule === 'string' && testPattern[ rule ] !== void 0) {
        res = testPattern[ rule ](val);
      }

      if (res === false || typeof res === 'string') {
        update(true, res);
        return false
      }
      else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }

    if (promises.length === 0) {
      update(false);
      return true
    }

    innerLoading.value = true;

    return Promise.all(promises).then(
      res => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true
        }

        const msg = res.find(r => r === false || typeof r === 'string');
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0
      },
      e => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }

        return false
      }
    )
  }

  const debouncedValidate = debounce(validate, 0);

  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });

  // expose public methods & props
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, 'hasError', () => hasError.value);

  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,

    validate,
    resetValidation
  }
}

function fieldValueIsFilled (val) {
  return val !== void 0
    && val !== null
    && ('' + val).length !== 0
}

const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,

  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,

  labelColor: String,
  color: String,
  bgColor: String,

  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [ Boolean, String ],

  square: Boolean,

  loading: Boolean,

  labelSlot: Boolean,

  bottomSlots: Boolean,
  hideBottomSpace: Boolean,

  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,

  counter: Boolean,

  clearable: Boolean,
  clearIcon: String,

  disable: Boolean,
  readonly: Boolean,

  autofocus: Boolean,

  for: String
};

const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [ Number, String ]
};

const useFieldEmits = [ 'update:modelValue', 'clear', 'focus', 'blur' ];

function useFieldState ({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();

  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });

  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true
      ? computed(() => props.tag)
      : { value: 'label' },

    isDark,

    editable: computed(() =>
      props.disable !== true && props.readonly !== true
    ),

    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,

    splitAttrs: useSplitAttrs(),
    targetUid,

    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)

    /**
     * user supplied additionals:

     * innerValue - computed
     * floatingLabel - computed
     * inputRef - computed

     * fieldClass - computed
     * hasShadow - computed

     * controlEvents - Object with fn(e)

     * getControl - fn
     * getInnerAppend - fn
     * getControlChild - fn
     * getShadowControl - fn
     * showPopup - fn
     */
  }
}

function useField (state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;

  let focusoutTimer = null;

  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }

  if (state.emitValue === void 0) {
    state.emitValue = value => {
      emit('update:modelValue', value);
    };
  }

  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }

  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });

  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
          ? ('' + props.modelValue).length
          : (Array.isArray(props.modelValue) === true ? props.modelValue.length : 0);

        const max = props.maxlength !== void 0
          ? props.maxlength
          : props.maxValues;

        return len + (max !== void 0 ? ' / ' + max : '')
      }
    });
  }

  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);

  const floatingLabel = state.floatingLabel !== void 0
    ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true)
    : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);

  const shouldRenderBottom = computed(() =>
    props.bottomSlots === true
    || props.hint !== void 0
    || hasRules.value === true
    || props.counter === true
    || props.error !== null
  );

  const styleType = computed(() => {
    if (props.filled === true) { return 'filled' }
    if (props.outlined === true) { return 'outlined' }
    if (props.borderless === true) { return 'borderless' }
    if (props.standout) { return 'standout' }
    return 'standard'
  });

  const classes = computed(() =>
    `q-field row no-wrap items-start q-field--${ styleType.value }`
    + (state.fieldClass !== void 0 ? ` ${ state.fieldClass.value }` : '')
    + (props.rounded === true ? ' q-field--rounded' : '')
    + (props.square === true ? ' q-field--square' : '')
    + (floatingLabel.value === true ? ' q-field--float' : '')
    + (hasLabel.value === true ? ' q-field--labeled' : '')
    + (props.dense === true ? ' q-field--dense' : '')
    + (props.itemAligned === true ? ' q-field--item-aligned q-item-type' : '')
    + (state.isDark.value === true ? ' q-field--dark' : '')
    + (state.getControl === void 0 ? ' q-field--auto-height' : '')
    + (state.focused.value === true ? ' q-field--focused' : '')
    + (hasError.value === true ? ' q-field--error' : '')
    + (hasError.value === true || state.focused.value === true ? ' q-field--highlighted' : '')
    + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? ' q-field--with-bottom' : '')
    + (props.disable === true ? ' q-field--disabled' : (props.readonly === true ? ' q-field--readonly' : ''))
  );

  const contentClass = computed(() =>
    'q-field__control relative-position row no-wrap'
    + (props.bgColor !== void 0 ? ` bg-${ props.bgColor }` : '')
    + (
      hasError.value === true
        ? ' text-negative'
        : (
            typeof props.standout === 'string' && props.standout.length !== 0 && state.focused.value === true
              ? ` ${ props.standout }`
              : (props.color !== void 0 ? ` text-${ props.color }` : '')
          )
    )
  );

  const hasLabel = computed(() =>
    props.labelSlot === true || props.label !== void 0
  );

  const labelClass = computed(() =>
    'q-field__label no-pointer-events absolute ellipsis'
    + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${ props.labelColor }` : '')
  );

  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));

  const attributes = computed(() => {
    const acc = {};

    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }

    if (props.disable === true) {
      acc[ 'aria-disabled' ] = 'true';
    }

    return acc
  });

  function focusHandler () {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;

    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute('tabindex') === true || (target = target.querySelector('[tabindex]'));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }

  function focus () {
    addFocusFn(focusHandler);
  }

  function blur () {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }

  function onControlFocusin (e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }

    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit('focus', e);
    }
  }

  function onControlFocusout (e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;

      if (
        document.hasFocus() === true && (
          state.hasPopupOpen === true
          || state.controlRef === void 0
          || state.controlRef.value === null
          || state.controlRef.value.contains(document.activeElement) !== false
        )
      ) return

      if (state.focused.value === true) {
        state.focused.value = false;
        emit('blur', e);
      }

      then !== void 0 && then();
    });
  }

  function clearValue (e) {
    // prevent activating the field but keep focus on desktop
    stopAndPrevent(e);

    if ($q.platform.is.mobile !== true) {
      const el = (state.targetRef !== void 0 && state.targetRef.value) || state.rootRef.value;
      el.focus();
    }
    else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }

    if (props.type === 'file') {
      // do not let focus be triggered
      // as it will make the native file dialog
      // appear for another selection
      state.inputRef.value.value = null;
    }

    emit('update:modelValue', null);
    state.changeEvent === true && emit('change', null);
    emit('clear', props.modelValue);

    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }

  function onClearableKeyup (evt) {
    [ 13, 32 ].includes(evt.keyCode) && clearValue(evt);
  }

  function getContent () {
    const node = [];

    slots.prepend !== void 0 && node.push(
      h('div', {
        class: 'q-field__prepend q-field__marginal row no-wrap items-center',
        key: 'prepend',
        onClick: prevent
      }, slots.prepend())
    );

    node.push(
      h('div', {
        class: 'q-field__control-container col relative-position row no-wrap q-anchor--skip'
      }, getControlContainer())
    );

    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode('error', [
        h(__nuxt_component_2, { name: $q.iconSet.field.error, color: 'negative' })
      ])
    );

    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          'inner-loading-append',
          slots.loading !== void 0
            ? slots.loading()
            : [ h(QSpinner, { color: props.color }) ]
        )
      );
    }
    else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode('inner-clearable-append', [
          h(__nuxt_component_2, {
            class: 'q-field__focusable-action',
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: 'button',
            'aria-hidden': 'false',
            'aria-label': $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }

    slots.append !== void 0 && node.push(
      h('div', {
        class: 'q-field__append q-field__marginal row no-wrap items-center',
        key: 'append',
        onClick: prevent
      }, slots.append())
    );

    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode('inner-append', state.getInnerAppend())
    );

    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );

    return node
  }

  function getControlContainer () {
    const node = [];

    props.prefix !== void 0 && props.prefix !== null && node.push(
      h('div', {
        class: 'q-field__prefix no-pointer-events row items-center'
      }, props.prefix)
    );

    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }

    if (state.getControl !== void 0) {
      node.push(state.getControl());
    }
    // internal usage only:
    else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    }
    else if (slots.control !== void 0) {
      node.push(
        h('div', {
          ref: state.targetRef,
          class: 'q-field__native row',
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }

    hasLabel.value === true && node.push(
      h('div', {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );

    props.suffix !== void 0 && props.suffix !== null && node.push(
      h('div', {
        class: 'q-field__suffix no-pointer-events row items-center'
      }, props.suffix)
    );

    return node.concat(hSlot(slots.default))
  }

  function getBottom () {
    let msg, key;

    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [ h('div', { role: 'alert' }, errorMessage.value) ];
        key = `q--slot-error-${ errorMessage.value }`;
      }
      else {
        msg = hSlot(slots.error);
        key = 'q--slot-error';
      }
    }
    else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [ h('div', props.hint) ];
        key = `q--slot-hint-${ props.hint }`;
      }
      else {
        msg = hSlot(slots.hint);
        key = 'q--slot-hint';
      }
    }

    const hasCounter = props.counter === true || slots.counter !== void 0;

    if (
      props.hideBottomSpace === true
      && hasCounter === false
      && msg === void 0
    ) return

    const main = h('div', {
      key,
      class: 'q-field__messages col'
    }, msg);

    return h('div', {
      class: 'q-field__bottom row items-start q-field__bottom--'
        + (props.hideBottomSpace !== true ? 'animated' : 'stale'),
      onClick: prevent
    }, [
      props.hideBottomSpace === true
        ? main
        : h(Transition, { name: 'q-transition--field-message' }, () => main),

      hasCounter === true
        ? h('div', {
          class: 'q-field__counter'
        }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value)
        : null
    ])
  }

  function getInnerAppendNode (key, content) {
    return content === null
      ? null
      : h('div', {
        key,
        class: 'q-field__append q-field__marginal row no-wrap items-center q-anchor--skip'
      }, content)
  }

  let shouldActivate = false;

  onDeactivated(() => {
    shouldActivate = true;
  });

  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });

  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });

  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });

  // expose public methods
  Object.assign(proxy, { focus, blur });

  return function renderField () {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0
      ? {
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0,
          ...attributes.value
        }
      : attributes.value;

    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0
        ? h('div', {
          class: 'q-field__before q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.before())
        : null,

      h('div', {
        class: 'q-field__inner relative-position col self-stretch'
      }, [
        h('div', {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),

        shouldRenderBottom.value === true
          ? getBottom()
          : null
      ]),

      slots.after !== void 0
        ? h('div', {
          class: 'q-field__after q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.after())
        : null
    ])
  }
}

// leave NAMED_MASKS at top of file (code referenced from docs)
const NAMED_MASKS = {
  date: '####/##/##',
  datetime: '####/##/## ##:##',
  time: '##:##',
  fulltime: '##:##:##',
  phone: '(###) ### - ####',
  card: '#### #### #### ####'
};

const TOKENS = {
  '#': { pattern: '[\\d]', negate: '[^\\d]' },

  S: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]' },
  N: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]' },

  A: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  a: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleLowerCase() },

  X: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  x: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleLowerCase() }
};

const KEYS = Object.keys(TOKENS);
KEYS.forEach(key => {
  TOKENS[ key ].regex = new RegExp(TOKENS[ key ].pattern);
});

const
  tokenRegexMask = new RegExp('\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([' + KEYS.join('') + '])|(.)', 'g'),
  escRegex = /[.*+?^${}()|[\]\\]/g;

const MARKER = String.fromCharCode(1);

const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [ Boolean, String ],
  unmaskedValue: Boolean
};

function useMask (props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;

  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());

  function getIsTypeText () {
    return props.autogrow === true
      || [ 'textarea', 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
  }

  watch(() => props.type + props.autogrow, updateMaskInternals);

  watch(() => props.mask, v => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    }
    else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit('update:modelValue', val);
    }
  });

  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });

  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });

  function getInitialMaskedValue () {
    updateMaskInternals();

    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));

      return props.fillMask !== false
        ? fillWithMask(masked)
        : masked
    }

    return props.modelValue
  }

  function getPaddedMaskMarked (size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size)
    }

    let pad = '', localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);

    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }

      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }

    return localMaskMarked
  }

  function updateMaskInternals () {
    hasMask.value = props.mask !== void 0
      && props.mask.length !== 0
      && getIsTypeText();

    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = '';
      maskReplaced = '';
      return
    }

    const
      localComputedMask = NAMED_MASKS[ props.mask ] === void 0
        ? props.mask
        : NAMED_MASKS[ props.mask ],
      fillChar = typeof props.fillMask === 'string' && props.fillMask.length !== 0
        ? props.fillMask.slice(0, 1)
        : '_',
      fillCharEscaped = fillChar.replace(escRegex, '\\$&'),
      unmask = [],
      extract = [],
      mask = [];

    let
      firstMatch = props.reverseFillMask === true,
      unmaskChar = '',
      negateChar = '';

    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[ token ];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push('(?:' + negateChar + '+)?(' + c.pattern + '+)?(?:' + negateChar + '+)?(' + c.pattern + '+)?');
          firstMatch = false;
        }
        extract.push('(?:' + negateChar + '+)?(' + c.pattern + ')?');
      }
      else if (esc !== void 0) {
        unmaskChar = '\\' + (esc === '\\' ? '' : esc);
        mask.push(esc);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
      else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === '\\' ? '\\\\\\\\' : c.replace(escRegex, '\\\\$&');
        mask.push(c);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
    });

    const
      unmaskMatcher = new RegExp(
        '^'
        + unmask.join('')
        + '(' + (unmaskChar === '' ? '.' : '[^' + unmaskChar + ']') + '+)?'
        + (unmaskChar === '' ? '' : '[' + unmaskChar + ']*') + '$'
      ),
      extractLast = extract.length - 1,
      extractMatcher = extract.map((re, index) => {
        if (index === 0 && props.reverseFillMask === true) {
          return new RegExp('^' + fillCharEscaped + '*' + re)
        }
        else if (index === extractLast) {
          return new RegExp(
            '^' + re
            + '(' + (negateChar === '' ? '.' : negateChar) + '+)?'
            + (props.reverseFillMask === true ? '$' : fillCharEscaped + '*')
          )
        }

        return new RegExp('^' + re)
      });

    computedMask = mask;
    computedUnmask = val => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join('');
      }

      const
        extractMatch = [],
        extractMatcherLength = extractMatcher.length;

      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[ i ].exec(str);

        if (m === null) {
          break
        }

        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join('')
      }

      return val
    };
    maskMarked = mask.map(v => (typeof v === 'string' ? v : MARKER)).join('');
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }

  function updateMaskValue (rawVal, updateMaskInternalsFlag, inputType) {
    const
      inp = inputRef.value,
      end = inp.selectionEnd,
      endReverse = inp.value.length - end,
      unmasked = unmaskValue(rawVal);

    // Update here so unmask uses the original fillChar
    updateMaskInternalsFlag === true && updateMaskInternals();

    const
      preMasked = maskValue(unmasked),
      masked = props.fillMask !== false
        ? fillWithMask(preMasked)
        : preMasked,
      changed = innerValue.value !== masked;

    // We want to avoid "flickering" so we set value immediately
    inp.value !== masked && (inp.value = masked);

    changed === true && (innerValue.value = masked);

    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, 'forward');
        return
      }

      if (inputType === 'insertFromPaste' && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        // each non-marker char means we move once to right
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[ i ] !== MARKER) {
            cursor++;
          }
        }

        moveCursor.right(inp, cursor);
        return
      }

      if ([ 'deleteContentBackward', 'deleteContentForward' ].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true
          ? (
              end === 0
                ? (masked.length > preMasked.length ? 1 : 0)
                : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1
            )
          : end;

        inp.setSelectionRange(cursor, cursor, 'forward');
        return
      }

      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));

          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, 'forward');
          }
          else {
            moveCursor.rightReverse(inp, cursor);
          }
        }
        else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, 'backward');
        }
      }
      else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        }
        else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });

    const val = props.unmaskedValue === true
      ? unmaskValue(masked)
      : masked;

    if (
      String(props.modelValue) !== val
      && (props.modelValue !== null || val !== '')
    ) {
      emitValue(val, true);
    }
  }

  function moveCursorForPaste (inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));

    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;

    inp.setSelectionRange(start, end, 'forward');
  }

  const moveCursor = {
    left (inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break
        }
      }

      if (
        i < 0
        && maskMarked[ cursor ] !== void 0
        && maskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.right(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    right (inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          break
        }
        else if (maskMarked[ i - 1 ] === MARKER) {
          cursor = i;
        }
      }

      if (
        i > limit
        && maskMarked[ cursor - 1 ] !== void 0
        && maskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.left(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    },

    leftReverse (inp, cursor) {
      const
        localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          break
        }
        else if (localMaskMarked[ i ] === MARKER) {
          cursor = i;
          if (i === 0) {
            break
          }
        }
      }

      if (
        i < 0
        && localMaskMarked[ cursor ] !== void 0
        && localMaskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.rightReverse(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    rightReverse (inp, cursor) {
      const
        limit = inp.value.length,
        localMaskMarked = getPaddedMaskMarked(limit),
        noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break
        }
      }

      if (
        i > limit
        && localMaskMarked[ cursor - 1 ] !== void 0
        && localMaskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.leftReverse(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    }
  };

  function onMaskedClick (e) {
    emit('click', e);

    selectionAnchor = void 0;
  }

  function onMaskedKeydown (e) {
    emit('keydown', e);

    if (
      shouldIgnoreKey(e) === true
      || e.altKey === true // let browser handle these
    ) return

    const
      inp = inputRef.value,
      start = inp.selectionStart,
      end = inp.selectionEnd;

    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }

    if (e.keyCode === 37 || e.keyCode === 39) { // Left / Right
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === 'forward' ? start : end;
      }

      const fn = moveCursor[ (e.keyCode === 39 ? 'right' : 'left') + (props.reverseFillMask === true ? 'Reverse' : '') ];

      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);

      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), 'forward');
      }
    }
    else if (
      e.keyCode === 8 // Backspace
      && props.reverseFillMask !== true
      && start === end
    ) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, 'backward');
    }
    else if (
      e.keyCode === 46 // Delete
      && props.reverseFillMask === true
      && start === end
    ) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, 'forward');
    }
  }

  function maskValue (val) {
    if (val === void 0 || val === null || val === '') { return '' }

    if (props.reverseFillMask === true) {
      return maskValueReverse(val)
    }

    const mask = computedMask;

    let valIndex = 0, output = '';

    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const
        valChar = val[ valIndex ],
        maskDef = mask[ maskIndex ];

      if (typeof maskDef === 'string') {
        output += maskDef;
        valChar === maskDef && valIndex++;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0
          ? maskDef.transform(valChar)
          : valChar;
        valIndex++;
      }
      else {
        return output
      }
    }

    return output
  }

  function maskValueReverse (val) {
    const
      mask = computedMask,
      firstTokenIndex = maskMarked.indexOf(MARKER);

    let valIndex = val.length - 1, output = '';

    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[ maskIndex ];

      let valChar = val[ valIndex ];

      if (typeof maskDef === 'string') {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[ valIndex ];
        // eslint-disable-next-line no-unmodified-loop-condition
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar))
      }
      else {
        return output
      }
    }

    return output
  }

  function unmaskValue (val) {
    return typeof val !== 'string' || computedUnmask === void 0
      ? (typeof val === 'number' ? computedUnmask('' + val) : val)
      : computedUnmask(val)
  }

  function fillWithMask (val) {
    if (maskReplaced.length - val.length <= 0) {
      return val
    }

    return props.reverseFillMask === true && val.length !== 0
      ? maskReplaced.slice(0, -val.length) + val
      : val + maskReplaced.slice(val.length)
  }

  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  }
}

const useFormProps = {
  name: String
};

function useFormAttrs (props) {
  return computed(() => ({
    type: 'hidden',
    name: props.name,
    value: props.modelValue
  }))
}

function useFormInject (formAttrs = {}) {
  return (child, action, className) => {
    child[ action ](
      h('input', {
        class: 'hidden' + (className || ''),
        ...formAttrs.value
      })
    );
  }
}

function useFormInputNameAttr (props) {
  return computed(() => props.name || props.for)
}

function useFileFormDomProps (props, typeGuard) {
  function getFormDomProps () {
    const model = props.modelValue;

    try {
      const dt = 'DataTransfer' in window
        ? new DataTransfer()
        : ('ClipboardEvent' in window
            ? new ClipboardEvent('').clipboardData
            : void 0
          );

      if (Object(model) === model) {
        ('length' in model
          ? Array.from(model)
          : [ model ]
        ).forEach(file => {
          dt.items.add(file);
        });
      }

      return {
        files: dt.files
      }
    }
    catch (e) {
      return {
        files: void 0
      }
    }
  }

  return computed(() => {
      if (props.type !== 'file') return
      return getFormDomProps()
    })
    
}

const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;

function useKeyComposition (onInput) {
  return function onComposition (e) {
    if (e.type === 'compositionend' || e.type === 'change') {
      if (e.target.qComposing !== true) return
      e.target.qComposing = false;
      onInput(e);
    }
    else if (
      e.type === 'compositionupdate'
      && e.target.qComposing !== true
      && typeof e.data === 'string'
    ) {
      const isComposing = client.is.firefox === true
        ? isPlainText.test(e.data) === false
        : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;

      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  }
}

const __nuxt_component_14 = createComponent({
  name: 'QInput',

  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,

    // override of useFieldProps > modelValue
    modelValue: {} // SSR does not know about FileList
      ,

    shadowText: String,

    type: {
      type: String,
      default: 'text'
    },

    debounce: [ String, Number ],

    autogrow: Boolean, // makes a textarea

    inputClass: [ Array, String, Object ],
    inputStyle: [ Array, String, Object ]
  },

  emits: [
    ...useFieldEmits,
    'paste', 'change',
    'keydown', 'click', 'animationend'
  ],

  setup (props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;

    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);

    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);

    const formDomProps = useFileFormDomProps(props);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));

    const onComposition = useKeyComposition(onInput);

    const state = useFieldState({ changeEvent: true });

    const isTextarea = computed(() =>
      props.type === 'textarea' || props.autogrow === true
    );

    const isTypeText = computed(() =>
      isTextarea.value === true
      || [ 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
    );

    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };

      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;

      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        // reset selection anchor on pointer selection
        evt.onClick = onMaskedClick;
      }

      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }

      return evt
    });

    const inputAttrs = computed(() => {
      const attrs = {
        tabindex: 0,
        'data-autofocus': props.autofocus === true || void 0,
        rows: props.type === 'textarea' ? 6 : void 0,
        'aria-label': props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };

      if (isTextarea.value === false) {
        attrs.type = props.type;
      }

      if (props.autogrow === true) {
        attrs.rows = 1;
      }

      return attrs
    });

    // some browsers lose the native input value
    // so we need to reattach it dynamically
    // (like type="password" <-> type="text"; see #12078)
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });

    watch(() => props.modelValue, v => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) return
        }

        updateMaskValue(v);
      }
      else if (innerValue.value !== v) {
        innerValue.value = v;

        if (
          props.type === 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          if (typedNumber === true) {
            typedNumber = false;
          }
          else {
            delete temp.value;
          }
        }
      }

      // textarea only
      props.autogrow === true && nextTick(adjustHeight);
    });

    watch(() => props.autogrow, val => {
      // textarea only
      if (val === true) {
        nextTick(adjustHeight);
      }
      // if it has a number of rows set respect it
      else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = 'auto';
      }
    });

    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });

    function focus () {
      addFocusFn(() => {
        const el = document.activeElement;
        if (
          inputRef.value !== null
          && inputRef.value !== el
          && (el === null || el.id !== state.targetUid.value)
        ) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }

    function select () {
      inputRef.value !== null && inputRef.value.select();
    }

    function onPaste (e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }

      emit('paste', e);
    }

    function onInput (e) {
      if (!e || !e.target) return

      if (props.type === 'file') {
        emit('update:modelValue', e.target.files);
        return
      }

      const val = e.target.value;

      if (e.target.qComposing === true) {
        temp.value = val;
        return
      }

      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      }
      else {
        emitValue(val);

        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;

          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }

      // we need to trigger it immediately too,
      // to avoid "flickering"
      props.autogrow === true && adjustHeight();
    }

    function onAnimationend (e) {
      emit('animationend', e);
      adjustHeight();
    }

    function emitValue (val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;

        if (
          props.type !== 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          delete temp.value;
        }

        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;

          stopWatcher === true && (stopValueWatcher = true);
          emit('update:modelValue', val);

          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }

        emitValueFn = void 0;
      };

      if (props.type === 'number') {
        typedNumber = true;
        temp.value = val;
      }

      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      }
      else {
        emitValueFn();
      }
    }

    // textarea only
    function adjustHeight () {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          // chrome does not keep scroll #15498
          const { scrollTop } = inp;
          // chrome calculates a smaller scrollHeight when in a .column container
          const { overflowY, maxHeight } = $q.platform.is.firefox === true
            ? {}
            : window.getComputedStyle(inp);
          // on firefox or if overflowY is specified as scroll #14263, #14344
          // we don't touch overflow
          // firefox is not so bad in the end
          const changeOverflow = overflowY !== void 0 && overflowY !== 'scroll';

          // reset height of textarea to a small size to detect the real height
          // but keep the total control size the same
          changeOverflow === true && (inp.style.overflowY = 'hidden');
          parentStyle.marginBottom = (inp.scrollHeight - 1) + 'px';
          inp.style.height = '1px';

          inp.style.height = inp.scrollHeight + 'px';
          // we should allow scrollbars only
          // if there is maxHeight and content is taller than maxHeight
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? 'auto' : 'hidden');
          parentStyle.marginBottom = '';
          inp.scrollTop = scrollTop;
        }
      });
    }

    function onChange (e) {
      onComposition(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn !== void 0 && emitValueFn();

      emit('change', e.target.value);
    }

    function onFinishEditing (e) {
      e !== void 0 && stop(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn !== void 0 && emitValueFn();

      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;

      // we need to use setTimeout instead of this.$nextTick
      // to avoid a bug where focusout is not emitted for type date/time/week/...
      props.type !== 'file' && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : '';
        }
      });
    }

    function getCurValue () {
      return temp.hasOwnProperty('value') === true
        ? temp.value
        : (innerValue.value !== void 0 ? innerValue.value : '')
    }

    onBeforeUnmount(() => {
      onFinishEditing();
    });

    onMounted(() => {
      // textarea only
      props.autogrow === true && adjustHeight();
    });

    Object.assign(state, {
      innerValue,

      fieldClass: computed(() =>
        `q-${ isTextarea.value === true ? 'textarea' : 'input' }`
        + (props.autogrow === true ? ' q-textarea--autogrow' : '')
      ),

      hasShadow: computed(() =>
        props.type !== 'file'
        && typeof props.shadowText === 'string'
        && props.shadowText.length !== 0
      ),

      inputRef,

      emitValue,

      hasValue,

      floatingLabel: computed(() =>
        (
          hasValue.value === true
          && (props.type !== 'number' || isNaN(innerValue.value) === false)
        )
        || fieldValueIsFilled(props.displayValue)
      ),

      getControl: () => {
        return h(isTextarea.value === true ? 'textarea' : 'input', {
          ref: inputRef,
          class: [
            'q-field__native q-placeholder',
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...(
            props.type !== 'file'
              ? { value: getCurValue() }
              : formDomProps.value
          )
        })
      },

      getShadowControl: () => {
        return h('div', {
          class: 'q-field__native q-field__shadow absolute-bottom no-pointer-events'
            + (isTextarea.value === true ? '' : ' text-no-wrap')
        }, [
          h('span', { class: 'invisible' }, getCurValue()),
          h('span', props.shadowText)
        ])
      }
    });

    const renderFn = useField(state);

    // expose public methods
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value // deprecated
    });

    injectProp(proxy, 'nativeEl', () => inputRef.value);

    return renderFn
  }
});

const insetMap = {
  true: 'inset',
  item: 'item-inset',
  'item-thumbnail': 'item-thumbnail-inset'
};

const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};

const __nuxt_component_16 = createComponent({
  name: 'QSeparator',

  props: {
    ...useDarkProps,

    spaced: [ Boolean, String ],
    inset: [ Boolean, String ],
    vertical: Boolean,
    color: String,
    size: String
  },

  setup (props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const orientation = computed(() => (
      props.vertical === true
        ? 'vertical'
        : 'horizontal'
    ));

    const orientClass = computed(() => ` q-separator--${ orientation.value }`);

    const insetClass = computed(() => (
      props.inset !== false
        ? `${ orientClass.value }-${ insetMap[ props.inset ] }`
        : ''
    ));

    const classes = computed(() =>
      `q-separator${ orientClass.value }${ insetClass.value }`
      + (props.color !== void 0 ? ` bg-${ props.color }` : '')
      + (isDark.value === true ? ' q-separator--dark' : '')
    );

    const style = computed(() => {
      const acc = {};

      if (props.size !== void 0) {
        acc[ props.vertical === true ? 'width' : 'height' ] = props.size;
      }

      if (props.spaced !== false) {
        const size = props.spaced === true
          ? `${ margins.md }px`
          : props.spaced in margins ? `${ margins[ props.spaced ] }px` : props.spaced;

        const dir = props.vertical === true
          ? [ 'Left', 'Right' ]
          : [ 'Top', 'Bottom' ];

        acc[ `margin${ dir[ 0 ] }` ] = acc[ `margin${ dir[ 1 ] }` ] = size;
      }

      return acc
    });

    return () => h('hr', {
      class: classes.value,
      style: style.value,
      'aria-orientation': orientation.value
    })
  }
});

const __nuxt_component_17 = createComponent({
  name: 'QPage',

  props: {
    padding: Boolean,
    styleFn: Function
  },

  setup (props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();

    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error('QPage needs to be a deep child of QLayout');
      return emptyRenderFn
    }

    const $pageContainer = inject(pageContainerKey, emptyRenderFn);
    if ($pageContainer === emptyRenderFn) {
      console.error('QPage needs to be child of QPageContainer');
      return emptyRenderFn
    }

    const style = computed(() => {
      const offset
        = ($layout.header.space === true ? $layout.header.size : 0)
        + ($layout.footer.space === true ? $layout.footer.size : 0);

      if (typeof props.styleFn === 'function') {
        const height = $layout.isContainer.value === true
          ? $layout.containerHeight.value
          : $q.screen.height;

        return props.styleFn(offset, height)
      }

      return {
        minHeight: $layout.isContainer.value === true
          ? ($layout.containerHeight.value - offset) + 'px'
          : (
              $q.screen.height === 0
                ? (offset !== 0 ? `calc(100vh - ${ offset }px)` : '100vh')
                : ($q.screen.height - offset) + 'px'
            )
      }
    });

    const classes = computed(() =>
      `q-page${ props.padding === true ? ' q-layout-padding' : '' }`
    );

    return () => h('main', {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default))
  }
});

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const appPageTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.15.4";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
const interpolatePath = (route, match) => {
  return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
function handleHotUpdate(_router, _generateRoutes) {
}
const _routes = [
  {
    name: "about",
    path: "/about",
    component: () => import('./about-DsrmdhxK.mjs')
  },
  {
    name: "carriers",
    path: "/carriers",
    component: () => import('./carriers-B7Jk84it.mjs')
  },
  {
    name: "home-CategoriesSection",
    path: "/home/CategoriesSection",
    component: () => import('./CategoriesSection-CjitmR14.mjs').then(function (n) { return n.C; })
  },
  {
    name: "home-CTASection",
    path: "/home/CTASection",
    component: () => import('./CTASection-DRznes6R.mjs')
  },
  {
    name: "home-FeaturesCoursesSection",
    path: "/home/FeaturesCoursesSection",
    component: () => import('./FeaturesCoursesSection-BHS0E1Ik.mjs')
  },
  {
    name: "home-FooterSection",
    path: "/home/FooterSection",
    component: () => import('./FooterSection-BOZ_zV1e.mjs')
  },
  {
    name: "home-TestimonialsSection",
    path: "/home/TestimonialsSection",
    component: () => import('./TestimonialsSection-VWFzwxJ5.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-CA9kFddk.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    handleHotUpdate(router, routerOptions.routes ? routerOptions.routes : (routes2) => routes2);
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const prismaClientSingleton = () => {
  return new PrismaClient();
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
const plugin_wnHB2iVUV4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "prisma-client",
  enforce: "pre",
  async setup() {
    return {
      provide: {
        prisma
      }
    };
  },
  env: {
    islands: true
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
{
  reducers.push(["Island", (data) => data && (data == null ? void 0 : data.__nuxt_island)]);
}
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const cfg0 = defineAppConfig({
  // Configure Quasar's Vue plugin (with HMR support)
  nuxtQuasar: {
    brand: {
      primary: "#3993DD"
    }
  }
});
const inlineConfig = {
  "nuxt": {}
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}
const componentsWithDefaults = {};
const appConfigKey = "nuxtQuasar";
const quasarNuxtConfig = {
  lang,
  iconSet,
  components: { "defaults": {} },
  plugins: {}
};
function omit(object, keys) {
  return Object.keys(object).reduce((output, key) => {
    if (!keys.includes(key)) {
      output[key] = object[key];
    }
    return output;
  }, {});
}
const plugin_sb2LSEEy8f = /* @__PURE__ */ defineNuxtPlugin((nuxt) => {
  const quasarAppConfig = useAppConfig()[appConfigKey];
  const { lang: lang2, iconSet: iconSet2, plugins: plugins2, components } = quasarNuxtConfig;
  let ssrContext;
  let quasarProxy;
  let config = defuFn(quasarAppConfig, omit(quasarNuxtConfig.config || {}, ["brand"]));
  {
    const BRAND_RE = /--q-[\w-]+:.+?;/g;
    const meta = reactive({
      bodyClasses: "",
      htmlAttrs: "",
      endingHeadTags: ""
    });
    const htmlAttrsRecord = computed(
      () => Object.fromEntries(
        meta.htmlAttrs.split(" ").map((attr) => attr.split("="))
      )
    );
    const bodyStyles = computed(() => {
      return [...meta.endingHeadTags.matchAll(BRAND_RE)].map((match) => match[0]).join("");
    });
    useHead(
      computed(() => ({
        bodyAttrs: {
          class: meta.bodyClasses,
          style: bodyStyles.value
        },
        htmlAttrs: htmlAttrsRecord.value
      }))
    );
    ssrContext = {
      req: nuxt.ssrContext.event.node.req,
      res: nuxt.ssrContext.event.node.res
    };
    quasarProxy = {
      install({ ssrContext: ssrContext2 }) {
        meta.bodyClasses = ssrContext2._meta.bodyClasses;
        meta.htmlAttrs = ssrContext2._meta.htmlAttrs;
        meta.endingHeadTags = ssrContext2._meta.endingHeadTags;
        ssrContext2._meta = new Proxy({}, {
          get(target, key) {
            return meta[key] ?? target[key];
          },
          set(target, key, value) {
            if (typeof meta[key] === "string") {
              meta[key] = value;
            } else {
              target[key] = value;
            }
            return true;
          }
        });
      }
    };
  }
  nuxt.vueApp.use(Quasar, {
    lang: lang2,
    iconSet: iconSet2,
    plugins: {
      quasarProxy,
      ...plugins2
    },
    config
    // @ts-expect-error Private Argument
  }, ssrContext);
  const quasar = useQuasar();
  const asDefault = (value) => value && typeof value === "object" ? () => value : value;
  for (const [name, propDefaults] of Object.entries(components.defaults || {})) {
    const component = componentsWithDefaults[name];
    for (const [propName, defaultValue] of Object.entries(propDefaults)) {
      const propConfig = component.props[propName];
      if (Array.isArray(propConfig) || typeof propConfig === "function") {
        component.props[propName] = {
          type: propConfig,
          default: asDefault(defaultValue)
        };
      } else if (typeof propConfig === "object") {
        if (propConfig) {
          propConfig.default = asDefault(defaultValue);
        } else {
          component.props[propName] = {
            default: asDefault(defaultValue)
          };
        }
      } else {
        throw new TypeError(`Unexpected prop definition type used at ${name}.props.${propName}, please open an issue.`);
      }
    }
  }
  return {
    provide: {
      q: quasar
    }
  };
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  plugin_wnHB2iVUV4,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  plugin_sb2LSEEy8f
];
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          {
            vnode = h(Suspense, {
              suspensible: true
            }, {
              default: () => {
                const providerVNode = h(RouteProvider, {
                  key: key || void 0,
                  vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                  route: routeProps.route,
                  renderKey: key || void 0,
                  vnodeRef: pageRef
                });
                return providerVNode;
              }
            });
            return vnode;
          }
        }
      });
    };
  }
});
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _imports_0 = publicAssetsURL("/img/brand.png");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_q_layout = __nuxt_component_0$2;
  const _component_q_page_container = __nuxt_component_1;
  const _component_q_header = __nuxt_component_2$1;
  const _component_q_toolbar = __nuxt_component_3;
  const _component_q_toolbar_title = __nuxt_component_4;
  const _component_q_space = __nuxt_component_5;
  const _component_q_btn = __nuxt_component_0$1;
  const _component_q_btn_dropdown = __nuxt_component_7;
  const _component_q_list = __nuxt_component_8;
  const _component_q_item = __nuxt_component_9;
  const _component_q_item_section = __nuxt_component_10;
  const _component_q_avatar = __nuxt_component_11;
  const _component_q_icon = __nuxt_component_2;
  const _component_q_item_label = __nuxt_component_13;
  const _component_q_input = __nuxt_component_14;
  const _component_q_menu = __nuxt_component_15;
  const _component_q_separator = __nuxt_component_16;
  const _component_q_page = __nuxt_component_17;
  const _directive_ripple = __q_directive_0;
  _push(ssrRenderComponent(_component_q_layout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_q_page_container, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_q_header, { class: "bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-3 border-b border-gray-300/50" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_q_toolbar, { class: "container mx-auto" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_q_toolbar_title, { class: "no-wrap" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<div class="flex items-center"${_scopeId5}><a href="/" class="font-bold no-underline group"${_scopeId5}><img${ssrRenderAttr("src", _imports_0)} class="w-[100px] h-[45px]"${_scopeId5}></a></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode("a", {
                                      href: "/",
                                      class: "font-bold no-underline group"
                                    }, [
                                      createVNode("img", {
                                        src: _imports_0,
                                        class: "w-[100px] h-[45px]"
                                      })
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_space, null, null, _parent5, _scopeId4));
                          _push5(`<div class="hidden md:flex items-center space-x-3 mr-5"${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            "no-caps": "",
                            to: "/",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Home `);
                              } else {
                                return [
                                  createTextVNode(" Home ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_btn_dropdown, {
                            flat: "",
                            "no-caps": "",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            label: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<div class="flex items-center"${_scopeId5}><span${_scopeId5}>Courses</span></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode("span", null, "Courses")
                                  ])
                                ];
                              }
                            }),
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item, mergeProps({
                                        clickable: "",
                                        to: "/services/web",
                                        class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_avatar, {
                                                    size: "md",
                                                    class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, { name: "web" }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, { name: "web" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_avatar, {
                                                      size: "md",
                                                      class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, { name: "web" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item_section, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Web Development`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Web Development")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-blue-600"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Custom websites &amp; apps`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Custom websites & apps")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Web Development")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_label, {
                                                      caption: "",
                                                      class: "text-blue-600"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Custom websites & apps")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_icon, {
                                                    name: "arrow_forward_ios",
                                                    size: "xs",
                                                    class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                                  }, null, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_icon, {
                                                      name: "arrow_forward_ios",
                                                      size: "xs",
                                                      class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_avatar, {
                                                    size: "md",
                                                    class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, { name: "web" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Web Development")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-blue-600"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Custom websites & apps")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "arrow_forward_ios",
                                                    size: "xs",
                                                    class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item, mergeProps({
                                        clickable: "",
                                        to: "/services/mobile",
                                        class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_avatar, {
                                                    size: "md",
                                                    class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, { name: "phone_android" }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, { name: "phone_android" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_avatar, {
                                                      size: "md",
                                                      class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, { name: "phone_android" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item_section, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Mobile Development`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Mobile Development")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-green-600"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`iOS &amp; Android apps`);
                                                      } else {
                                                        return [
                                                          createTextVNode("iOS & Android apps")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Mobile Development")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_label, {
                                                      caption: "",
                                                      class: "text-green-600"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("iOS & Android apps")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_icon, {
                                                    name: "arrow_forward_ios",
                                                    size: "xs",
                                                    class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                                  }, null, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_icon, {
                                                      name: "arrow_forward_ios",
                                                      size: "xs",
                                                      class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_avatar, {
                                                    size: "md",
                                                    class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, { name: "phone_android" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Mobile Development")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-green-600"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("iOS & Android apps")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "arrow_forward_ios",
                                                    size: "xs",
                                                    class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item, mergeProps({
                                        clickable: "",
                                        to: "/services/cloud",
                                        class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_avatar, {
                                                    size: "md",
                                                    class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, { name: "cloud" }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, { name: "cloud" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_avatar, {
                                                      size: "md",
                                                      class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, { name: "cloud" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item_section, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Cloud Services`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Cloud Services")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-purple-600"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Scalable cloud solutions`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Scalable cloud solutions")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Cloud Services")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_label, {
                                                      caption: "",
                                                      class: "text-purple-600"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Scalable cloud solutions")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_icon, {
                                                    name: "arrow_forward_ios",
                                                    size: "xs",
                                                    class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                                  }, null, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_icon, {
                                                      name: "arrow_forward_ios",
                                                      size: "xs",
                                                      class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_avatar, {
                                                    size: "md",
                                                    class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, { name: "cloud" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Cloud Services")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_label, {
                                                    caption: "",
                                                    class: "text-purple-600"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Scalable cloud solutions")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, { side: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "arrow_forward_ios",
                                                    size: "xs",
                                                    class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          to: "/services/web",
                                          class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_avatar, {
                                                  size: "md",
                                                  class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, { name: "web" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Web Development")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-blue-600"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Custom websites & apps")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "arrow_forward_ios",
                                                  size: "xs",
                                                  class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ]),
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          to: "/services/mobile",
                                          class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_avatar, {
                                                  size: "md",
                                                  class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, { name: "phone_android" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Mobile Development")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-green-600"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("iOS & Android apps")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "arrow_forward_ios",
                                                  size: "xs",
                                                  class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ]),
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          to: "/services/cloud",
                                          class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_avatar, {
                                                  size: "md",
                                                  class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, { name: "cloud" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Cloud Services")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_label, {
                                                  caption: "",
                                                  class: "text-purple-600"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Scalable cloud solutions")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, { side: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "arrow_forward_ios",
                                                  size: "xs",
                                                  class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                                    default: withCtx(() => [
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/services/web",
                                        class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                size: "md",
                                                class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, { name: "web" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Web Development")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-blue-600"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Custom websites & apps")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "arrow_forward_ios",
                                                size: "xs",
                                                class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/services/mobile",
                                        class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                size: "md",
                                                class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, { name: "phone_android" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Mobile Development")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-green-600"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("iOS & Android apps")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "arrow_forward_ios",
                                                size: "xs",
                                                class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/services/cloud",
                                        class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                size: "md",
                                                class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, { name: "cloud" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cloud Services")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-purple-600"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Scalable cloud solutions")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "arrow_forward_ios",
                                                size: "xs",
                                                class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            "no-caps": "",
                            to: "/about",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` About `);
                              } else {
                                return [
                                  createTextVNode(" About ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            "no-caps": "",
                            to: "/carriers",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Carriers `);
                              } else {
                                return [
                                  createTextVNode(" Carriers ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(`</div><div class="hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10"${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_q_icon, {
                            name: "search",
                            class: "text-white/70 q-mr-sm"
                          }, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_input, {
                            dense: "",
                            borderless: "",
                            placeholder: "Search...",
                            class: "text-white",
                            dark: ""
                          }, {
                            append: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                if (_ctx.search) {
                                  _push6(ssrRenderComponent(_component_q_icon, {
                                    name: "close",
                                    class: "cursor-pointer text-white/70 hover:text-white",
                                    onClick: ($event) => _ctx.search = ""
                                  }, null, _parent6, _scopeId5));
                                } else {
                                  _push6(`<!---->`);
                                }
                              } else {
                                return [
                                  _ctx.search ? (openBlock(), createBlock(_component_q_icon, {
                                    key: 0,
                                    name: "close",
                                    class: "cursor-pointer text-white/70 hover:text-white",
                                    onClick: ($event) => _ctx.search = ""
                                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(`</div>`);
                          _push5(ssrRenderComponent(_component_q_btn, {
                            unelevated: "",
                            "no-caps": "",
                            to: "/auth/signin",
                            class: "ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_icon, {
                                  name: "login",
                                  class: "q-mr-sm"
                                }, null, _parent6, _scopeId5));
                                _push6(` Sign In `);
                              } else {
                                return [
                                  createVNode(_component_q_icon, {
                                    name: "login",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" Sign In ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "menu",
                            class: "md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_menu, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_list, {
                                        style: { "min-width": "220px" },
                                        class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_item, mergeProps({
                                              clickable: "",
                                              to: "/",
                                              class: "hover:bg-blue-50 mx-2 rounded-md"
                                            }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, {
                                                          name: "home",
                                                          color: "blue-7"
                                                        }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, {
                                                            name: "home",
                                                            color: "blue-7"
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Home`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Home")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: "home",
                                                          color: "blue-7"
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Home")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item, mergeProps({
                                              clickable: "",
                                              to: "/about",
                                              class: "hover:bg-blue-50 mx-2 rounded-md"
                                            }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, {
                                                          name: "info",
                                                          color: "blue-7"
                                                        }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, {
                                                            name: "info",
                                                            color: "blue-7"
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`About`);
                                                      } else {
                                                        return [
                                                          createTextVNode("About")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: "info",
                                                          color: "blue-7"
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("About")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item, mergeProps({
                                              clickable: "",
                                              to: "/carriers",
                                              class: "hover:bg-blue-50 mx-2 rounded-md"
                                            }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, {
                                                          name: "local_shipping",
                                                          color: "blue-7"
                                                        }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, {
                                                            name: "local_shipping",
                                                            color: "blue-7"
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Carriers`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Carriers")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: "local_shipping",
                                                          color: "blue-7"
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Carriers")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_separator, { class: "my-1" }, null, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_q_item, mergeProps({
                                              clickable: "",
                                              class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                            }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(ssrRenderComponent(_component_q_icon, {
                                                          name: "login",
                                                          color: "blue-7"
                                                        }, null, _parent10, _scopeId9));
                                                      } else {
                                                        return [
                                                          createVNode(_component_q_icon, {
                                                            name: "login",
                                                            color: "blue-7"
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                  _push9(ssrRenderComponent(_component_q_item_section, null, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        _push10(`Sign In`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Sign In")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_q_icon, {
                                                          name: "login",
                                                          color: "blue-7"
                                                        })
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_q_item_section, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Sign In")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                                clickable: "",
                                                to: "/",
                                                class: "hover:bg-blue-50 mx-2 rounded-md"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "home",
                                                        color: "blue-7"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Home")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })), [
                                                [_directive_ripple]
                                              ]),
                                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                                clickable: "",
                                                to: "/about",
                                                class: "hover:bg-blue-50 mx-2 rounded-md"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "info",
                                                        color: "blue-7"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("About")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })), [
                                                [_directive_ripple]
                                              ]),
                                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                                clickable: "",
                                                to: "/carriers",
                                                class: "hover:bg-blue-50 mx-2 rounded-md"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "local_shipping",
                                                        color: "blue-7"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Carriers")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })), [
                                                [_directive_ripple]
                                              ]),
                                              createVNode(_component_q_separator, { class: "my-1" }),
                                              withDirectives((openBlock(), createBlock(_component_q_item, {
                                                clickable: "",
                                                class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_item_section, { avatar: "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_q_icon, {
                                                        name: "login",
                                                        color: "blue-7"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_q_item_section, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Sign In")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })), [
                                                [_directive_ripple]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_q_list, {
                                          style: { "min-width": "220px" },
                                          class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                                        }, {
                                          default: withCtx(() => [
                                            withDirectives((openBlock(), createBlock(_component_q_item, {
                                              clickable: "",
                                              to: "/",
                                              class: "hover:bg-blue-50 mx-2 rounded-md"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, { avatar: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "home",
                                                      color: "blue-7"
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Home")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })), [
                                              [_directive_ripple]
                                            ]),
                                            withDirectives((openBlock(), createBlock(_component_q_item, {
                                              clickable: "",
                                              to: "/about",
                                              class: "hover:bg-blue-50 mx-2 rounded-md"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, { avatar: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "info",
                                                      color: "blue-7"
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("About")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })), [
                                              [_directive_ripple]
                                            ]),
                                            withDirectives((openBlock(), createBlock(_component_q_item, {
                                              clickable: "",
                                              to: "/carriers",
                                              class: "hover:bg-blue-50 mx-2 rounded-md"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, { avatar: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "local_shipping",
                                                      color: "blue-7"
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Carriers")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })), [
                                              [_directive_ripple]
                                            ]),
                                            createVNode(_component_q_separator, { class: "my-1" }),
                                            withDirectives((openBlock(), createBlock(_component_q_item, {
                                              clickable: "",
                                              class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_item_section, { avatar: "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_q_icon, {
                                                      name: "login",
                                                      color: "blue-7"
                                                    })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_q_item_section, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Sign In")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })), [
                                              [_directive_ripple]
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_q_menu, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_list, {
                                        style: { "min-width": "220px" },
                                        class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives((openBlock(), createBlock(_component_q_item, {
                                            clickable: "",
                                            to: "/",
                                            class: "hover:bg-blue-50 mx-2 rounded-md"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "home",
                                                    color: "blue-7"
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Home")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })), [
                                            [_directive_ripple]
                                          ]),
                                          withDirectives((openBlock(), createBlock(_component_q_item, {
                                            clickable: "",
                                            to: "/about",
                                            class: "hover:bg-blue-50 mx-2 rounded-md"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "info",
                                                    color: "blue-7"
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("About")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })), [
                                            [_directive_ripple]
                                          ]),
                                          withDirectives((openBlock(), createBlock(_component_q_item, {
                                            clickable: "",
                                            to: "/carriers",
                                            class: "hover:bg-blue-50 mx-2 rounded-md"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "local_shipping",
                                                    color: "blue-7"
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Carriers")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })), [
                                            [_directive_ripple]
                                          ]),
                                          createVNode(_component_q_separator, { class: "my-1" }),
                                          withDirectives((openBlock(), createBlock(_component_q_item, {
                                            clickable: "",
                                            class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_section, { avatar: "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, {
                                                    name: "login",
                                                    color: "blue-7"
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_section, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Sign In")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })), [
                                            [_directive_ripple]
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
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_q_toolbar_title, { class: "no-wrap" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("a", {
                                    href: "/",
                                    class: "font-bold no-underline group"
                                  }, [
                                    createVNode("img", {
                                      src: _imports_0,
                                      class: "w-[100px] h-[45px]"
                                    })
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_space),
                            createVNode("div", { class: "hidden md:flex items-center space-x-3 mr-5" }, [
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                to: "/",
                                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Home ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_btn_dropdown, {
                                flat: "",
                                "no-caps": "",
                                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                              }, {
                                label: withCtx(() => [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode("span", null, "Courses")
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                                    default: withCtx(() => [
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/services/web",
                                        class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                size: "md",
                                                class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, { name: "web" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Web Development")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-blue-600"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Custom websites & apps")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "arrow_forward_ios",
                                                size: "xs",
                                                class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/services/mobile",
                                        class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                size: "md",
                                                class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, { name: "phone_android" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Mobile Development")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-green-600"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("iOS & Android apps")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "arrow_forward_ios",
                                                size: "xs",
                                                class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/services/cloud",
                                        class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_avatar, {
                                                size: "md",
                                                class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_q_icon, { name: "cloud" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Cloud Services")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_q_item_label, {
                                                caption: "",
                                                class: "text-purple-600"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Scalable cloud solutions")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, { side: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "arrow_forward_ios",
                                                size: "xs",
                                                class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                to: "/about",
                                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" About ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_q_btn, {
                                flat: "",
                                "no-caps": "",
                                to: "/carriers",
                                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Carriers ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10" }, [
                              createVNode(_component_q_icon, {
                                name: "search",
                                class: "text-white/70 q-mr-sm"
                              }),
                              createVNode(_component_q_input, {
                                dense: "",
                                borderless: "",
                                placeholder: "Search...",
                                class: "text-white",
                                dark: ""
                              }, {
                                append: withCtx(() => [
                                  _ctx.search ? (openBlock(), createBlock(_component_q_icon, {
                                    key: 0,
                                    name: "close",
                                    class: "cursor-pointer text-white/70 hover:text-white",
                                    onClick: ($event) => _ctx.search = ""
                                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_q_btn, {
                              unelevated: "",
                              "no-caps": "",
                              to: "/auth/signin",
                              class: "ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_icon, {
                                  name: "login",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" Sign In ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn, {
                              flat: "",
                              dense: "",
                              round: "",
                              icon: "menu",
                              class: "md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_q_menu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_list, {
                                      style: { "min-width": "220px" },
                                      class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          to: "/",
                                          class: "hover:bg-blue-50 mx-2 rounded-md"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "home",
                                                  color: "blue-7"
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Home")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ]),
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          to: "/about",
                                          class: "hover:bg-blue-50 mx-2 rounded-md"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "info",
                                                  color: "blue-7"
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createTextVNode("About")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ]),
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          to: "/carriers",
                                          class: "hover:bg-blue-50 mx-2 rounded-md"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "local_shipping",
                                                  color: "blue-7"
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Carriers")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ]),
                                        createVNode(_component_q_separator, { class: "my-1" }),
                                        withDirectives((openBlock(), createBlock(_component_q_item, {
                                          clickable: "",
                                          class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_section, { avatar: "" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, {
                                                  name: "login",
                                                  color: "blue-7"
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_section, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Sign In")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })), [
                                          [_directive_ripple]
                                        ])
                                      ]),
                                      _: 1
                                    })
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_q_toolbar, { class: "container mx-auto" }, {
                        default: withCtx(() => [
                          createVNode(_component_q_toolbar_title, { class: "no-wrap" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("a", {
                                  href: "/",
                                  class: "font-bold no-underline group"
                                }, [
                                  createVNode("img", {
                                    src: _imports_0,
                                    class: "w-[100px] h-[45px]"
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_space),
                          createVNode("div", { class: "hidden md:flex items-center space-x-3 mr-5" }, [
                            createVNode(_component_q_btn, {
                              flat: "",
                              "no-caps": "",
                              to: "/",
                              class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Home ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn_dropdown, {
                              flat: "",
                              "no-caps": "",
                              class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                            }, {
                              label: withCtx(() => [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("span", null, "Courses")
                                ])
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                                  default: withCtx(() => [
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      to: "/services/web",
                                      class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_avatar, {
                                              size: "md",
                                              class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, { name: "web" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Web Development")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-blue-600"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Custom websites & apps")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, { side: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "arrow_forward_ios",
                                              size: "xs",
                                              class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ]),
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      to: "/services/mobile",
                                      class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_avatar, {
                                              size: "md",
                                              class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, { name: "phone_android" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Mobile Development")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-green-600"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("iOS & Android apps")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, { side: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "arrow_forward_ios",
                                              size: "xs",
                                              class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ]),
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      to: "/services/cloud",
                                      class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_avatar, {
                                              size: "md",
                                              class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_q_icon, { name: "cloud" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Cloud Services")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_q_item_label, {
                                              caption: "",
                                              class: "text-purple-600"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Scalable cloud solutions")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, { side: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "arrow_forward_ios",
                                              size: "xs",
                                              class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn, {
                              flat: "",
                              "no-caps": "",
                              to: "/about",
                              class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" About ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_q_btn, {
                              flat: "",
                              "no-caps": "",
                              to: "/carriers",
                              class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Carriers ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10" }, [
                            createVNode(_component_q_icon, {
                              name: "search",
                              class: "text-white/70 q-mr-sm"
                            }),
                            createVNode(_component_q_input, {
                              dense: "",
                              borderless: "",
                              placeholder: "Search...",
                              class: "text-white",
                              dark: ""
                            }, {
                              append: withCtx(() => [
                                _ctx.search ? (openBlock(), createBlock(_component_q_icon, {
                                  key: 0,
                                  name: "close",
                                  class: "cursor-pointer text-white/70 hover:text-white",
                                  onClick: ($event) => _ctx.search = ""
                                }, null, 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_q_btn, {
                            unelevated: "",
                            "no-caps": "",
                            to: "/auth/signin",
                            class: "ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_icon, {
                                name: "login",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" Sign In ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_btn, {
                            flat: "",
                            dense: "",
                            round: "",
                            icon: "menu",
                            class: "md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_q_menu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_q_list, {
                                    style: { "min-width": "220px" },
                                    class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/",
                                        class: "hover:bg-blue-50 mx-2 rounded-md"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "home",
                                                color: "blue-7"
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Home")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/about",
                                        class: "hover:bg-blue-50 mx-2 rounded-md"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "info",
                                                color: "blue-7"
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createTextVNode("About")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        to: "/carriers",
                                        class: "hover:bg-blue-50 mx-2 rounded-md"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "local_shipping",
                                                color: "blue-7"
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Carriers")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ]),
                                      createVNode(_component_q_separator, { class: "my-1" }),
                                      withDirectives((openBlock(), createBlock(_component_q_item, {
                                        clickable: "",
                                        class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_section, { avatar: "" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, {
                                                name: "login",
                                                color: "blue-7"
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_section, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Sign In")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })), [
                                        [_directive_ripple]
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
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
              _push3(ssrRenderComponent(_component_q_page, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_q_header, { class: "bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-3 border-b border-gray-300/50" }, {
                  default: withCtx(() => [
                    createVNode(_component_q_toolbar, { class: "container mx-auto" }, {
                      default: withCtx(() => [
                        createVNode(_component_q_toolbar_title, { class: "no-wrap" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("a", {
                                href: "/",
                                class: "font-bold no-underline group"
                              }, [
                                createVNode("img", {
                                  src: _imports_0,
                                  class: "w-[100px] h-[45px]"
                                })
                              ])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_space),
                        createVNode("div", { class: "hidden md:flex items-center space-x-3 mr-5" }, [
                          createVNode(_component_q_btn, {
                            flat: "",
                            "no-caps": "",
                            to: "/",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Home ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_btn_dropdown, {
                            flat: "",
                            "no-caps": "",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            label: withCtx(() => [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("span", null, "Courses")
                              ])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                                default: withCtx(() => [
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    to: "/services/web",
                                    class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_avatar, {
                                            size: "md",
                                            class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, { name: "web" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Web Development")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-blue-600"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Custom websites & apps")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, { side: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "arrow_forward_ios",
                                            size: "xs",
                                            class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    to: "/services/mobile",
                                    class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_avatar, {
                                            size: "md",
                                            class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, { name: "phone_android" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Mobile Development")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-green-600"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("iOS & Android apps")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, { side: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "arrow_forward_ios",
                                            size: "xs",
                                            class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    to: "/services/cloud",
                                    class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_avatar, {
                                            size: "md",
                                            class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_q_icon, { name: "cloud" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Cloud Services")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_q_item_label, {
                                            caption: "",
                                            class: "text-purple-600"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Scalable cloud solutions")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, { side: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "arrow_forward_ios",
                                            size: "xs",
                                            class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_btn, {
                            flat: "",
                            "no-caps": "",
                            to: "/about",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" About ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_q_btn, {
                            flat: "",
                            "no-caps": "",
                            to: "/carriers",
                            class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Carriers ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10" }, [
                          createVNode(_component_q_icon, {
                            name: "search",
                            class: "text-white/70 q-mr-sm"
                          }),
                          createVNode(_component_q_input, {
                            dense: "",
                            borderless: "",
                            placeholder: "Search...",
                            class: "text-white",
                            dark: ""
                          }, {
                            append: withCtx(() => [
                              _ctx.search ? (openBlock(), createBlock(_component_q_icon, {
                                key: 0,
                                name: "close",
                                class: "cursor-pointer text-white/70 hover:text-white",
                                onClick: ($event) => _ctx.search = ""
                              }, null, 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_component_q_btn, {
                          unelevated: "",
                          "no-caps": "",
                          to: "/auth/signin",
                          class: "ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "login",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" Sign In ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_btn, {
                          flat: "",
                          dense: "",
                          round: "",
                          icon: "menu",
                          class: "md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_menu, null, {
                              default: withCtx(() => [
                                createVNode(_component_q_list, {
                                  style: { "min-width": "220px" },
                                  class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      to: "/",
                                      class: "hover:bg-blue-50 mx-2 rounded-md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "home",
                                              color: "blue-7"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Home")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ]),
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      to: "/about",
                                      class: "hover:bg-blue-50 mx-2 rounded-md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "info",
                                              color: "blue-7"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createTextVNode("About")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ]),
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      to: "/carriers",
                                      class: "hover:bg-blue-50 mx-2 rounded-md"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "local_shipping",
                                              color: "blue-7"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Carriers")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ]),
                                    createVNode(_component_q_separator, { class: "my-1" }),
                                    withDirectives((openBlock(), createBlock(_component_q_item, {
                                      clickable: "",
                                      class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_section, { avatar: "" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, {
                                              name: "login",
                                              color: "blue-7"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_section, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Sign In")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })), [
                                      [_directive_ripple]
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_q_page, null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_q_page_container, null, {
            default: withCtx(() => [
              createVNode(_component_q_header, { class: "bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-3 border-b border-gray-300/50" }, {
                default: withCtx(() => [
                  createVNode(_component_q_toolbar, { class: "container mx-auto" }, {
                    default: withCtx(() => [
                      createVNode(_component_q_toolbar_title, { class: "no-wrap" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("a", {
                              href: "/",
                              class: "font-bold no-underline group"
                            }, [
                              createVNode("img", {
                                src: _imports_0,
                                class: "w-[100px] h-[45px]"
                              })
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_space),
                      createVNode("div", { class: "hidden md:flex items-center space-x-3 mr-5" }, [
                        createVNode(_component_q_btn, {
                          flat: "",
                          "no-caps": "",
                          to: "/",
                          class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Home ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_btn_dropdown, {
                          flat: "",
                          "no-caps": "",
                          class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                        }, {
                          label: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", null, "Courses")
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                              default: withCtx(() => [
                                withDirectives((openBlock(), createBlock(_component_q_item, {
                                  clickable: "",
                                  to: "/services/web",
                                  class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_avatar, {
                                          size: "md",
                                          class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, { name: "web" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Web Development")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-blue-600"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Custom websites & apps")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "arrow_forward_ios",
                                          size: "xs",
                                          class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_ripple]
                                ]),
                                withDirectives((openBlock(), createBlock(_component_q_item, {
                                  clickable: "",
                                  to: "/services/mobile",
                                  class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_avatar, {
                                          size: "md",
                                          class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, { name: "phone_android" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Mobile Development")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-green-600"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("iOS & Android apps")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "arrow_forward_ios",
                                          size: "xs",
                                          class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_ripple]
                                ]),
                                withDirectives((openBlock(), createBlock(_component_q_item, {
                                  clickable: "",
                                  to: "/services/cloud",
                                  class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_q_item_section, { avatar: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_avatar, {
                                          size: "md",
                                          class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_q_icon, { name: "cloud" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Cloud Services")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_q_item_label, {
                                          caption: "",
                                          class: "text-purple-600"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Scalable cloud solutions")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_q_item_section, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_q_icon, {
                                          name: "arrow_forward_ios",
                                          size: "xs",
                                          class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [_directive_ripple]
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_btn, {
                          flat: "",
                          "no-caps": "",
                          to: "/about",
                          class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" About ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_q_btn, {
                          flat: "",
                          "no-caps": "",
                          to: "/carriers",
                          class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Carriers ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10" }, [
                        createVNode(_component_q_icon, {
                          name: "search",
                          class: "text-white/70 q-mr-sm"
                        }),
                        createVNode(_component_q_input, {
                          dense: "",
                          borderless: "",
                          placeholder: "Search...",
                          class: "text-white",
                          dark: ""
                        }, {
                          append: withCtx(() => [
                            _ctx.search ? (openBlock(), createBlock(_component_q_icon, {
                              key: 0,
                              name: "close",
                              class: "cursor-pointer text-white/70 hover:text-white",
                              onClick: ($event) => _ctx.search = ""
                            }, null, 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(_component_q_btn, {
                        unelevated: "",
                        "no-caps": "",
                        to: "/auth/signin",
                        class: "ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "login",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" Sign In ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_q_btn, {
                        flat: "",
                        dense: "",
                        round: "",
                        icon: "menu",
                        class: "md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_q_list, {
                                style: { "min-width": "220px" },
                                class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                              }, {
                                default: withCtx(() => [
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    to: "/",
                                    class: "hover:bg-blue-50 mx-2 rounded-md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "home",
                                            color: "blue-7"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Home")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    to: "/about",
                                    class: "hover:bg-blue-50 mx-2 rounded-md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "info",
                                            color: "blue-7"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("About")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ]),
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    to: "/carriers",
                                    class: "hover:bg-blue-50 mx-2 rounded-md"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "local_shipping",
                                            color: "blue-7"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Carriers")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ]),
                                  createVNode(_component_q_separator, { class: "my-1" }),
                                  withDirectives((openBlock(), createBlock(_component_q_item, {
                                    clickable: "",
                                    class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_q_icon, {
                                            name: "login",
                                            color: "blue-7"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_q_item_section, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Sign In")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })), [
                                    [_directive_ripple]
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_q_page, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layout/MainLayout.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(ssrRenderComponent(MainLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-QguIWMrb.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-D6zENCqo.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./island-renderer-BqqhlQxV.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _: _export_sfc,
  a: useNuxtApp,
  b: useRuntimeConfig,
  c: createError,
  d: nuxtLinkDefaults,
  default: entry$1,
  e: useHead,
  f: useSeoMeta,
  g: asyncDataDefaults,
  h: fetchDefaults,
  i: injectHead,
  n: navigateTo,
  r: resolveRouteObject,
  u: useRouter
});

export { navigateTo as $, scrollTargetProp as A, validateOffset as B, validatePosition as C, useModelToggleProps as D, useAnchorStaticProps as E, parsePosition as F, useTick as G, useTimeout as H, useTransition as I, useScrollTarget as J, useAnchor as K, useModelToggle as L, usePortal as M, addClickOutside as N, removeClickOutside as O, cleanEvt as P, setPosition as Q, clearSelection as R, addEvt as S, getScrollTarget as T, useFormProps as U, useFormAttrs as V, useFormInject as W, hSlot as X, useRouter as Y, resolveRouteObject as Z, __nuxt_component_0$2 as _, __nuxt_component_1 as a, nuxtLinkDefaults as a0, injectHead as a1, server as a2, __nuxt_component_17 as b, _export_sfc as c, useRuntimeConfig as d, useHead as e, __nuxt_component_0$1 as f, __nuxt_component_11 as g, __nuxt_component_2 as h, __nuxt_component_14 as i, createComponent as j, useSizeProps as k, useDarkProps as l, useDark as m, useSize as n, hDir as o, hMergeSlotSafely as p, __q_directive_0 as q, hMergeSlot as r, stopAndPrevent as s, fetchDefaults as t, useSeoMeta as u, useNuxtApp as v, asyncDataDefaults as w, createError as x, useTransitionProps as y, useModelToggleEmits as z };
//# sourceMappingURL=server.mjs.map
