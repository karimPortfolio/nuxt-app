import { computed, h } from 'vue';
import { u as useSizeProps, a as useSize, _ as __nuxt_component_2$1 } from './QIcon.mjs';
import { c as createComponent } from '../build/server.mjs';
import { c as hMergeSlotSafely } from './render.mjs';

const __nuxt_component_5$1 = createComponent({
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
        ? [ h(__nuxt_component_2$1, { name: props.icon }) ]
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

export { __nuxt_component_5$1 as _ };
//# sourceMappingURL=QAvatar.mjs.map
