import { _ as __nuxt_component_0 } from './nuxt-link-B6L8ia8q.mjs';
import { getCurrentInstance, ref, provide, onDeactivated, onActivated, onMounted, h, nextTick, computed, mergeProps, withCtx, createSlots, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { c as createComponent, f as formKey, s as stopAndPrevent, _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2$1 } from '../_/QIcon.mjs';
import { a as addFocusFn, _ as __nuxt_component_2$2 } from '../_/QInput.mjs';
import { h as hSlot } from '../_/render.mjs';
import { v as vmIsDestroyed, _ as __nuxt_component_0$1 } from '../_/QBtn.mjs';
import { _ as __nuxt_component_1$1 } from '../_/QCheckbox.mjs';
import { u as useSpinnerProps, a as useSpinner } from '../_/QSpinner.mjs';
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
import 'pinia';
import '@prisma/client';
import '../_/use-dark.mjs';
import '../_/private.use-form.mjs';

const __nuxt_component_1 = createComponent({
  name: 'QForm',

  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,

    onSubmit: Function
  },

  emits: [ 'reset', 'validationSuccess', 'validationError' ],

  setup (props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);

    let validateIndex = 0;
    const registeredComponents = [];

    function validate (shouldFocus) {
      const focus = typeof shouldFocus === 'boolean'
        ? shouldFocus
        : props.noErrorFocus !== true;

      const index = ++validateIndex;

      const emitEvent = (res, ref) => {
        emit(`validation${ res === true ? 'Success' : 'Error' }`, ref);
      };

      const validateComponent = comp => {
        const valid = comp.validate();

        return typeof valid.then === 'function'
          ? valid.then(
            valid => ({ valid, comp }),
            err => ({ valid: false, comp, err })
          )
          : Promise.resolve({ valid, comp })
      };

      const errorsPromise = props.greedy === true
        ? Promise
          .all(registeredComponents.map(validateComponent))
          .then(res => res.filter(r => r.valid !== true))
        : registeredComponents
          .reduce(
            (acc, comp) => acc.then(() => {
              return validateComponent(comp).then(r => {
                if (r.valid === false) { return Promise.reject(r) }
              })
            }),
            Promise.resolve()
          )
          .catch(error => [ error ]);

      return errorsPromise.then(errors => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true
        }

        // if not outdated already
        if (index === validateIndex) {
          const { comp, err } = errors[ 0 ];

          err !== void 0 && console.error(err);
          emitEvent(false, comp);

          if (focus === true) {
            // Try to focus first mounted and active component
            const activeError = errors.find(({ comp }) => (
              typeof comp.focus === 'function'
              && vmIsDestroyed(comp.$) === false
            ));

            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }

        return false
      })
    }

    function resetValidation () {
      validateIndex++;

      registeredComponents.forEach(comp => {
        typeof comp.resetValidation === 'function' && comp.resetValidation();
      });
    }

    function submit (evt) {
      evt !== void 0 && stopAndPrevent(evt);

      const index = validateIndex + 1;

      validate().then(val => {
        // if not outdated && validation succeeded
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit('submit', evt);
          }
          else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === 'function') {
            evt.target.submit();
          }
        }
      });
    }

    function reset (evt) {
      evt !== void 0 && stopAndPrevent(evt);

      emit('reset');

      nextTick(() => { // allow userland to reset values before
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }

    function focus () {
      addFocusFn(() => {
        if (rootRef.value === null) return

        const target = rootRef.value.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')
          || rootRef.value.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')
          || rootRef.value.querySelector('[autofocus], [data-autofocus]')
          || Array.prototype.find.call(rootRef.value.querySelectorAll('[tabindex]'), el => el.tabIndex !== -1);

        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }

    provide(formKey, {
      bindComponent (vmProxy) {
        registeredComponents.push(vmProxy);
      },

      unbindComponent (vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index !== -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });

    let shouldActivate = false;

    onDeactivated(() => {
      shouldActivate = true;
    });

    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });

    onMounted(() => {
      props.autofocus === true && focus();
    });

    // expose public methods
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });

    return () => h('form', {
      class: 'q-form',
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default))
  }
});

const innerHTML = '<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity=".3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from=".5" to=".5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>';

