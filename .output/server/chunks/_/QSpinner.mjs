import { computed, h } from 'vue';
import { b as useSizeDefaults } from './QIcon.mjs';
import { c as createComponent } from '../build/server.mjs';

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

export { QSpinner as Q, useSpinner as a, isKeyCode as i, shouldIgnoreKey as s, useSpinnerProps as u };
//# sourceMappingURL=QSpinner.mjs.map
