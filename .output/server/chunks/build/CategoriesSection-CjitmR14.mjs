import { getCurrentInstance, computed, h, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { j as createComponent, k as useSizeProps, l as useDarkProps, m as useDark, n as useSize, o as hDir, h as __nuxt_component_2, p as hMergeSlotSafely, s as stopAndPrevent, q as __q_directive_0, r as hMergeSlot, f as __nuxt_component_0 } from './server.mjs';
import { a as __nuxt_component_1, _ as __nuxt_component_8 } from '../_/QTooltip.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_4 } from '../_/QCardSection.mjs';
import { _ as __nuxt_component_5 } from '../_/QRating.mjs';

const defaultSizes$1 = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};

const __nuxt_component_0$2 = createComponent({
  name: 'QChip',

  props: {
    ...useDarkProps,
    ...useSizeProps,

    dense: Boolean,

    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [ String, Number ],

    color: String,
    textColor: String,

    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },

    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,

    removeAriaLabel: String,

    tabindex: [ String, Number ],
    disable: Boolean,

    ripple: {
      type: [ Boolean, Object ],
      default: true
    }
  },

  emits: [ 'update:modelValue', 'update:selected', 'remove', 'click' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes$1);

    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);

    const leftIcon = computed(() => (
      props.selected === true
        ? props.iconSelected || $q.iconSet.chip.selected
        : props.icon
    ));

    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);

    const isClickable = computed(() =>
      props.disable === false
      && (props.clickable === true || props.selected !== null)
    );

    const classes = computed(() => {
      const text = props.outline === true
        ? props.color || props.textColor
        : props.textColor;

      return 'q-chip row inline no-wrap items-center'
        + (props.outline === false && props.color !== void 0 ? ` bg-${ props.color }` : '')
        + (text ? ` text-${ text } q-chip--colored` : '')
        + (props.disable === true ? ' disabled' : '')
        + (props.dense === true ? ' q-chip--dense' : '')
        + (props.outline === true ? ' q-chip--outline' : '')
        + (props.selected === true ? ' q-chip--selected' : '')
        + (isClickable.value === true ? ' q-chip--clickable cursor-pointer non-selectable q-hoverable' : '')
        + (props.square === true ? ' q-chip--square' : '')
        + (isDark.value === true ? ' q-chip--dark q-dark' : '')
    });

    const attributes = computed(() => {
      const chip = props.disable === true
        ? { tabindex: -1, 'aria-disabled': 'true' }
        : { tabindex: props.tabindex || 0 };

      const remove = {
        ...chip,
        role: 'button',
        'aria-hidden': 'false',
        'aria-label': props.removeAriaLabel || $q.lang.label.remove
      };

      return { chip, remove }
    });

    function onKeyup (e) {
      e.keyCode === 13 /* ENTER */ && onClick(e);
    }

    function onClick (e) {
      if (!props.disable) {
        emit('update:selected', !props.selected);
        emit('click', e);
      }
    }

    function onRemove (e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit('update:modelValue', false);
          emit('remove');
        }
      }
    }

    function getContent () {
      const child = [];

      isClickable.value === true && child.push(
        h('div', { class: 'q-focus-helper' })
      );

      hasLeftIcon.value === true && child.push(
        h(__nuxt_component_2, {
          class: 'q-chip__icon q-chip__icon--left',
          name: leftIcon.value
        })
      );

      const label = props.label !== void 0
        ? [ h('div', { class: 'ellipsis' }, [ props.label ]) ]
        : void 0;

      child.push(
        h('div', {
          class: 'q-chip__content col row no-wrap items-center q-anchor--skip'
        }, hMergeSlotSafely(slots.default, label))
      );

      props.iconRight && child.push(
        h(__nuxt_component_2, {
          class: 'q-chip__icon q-chip__icon--right',
          name: props.iconRight
        })
      );

      props.removable === true && child.push(
        h(__nuxt_component_2, {
          class: 'q-chip__icon q-chip__icon--remove cursor-pointer',
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );

      return child
    }

    return () => {
      if (props.modelValue === false) return

      const data = {
        class: classes.value,
        style: sizeStyle.value
      };

      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );

      return hDir(
        'div',
        data,
        getContent(),
        'ripple',
        props.ripple !== false && props.disable !== true,
        () => [ [ __q_directive_0, props.ripple ] ]
      )
    }
  }
});

