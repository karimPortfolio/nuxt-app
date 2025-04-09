import{a1 as j,j as i,h as T,aa as ae,ap as S,aq as ne,ar as oe,as as le,at as E,au as ie,av as se,$ as re,r as _,aw as k,ax as ue,ay as ce,az as de,aA as ge,aB as fe,aC as ve,aD as he,M as H,aE as me,aF as B,e as A,aG as M,aH as be,aI as L,aJ as D,aK as ye,aL as Se,aM as Te,a8 as Pe}from"./C2HnR71Y.js";const we=["top","middle","bottom"],Ce=j({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>we.includes(e)}},setup(e,{slots:h}){const g=i(()=>e.align!==void 0?{verticalAlign:e.align}:null),s=i(()=>{const o=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(o!==void 0?` text-${o}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>T("div",{class:s.value,style:g.value,role:"status","aria-label":e.label},ae(h.default,e.label!==void 0?[e.label]:[]))}}),Oe=j({name:"QTooltip",inheritAttrs:!1,props:{...se,...ie,...S,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{...S.transitionShow,default:"jump-down"},transitionHide:{...S.transitionHide,default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:E},self:{type:String,default:"top middle",validator:E},offset:{type:Array,default:()=>[14,14],validator:le},scrollTarget:oe,delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...ne],setup(e,{slots:h,emit:g,attrs:s}){let o,r;const m=re(),{proxy:{$q:a}}=m,u=_(null),f=_(!1),$=i(()=>k(e.anchor,a.lang.rtl)),p=i(()=>k(e.self,a.lang.rtl)),N=i(()=>e.persistent!==!0),{registerTick:W,removeTick:I}=ue(),{registerTimeout:v}=ce(),{transitionProps:Q,transitionStyle:R}=de(e),{localScrollTarget:P,changeScrollEvent:V,unconfigureScrollTarget:z}=ge(e,O),{anchorEl:n,canShow:F,anchorEvents:c}=fe({showing:f,configureAnchorEl:Z}),{show:G,hide:b}=ve({showing:f,canShow:F,handleShow:K,handleHide:U,hideOnRouteChange:N,processOnMount:!0});Object.assign(c,{delayShow:X,delayHide:Y});const{showPortal:w,hidePortal:x,renderPortal:J}=he(m,u,te,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:n,innerRef:u,onClickOutside(l){return b(l),l.target.classList.contains("q-dialog__backdrop")&&Pe(l),!0}},y=i(()=>e.modelValue===null&&e.persistent!==!0&&f.value===!0);H(y,l=>{(l===!0?me:B)(t)}),A(()=>{B(t)})}function K(t){w(),W(()=>{r=new MutationObserver(()=>d()),r.observe(u.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),d(),O()}),o===void 0&&(o=H(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,d)),v(()=>{w(!0),g("show",t)},e.transitionDuration)}function U(t){I(),x(),C(),v(()=>{x(!0),g("hide",t)},e.transitionDuration)}function C(){r!==void 0&&(r.disconnect(),r=void 0),o!==void 0&&(o(),o=void 0),z(),M(c,"tooltipTemp")}function d(){be({targetEl:u.value,offset:e.offset,anchorEl:n.value,anchorOrigin:$.value,selfOrigin:p.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function X(t){if(a.platform.is.mobile===!0){L(),document.body.classList.add("non-selectable");const y=n.value,l=["touchmove","touchcancel","touchend","click"].map(q=>[y,q,"delayHide","passiveCapture"]);D(c,"tooltipTemp",l)}v(()=>{G(t)},e.delay)}function Y(t){a.platform.is.mobile===!0&&(M(c,"tooltipTemp"),L(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),v(()=>{b(t)},e.hideDelay)}function Z(){if(e.noParentEvent===!0||n.value===null)return;const t=a.platform.is.mobile===!0?[[n.value,"touchstart","delayShow","passive"]]:[[n.value,"mouseenter","delayShow","passive"],[n.value,"mouseleave","delayHide","passive"]];D(c,"anchor",t)}function O(){if(n.value!==null||e.scrollTarget!==void 0){P.value=ye(n.value,e.scrollTarget);const t=e.noParentEvent===!0?d:b;V(P.value,t)}}function ee(){return f.value===!0?T("div",{...s,ref:u,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",s.class],style:[s.style,R.value],role:"tooltip"},Te(h.default)):null}function te(){return T(Se,Q.value,ee)}return A(C),Object.assign(m.proxy,{updatePosition:d}),J}});export{Oe as _,Ce as a};
