import{c as t,u as r,j as e,b as a,A as l}from"./index-fBptANEH.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=t("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);function o(){const{state:i}=r();return e.jsxs("section",{children:[e.jsx("h1",{className:"page-title",children:"Signal Achievements"}),e.jsx("div",{className:"grid gap-3",children:a.map(s=>{const c=i.unlockedAchievements.includes(s.id);return e.jsxs("article",{className:"holo-panel flex items-center gap-4 p-4",children:[e.jsx("div",{className:`grid h-12 w-12 shrink-0 place-items-center rounded border ${c?"border-acid text-acid":"border-white/10 text-slate-600"}`,children:c?e.jsx(l,{size:22}):e.jsx(n,{size:18})}),e.jsxs("div",{children:[e.jsx("h2",{className:"font-display text-xl",children:s.title}),e.jsx("p",{className:"text-slate-400",children:s.description})]})]},s.id)})})]})}export{o as AchievementsPage};
