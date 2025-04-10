import { getCurrentInstance, inject, ref, computed, watch, onBeforeUnmount, h, onMounted, reactive, provide, withCtx, createVNode, renderSlot, mergeProps, createTextVNode, withDirectives, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderAttrs } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { c as createComponent, n as noop, l as layoutKey, k as emptyRenderFn, m as client, p as position, s as stopAndPrevent, o as stop, q as listenOpts, r as isRuntimeSsrPreHydration, t as pageContainerKey, _ as _export_sfc } from './server.mjs';
import { d as hUniqueSlot, h as hSlot, a as hMergeSlot } from '../_/render.mjs';
import { i as isKeyCode, n as nonRoundBtnProps, g as getBtnDesignAttr, _ as __nuxt_component_0$1, c as useRouterLinkProps, d as useRouterLink, b as __q_directive_0 } from '../_/QBtn.mjs';
import { _ as __nuxt_component_2$1 } from '../_/QIcon.mjs';
import { u as useModelToggleEmits, s as scrollTargetProp, v as validateOffset, a as validatePosition, b as useTransitionProps, c as useModelToggleProps, q as useAnchorProps, e as useTick, f as useTimeout, g as useTransition, h as useScrollTarget, i as useAnchor, j as useModelToggle, k as usePortal, p as parsePosition, l as addClickOutside, r as removeClickOutside, o as getScrollTarget, t as closePortalMenus, m as setPosition, w as childHasFocus, x as getVerticalScrollPosition, y as getHorizontalScrollPosition, z as getScrollbarWidth } from '../_/position-engine.mjs';
import { u as useDarkProps, a as useDark } from '../_/use-dark.mjs';
import { a as addFocusFn, u as useId, _ as __nuxt_component_2$2 } from '../_/QInput.mjs';
import { _ as __nuxt_component_5$1 } from '../_/QAvatar.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@prisma/client';
import '../_/private.use-form.mjs';

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

