import{u as z}from"./DAuEsi8n.js";import{r as p,C as B,t as x,x as t,B as a,z as o,F as C,D as j,E as _,g as V,v as m,U as S,G as F,A as s,T,S as N,y as n,ad as E}from"./C2HnR71Y.js";import{a as P,_ as $}from"./DIMR4nZ3.js";import{_ as A,a as D}from"./BQHRkEK-.js";import{_ as H}from"./7Kc7_PT1.js";import".prisma/client/index-browser";const L={class:"py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"},R={class:"container mx-auto px-4 relative z-10"},U={class:"flex flex-col md:flex-row justify-between items-center mb-20"},G={class:"flex items-center"},I={href:"#",class:"group flex items-center font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 gap-2 px-4 py-2 rounded-full hover:bg-blue-50"},J={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"},M={class:"relative"},W={class:"absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6"},K={class:"absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-xs font-medium flex items-center shadow-sm"},O={class:"flex justify-between items-center mb-4"},Q={class:"flex items-center"},X={class:"ml-3 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"},Y={class:"bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm transform hover:scale-105 transition-transform"},Z={class:"text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"},tt={class:"text-gray-600 mb-6 text-sm line-clamp-2 leading-relaxed"},et={class:"flex items-center justify-between mb-6"},ot={class:"flex items-center"},ut={__name:"FeaturesCoursesSection",async setup(st){let l,u;const i=p(4.5);p(1);const{data:f}=([l,u]=B(()=>z("/api/v1/courses","$1PguTW8nqb")),l=await l,u(),l);return(rt,e)=>{const c=S,d=T,g=P,b=N,y=H,v=$,h=V("q-ripple"),w=A,k=D;return m(),x("section",L,[e[11]||(e[11]=t("div",{class:"absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"},null,-1)),e[12]||(e[12]=t("div",{class:"absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl animate-pulse",style:{"animation-delay":"1s"}},null,-1)),t("div",R,[t("div",U,[e[2]||(e[2]=t("div",{class:"mb-10 md:mb-0 text-center md:text-left max-w-2xl"},[t("span",{class:"text-sm font-bold text-primary bg-blue-50 px-4 py-2 rounded-full mb-4 inline-block shadow-sm transform hover:scale-105 transition-transform duration-300"},[t("span",{class:"pulse-dot mr-1.5"}),a("Top Picks ")]),t("h2",{class:"text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4",role:"heading","aria-level":"2"},"Featured Courses"),t("p",{class:"text-gray-600 text-lg max-w-xl leading-relaxed"},"Handpicked by our experts to accelerate your career journey and help you reach your full potential.")],-1)),t("div",G,[t("a",I,[e[1]||(e[1]=a(" View all courses ")),o(c,{name:"arrow_forward",size:"xs",class:"text-blue-600 group-hover:text-blue-800 transform group-hover:translate-x-1 transition-all duration-300"})])])]),t("div",J,[(m(!0),x(C,null,j(_(f),r=>(m(),F(k,{key:r.id,flat:"",class:"transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white group"},{default:s(()=>[t("div",M,[e[5]||(e[5]=t("img",{src:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",class:"w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105",alt:"Course thumbnail image",loading:"lazy"},null,-1)),t("div",W,[o(d,{flat:"",round:"",color:"white",icon:"play_circle",size:"lg",class:"opacity-90 hover:opacity-100 transform hover:scale-110 transition-all","aria-label":"Preview course"})]),o(g,{color:"primary",class:"absolute top-4 left-4 px-4 py-2 text-xs font-bold rounded-full shadow-sm"},{default:s(()=>e[3]||(e[3]=[a("Bestseller")])),_:1}),t("div",K,[o(c,{name:"schedule",size:"xs",class:"mr-1.5"}),e[4]||(e[4]=a(" 12 hours "))])]),o(w,{class:"p-8"},{default:s(()=>[t("div",O,[t("div",Q,[o(b,{size:"2.5rem",class:"ring-2 ring-primary/20 shadow-sm"},{default:s(()=>e[6]||(e[6]=[t("img",{src:"https://randomuser.me/api/portraits/men/32.jpg",alt:"Instructor avatar"},null,-1)])),_:1}),t("span",X,n(r.author.name),1)]),t("div",Y,"$"+n(r.price),1)]),t("h3",Z,n(r.title),1),t("p",tt,n(r.description),1),e[10]||(e[10]=t("div",{class:"flex flex-wrap gap-2 mb-6"},[t("span",{class:"text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"},"HTML/CSS"),t("span",{class:"text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"},"JavaScript"),t("span",{class:"text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"},"React")],-1)),t("div",et,[t("div",ot,[o(y,{modelValue:_(i),"onUpdate:modelValue":e[0]||(e[0]=q=>E(i)?i.value=q:null),max:"5",size:"sm",color:"amber",readonly:"",icon:"star","icon-selected":"star"},null,8,["modelValue"]),e[7]||(e[7]=t("span",{class:"ml-2 text-sm text-gray-600"},"4.5 (2.3k)",-1))]),o(d,{round:"",flat:"",color:"primary",icon:"bookmark",class:"bg-blue-50 hover:bg-blue-100 transition-colors","aria-label":"Bookmark this course"},{default:s(()=>[o(v,null,{default:s(()=>e[8]||(e[8]=[a("Bookmark this course")])),_:1})]),_:1})]),o(d,{unelevated:"",rounded:"",class:"w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-base"},{default:s(()=>[e[9]||(e[9]=t("span",{class:"relative z-10"},"Enroll Now",-1)),o(h)]),_:1})]),_:2},1024)]),_:2},1024))),128))])])])}}};export{ut as default};