const __nuxt_component_5 = createComponent({
  name: 'QSpinnerDots',

  props: useSpinnerProps,

  setup (props) {
    const { cSize, classes } = useSpinner(props);
    return () => h('svg', {
      class: classes.value,
      fill: 'currentColor',
      width: cSize.value,
      height: cSize.value,
      viewBox: '0 0 120 30',
      xmlns: 'http://www.w3.org/2000/svg',
      innerHTML
    })
  }
});

const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const agreeTerms = ref(false);
    const isPwdVisible = ref(false);
    const loading = ref(false);
    const isFormValid = computed(() => {
      return firstName.value && lastName.value && email.value && password.value && password.value.length >= 8 && agreeTerms.value;
    });
    const onSignup = async () => {
      if (!isFormValid.value) return;
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        router.push("/dashboard");
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_icon = __nuxt_component_2$1;
      const _component_q_form = __nuxt_component_1;
      const _component_q_input = __nuxt_component_2$2;
      const _component_q_checkbox = __nuxt_component_1$1;
      const _component_q_btn = __nuxt_component_0$1;
      const _component_q_spinner_dots = __nuxt_component_5;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:p-0" }, _attrs))} data-v-7fe53f7c><div class="hidden md:flex flex-col items-center justify-center p-8 animate-fade-in" data-v-7fe53f7c><div class="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative" data-v-7fe53f7c><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=100" alt="Learning community" class="w-full h-full object-cover blur-[1px] transform scale-105 transition-all duration-1000" data-v-7fe53f7c><div class="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-indigo-600/40 flex flex-col items-center justify-center p-10 text-white backdrop-blur-sm" data-v-7fe53f7c><div class="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300" data-v-7fe53f7c><h2 class="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100" data-v-7fe53f7c> Join our learning community </h2><p class="text-center text-xl max-w-lg leading-relaxed" data-v-7fe53f7c> Create an account today and unlock a world of personalized educational content designed just for you. </p></div></div></div></div><div class="flex items-center justify-center mx-auto py-8 px-4 md:px-0" data-v-7fe53f7c><div class="p-10 space-y-8 bg-white/95 rounded-3xl transition-all duration-500 animate-fade-in" data-v-7fe53f7c><div class="text-center" data-v-7fe53f7c><div class="flex justify-center mb-6" data-v-7fe53f7c><div class="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl rotate-12 flex items-center justify-center shadow-xl" data-v-7fe53f7c><div class="h-16 w-16 bg-white/90 backdrop-blur-sm rounded-xl -rotate-12 flex items-center justify-center" data-v-7fe53f7c>`);
      _push(ssrRenderComponent(_component_q_icon, {
        name: "person_add",
        size: "lg",
        class: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700"
      }, null, _parent));
      _push(`</div></div></div><h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight" data-v-7fe53f7c> Create Account </h1><p class="mt-3 text-gray-600 text-lg" data-v-7fe53f7c> Join our platform and unlock your learning potential </p></div>`);
      _push(ssrRenderComponent(_component_q_form, {
        onSubmit: onSignup,
        class: "mt-10 space-y-6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-2 gap-6 m-0" data-v-7fe53f7c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_input, {
              modelValue: firstName.value,
              "onUpdate:modelValue": ($event) => firstName.value = $event,
              label: "First Name",
              rules: [(val) => !!val || "First name is required"],
              class: "col-span-1",
              "lazy-rules": "",
              outlined: "",
              dense: "",
              standout: "bg-blue-50 text-indigo-700"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_input, {
              modelValue: lastName.value,
              "onUpdate:modelValue": ($event) => lastName.value = $event,
              label: "Last Name",
              rules: [(val) => !!val || "Last name is required"],
              class: "col-span-1",
              "lazy-rules": "",
              outlined: "",
              dense: "",
              standout: "bg-blue-50 text-indigo-700"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_q_input, {
              modelValue: email.value,
              "onUpdate:modelValue": ($event) => email.value = $event,
              label: "Email Address",
              type: "email",
              outlined: "",
              dense: "",
              "lazy-rules": "",
              standout: "bg-blue-50 text-indigo-700",
              class: "my-2",
              rules: [
                (val) => !!val || "Email is required",
                (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Please enter a valid email"
              ]
            }, createSlots({ _: 2 }, [
              email.value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value) ? {
                name: "append",
                fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: "check_circle",
                      color: "green-600"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_q_icon, {
                        name: "check_circle",
                        color: "green-600"
                      })
                    ];
                  }
                }),
                key: "0"
              } : void 0
            ]), _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_input, {
              modelValue: password.value,
              "onUpdate:modelValue": ($event) => password.value = $event,
              label: "Password",
              type: isPwdVisible.value ? "text" : "password",
              outlined: "",
              dense: "",
              "lazy-rules": "",
              standout: "bg-blue-50 text-indigo-700",
              class: "my-2",
              rules: [
                (val) => !!val || "Password is required",
                (val) => val.length >= 8 || "Password must be at least 8 characters"
              ]
            }, {
              append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center" data-v-7fe53f7c${_scopeId2}>`);
                  if (password.value && password.value.length >= 8) {
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: "check_circle",
                      color: "green-600",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_q_icon, {
                    name: isPwdVisible.value ? "visibility_off" : "visibility",
                    class: "cursor-pointer",
                    color: "indigo-600",
                    onClick: ($event) => isPwdVisible.value = !isPwdVisible.value
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center" }, [
                      password.value && password.value.length >= 8 ? (openBlock(), createBlock(_component_q_icon, {
                        key: 0,
                        name: "check_circle",
                        color: "green-600",
                        class: "mr-2"
                      })) : createCommentVNode("", true),
                      createVNode(_component_q_icon, {
                        name: isPwdVisible.value ? "visibility_off" : "visibility",
                        class: "cursor-pointer",
                        color: "indigo-600",
                        onClick: ($event) => isPwdVisible.value = !isPwdVisible.value
                      }, null, 8, ["name", "onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_input, {
              modelValue: password.value,
              "onUpdate:modelValue": ($event) => password.value = $event,
              label: "Password Confirmation",
              type: isPwdVisible.value ? "text" : "password",
              outlined: "",
              dense: "",
              "lazy-rules": "",
              standout: "bg-blue-50 text-indigo-700",
              class: "my-2",
              rules: [
                (val) => !!val || "Password is required",
                (val) => val.length >= 8 || "Password must be at least 8 characters"
              ]
            }, {
              append: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center" data-v-7fe53f7c${_scopeId2}>`);
                  if (password.value && password.value.length >= 8) {
                    _push3(ssrRenderComponent(_component_q_icon, {
                      name: "check_circle",
                      color: "green-600",
                      class: "mr-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_q_icon, {
                    name: isPwdVisible.value ? "visibility_off" : "visibility",
                    class: "cursor-pointer",
                    color: "indigo-600",
                    onClick: ($event) => isPwdVisible.value = !isPwdVisible.value
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center" }, [
                      password.value && password.value.length >= 8 ? (openBlock(), createBlock(_component_q_icon, {
                        key: 0,
                        name: "check_circle",
                        color: "green-600",
                        class: "mr-2"
                      })) : createCommentVNode("", true),
                      createVNode(_component_q_icon, {
                        name: isPwdVisible.value ? "visibility_off" : "visibility",
                        class: "cursor-pointer",
                        color: "indigo-600",
                        onClick: ($event) => isPwdVisible.value = !isPwdVisible.value
                      }, null, 8, ["name", "onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="bg-blue-50 p-3 rounded-lg border border-blue-100" data-v-7fe53f7c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_checkbox, {
              modelValue: agreeTerms.value,
              "onUpdate:modelValue": ($event) => agreeTerms.value = $event,
              color: "indigo"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-sm text-gray-700" data-v-7fe53f7c${_scopeId2}> I agree to the <a class="font-medium text-indigo-600 hover:text-indigo-800 transition-colors" href="#" data-v-7fe53f7c${_scopeId2}>Terms</a> and <a class="font-medium text-indigo-600 hover:text-indigo-800 transition-colors" href="#" data-v-7fe53f7c${_scopeId2}>Privacy Policy</a></span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm text-gray-700" }, [
                      createTextVNode(" I agree to the "),
                      createVNode("a", {
                        class: "font-medium text-indigo-600 hover:text-indigo-800 transition-colors",
                        href: "#"
                      }, "Terms"),
                      createTextVNode(" and "),
                      createVNode("a", {
                        class: "font-medium text-indigo-600 hover:text-indigo-800 transition-colors",
                        href: "#"
                      }, "Privacy Policy")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_q_btn, {
              type: "submit",
              unelevated: "",
              color: "primary",
              class: "w-full py-4 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform hover:scale-[1.02]",
              loading: loading.value,
              disable: !isFormValid.value
            }, {
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_spinner_dots, { color: "white" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_spinner_dots, { color: "white" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-lg font-bold tracking-wide" data-v-7fe53f7c${_scopeId2}>Sign Up</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-lg font-bold tracking-wide" }, "Sign Up")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative py-4" data-v-7fe53f7c${_scopeId}><div class="absolute inset-0 flex items-center" data-v-7fe53f7c${_scopeId}><div class="w-full border-t border-gray-200" data-v-7fe53f7c${_scopeId}></div></div><div class="relative flex justify-center" data-v-7fe53f7c${_scopeId}><span class="px-4 text-sm font-medium text-gray-500 bg-white" data-v-7fe53f7c${_scopeId}>Or continue with</span></div></div><div class="grid grid-cols-2 gap-4" data-v-7fe53f7c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_q_btn, {
              class: "py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow",
              flat: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" class="w-5 h-5 mr-2" data-v-7fe53f7c${_scopeId2}><span class="font-medium text-gray-700" data-v-7fe53f7c${_scopeId2}>Google</span>`);
                } else {
                  return [
                    createVNode("img", {
                      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
                      class: "w-5 h-5 mr-2"
                    }),
                    createVNode("span", { class: "font-medium text-gray-700" }, "Google")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_q_btn, {
              class: "py-3 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md",
              flat: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" class="w-5 h-5 mr-2 invert" data-v-7fe53f7c${_scopeId2}><span class="font-medium" data-v-7fe53f7c${_scopeId2}>GitHub</span>`);
                } else {
                  return [
                    createVNode("img", {
                      src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
                      alt: "GitHub",
                      class: "w-5 h-5 mr-2 invert"
                    }),
                    createVNode("span", { class: "font-medium" }, "GitHub")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center pt-3" data-v-7fe53f7c${_scopeId}><p class="text-sm text-gray-600" data-v-7fe53f7c${_scopeId}> Already have an account? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/signin",
              class: "font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign in `);
                  _push3(ssrRenderComponent(_component_q_icon, {
                    name: "arrow_forward",
                    size: "xs",
                    class: "ml-1 animate-pulse"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Sign in "),
                    createVNode(_component_q_icon, {
                      name: "arrow_forward",
                      size: "xs",
                      class: "ml-1 animate-pulse"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 gap-6 m-0" }, [
                createVNode(_component_q_input, {
                  modelValue: firstName.value,
                  "onUpdate:modelValue": ($event) => firstName.value = $event,
                  label: "First Name",
                  rules: [(val) => !!val || "First name is required"],
                  class: "col-span-1",
                  "lazy-rules": "",
                  outlined: "",
                  dense: "",
                  standout: "bg-blue-50 text-indigo-700"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                createVNode(_component_q_input, {
                  modelValue: lastName.value,
                  "onUpdate:modelValue": ($event) => lastName.value = $event,
                  label: "Last Name",
                  rules: [(val) => !!val || "Last name is required"],
                  class: "col-span-1",
                  "lazy-rules": "",
                  outlined: "",
                  dense: "",
                  standout: "bg-blue-50 text-indigo-700"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
              ]),
              createVNode(_component_q_input, {
                modelValue: email.value,
                "onUpdate:modelValue": ($event) => email.value = $event,
                label: "Email Address",
                type: "email",
                outlined: "",
                dense: "",
                "lazy-rules": "",
                standout: "bg-blue-50 text-indigo-700",
                class: "my-2",
                rules: [
                  (val) => !!val || "Email is required",
                  (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Please enter a valid email"
                ]
              }, createSlots({ _: 2 }, [
                email.value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value) ? {
                  name: "append",
                  fn: withCtx(() => [
                    createVNode(_component_q_icon, {
                      name: "check_circle",
                      color: "green-600"
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["modelValue", "onUpdate:modelValue", "rules"]),
              createVNode(_component_q_input, {
                modelValue: password.value,
                "onUpdate:modelValue": ($event) => password.value = $event,
                label: "Password",
                type: isPwdVisible.value ? "text" : "password",
                outlined: "",
                dense: "",
                "lazy-rules": "",
                standout: "bg-blue-50 text-indigo-700",
                class: "my-2",
                rules: [
                  (val) => !!val || "Password is required",
                  (val) => val.length >= 8 || "Password must be at least 8 characters"
                ]
              }, {
                append: withCtx(() => [
                  createVNode("div", { class: "flex items-center" }, [
                    password.value && password.value.length >= 8 ? (openBlock(), createBlock(_component_q_icon, {
                      key: 0,
                      name: "check_circle",
                      color: "green-600",
                      class: "mr-2"
                    })) : createCommentVNode("", true),
                    createVNode(_component_q_icon, {
                      name: isPwdVisible.value ? "visibility_off" : "visibility",
                      class: "cursor-pointer",
                      color: "indigo-600",
                      onClick: ($event) => isPwdVisible.value = !isPwdVisible.value
                    }, null, 8, ["name", "onClick"])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "type", "rules"]),
              createVNode(_component_q_input, {
                modelValue: password.value,
                "onUpdate:modelValue": ($event) => password.value = $event,
                label: "Password Confirmation",
                type: isPwdVisible.value ? "text" : "password",
                outlined: "",
                dense: "",
                "lazy-rules": "",
                standout: "bg-blue-50 text-indigo-700",
                class: "my-2",
                rules: [
                  (val) => !!val || "Password is required",
                  (val) => val.length >= 8 || "Password must be at least 8 characters"
                ]
              }, {
                append: withCtx(() => [
                  createVNode("div", { class: "flex items-center" }, [
                    password.value && password.value.length >= 8 ? (openBlock(), createBlock(_component_q_icon, {
                      key: 0,
                      name: "check_circle",
                      color: "green-600",
                      class: "mr-2"
                    })) : createCommentVNode("", true),
                    createVNode(_component_q_icon, {
                      name: isPwdVisible.value ? "visibility_off" : "visibility",
                      class: "cursor-pointer",
                      color: "indigo-600",
                      onClick: ($event) => isPwdVisible.value = !isPwdVisible.value
                    }, null, 8, ["name", "onClick"])
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "type", "rules"]),
              createVNode("div", { class: "bg-blue-50 p-3 rounded-lg border border-blue-100" }, [
                createVNode(_component_q_checkbox, {
                  modelValue: agreeTerms.value,
                  "onUpdate:modelValue": ($event) => agreeTerms.value = $event,
                  color: "indigo"
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "text-sm text-gray-700" }, [
                      createTextVNode(" I agree to the "),
                      createVNode("a", {
                        class: "font-medium text-indigo-600 hover:text-indigo-800 transition-colors",
                        href: "#"
                      }, "Terms"),
                      createTextVNode(" and "),
                      createVNode("a", {
                        class: "font-medium text-indigo-600 hover:text-indigo-800 transition-colors",
                        href: "#"
                      }, "Privacy Policy")
                    ])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode(_component_q_btn, {
                type: "submit",
                unelevated: "",
                color: "primary",
                class: "w-full py-4 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform hover:scale-[1.02]",
                loading: loading.value,
                disable: !isFormValid.value
              }, {
                loading: withCtx(() => [
                  createVNode(_component_q_spinner_dots, { color: "white" })
                ]),
                default: withCtx(() => [
                  createVNode("span", { class: "text-lg font-bold tracking-wide" }, "Sign Up")
                ]),
                _: 1
              }, 8, ["loading", "disable"]),
              createVNode("div", { class: "relative py-4" }, [
                createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                  createVNode("div", { class: "w-full border-t border-gray-200" })
                ]),
                createVNode("div", { class: "relative flex justify-center" }, [
                  createVNode("span", { class: "px-4 text-sm font-medium text-gray-500 bg-white" }, "Or continue with")
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                createVNode(_component_q_btn, {
                  class: "py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow",
                  flat: ""
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
                      class: "w-5 h-5 mr-2"
                    }),
                    createVNode("span", { class: "font-medium text-gray-700" }, "Google")
                  ]),
                  _: 1
                }),
                createVNode(_component_q_btn, {
                  class: "py-3 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md",
                  flat: ""
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
                      alt: "GitHub",
                      class: "w-5 h-5 mr-2 invert"
                    }),
                    createVNode("span", { class: "font-medium" }, "GitHub")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "text-center pt-3" }, [
                createVNode("p", { class: "text-sm text-gray-600" }, [
                  createTextVNode(" Already have an account? "),
                  createVNode(_component_NuxtLink, {
                    to: "/auth/signin",
                    class: "font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sign in "),
                      createVNode(_component_q_icon, {
                        name: "arrow_forward",
                        size: "xs",
                        class: "ml-1 animate-pulse"
                      })
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7fe53f7c"]]);

export { signup as default };
//# sourceMappingURL=signup-DZp4wc1G.mjs.map