const defaultSizes = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};

function width (val, reverse, $q) {
  return {
    transform: reverse === true
      ? `translateX(${ $q.lang.rtl === true ? '-' : '' }100%) scale3d(${ -val },1,1)`
      : `scale3d(${ val },1,1)`
  }
}

const __nuxt_component_6 = createComponent({
  name: 'QLinearProgress',

  props: {
    ...useDarkProps,
    ...useSizeProps,

    value: {
      type: Number,
      default: 0
    },
    buffer: Number,

    color: String,
    trackColor: String,

    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,

    animationSpeed: {
      type: [ String, Number ],
      default: 2100
    },

    instantFeedback: Boolean
  },

  setup (props, { slots }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    const sizeStyle = useSize(props, defaultSizes);

    const motion = computed(() => props.indeterminate === true || props.query === true);
    const widthReverse = computed(() => props.reverse !== props.query);
    const style = computed(() => ({
      ...(sizeStyle.value !== null ? sizeStyle.value : {}),
      '--q-linear-progress-speed': `${ props.animationSpeed }ms`
    }));

    const classes = computed(() =>
      'q-linear-progress'
      + (props.color !== void 0 ? ` text-${ props.color }` : '')
      + (props.reverse === true || props.query === true ? ' q-linear-progress--reverse' : '')
      + (props.rounded === true ? ' rounded-borders' : '')
    );

    const trackStyle = computed(() => width(props.buffer !== void 0 ? props.buffer : 1, widthReverse.value, proxy.$q));
    const transitionSuffix = computed(() => `with${ props.instantFeedback === true ? 'out' : '' }-transition`);

    const trackClass = computed(() =>
      'q-linear-progress__track absolute-full'
      + ` q-linear-progress__track--${ transitionSuffix.value }`
      + ` q-linear-progress__track--${ isDark.value === true ? 'dark' : 'light' }`
      + (props.trackColor !== void 0 ? ` bg-${ props.trackColor }` : '')
    );

    const modelStyle = computed(() => width(motion.value === true ? 1 : props.value, widthReverse.value, proxy.$q));
    const modelClass = computed(() =>
      'q-linear-progress__model absolute-full'
      + ` q-linear-progress__model--${ transitionSuffix.value }`
      + ` q-linear-progress__model--${ motion.value === true ? 'in' : '' }determinate`
    );

    const stripeStyle = computed(() => ({ width: `${ props.value * 100 }%` }));
    const stripeClass = computed(() =>
      `q-linear-progress__stripe absolute-${ props.reverse === true ? 'right' : 'left' }`
      + ` q-linear-progress__stripe--${ transitionSuffix.value }`
    );

    return () => {
      const child = [
        h('div', {
          class: trackClass.value,
          style: trackStyle.value
        }),

        h('div', {
          class: modelClass.value,
          style: modelStyle.value
        })
      ];

      props.stripe === true && motion.value === false && child.push(
        h('div', {
          class: stripeClass.value,
          style: stripeStyle.value
        })
      );

      return h('div', {
        class: classes.value,
        style: style.value,
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 1,
        'aria-valuenow': props.indeterminate === true
          ? void 0
          : props.value
      }, hMergeSlot(slots.default, child))
    }
  }
});

