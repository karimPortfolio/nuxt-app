import{a1 as k,aN as w,a2 as P,$ as R,a5 as j,aO as z,r as D,j as d,aP as N,h as g,aa as K,U as Q,aQ as U,a8 as h}from"./C2HnR71Y.js";function E(e,s,m){return m<=s?s:Math.min(m,Math.max(s,e))}const G=k({name:"QRating",props:{...P,...w,modelValue:{type:Number,required:!0},max:{type:[String,Number],default:5},icon:[String,Array],iconHalf:[String,Array],iconSelected:[String,Array],iconAriaLabel:[String,Array],color:[String,Array],colorHalf:[String,Array],colorSelected:[String,Array],noReset:Boolean,noDimming:Boolean,readonly:Boolean,disable:Boolean},emits:["update:modelValue"],setup(e,{slots:s,emit:m}){const{proxy:{$q:A}}=R(),_=j(e),$=z(e),x=U($),o=D(0);let u={};const y=d(()=>e.readonly!==!0&&e.disable!==!0),H=d(()=>`q-rating row inline items-center q-rating--${y.value===!0?"":"non-"}editable`+(e.noDimming===!0?" q-rating--no-dimming":"")+(e.disable===!0?" disabled":"")+(e.color!==void 0&&Array.isArray(e.color)===!1?` text-${e.color}`:"")),C=d(()=>{const l=Array.isArray(e.icon)===!0?e.icon.length:0,n=Array.isArray(e.iconSelected)===!0?e.iconSelected.length:0,t=Array.isArray(e.iconHalf)===!0?e.iconHalf.length:0,r=Array.isArray(e.color)===!0?e.color.length:0,i=Array.isArray(e.colorSelected)===!0?e.colorSelected.length:0,a=Array.isArray(e.colorHalf)===!0?e.colorHalf.length:0;return{iconLen:l,icon:l>0?e.icon[l-1]:e.icon,selIconLen:n,selIcon:n>0?e.iconSelected[n-1]:e.iconSelected,halfIconLen:t,halfIcon:t>0?e.iconHalf[n-1]:e.iconHalf,colorLen:r,color:r>0?e.color[r-1]:e.color,selColorLen:i,selColor:i>0?e.colorSelected[i-1]:e.colorSelected,halfColorLen:a,halfColor:a>0?e.colorHalf[a-1]:e.colorHalf}}),V=d(()=>{if(typeof e.iconAriaLabel=="string"){const l=e.iconAriaLabel.length!==0?`${e.iconAriaLabel} `:"";return n=>`${l}${n}`}if(Array.isArray(e.iconAriaLabel)===!0){const l=e.iconAriaLabel.length;if(l>0)return n=>e.iconAriaLabel[Math.min(n,l)-1]}return(l,n)=>`${n} ${l}`}),M=d(()=>{const l=[],n=C.value,t=Math.ceil(e.modelValue),r=y.value===!0?0:null,i=e.iconHalf===void 0||t===e.modelValue?-1:t;for(let a=1;a<=e.max;a++){const c=o.value===0&&e.modelValue>=a||o.value>0&&o.value>=a,f=i===a&&o.value<a,v=o.value>0&&(f===!0?t:e.modelValue)>=a&&o.value<a,I=f===!0?a<=n.halfColorLen?e.colorHalf[a-1]:n.halfColor:n.selColor!==void 0&&c===!0?a<=n.selColorLen?e.colorSelected[a-1]:n.selColor:a<=n.colorLen?e.color[a-1]:n.color,F=(f===!0?a<=n.halfIconLen?e.iconHalf[a-1]:n.halfIcon:n.selIcon!==void 0&&(c===!0||v===!0)?a<=n.selIconLen?e.iconSelected[a-1]:n.selIcon:a<=n.iconLen?e.icon[a-1]:n.icon)||A.iconSet.rating.icon;l.push({name:(f===!0?a<=n.halfIconLen?e.iconHalf[a-1]:n.halfIcon:n.selIcon!==void 0&&(c===!0||v===!0)?a<=n.selIconLen?e.iconSelected[a-1]:n.selIcon:a<=n.iconLen?e.icon[a-1]:n.icon)||A.iconSet.rating.icon,attrs:{tabindex:r,role:"radio","aria-checked":e.modelValue===a?"true":"false","aria-label":V.value(a,F)},iconClass:"q-rating__icon"+(c===!0||f===!0?" q-rating__icon--active":"")+(v===!0?" q-rating__icon--exselected":"")+(o.value===a?" q-rating__icon--hovered":"")+(I!==void 0?` text-${I}`:"")})}return l}),q=d(()=>{const l={role:"radiogroup"};return e.disable===!0&&(l["aria-disabled"]="true"),e.readonly===!0&&(l["aria-readonly"]="true"),l});function S(l){if(y.value===!0){const n=E(parseInt(l,10),1,parseInt(e.max,10)),t=e.noReset!==!0&&e.modelValue===n?0:n;t!==e.modelValue&&m("update:modelValue",t),o.value=0}}function b(l){y.value===!0&&(o.value=l)}function B(l,n){switch(l.keyCode){case 13:case 32:return S(n),h(l);case 37:case 40:return u[`rt${n-1}`]&&u[`rt${n-1}`].focus(),h(l);case 39:case 38:return u[`rt${n+1}`]&&u[`rt${n+1}`].focus(),h(l)}}function L(){o.value=0}return N(()=>{u={}}),()=>{const l=[];return M.value.forEach(({iconClass:n,name:t,attrs:r},i)=>{const a=i+1;l.push(g("div",{key:a,ref:c=>{u[`rt${a}`]=c},class:"q-rating__icon-container flex flex-center",...r,onClick(){S(a)},onMouseover(){b(a)},onMouseout:L,onFocus(){b(a)},onBlur:L,onKeyup(c){B(c,a)}},K(s[`tip-${a}`],[g(Q,{class:n,name:t})])))}),e.name!==void 0&&e.disable!==!0&&x(l,"push"),g("div",{class:H.value,style:_.value,...q.value},l)}}});export{G as _};
