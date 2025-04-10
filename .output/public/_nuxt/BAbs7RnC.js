import{aB as Z,m as A,g as $,az as F,ai as Q,z as L,am as ee,Y as y,h as K,i as z,ah as te,ar as j,aC as N,q as le,aa as oe,ay as ne,l as R,aD as ie,k as I,x as J,al as ae}from"./DaL4rXlw.js";import{f as re,h as V,v as O,i as se,j as U}from"./B6nm9j-Z.js";import{b as G,c as ue}from"./zjdVGI5d.js";function ce(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Z.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const de={target:{type:[Boolean,String,Element],default:!0},noParentEvent:Boolean},We={...de,contextMenu:Boolean};function Pe({showing:e,avoidEmit:t,configureAnchorEl:l}){const{props:o,proxy:n,emit:d}=A(),i=$(null);let r=null;function u(a){return i.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const c={};l===void 0&&(Object.assign(c,{hide(a){n.hide(a)},toggle(a){n.toggle(a),a.qAnchorHandled=!0},toggleKey(a){ee(a,13)===!0&&c.toggle(a)},contextClick(a){n.hide(a),F(a),L(()=>{n.show(a),a.qAnchorHandled=!0})},prevent:F,mobileTouch(a){if(c.mobileCleanup(a),u(a)!==!0)return;n.hide(a),i.value.classList.add("non-selectable");const s=a.target;Q(c,"anchor",[[s,"touchmove","mobileCleanup","passive"],[s,"touchend","mobileCleanup","passive"],[s,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),r=setTimeout(()=>{r=null,n.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){i.value.classList.remove("non-selectable"),r!==null&&(clearTimeout(r),r=null),e.value===!0&&a!==void 0&&ce()}}),l=function(a=o.contextMenu){if(o.noParentEvent===!0||i.value===null)return;let s;a===!0?n.$q.platform.is.mobile===!0?s=[[i.value,"touchstart","mobileTouch","passive"]]:s=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:s=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],Q(c,"anchor",s)});function f(){te(c,"anchor")}function g(a){for(i.value=a;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;l()}function p(){if(o.target===!1||o.target===""||n.$el.parentNode===null)i.value=null;else if(o.target===!0)g(n.$el.parentNode);else{let a=o.target;if(typeof o.target=="string")try{a=document.querySelector(o.target)}catch{a=void 0}a!=null?(i.value=a.$el||a,l()):(i.value=null,console.error(`Anchor: target "${o.target}" not found`))}}return y(()=>o.contextMenu,a=>{i.value!==null&&(f(),l(a))}),y(()=>o.target,()=>{i.value!==null&&f(),p()}),y(()=>o.noParentEvent,a=>{i.value!==null&&(a===!0?f():l())}),K(()=>{p(),t!==!0&&o.modelValue===!0&&i.value===null&&d("update:modelValue",!1)}),z(()=>{r!==null&&clearTimeout(r),f()}),{anchorEl:i,canShow:u,anchorEvents:c}}function Se(e,t){const l=$(null);let o;function n(r,u){const c=`${u!==void 0?"add":"remove"}EventListener`,f=u!==void 0?u:o;r!==window&&r[c]("scroll",f,j.passive),window[c]("scroll",f,j.passive),o=u}function d(){l.value!==null&&(n(l.value),l.value=null)}const i=y(()=>e.noParentEvent,()=>{l.value!==null&&(d(),t())});return z(i),{localScrollTarget:l,unconfigureScrollTarget:d,changeScrollEvent:n}}const $e={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},Le=["beforeShow","show","beforeHide","hide"];function ke({showing:e,canShow:t,hideOnRouteChange:l,handleShow:o,handleHide:n,processOnMount:d}){const i=A(),{props:r,emit:u,proxy:c}=i;let f;function g(m){e.value===!0?s(m):p(m)}function p(m){if(r.disable===!0||m!==void 0&&m.qAnchorHandled===!0||t!==void 0&&t(m)!==!0)return;const h=r["onUpdate:modelValue"]!==void 0;h===!0&&(u("update:modelValue",!0),f=m,L(()=>{f===m&&(f=void 0)})),(r.modelValue===null||h===!1)&&a(m)}function a(m){e.value!==!0&&(e.value=!0,u("beforeShow",m),o!==void 0?o(m):u("show",m))}function s(m){if(r.disable===!0)return;const h=r["onUpdate:modelValue"]!==void 0;h===!0&&(u("update:modelValue",!1),f=m,L(()=>{f===m&&(f=void 0)})),(r.modelValue===null||h===!1)&&T(m)}function T(m){e.value!==!1&&(e.value=!1,u("beforeHide",m),n!==void 0?n(m):u("hide",m))}function x(m){r.disable===!0&&m===!0?r["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!1):m===!0!==e.value&&(m===!0?a:T)(f)}y(()=>r.modelValue,x),l!==void 0&&re(i)===!0&&y(()=>c.$route.fullPath,()=>{l.value===!0&&e.value===!0&&s()}),K(()=>{x(r.modelValue)});const W={show:p,hide:s,toggle:g};return Object.assign(c,W),W}let fe=1,me=document.body;function he(e,t){const l=document.createElement("div");if(l.id=t!==void 0?`q-portal--${t}--${fe++}`:e,N.globalNodes!==void 0){const o=N.globalNodes.class;o!==void 0&&(l.className=o)}return me.appendChild(l),l}function ve(e){e.remove()}const M=[];function qe(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return V(e)}else if(e.__qPortal===!0){const l=V(e);return l!==void 0&&l.$options.name==="QPopupProxy"?(e.hide(t),l):e}e=V(e)}while(e!=null)}const pe=le({name:"QPortal",setup(e,{slots:t}){return()=>t.default()}});function ge(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Ae(e,t,l,o){const n=$(!1),d=$(!1);let i=null;const r={},u=o==="dialog"&&ge(e);function c(g){if(g===!0){G(r),d.value=!0;return}d.value=!1,n.value===!1&&(u===!1&&i===null&&(i=he(!1,o)),n.value=!0,M.push(e.proxy),ue(r))}function f(g){if(d.value=!1,g!==!0)return;G(r),n.value=!1;const p=M.indexOf(e.proxy);p!==-1&&M.splice(p,1),i!==null&&(ve(i),i=null)}return oe(()=>{f(!0)}),e.proxy.__qPortal=!0,ne(e.proxy,"contentEl",()=>t.value),{showPortal:c,hidePortal:f,portalIsActive:n,portalIsAccessible:d,renderPortal:()=>u===!0?l():n.value===!0?[R(ie,{to:i},R(pe,l))]:void 0}}const ze={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Ve(e,t=()=>{},l=()=>{}){return{transitionProps:I(()=>{const o=`q-transition--${e.transitionShow||t()}`,n=`q-transition--${e.transitionHide||l()}`;return{appear:!0,enterFromClass:`${o}-enter-from`,enterActiveClass:`${o}-enter-active`,enterToClass:`${o}-enter-to`,leaveFromClass:`${n}-leave-from`,leaveActiveClass:`${n}-leave-active`,leaveToClass:`${n}-leave-to`}}),transitionStyle:I(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}function De(){let e;const t=A();function l(){e=void 0}return J(l),z(l),{removeTick:l,registerTick(o){e=o,L(()=>{e===o&&(O(t)===!1&&e(),e=void 0)})}}}function je(){let e=null;const t=A();function l(){e!==null&&(clearTimeout(e),e=null)}return J(l),z(l),{removeTimeout:l,registerTimeout(o,n){l(),O(t)===!1&&(e=setTimeout(()=>{e=null,o()},n))}}}const Be=[Element,String],be=[null,document,document.body,document.scrollingElement,document.documentElement];function Fe(e,t){let l=se(t);if(l===void 0){if(e==null)return window;l=e.closest(".scroll,.scroll-y,.overflow-auto")}return be.includes(l)?window:l}function Qe(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function Ne(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let S;function we(){if(S!==void 0)return S;const e=document.createElement("p"),t=document.createElement("div");U(e,{width:"100%",height:"200px"}),U(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const l=e.offsetWidth;t.style.overflow="scroll";let o=e.offsetWidth;return l===o&&(o=t.clientWidth),t.remove(),S=l-o,S}const{notPassiveCapture:k}=j,w=[];function q(e){const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains("no-pointer-events")===!0)return;let l=M.length-1;for(;l>=0;){const o=M[l].$;if(o.type.name==="QTooltip"){l--;continue}if(o.type.name!=="QDialog")break;if(o.props.seamless!==!0)return;l--}for(let o=w.length-1;o>=0;o--){const n=w[o];if((n.anchorEl.value===null||n.anchorEl.value.contains(t)===!1)&&(t===document.body||n.innerRef.value!==null&&n.innerRef.value.contains(t)===!1))e.qClickOutside=!0,n.onClickOutside(e);else return}}function Re(e){w.push(e),w.length===1&&(document.addEventListener("mousedown",q,k),document.addEventListener("touchstart",q,k))}function Ie(e){const t=w.findIndex(l=>l===e);t!==-1&&(w.splice(t,1),w.length===0&&(document.removeEventListener("mousedown",q,k),document.removeEventListener("touchstart",q,k)))}let Y,_;function Ue(e){const t=e.split(" ");return t.length!==2?!1:["top","center","bottom"].includes(t[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(t[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Ge(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const B={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{B[`${e}#ltr`]=e,B[`${e}#rtl`]=e});function Ye(e,t){const l=e.split(" ");return{vertical:l[0],horizontal:B[`${l[1]}#${t===!0?"rtl":"ltr"}`]}}function xe(e,t){let{top:l,left:o,right:n,bottom:d,width:i,height:r}=e.getBoundingClientRect();return t!==void 0&&(l-=t[1],o-=t[0],d+=t[1],n+=t[0],i+=t[0],r+=t[1]),{top:l,bottom:d,height:r,left:o,right:n,width:i,middle:o+(n-o)/2,center:l+(d-l)/2}}function ye(e,t,l){let{top:o,left:n}=e.getBoundingClientRect();return o+=t.top,n+=t.left,l!==void 0&&(o+=l[1],n+=l[0]),{top:o,bottom:o+1,height:1,left:n,right:n+1,width:1,middle:n,center:o}}function Te(e,t){return{top:0,center:t/2,bottom:t,left:0,middle:e/2,right:e}}function X(e,t,l,o){return{top:e[l.vertical]-t[o.vertical],left:e[l.horizontal]-t[o.horizontal]}}function Ee(e,t=0){if(e.targetEl===null||e.anchorEl===null||t>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{Ee(e,t+1)},10);return}const{targetEl:l,offset:o,anchorEl:n,anchorOrigin:d,selfOrigin:i,absoluteOffset:r,fit:u,cover:c,maxHeight:f,maxWidth:g}=e;if(ae.is.ios===!0&&window.visualViewport!==void 0){const P=document.body.style,{offsetLeft:H,offsetTop:b}=window.visualViewport;H!==Y&&(P.setProperty("--q-pe-left",H+"px"),Y=H),b!==_&&(P.setProperty("--q-pe-top",b+"px"),_=b)}const{scrollLeft:p,scrollTop:a}=l,s=r===void 0?xe(n,c===!0?[0,0]:o):ye(n,r,o);Object.assign(l.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:g,maxHeight:f,visibility:"visible"});const{offsetWidth:T,offsetHeight:x}=l,{elWidth:W,elHeight:m}=u===!0||c===!0?{elWidth:Math.max(s.width,T),elHeight:c===!0?Math.max(s.height,x):x}:{elWidth:T,elHeight:x};let h={maxWidth:g,maxHeight:f};(u===!0||c===!0)&&(h.minWidth=s.width+"px",c===!0&&(h.minHeight=s.height+"px")),Object.assign(l.style,h);const E=Te(W,m);let v=X(s,E,d,i);if(r===void 0||o===void 0)D(v,s,E,d,i);else{const{top:P,left:H}=v;D(v,s,E,d,i);let b=!1;if(v.top!==P){b=!0;const C=2*o[1];s.center=s.top-=C,s.bottom-=C+2}if(v.left!==H){b=!0;const C=2*o[0];s.middle=s.left-=C,s.right-=C+2}b===!0&&(v=X(s,E,d,i),D(v,s,E,d,i))}h={top:v.top+"px",left:v.left+"px"},v.maxHeight!==void 0&&(h.maxHeight=v.maxHeight+"px",s.height>v.maxHeight&&(h.minHeight=h.maxHeight)),v.maxWidth!==void 0&&(h.maxWidth=v.maxWidth+"px",s.width>v.maxWidth&&(h.minWidth=h.maxWidth)),Object.assign(l.style,h),l.scrollTop!==a&&(l.scrollTop=a),l.scrollLeft!==p&&(l.scrollLeft=p)}function D(e,t,l,o,n){const d=l.bottom,i=l.right,r=we(),u=window.innerHeight-r,c=document.body.clientWidth;if(e.top<0||e.top+d>u)if(n.vertical==="center")e.top=t[o.vertical]>u/2?Math.max(0,u-d):0,e.maxHeight=Math.min(d,u);else if(t[o.vertical]>u/2){const f=Math.min(u,o.vertical==="center"?t.center:o.vertical===n.vertical?t.bottom:t.top);e.maxHeight=Math.min(d,f),e.top=Math.max(0,f-d)}else e.top=Math.max(0,o.vertical==="center"?t.center:o.vertical===n.vertical?t.top:t.bottom),e.maxHeight=Math.min(d,u-e.top);if(e.left<0||e.left+i>c)if(e.maxWidth=Math.min(i,c),n.horizontal==="middle")e.left=t[o.horizontal]>c/2?Math.max(0,c-i):0;else if(t[o.horizontal]>c/2){const f=Math.min(c,o.horizontal==="middle"?t.middle:o.horizontal===n.horizontal?t.right:t.left);e.maxWidth=Math.min(i,f),e.left=Math.max(0,f-e.maxWidth)}else e.left=Math.max(0,o.horizontal==="middle"?t.middle:o.horizontal===n.horizontal?t.left:t.right),e.maxWidth=Math.min(i,c-e.left)}export{Le as a,Ue as b,$e as c,de as d,De as e,je as f,Ve as g,Se as h,Pe as i,ke as j,Ae as k,Re as l,Ee as m,ce as n,Fe as o,Ye as p,We as q,Ie as r,Be as s,qe as t,ze as u,Ge as v,Qe as w,Ne as x,we as y};