const _sfc_main = {
  __name: "CategoriesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const getIconForCategory = (category) => {
      switch (category) {
        case "Web Development":
          return "code";
        case "Data Science":
          return "bar_chart";
        case "Business":
          return "business_center";
        case "Design":
          return "brush";
        default:
          return "help";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_chip = __nuxt_component_0$2;
      const _component_q_badge = __nuxt_component_1;
      const _component_q_icon = __nuxt_component_2;
      const _component_q_card = __nuxt_component_0$1;
      const _component_q_card_section = __nuxt_component_4;
      const _component_q_rating = __nuxt_component_5;
      const _component_q_linear_progress = __nuxt_component_6;
      const _component_q_btn = __nuxt_component_0;
      const _component_q_tooltip = __nuxt_component_8;
      const _directive_ripple = __q_directive_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-24 px-4" }, _attrs))}><div class="container mx-auto"><div class="text-center mb-20 relative"><div class="absolute -left-16 top-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div><div class="absolute -right-16 bottom-0 w-40 h-40 bg-indigo-100 rounded-full opacity-30 blur-xl"></div><span class="text-xs font-bold tracking-widest uppercase text-indigo-700 mb-4 inline-block animate__animated animate__fadeInDown relative px-5 py-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-full shadow-sm"><span class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 animate-pulse opacity-50"></span><span class="relative">Discover Your Path</span></span><h2 class="text-4xl md:text-6xl font-extrabold mb-6 animate__animated animate__fadeIn"><span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700"> Popular Categories </span></h2><p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate__animated animate__fadeInUp animate__delay-1s mb-10"> Explore our <span class="text-indigo-700 font-semibold">most sought-after</span> learning paths to accelerate your career and unlock new opportunities </p><div class="flex flex-wrap justify-center gap-4 animate__animated animate__fadeInUp animate__delay-2s">`);
      _push(ssrRenderComponent(_component_q_chip, {
        clickable: "",
        color: "indigo-9",
        "text-color": "white",
        icon: "filter_list",
        class: "shadow-md hover:shadow-lg transition-all duration-300 scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Filter `);
            _push2(ssrRenderComponent(_component_q_badge, {
              color: "white",
              "text-color": "indigo",
              floating: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`4`);
                } else {
                  return [
                    createTextVNode("4")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Filter "),
              createVNode(_component_q_badge, {
                color: "white",
                "text-color": "indigo",
                floating: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("4")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_q_chip, {
        outline: "",
        clickable: "",
        color: "blue-9",
        class: "hover:bg-blue-50 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "category",
              size: "sm",
              left: ""
            }, null, _parent2, _scopeId));
            _push2(` All Categories `);
          } else {
            return [
              createVNode(_component_q_icon, {
                name: "category",
                size: "sm",
                left: ""
              }),
              createTextVNode(" All Categories ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_q_chip, {
        outline: "",
        clickable: "",
        color: "blue-9",
        class: "hover:bg-blue-50 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "whatshot",
              size: "sm",
              left: ""
            }, null, _parent2, _scopeId));
            _push2(` Popular `);
          } else {
            return [
              createVNode(_component_q_icon, {
                name: "whatshot",
                size: "sm",
                left: ""
              }),
              createTextVNode(" Popular ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_q_chip, {
        outline: "",
        clickable: "",
        color: "blue-9",
        class: "hover:bg-blue-50 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_icon, {
              name: "new_releases",
              size: "sm",
              left: ""
            }, null, _parent2, _scopeId));
            _push2(` New `);
          } else {
            return [
              createVNode(_component_q_icon, {
                name: "new_releases",
                size: "sm",
                left: ""
              }),
              createTextVNode(" New ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4"><!--[-->`);
      ssrRenderList([
        "Web Development",
        "Data Science",
        "Business",
        "Design"
      ], (category, index) => {
        _push(`<div class="animate__animated animate__fadeInUp transform hover:-translate-y-2 transition-all duration-500" style="${ssrRenderStyle(`animation-delay: ${0.15 * (index + 1)}s`)}">`);
        _push(ssrRenderComponent(_component_q_card, mergeProps({
          class: ["text-center cursor-pointer transition-all duration-500 border-0 rounded-3xl overflow-hidden group h-full flex flex-col shadow-xl hover:shadow-2xl", {
            "bg-gradient-to-br from-white to-red-50": index === 0,
            "bg-gradient-to-br from-white to-green-50": index === 1,
            "bg-gradient-to-br from-white to-blue-50": index === 2,
            "bg-gradient-to-br from-white to-purple-50": index === 3
          }]
        }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_q_card_section, { class: "py-12 px-8 relative flex-grow flex flex-col" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="absolute -right-14 -top-14 w-28 h-28 bg-blue-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500"${_scopeId2}></div><div class="absolute -left-14 -bottom-14 w-20 h-20 bg-indigo-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500"${_scopeId2}></div><div class="bg-gradient-to-br from-white to-indigo-50 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-8 group-hover:from-blue-50 group-hover:to-indigo-100 transition-all duration-500 shadow-lg group-hover:shadow-xl relative z-10 group-hover:scale-110"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: getIconForCategory(category),
                      size: "3.2rem",
                      class: [{
                        "text-red-600 group-hover:text-red-700": index === 0,
                        "text-green-600 group-hover:text-green-700": index === 1,
                        "text-blue-600 group-hover:text-blue-700": index === 2,
                        "text-purple-600 group-hover:text-purple-700": index === 3
                      }, "transition-all duration-500 transform group-hover:scale-110"]
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><h3 class="text-2xl font-bold mt-4 mb-3 group-hover:text-blue-700 transition-colors duration-300"${_scopeId2}>${ssrInterpolate(category)}</h3><div class="flex items-center justify-center gap-2 mb-5"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_rating, {
                      size: "1.1em",
                      "model-value": 5,
                      readonly: "",
                      color: "amber"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-gray-600 text-sm font-medium"${_scopeId2}>(120+ courses)</span></div>`);
                    _push3(ssrRenderComponent(_component_q_linear_progress, {
                      size: "sm",
                      value: 0.8,
                      rounded: "",
                      color: ["red", "green", "blue", "purple"][index],
                      class: "q-mt-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                      "track-color": "grey-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm text-gray-600 mt-2 font-medium"${_scopeId2}>80% of students complete this path</span><div class="mt-auto pt-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_q_btn, {
                      unelevated: "",
                      rounded: "",
                      class: ["px-8 py-2 transform transition-all duration-500 shadow-md hover:shadow-lg group-hover:scale-105", {
                        "bg-gradient-to-r from-red-500 to-red-600 text-white": index === 0,
                        "bg-gradient-to-r from-green-500 to-green-600 text-white": index === 1,
                        "bg-gradient-to-r from-blue-500 to-blue-600 text-white": index === 2,
                        "bg-gradient-to-r from-purple-500 to-purple-600 text-white": index === 3
                      }],
                      label: "Explore Path",
                      "icon-right": "arrow_forward",
                      "no-caps": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_q_tooltip, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Discover ${ssrInterpolate(category)} courses`);
                              } else {
                                return [
                                  createTextVNode("Discover " + toDisplayString(category) + " courses", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_q_tooltip, null, {
                              default: withCtx(() => [
                                createTextVNode("Discover " + toDisplayString(category) + " courses", 1)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="absolute top-5 right-5 z-20"${_scopeId2}>`);
                    if (index === 0) {
                      _push3(ssrRenderComponent(_component_q_badge, {
                        color: "red-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_q_icon, {
                              name: "star",
                              size: "sm",
                              class: "q-mr-xs"
                            }, null, _parent4, _scopeId3));
                            _push4(`Popular `);
                          } else {
                            return [
                              createVNode(_component_q_icon, {
                                name: "star",
                                size: "sm",
                                class: "q-mr-xs"
                              }),
                              createTextVNode("Popular ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (index === 1) {
                      _push3(ssrRenderComponent(_component_q_badge, {
                        color: "green-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_q_icon, {
                              name: "new_releases",
                              size: "sm",
                              class: "q-mr-xs"
                            }, null, _parent4, _scopeId3));
                            _push4(`New `);
                          } else {
                            return [
                              createVNode(_component_q_icon, {
                                name: "new_releases",
                                size: "sm",
                                class: "q-mr-xs"
                              }),
                              createTextVNode("New ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (index === 2) {
                      _push3(ssrRenderComponent(_component_q_badge, {
                        color: "blue-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_q_icon, {
                              name: "trending_up",
                              size: "sm",
                              class: "q-mr-xs"
                            }, null, _parent4, _scopeId3));
                            _push4(`Trending `);
                          } else {
                            return [
                              createVNode(_component_q_icon, {
                                name: "trending_up",
                                size: "sm",
                                class: "q-mr-xs"
                              }),
                              createTextVNode("Trending ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (index === 3) {
                      _push3(ssrRenderComponent(_component_q_badge, {
                        color: "purple-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_q_icon, {
                              name: "verified",
                              size: "sm",
                              class: "q-mr-xs"
                            }, null, _parent4, _scopeId3));
                            _push4(`Top Rated `);
                          } else {
                            return [
                              createVNode(_component_q_icon, {
                                name: "verified",
                                size: "sm",
                                class: "q-mr-xs"
                              }),
                              createTextVNode("Top Rated ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "absolute -right-14 -top-14 w-28 h-28 bg-blue-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500" }),
                      createVNode("div", { class: "absolute -left-14 -bottom-14 w-20 h-20 bg-indigo-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500" }),
                      createVNode("div", { class: "bg-gradient-to-br from-white to-indigo-50 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-8 group-hover:from-blue-50 group-hover:to-indigo-100 transition-all duration-500 shadow-lg group-hover:shadow-xl relative z-10 group-hover:scale-110" }, [
                        createVNode(_component_q_icon, {
                          name: getIconForCategory(category),
                          size: "3.2rem",
                          class: [{
                            "text-red-600 group-hover:text-red-700": index === 0,
                            "text-green-600 group-hover:text-green-700": index === 1,
                            "text-blue-600 group-hover:text-blue-700": index === 2,
                            "text-purple-600 group-hover:text-purple-700": index === 3
                          }, "transition-all duration-500 transform group-hover:scale-110"]
                        }, null, 8, ["name", "class"])
                      ]),
                      createVNode("h3", { class: "text-2xl font-bold mt-4 mb-3 group-hover:text-blue-700 transition-colors duration-300" }, toDisplayString(category), 1),
                      createVNode("div", { class: "flex items-center justify-center gap-2 mb-5" }, [
                        createVNode(_component_q_rating, {
                          size: "1.1em",
                          "model-value": 5,
                          readonly: "",
                          color: "amber"
                        }),
                        createVNode("span", { class: "text-gray-600 text-sm font-medium" }, "(120+ courses)")
                      ]),
                      createVNode(_component_q_linear_progress, {
                        size: "sm",
                        value: 0.8,
                        rounded: "",
                        color: ["red", "green", "blue", "purple"][index],
                        class: "q-mt-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                        "track-color": "grey-2"
                      }, null, 8, ["color"]),
                      createVNode("span", { class: "text-sm text-gray-600 mt-2 font-medium" }, "80% of students complete this path"),
                      createVNode("div", { class: "mt-auto pt-8" }, [
                        createVNode(_component_q_btn, {
                          unelevated: "",
                          rounded: "",
                          class: ["px-8 py-2 transform transition-all duration-500 shadow-md hover:shadow-lg group-hover:scale-105", {
                            "bg-gradient-to-r from-red-500 to-red-600 text-white": index === 0,
                            "bg-gradient-to-r from-green-500 to-green-600 text-white": index === 1,
                            "bg-gradient-to-r from-blue-500 to-blue-600 text-white": index === 2,
                            "bg-gradient-to-r from-purple-500 to-purple-600 text-white": index === 3
                          }],
                          label: "Explore Path",
                          "icon-right": "arrow_forward",
                          "no-caps": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_tooltip, null, {
                              default: withCtx(() => [
                                createTextVNode("Discover " + toDisplayString(category) + " courses", 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      createVNode("div", { class: "absolute top-5 right-5 z-20" }, [
                        index === 0 ? (openBlock(), createBlock(_component_q_badge, {
                          key: 0,
                          color: "red-7",
                          class: "text-sm px-3 py-1 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "star",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createTextVNode("Popular ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        index === 1 ? (openBlock(), createBlock(_component_q_badge, {
                          key: 1,
                          color: "green-7",
                          class: "text-sm px-3 py-1 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "new_releases",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createTextVNode("New ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        index === 2 ? (openBlock(), createBlock(_component_q_badge, {
                          key: 2,
                          color: "blue-7",
                          class: "text-sm px-3 py-1 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "trending_up",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createTextVNode("Trending ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        index === 3 ? (openBlock(), createBlock(_component_q_badge, {
                          key: 3,
                          color: "purple-7",
                          class: "text-sm px-3 py-1 shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_q_icon, {
                              name: "verified",
                              size: "sm",
                              class: "q-mr-xs"
                            }),
                            createTextVNode("Top Rated ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_q_card_section, { class: "py-12 px-8 relative flex-grow flex flex-col" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "absolute -right-14 -top-14 w-28 h-28 bg-blue-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500" }),
                    createVNode("div", { class: "absolute -left-14 -bottom-14 w-20 h-20 bg-indigo-100 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-500" }),
                    createVNode("div", { class: "bg-gradient-to-br from-white to-indigo-50 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-8 group-hover:from-blue-50 group-hover:to-indigo-100 transition-all duration-500 shadow-lg group-hover:shadow-xl relative z-10 group-hover:scale-110" }, [
                      createVNode(_component_q_icon, {
                        name: getIconForCategory(category),
                        size: "3.2rem",
                        class: [{
                          "text-red-600 group-hover:text-red-700": index === 0,
                          "text-green-600 group-hover:text-green-700": index === 1,
                          "text-blue-600 group-hover:text-blue-700": index === 2,
                          "text-purple-600 group-hover:text-purple-700": index === 3
                        }, "transition-all duration-500 transform group-hover:scale-110"]
                      }, null, 8, ["name", "class"])
                    ]),
                    createVNode("h3", { class: "text-2xl font-bold mt-4 mb-3 group-hover:text-blue-700 transition-colors duration-300" }, toDisplayString(category), 1),
                    createVNode("div", { class: "flex items-center justify-center gap-2 mb-5" }, [
                      createVNode(_component_q_rating, {
                        size: "1.1em",
                        "model-value": 5,
                        readonly: "",
                        color: "amber"
                      }),
                      createVNode("span", { class: "text-gray-600 text-sm font-medium" }, "(120+ courses)")
                    ]),
                    createVNode(_component_q_linear_progress, {
                      size: "sm",
                      value: 0.8,
                      rounded: "",
                      color: ["red", "green", "blue", "purple"][index],
                      class: "q-mt-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                      "track-color": "grey-2"
                    }, null, 8, ["color"]),
                    createVNode("span", { class: "text-sm text-gray-600 mt-2 font-medium" }, "80% of students complete this path"),
                    createVNode("div", { class: "mt-auto pt-8" }, [
                      createVNode(_component_q_btn, {
                        unelevated: "",
                        rounded: "",
                        class: ["px-8 py-2 transform transition-all duration-500 shadow-md hover:shadow-lg group-hover:scale-105", {
                          "bg-gradient-to-r from-red-500 to-red-600 text-white": index === 0,
                          "bg-gradient-to-r from-green-500 to-green-600 text-white": index === 1,
                          "bg-gradient-to-r from-blue-500 to-blue-600 text-white": index === 2,
                          "bg-gradient-to-r from-purple-500 to-purple-600 text-white": index === 3
                        }],
                        label: "Explore Path",
                        "icon-right": "arrow_forward",
                        "no-caps": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_tooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("Discover " + toDisplayString(category) + " courses", 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ]),
                    createVNode("div", { class: "absolute top-5 right-5 z-20" }, [
                      index === 0 ? (openBlock(), createBlock(_component_q_badge, {
                        key: 0,
                        color: "red-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "star",
                            size: "sm",
                            class: "q-mr-xs"
                          }),
                          createTextVNode("Popular ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      index === 1 ? (openBlock(), createBlock(_component_q_badge, {
                        key: 1,
                        color: "green-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "new_releases",
                            size: "sm",
                            class: "q-mr-xs"
                          }),
                          createTextVNode("New ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      index === 2 ? (openBlock(), createBlock(_component_q_badge, {
                        key: 2,
                        color: "blue-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "trending_up",
                            size: "sm",
                            class: "q-mr-xs"
                          }),
                          createTextVNode("Trending ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      index === 3 ? (openBlock(), createBlock(_component_q_badge, {
                        key: 3,
                        color: "purple-7",
                        class: "text-sm px-3 py-1 shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_q_icon, {
                            name: "verified",
                            size: "sm",
                            class: "q-mr-xs"
                          }),
                          createTextVNode("Top Rated ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/CategoriesSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

const CategoriesSectionCjitmR14 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _sfc_main
});

export { CategoriesSectionCjitmR14 as C, __nuxt_component_0$2 as _, _sfc_main as a };
//# sourceMappingURL=CategoriesSection-CjitmR14.mjs.map
