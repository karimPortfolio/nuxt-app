import{W as x,X as S,H as b,R as M,k as p,g as z,Y as B,e as h,c as R,o as v,a as o,Z as A,_ as C,f as I,w as u,b as d,$ as g,a0 as r,a1 as l,t as _}from"./DaL4rXlw.js";import{u as $}from"./Pp3Rty5q.js";import{_ as k,a as D}from"./COVobK48.js";function W(t,e){const{title:a,titleTemplate:i,...n}=t;return $({title:a,titleTemplate:i,_flatMeta:n},{...e,transform(s){const c=x({...s._flatMeta});return delete s._flatMeta,{...s,meta:c}}})}const f=new Map;async function E(t){if(!t)return"";if(f.has(t))return f.get(t);const{[t]:e}=await S(async()=>{const{[t]:a}=await import("./CYzTwnk_.js");return{[t]:a}},[],import.meta.url);return f.set(t,e),e}const V=["width","height","preserveAspectRatio"],X=["d"],Y=b({__name:"MdiIcon",props:{size:{default:void 0},flipX:{type:Boolean,default:!1},flipY:{type:Boolean,default:!1},icon:{},preserveAspectRatio:{default:"meet"}},async setup(t){let e,a;const i=M().public.mdi,n=t,s=p(()=>n.size?n.size:i.defaultSize?i.defaultSize:"1em"),c=z(""),w=p(()=>({"--flip-x":n.flipX?"-1":"1","--flip-y":n.flipY?"-1":"1"}));async function m(){c.value=await E(n.icon)}return B(async()=>n.icon,([e,a]=h(()=>m),e=await e,a(),e)),[e,a]=h(()=>m()),await e,a(),(y,P)=>(v(),R("svg",{viewBox:"0 0 24 24",style:A(w.value),width:s.value,height:s.value,preserveAspectRatio:y.preserveAspectRatio},[o("path",{d:c.value},null,8,X)],12,V))}}),q=C(Y,[["__scopeId","data-v-c7fbaf42"]]),H={class:"flex items-center gap-3"},N={class:"rounded-sm bg-primary text-white p-3 h-fit"},Z={__name:"CustomCard",props:{title:String,icon:String,subtitle:String,content:String},setup(t){return(e,a)=>{const i=q,n=k,s=D;return v(),I(s,{class:"bg-gray-100 rounded-md",flat:""},{default:u(()=>[d(n,null,{default:u(()=>[g(e.$slots,"header",{},()=>[o("div",H,[r(o("div",N,[d(i,{icon:t.icon},null,8,["icon"])],512),[[l,t.icon]]),r(o("div",null,[r(o("div",{class:"font-medium text-xl"},_(t.title),513),[[l,t.title]]),r(o("p",{class:"text-gray-500"},_(t.subtitle),513),[[l,t.subtitle]])],512),[[l,t.title||t.subtitle]])])])]),_:3}),d(n,null,{default:u(()=>[g(e.$slots,"content",{},()=>[o("div",null,[o("p",null,_(t.content),1)])])]),_:3})]),_:3})}}};export{Z as _,W as u};
