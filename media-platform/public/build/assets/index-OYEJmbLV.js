import{j as e,K as i,L as d,S as l,$ as c}from"./app-D42GESqW.js";import{A as o}from"./app-header-layout-Bp4nJ8_g.js";import{c as n,a}from"./app-logo-icon-ZaxzNGat.js";import{R as t}from"./breadcrumbs-B_UhF8Y0.js";/* empty css            */import"./index-hzb-o_T8.js";import"./index-juj8D8SC.js";import"./index-Da8HwhZ6.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]],x=n("CircleUser",m);function p({className:s,...r}){return e.jsx("div",{"data-slot":"card",className:a("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",s),...r})}function u({className:s,...r}){return e.jsx("div",{"data-slot":"card-title",className:a("leading-none font-semibold",s),...r})}function g({className:s,...r}){return e.jsx("div",{"data-slot":"card-description",className:a("text-muted-foreground text-sm",s),...r})}function h({className:s,...r}){return e.jsx("div",{"data-slot":"card-content",className:a("px-6",s),...r})}const k=()=>{const{posts:s}=i().props;return console.log(s),e.jsxs(o,{children:[e.jsx(d,{title:"Home"}),e.jsxs("div",{className:"py-7 lg:px-0",children:[e.jsx("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",children:s.length>0&&s.map(r=>e.jsx(p,{children:e.jsxs(h,{children:[e.jsx("div",{className:"border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border",children:e.jsx("img",{src:`/images/${r.thumbnail}`,alt:r.title,className:"w-full h-full object-cover cursor-pointer",onClick:()=>l.visit(`${t.app.post}/${r.slug}`)})},r.id),e.jsxs("div",{className:"pt-3",children:[e.jsxs("div",{className:"flex items-center gap-2 my-1",children:[e.jsx(x,{className:"size-5"})," ",r.user.name]}),e.jsxs(c,{href:`${t.app.post}/${r.slug}`,children:[e.jsx(u,{className:"py-1.5 leading-5",children:r.title}),e.jsxs(g,{children:[r.description.slice(0,100),"..."]})]})]})]})}))}),s.length===0&&e.jsx("div",{className:"flex items-center h-[40dvh] justify-center",children:e.jsx("h1",{className:"text-2xl font-bold text-gray-900 dark:text-gray-100",children:"No Posts Found"})})]})]})};export{k as default};