const __nuxt_component_0 = createComponent({
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

const __nuxt_component_1 = createComponent({
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

const __nuxt_component_2 = createComponent({
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

const __nuxt_component_3 = createComponent({
  name: 'QSpace',

  setup () {
    const space = h('div', { class: 'q-space' });
    return () => space
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

const __nuxt_component_13 = createComponent({
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

const __nuxt_component_5 = createComponent({
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
        h(__nuxt_component_2$1, {
          class: iconClass.value,
          name: props.dropdownIcon || proxy.$q.iconSet.arrow.dropdown
        })
      ];

      props.disableDropdown !== true && Arrow.push(
        h(__nuxt_component_13, {
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

const __nuxt_component_6 = createComponent({
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

const __nuxt_component_7 = createComponent({
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

const __nuxt_component_8 = createComponent({
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

const __nuxt_component_14 = createComponent({
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

const __nuxt_component_1$1 = createComponent({
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

const __nuxt_component_2$3 = createComponent({
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

const _imports_0 = publicAssetsURL("/img/brand.png");
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_q_header = __nuxt_component_0;
  const _component_q_toolbar = __nuxt_component_1;
  const _component_q_toolbar_title = __nuxt_component_2;
  const _component_q_space = __nuxt_component_3;
  const _component_q_btn = __nuxt_component_0$1;
  const _component_q_btn_dropdown = __nuxt_component_5;
  const _component_q_list = __nuxt_component_6;
  const _component_q_item = __nuxt_component_7;
  const _component_q_item_section = __nuxt_component_8;
  const _component_q_avatar = __nuxt_component_5$1;
  const _component_q_icon = __nuxt_component_2$1;
  const _component_q_item_label = __nuxt_component_11;
  const _component_q_input = __nuxt_component_2$2;
  const _component_q_menu = __nuxt_component_13;
  const _component_q_separator = __nuxt_component_14;
  const _directive_ripple = __q_directive_0;
  _push(ssrRenderComponent(_component_q_header, mergeProps({ class: "bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-3 border-b border-gray-300/50" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_q_toolbar, { class: "container mx-auto" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_q_toolbar_title, { class: "no-wrap" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="flex items-center"${_scopeId3}><a href="/" class="font-bold no-underline group"${_scopeId3}><img${ssrRenderAttr("src", _imports_0)} class="w-[100px] h-[45px]"${_scopeId3}></a></div>`);
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_q_space, null, null, _parent3, _scopeId2));
              _push3(`<div class="hidden md:flex items-center space-x-3 mr-5"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_q_btn, {
                flat: "",
                "no-caps": "",
                to: "/",
                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Home `);
                  } else {
                    return [
                      createTextVNode(" Home ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_q_btn_dropdown, {
                flat: "",
                "no-caps": "",
                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
              }, {
                label: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="flex items-center"${_scopeId3}><span${_scopeId3}>Courses</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("span", null, "Courses")
                      ])
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_q_list, { class: "bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 py-2 w-80 divide-y divide-gray-100/50" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_q_item, mergeProps({
                            clickable: "",
                            to: "/services/web",
                            class: "hover:bg-blue-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                          }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_avatar, {
                                        size: "md",
                                        class: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 shadow-md group-hover:shadow-blue-200"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, { name: "web" }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, { name: "web" })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item_section, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-blue-700" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Web Development`);
                                          } else {
                                            return [
                                              createTextVNode("Web Development")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_label, {
                                        caption: "",
                                        class: "text-blue-600"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Custom websites &amp; apps`);
                                          } else {
                                            return [
                                              createTextVNode("Custom websites & apps")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_icon, {
                                        name: "arrow_forward_ios",
                                        size: "xs",
                                        class: "text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform"
                                      }, null, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
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
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_item, mergeProps({
                            clickable: "",
                            to: "/services/mobile",
                            class: "hover:bg-green-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                          }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_avatar, {
                                        size: "md",
                                        class: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-md group-hover:shadow-green-200"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, { name: "phone_android" }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, { name: "phone_android" })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item_section, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-green-700" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Mobile Development`);
                                          } else {
                                            return [
                                              createTextVNode("Mobile Development")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_label, {
                                        caption: "",
                                        class: "text-green-600"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`iOS &amp; Android apps`);
                                          } else {
                                            return [
                                              createTextVNode("iOS & Android apps")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_icon, {
                                        name: "arrow_forward_ios",
                                        size: "xs",
                                        class: "text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform"
                                      }, null, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
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
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_q_item, mergeProps({
                            clickable: "",
                            to: "/services/cloud",
                            class: "hover:bg-purple-50/80 px-4 py-3 rounded-lg mx-1 my-1 transition-all duration-300 hover:translate-x-1 group"
                          }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_avatar, {
                                        size: "md",
                                        class: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 shadow-md group-hover:shadow-purple-200"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, { name: "cloud" }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_q_icon, { name: "cloud" })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item_section, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_label, { class: "font-medium text-gray-800 group-hover:text-purple-700" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Cloud Services`);
                                          } else {
                                            return [
                                              createTextVNode("Cloud Services")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_label, {
                                        caption: "",
                                        class: "text-purple-600"
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Scalable cloud solutions`);
                                          } else {
                                            return [
                                              createTextVNode("Scalable cloud solutions")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item_section, { side: "" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_icon, {
                                        name: "arrow_forward_ios",
                                        size: "xs",
                                        class: "text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 transition-transform"
                                      }, null, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
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
                          }, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_q_btn, {
                flat: "",
                "no-caps": "",
                to: "/about",
                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` About `);
                  } else {
                    return [
                      createTextVNode(" About ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_q_btn, {
                flat: "",
                "no-caps": "",
                to: "/carriers",
                class: "text-white hover:bg-blue-600/40 rounded-full px-4 py-2 transition-all duration-300 ease-in-out"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Carriers `);
                  } else {
                    return [
                      createTextVNode(" Carriers ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div><div class="hidden md:flex items-center mr-4 bg-white/15 backdrop-blur-sm rounded-full px-3 transition-all duration-300 hover:bg-white/25 w-64 border border-white/10"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_q_icon, {
                name: "search",
                class: "text-white/70 q-mr-sm"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_q_input, {
                dense: "",
                borderless: "",
                placeholder: "Search...",
                class: "text-white",
                dark: ""
              }, {
                append: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_q_icon, {
                      name: "close",
                      class: "cursor-pointer text-white/70 hover:text-white"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_q_icon, {
                        name: "close",
                        class: "cursor-pointer text-white/70 hover:text-white"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
              _push3(ssrRenderComponent(_component_q_btn, {
                unelevated: "",
                "no-caps": "",
                to: "/auth/signin",
                class: "ml-4 hidden md:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium hover:from-yellow-300 hover:to-yellow-400 rounded-full px-5 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_q_icon, {
                      name: "login",
                      class: "q-mr-sm"
                    }, null, _parent4, _scopeId3));
                    _push4(` Sign In `);
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_q_btn, {
                flat: "",
                dense: "",
                round: "",
                icon: "menu",
                class: "md:hidden text-white bg-blue-600/30 hover:bg-blue-500/50 transition-colors duration-300"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_q_menu, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_q_list, {
                            style: { "min-width": "220px" },
                            class: "bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_q_item, mergeProps({
                                  clickable: "",
                                  to: "/",
                                  class: "hover:bg-blue-50 mx-2 rounded-md"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, {
                                              name: "home",
                                              color: "blue-7"
                                            }, null, _parent8, _scopeId7));
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
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Home`);
                                          } else {
                                            return [
                                              createTextVNode("Home")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item, mergeProps({
                                  clickable: "",
                                  to: "/about",
                                  class: "hover:bg-blue-50 mx-2 rounded-md"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, {
                                              name: "info",
                                              color: "blue-7"
                                            }, null, _parent8, _scopeId7));
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
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`About`);
                                          } else {
                                            return [
                                              createTextVNode("About")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item, mergeProps({
                                  clickable: "",
                                  to: "/carriers",
                                  class: "hover:bg-blue-50 mx-2 rounded-md"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, {
                                              name: "local_shipping",
                                              color: "blue-7"
                                            }, null, _parent8, _scopeId7));
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
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Carriers`);
                                          } else {
                                            return [
                                              createTextVNode("Carriers")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_separator, { class: "my-1" }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_q_item, mergeProps({
                                  clickable: "",
                                  class: "hover:bg-blue-50 mx-2 rounded-md bg-yellow-50"
                                }, ssrGetDirectiveProps(_ctx, _directive_ripple)), {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_q_item_section, { avatar: "" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_q_icon, {
                                              name: "login",
                                              color: "blue-7"
                                            }, null, _parent8, _scopeId7));
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
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_q_item_section, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Sign In`);
                                          } else {
                                            return [
                                              createTextVNode("Sign In")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
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
                          }, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
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
              }, _parent3, _scopeId2));
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
                      createVNode(_component_q_icon, {
                        name: "close",
                        class: "cursor-pointer text-white/70 hover:text-white"
                      })
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
        }, _parent2, _scopeId));
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
                    createVNode(_component_q_icon, {
                      name: "close",
                      class: "cursor-pointer text-white/70 hover:text-white"
                    })
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
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_q_btn = __nuxt_component_0$1;
  const _component_q_icon = __nuxt_component_2$1;
  const _component_q_input = __nuxt_component_2$2;
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_layout = __nuxt_component_0$2;
      const _component_q_page_container = __nuxt_component_1$1;
      const _component_q_page = __nuxt_component_2$3;
      _push(ssrRenderComponent(_component_q_layout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_page_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_page, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(Navbar, null, null, _parent4, _scopeId3));
                        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        _push4(ssrRenderComponent(Footer, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(Navbar),
                          renderSlot(_ctx.$slots, "default"),
                          createVNode(Footer)
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_page, null, {
                      default: withCtx(() => [
                        createVNode(Navbar),
                        renderSlot(_ctx.$slots, "default"),
                        createVNode(Footer)
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
                  createVNode(_component_q_page, null, {
                    default: withCtx(() => [
                      createVNode(Navbar),
                      renderSlot(_ctx.$slots, "default"),
                      createVNode(Footer)
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-23hhdFeT.mjs.map
