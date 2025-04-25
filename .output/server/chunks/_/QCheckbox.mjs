import { ref, computed, h, getCurrentInstance, toRaw } from 'vue';
import { u as useSizeProps, a as useSize, _ as __nuxt_component_2$1 } from './QIcon.mjs';
import { s as stopAndPrevent, c as createComponent } from '../build/server.mjs';
import { u as useDarkProps, a as useDark } from './use-dark.mjs';
import { u as useFormProps, a as useFormInject } from './private.use-form.mjs';
import { a as hMergeSlot, h as hSlot } from './render.mjs';

function useRefocusTarget (props, rootRef) {
  const refocusRef = ref(null);

  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null
    }

    return h('span', {
      ref: refocusRef,
      class: 'no-outline',
      tabindex: -1
    })
  });

  function refocusTarget (e) {
    const root = rootRef.value;

    if (e !== void 0 && e.type.indexOf('key') === 0) {
      if (
        root !== null
        && document.activeElement !== root
        && root.contains(document.activeElement) === true
      ) {
        root.focus();
      }
    }
    else if (
      refocusRef.value !== null
      && (e === void 0 || (root !== null && root.contains(e.target) === true))
    ) {
      refocusRef.value.focus();
    }
  }

  return {
    refocusTargetEl,
    refocusTarget
  }
}

const optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};

const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,

  modelValue: {
    required: true,
    default: null
  },
  val: {},

  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },

  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,

  toggleOrder: {
    type: String,
    validator: v => v === 'tf' || v === 'ft'
  },
  toggleIndeterminate: Boolean,

  label: String,
  leftLabel: Boolean,

  color: String,
  keepColor: Boolean,
  dense: Boolean,

  disable: Boolean,
  tabindex: [ String, Number ]
};

const useCheckboxEmits = [ 'update:modelValue' ];

function useCheckbox (type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;

  const isDark = useDark(props, $q);

  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);

  const modelIsArray = computed(() =>
    props.val !== void 0 && Array.isArray(props.modelValue)
  );

  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true
      ? props.modelValue.findIndex(opt => toRaw(opt) === val)
      : -1
  });

  const isTrue = computed(() => (
    modelIsArray.value === true
      ? index.value !== -1
      : toRaw(props.modelValue) === toRaw(props.trueValue)
  ));

  const isFalse = computed(() => (
    modelIsArray.value === true
      ? index.value === -1
      : toRaw(props.modelValue) === toRaw(props.falseValue)
  ));

  const isIndeterminate = computed(() =>
    isTrue.value === false && isFalse.value === false
  );

  const tabindex = computed(() => (
    props.disable === true ? -1 : props.tabindex || 0
  ));

  const classes = computed(() =>
    `q-${ type } cursor-pointer no-outline row inline no-wrap items-center`
    + (props.disable === true ? ' disabled' : '')
    + (isDark.value === true ? ` q-${ type }--dark` : '')
    + (props.dense === true ? ` q-${ type }--dense` : '')
    + (props.leftLabel === true ? ' reverse' : '')
  );

  const innerClass = computed(() => {
    const state = isTrue.value === true ? 'truthy' : (isFalse.value === true ? 'falsy' : 'indet');
    const color = props.color !== void 0 && (
      props.keepColor === true
      || (type === 'toggle' ? isTrue.value === true : isFalse.value !== true)
    )
      ? ` text-${ props.color }`
      : '';

    return `q-${ type }__inner relative-position non-selectable q-${ type }__inner--${ state }${ color }`
  });

  const formAttrs = computed(() => {
    const prop = { type: 'checkbox' };

    props.name !== void 0 && Object.assign(prop, {
      // see https://vuejs.org/guide/extras/render-function.html#creating-vnodes (.prop)
      '.checked': isTrue.value,
      '^checked': isTrue.value === true ? 'checked' : void 0,
      name: props.name,
      value: modelIsArray.value === true
        ? props.val
        : props.trueValue
    });

    return prop
  });

  const injectFormInput = useFormInject(formAttrs);

  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: type === 'toggle' ? 'switch' : 'checkbox',
      'aria-label': props.label,
      'aria-checked': isIndeterminate.value === true
        ? 'mixed'
        : (isTrue.value === true ? 'true' : 'false')
    };

    if (props.disable === true) {
      attrs[ 'aria-disabled' ] = 'true';
    }

    return attrs
  });

  function onClick (e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }

    if (props.disable !== true) {
      emit('update:modelValue', getNextValue(), e);
    }
  }

  function getNextValue () {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val
      }

      return props.modelValue.concat([ props.val ])
    }

    if (isTrue.value === true) {
      if (props.toggleOrder !== 'ft' || props.toggleIndeterminate === false) {
        return props.falseValue
      }
    }
    else if (isFalse.value === true) {
      if (props.toggleOrder === 'ft' || props.toggleIndeterminate === false) {
        return props.trueValue
      }
    }
    else {
      return props.toggleOrder !== 'ft'
        ? props.trueValue
        : props.falseValue
    }

    return props.indeterminateValue
  }

  function onKeydown (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }

  function onKeyup (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }

  const getInnerContent = getInner(isTrue, isIndeterminate);

  // expose public methods
  Object.assign(proxy, { toggle: onClick });

  return () => {
    const inner = getInnerContent();

    props.disable !== true && injectFormInput(
      inner,
      'unshift',
      ` q-${ type }__native absolute q-ma-none q-pa-none`
    );

    const child = [
      h('div', {
        class: innerClass.value,
        style: sizeStyle.value,
        'aria-hidden': 'true'
      }, inner)
    ];

    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }

    const label = props.label !== void 0
      ? hMergeSlot(slots.default, [ props.label ])
      : hSlot(slots.default);

    label !== void 0 && child.push(
      h('div', {
        class: `q-${ type }__label q-anchor--skip`
      }, label)
    );

    return h('div', {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child)
  }
}

const createBgNode = () => h('div', {
  key: 'svg',
  class: 'q-checkbox__bg absolute'
}, [
  h('svg', {
    class: 'q-checkbox__svg fit absolute-full',
    viewBox: '0 0 24 24'
  }, [
    h('path', {
      class: 'q-checkbox__truthy',
      fill: 'none',
      d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
    }),

    h('path', {
      class: 'q-checkbox__indet',
      d: 'M4,14H20V10H4'
    })
  ])
]);

const __nuxt_component_1$1 = createComponent({
  name: 'QCheckbox',

  props: useCheckboxProps,
  emits: useCheckboxEmits,

  setup (props) {
    const bgNode = createBgNode();

    function getInner (isTrue, isIndeterminate) {
      const icon = computed(() =>
        (isTrue.value === true
          ? props.checkedIcon
          : (isIndeterminate.value === true
              ? props.indeterminateIcon
              : props.uncheckedIcon
            )
        ) || null
      );

      return () => (
        icon.value !== null
          ? [
              h('div', {
                key: 'icon',
                class: 'q-checkbox__icon-container absolute-full flex flex-center no-wrap'
              }, [
                h(__nuxt_component_2$1, {
                  class: 'q-checkbox__icon',
                  name: icon.value
                })
              ])
            ]
          : [ bgNode ]
      )
    }

    return useCheckbox('checkbox', getInner)
  }
});

export { __nuxt_component_1$1 as _ };
//# sourceMappingURL=QCheckbox.mjs.map
