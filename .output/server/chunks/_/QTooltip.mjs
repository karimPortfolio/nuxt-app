import { computed, h, getCurrentInstance, ref, watch, onBeforeUnmount } from 'vue';
import { j as createComponent, r as hMergeSlot, y as useTransitionProps, z as useModelToggleEmits, A as scrollTargetProp, B as validateOffset, C as validatePosition, D as useModelToggleProps, E as useAnchorStaticProps, F as parsePosition, G as useTick, H as useTimeout, I as useTransition, J as useScrollTarget, K as useAnchor, L as useModelToggle, M as usePortal, N as addClickOutside, O as removeClickOutside, P as cleanEvt, Q as setPosition, R as clearSelection, S as addEvt, T as getScrollTarget, s as stopAndPrevent } from '../build/server.mjs';

const alignValues = [ 'top', 'middle', 'bottom' ];

const __nuxt_component_1 = createComponent({
  name: 'QBadge',

  props: {
    color: String,
    textColor: String,

    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,

    label: [ Number, String ],

    align: {
      type: String,
      validator: v => alignValues.includes(v)
    }
  },

  setup (props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0
        ? { verticalAlign: props.align }
        : null
    });

    const classes = computed(() => {
      const text = props.outline === true
        ? props.color || props.textColor
        : props.textColor;

      return 'q-badge flex inline items-center no-wrap'
        + ` q-badge--${ props.multiLine === true ? 'multi' : 'single' }-line`
        + (props.outline === true
          ? ' q-badge--outline'
          : (props.color !== void 0 ? ` bg-${ props.color }` : '')
        )
        + (text !== void 0 ? ` text-${ text }` : '')
        + (props.floating === true ? ' q-badge--floating' : '')
        + (props.rounded === true ? ' q-badge--rounded' : '')
        + (props.transparent === true ? ' q-badge--transparent' : '')
    });

    return () => h('div', {
      class: classes.value,
      style: style.value,
      role: 'status',
      'aria-label': props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [ props.label ] : []))
  }
});

const __nuxt_component_8 = createComponent({
  name: 'QTooltip',

  inheritAttrs: false,

  props: {
    ...useAnchorStaticProps,
    ...useModelToggleProps,
    ...useTransitionProps,

    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },

    transitionShow: {
      ...useTransitionProps.transitionShow,
      default: 'jump-down'
    },
    transitionHide: {
      ...useTransitionProps.transitionHide,
      default: 'jump-up'
    },

    anchor: {
      type: String,
      default: 'bottom middle',
      validator: validatePosition
    },
    self: {
      type: String,
      default: 'top middle',
      validator: validatePosition
    },
    offset: {
      type: Array,
      default: () => [ 14, 14 ],
      validator: validateOffset
    },

    scrollTarget: scrollTargetProp,

    delay: {
      type: Number,
      default: 0
    },

    hideDelay: {
      type: Number,
      default: 0
    },

    persistent: Boolean
  },

  emits: [
    ...useModelToggleEmits
  ],

  setup (props, { slots, emit, attrs }) {
    let unwatchPosition, observer;

    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;

    const innerRef = ref(null);
    const showing = ref(false);

    const anchorOrigin = computed(() => parsePosition(props.anchor, $q.lang.rtl));
    const selfOrigin = computed(() => parsePosition(props.self, $q.lang.rtl));
    const hideOnRouteChange = computed(() => props.persistent !== true);

    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);

    const { anchorEl, canShow, anchorEvents } = useAnchor({ showing, configureAnchorEl });

    const { show, hide } = useModelToggle({
      showing, canShow, handleShow, handleHide,
      hideOnRouteChange,
      processOnMount: true
    });

    Object.assign(anchorEvents, { delayShow, delayHide });

    const { showPortal, hidePortal, renderPortal } = usePortal();

    // if we're on mobile, let's improve the experience
    // by closing it when user taps outside of it
    if ($q.platform.is.mobile === true) {
      const clickOutsideProps = {
        anchorEl,
        innerRef,
        onClickOutside (e) {
          hide(e);

          // prevent click if it's on a dialog backdrop
          if (e.target.classList.contains('q-dialog__backdrop')) {
            stopAndPrevent(e);
          }

          return true
        }
      };

      const hasClickOutside = computed(() =>
        // it doesn't has external model
        // (null is the default value)
        props.modelValue === null
        // and it's not persistent
        && props.persistent !== true
        && showing.value === true
      );

      watch(hasClickOutside, val => {
        const fn = val === true ? addClickOutside : removeClickOutside;
        fn(clickOutsideProps);
      });

      onBeforeUnmount(() => {
        removeClickOutside(clickOutsideProps);
      });
    }

    function handleShow (evt) {
      showPortal();

      // should removeTick() if this gets removed
      registerTick(() => {
        observer = new MutationObserver(() => updatePosition());
        observer.observe(innerRef.value, { attributes: false, childList: true, characterData: true, subtree: true });
        updatePosition();
        configureScrollTarget();
      });

      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + '|' + $q.screen.height + '|' + props.self + '|' + props.anchor + '|' + $q.lang.rtl,
          updatePosition
        );
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        showPortal(true); // done showing portal
        emit('show', evt);
      }, props.transitionDuration);
    }

    function handleHide (evt) {
      removeTick();
      hidePortal();

      anchorCleanup();

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        hidePortal(true); // done hiding, now destroy
        emit('hide', evt);
      }, props.transitionDuration);
    }

    function anchorCleanup () {
      if (observer !== void 0) {
        observer.disconnect();
        observer = void 0;
      }

      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }

      unconfigureScrollTarget();
      cleanEvt(anchorEvents, 'tooltipTemp');
    }

    function updatePosition () {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }

    function delayShow (evt) {
      if ($q.platform.is.mobile === true) {
        clearSelection();
        document.body.classList.add('non-selectable');

        const target = anchorEl.value;
        const evts = [ 'touchmove', 'touchcancel', 'touchend', 'click' ]
          .map(e => ([ target, e, 'delayHide', 'passiveCapture' ]));

        addEvt(anchorEvents, 'tooltipTemp', evts);
      }

      registerTimeout(() => { show(evt); }, props.delay);
    }

    function delayHide (evt) {
      if ($q.platform.is.mobile === true) {
        cleanEvt(anchorEvents, 'tooltipTemp');
        clearSelection();
        // delay needed otherwise selection still occurs
        setTimeout(() => {
          document.body.classList.remove('non-selectable');
        }, 10);
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => { hide(evt); }, props.hideDelay);
    }

    function configureAnchorEl () {
      if (
        props.noParentEvent === true
        || anchorEl.value === null
      ) return

      const evts = $q.platform.is.mobile === true
        ? [
            [ anchorEl.value, 'touchstart', 'delayShow', 'passive' ]
          ]
        : [
            [ anchorEl.value, 'mouseenter', 'delayShow', 'passive' ],
            [ anchorEl.value, 'mouseleave', 'delayHide', 'passive' ]
          ];

      addEvt(anchorEvents, 'anchor', evts);
    }

    function configureScrollTarget () {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        const fn = props.noParentEvent === true
          ? updatePosition
          : hide;

        changeScrollEvent(localScrollTarget.value, fn);
      }
    }

    onBeforeUnmount(anchorCleanup);

    // expose public methods
    Object.assign(vm.proxy, { updatePosition });

    return renderPortal
  }
});

export { __nuxt_component_8 as _, __nuxt_component_1 as a };
//# sourceMappingURL=QTooltip.mjs.map
