import { computed, h } from 'vue';

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

export { useFormInject as a, useFormInputNameAttr as b, useFormAttrs as c, useFormProps as u };
//# sourceMappingURL=private.use-form.mjs.map
