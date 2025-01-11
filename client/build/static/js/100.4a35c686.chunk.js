"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[100],{5748:(e,t,s)=>{s.d(t,{A:()=>r});s(5043);var o=s(7511),a=s(579);function r(e){let{children:t}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.A,{}),(0,a.jsx)("main",{className:"flex-1 p-4",children:t})]})}},100:(e,t,s)=>{s.r(t),s.d(t,{default:()=>l});var o=s(9379),a=s(5043),r=s(5748),n=s(9722),i=s(579);function l(){const[e,t]=(0,a.useState)([]),[s,l]=(0,a.useState)(!1),c=(0,a.useRef)(null),[d,x]=(0,a.useState)({}),[h,p]=(0,a.useState)(1),[b]=(0,a.useState)(5);(0,a.useEffect)((()=>{(async()=>{try{const e=await n.A.get("".concat("http://localhost:4500","/api/asset/projector/all"));200===e.status?t(e.data.data.length>0?e.data.data:[]):alert("Error fetching projector data: ".concat(e.data.message||"Unexpected response"))}catch(a){var e,s,o;console.error("Error fetching projector data:",a.message||(null===(e=a.response)||void 0===e?void 0:e.data)),alert("Error fetching projector data: ".concat((null===(s=a.response)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.message)||a.message))}})()}),[]);const m=e.filter((e=>{const{location:t="",division:s="",model:o=""}=d,a=!t||e.location.toLowerCase().includes(t.toLowerCase().trim()),r=!s||e.division.toLowerCase().includes(s.toLowerCase().trim()),n=!o||e.model.toLowerCase().includes(o.toLowerCase().trim());return a&&r&&n})),u=m.slice((h-1)*b,h*b),j=Math.ceil(m.length/b);return(0,i.jsx)("div",{children:(0,i.jsx)(r.A,{children:(0,i.jsx)("div",{className:"p-4 sm:ml-64",children:(0,i.jsxs)("div",{className:"p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700",children:[(0,i.jsxs)("div",{className:"p-4",children:[(0,i.jsx)("div",{className:"flex justify-end gap-4 mb-4",children:["location","division","model"].map((t=>(0,i.jsxs)("select",{onChange:e=>x((0,o.A)((0,o.A)({},d),{},{[t]:e.target.value})),className:"input input-bordered input-info w-full max-w-xs",children:[(0,i.jsx)("option",{value:"",children:"Select ".concat(t.charAt(0).toUpperCase()+t.slice(1))}),e.map((e=>e[t])).filter(((e,t,s)=>s.indexOf(e)===t)).map((e=>(0,i.jsx)("option",{value:e,children:e},e)))]},t)))}),(0,i.jsx)("h3",{className:"text-center py-9 font-bold",style:{color:"#FF735C"},children:"Projector Details"}),(0,i.jsx)("div",{className:"overflow-x-auto",children:(0,i.jsxs)("table",{className:"table",children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"}}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Projector Id"}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Model"}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Serial Number"}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Location"}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Division"}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Status"}),(0,i.jsx)("th",{className:"font-bold",style:{color:"#FF735C"},children:"Action"})]})}),(0,i.jsx)("tbody",{children:u.map(((e,t)=>(0,i.jsxs)("tr",{className:"hover",children:[(0,i.jsx)("td",{children:(h-1)*b+t+1}),(0,i.jsx)("td",{children:e.projectorId}),(0,i.jsx)("td",{children:e.model}),(0,i.jsx)("td",{children:e.serialNumber}),(0,i.jsx)("td",{style:{color:e.location&&"N/A"!==e.location?"black":"red"},children:e.location||"N/A"}),(0,i.jsx)("td",{style:{color:e.division&&"N/A"!==e.division?"black":"red"},children:e.division||"N/A"}),(0,i.jsx)("td",{style:{color:"Inactive"===e.status?"red":"black"},children:e.status}),(0,i.jsx)("td",{children:(0,i.jsx)("button",{className:"btn btn-sm btn-grey",onClick:()=>(e=>{c.current=e,l(!0)})(e),children:"View"})})]},t)))})]})}),(0,i.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,i.jsx)("button",{onClick:()=>{h>1&&p((e=>e-1))},className:"custom-btn",disabled:1===h,children:"Previous"}),(0,i.jsxs)("span",{children:["Page ",h," of ",j]}),(0,i.jsx)("button",{onClick:()=>{h<j&&p((e=>e+1))},className:"custom-btn",disabled:h===j,children:"Next"})]})]}),s&&c.current&&(0,i.jsx)("dialog",{open:s,className:"modal modal-bottom sm:modal-middle",children:(0,i.jsxs)("div",{className:"modal-box",children:[(0,i.jsx)("h4",{className:"text-center font-bold",style:{color:"#FF735C"},children:"Projector Details"}),(0,i.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Projector ID:"})," ",c.current.projectorId||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Model:"})," ",c.current.model||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Serial Number:"})," ",c.current.serialNumber||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Handled By:"})," ",c.current.handledBy||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Location:"})," ",c.current.location||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Division:"})," ",c.current.division||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Status:"})," ",c.current.status||"N/A"]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:"Description:"})," ",c.current.description||"N/A"]})]}),(0,i.jsx)("div",{className:"modal-action flex justify-center",children:(0,i.jsx)("button",{className:"custom-btn",onClick:()=>{l(!1),c.current=null},children:"Close"})})]})})]})})})})}},7511:(e,t,s)=>{s.d(t,{A:()=>c});var o=s(9379),a=s(5043),r=s(9722),n=s(2134),i=s(579);function l(){const[e,t]=(0,a.useState)(!1),s=(0,n.Zp)();return(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:"navbar bg-base-100",children:[(0,i.jsx)("div",{className:"flex-1",children:(0,i.jsx)("a",{className:"btn btn-ghost text-xl ml-0 ",style:{color:"#FF735C"},children:"Asset Management"})}),(0,i.jsx)("div",{className:"flex-none gap-2",children:(0,i.jsxs)("div",{className:"dropdown dropdown-end",children:[(0,i.jsx)("div",{tabIndex:0,role:"button",className:"btn btn-ghost btn-circle avatar",onClick:()=>{t(!e)},children:(0,i.jsx)("i",{className:"bx bx-cog text-xl",style:{color:"#FF735C"}})}),e&&(0,i.jsx)("ul",{tabIndex:0,className:"menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",children:(0,i.jsx)("li",{children:(0,i.jsx)("a",{onClick:async()=>{try{const e=await r.A.post("".concat("http://localhost:4500","/api/admin/logout"));200===e.status&&(localStorage.removeItem("token"),s("/"),alert(e.data.message))}catch(e){console.error("Error during logout:",e),alert("An error occurred while logging out")}},children:"Logout"})})})]})})]})})}function c(){const[e,t]=(0,a.useState)(!1),[s,r]=(0,a.useState)({});return(0,i.jsxs)("div",{children:[(0,i.jsxs)("button",{type:"button",className:"inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",onClick:()=>{t(!e)},children:[(0,i.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,i.jsx)("svg",{className:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{clipRule:"evenodd",fillRule:"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})})]}),(0,i.jsx)(l,{}),(0,i.jsx)("aside",{className:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform ".concat(e?"translate-x-0":"-translate-x-full"," sm:translate-x-0"),"aria-label":"Sidebar",children:(0,i.jsx)("div",{className:"h-full px-3 py-24 overflow-y-auto ",children:(0,i.jsx)("ul",{className:"space-y-2 font-medium",children:[{id:1,name:"Dashboard",icon:"bx bx-home",path:"/dashboard"},{id:2,name:"Employee",icon:"bx bx-user",subRoutes:[{id:1,name:"Add Employee",icon:"bx bx-plus",path:"/add-employee"},{id:2,name:"Employee Details",icon:"bx bx-list-ul",path:"/employee-details"},{id:3,name:"Employee Report",icon:"bx bx-history",path:"/employee-report"}]},{id:3,name:"Laptop",icon:"bx bx-laptop",subRoutes:[{id:1,name:"Add Laptop",icon:"bx bx-plus",path:"/assets-laptop"},{id:2,name:"Laptop Details",icon:"bx bx-list-ul",path:"/laptop-details"},{id:3,name:"Laptop History",icon:"bx bx-history",path:"/assets-laptop-history"},{id:4,name:"Laptop Report",icon:"bx bxs-report",path:"/laptop-report"}]},{id:4,name:"Desktop",icon:"bx bx-desktop",subRoutes:[{id:1,name:"Add Desktop",icon:"bx bx-plus",path:"/assets-desktop"},{id:2,name:"Desktop Details",icon:"bx bx-list-ul",path:"/desktop-details"},{id:3,name:"Desktop History",icon:"bx bx-history",path:"/assets/desktop-history"},{id:4,name:"Desktop Report",icon:"bx bxs-report",path:"/desktop-report"}]},{id:5,name:"Scrap",icon:"bx bx-trash",subRoutes:[{id:1,name:"Add Scrap",icon:"bx bx-trash",path:"/scrap-items"},{id:2,name:"Scrap History",icon:"bx bx-history",path:"/scrap-history"},{id:3,name:"Scrap Report",icon:"bx bxs-report",path:"/scrap-report"}]},{id:6,name:"Domain",icon:"bx bx-network-chart",subRoutes:[{id:1,name:"Add Domain",icon:"bx bx-plus",path:"/add-domain"},{id:2,name:"Domain Details",icon:"bx bx-list-ul",path:"/domain-details"},{id:3,name:"Domain History",icon:"bx bx-history",path:"/domain-history"},{id:4,name:"Domain Report",icon:"bx bxs-report",path:"/domain-report"}]},{id:7,name:"CCTV",icon:"bx bx-camera",subRoutes:[{id:1,name:"Add CCTV",icon:"bx bx-plus",path:"/add-cctv"},{id:2,name:"CCTV Details",icon:"bx bx-detail",path:"/cctv-details"},{id:3,name:"CCTV History",icon:"bx bx-history",path:"/cctv-history"},{id:4,name:"CCTV Report",icon:"bx bxs-report",path:"/cctv-report"}]},{id:8,name:"Dongle",icon:"bx bx-plug",subRoutes:[{id:1,name:"Add Dongle",icon:"bx bx-plug",path:"/add-dongle"},{id:2,name:"Dongle Details",icon:"bx bx-detail",path:"/dongle-details"},{id:3,name:"Dongle History",icon:"bx bx-history",path:"/dongle-history"},{id:4,name:"Dongle Report",icon:"bx bxs-report",path:"/dongle-report"}]},{id:9,name:"Printer",icon:"bx bx-printer",subRoutes:[{id:1,name:"Add Printer",icon:"bx bx-printer",path:"/add-printer"},{id:2,name:"Printer Details",icon:"bx bx-detail",path:"/printer-details"},{id:3,name:"Printer History",icon:"bx bx-history",path:"/printer-history"},{id:4,name:"Printer Report",icon:"bx bxs-report",path:"/printer-report"}]},{id:10,name:"Projector",icon:"bx bx-tv",subRoutes:[{id:1,name:"Add Projector",icon:"bx bx-plus",path:"/add-projector"},{id:2,name:"Projector Details",icon:"bx bx-info-circle",path:"/projector-details"},{id:3,name:"Projector History",icon:"bx bx-history",path:"/projector-history"},{id:4,name:"Projector Report",icon:"bx bx-bar-chart-alt",path:"/projector-report"}]},{id:11,name:"Tablet",icon:"bx bx-tab",subRoutes:[{id:1,name:"Add Tablet",icon:"bx bx-plus",path:"/add-tablet"},{id:2,name:"Tablet Details",icon:"bx bx-info-circle",path:"/tablet-details"},{id:3,name:"Tablet History",icon:"bx bx-history",path:"/tablet-history"},{id:4,name:"Tablet Report",icon:"bx bx-bar-chart-alt",path:"/tablet-report"}]},{id:12,name:"Phone",icon:"bx bx-phone",subRoutes:[{id:1,name:"Add Phone",icon:"bx bx-plus",path:"/add-phone"},{id:2,name:"Phone Details",icon:"bx bx-detail",path:"/phone-details"},{id:3,name:"Phone History",icon:"bx bx-history",path:"/phone-history"},{id:4,name:"Phone Report",icon:"bx bxs-report",path:"/phone-report"}]}].map((e=>(0,i.jsxs)("li",{children:[(0,i.jsxs)("a",{href:e.path,className:"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",onClick:()=>{return e.subRoutes&&(t=e.id,void r((e=>(0,o.A)((0,o.A)({},e),{},{[t]:!e[t]}))));var t},children:[(0,i.jsx)("span",{className:"".concat(e.icon),style:{color:"#FF735C"}}),(0,i.jsx)("span",{className:"flex-1 ml-3 whitespace-nowrap",children:e.name}),e.subRoutes&&(0,i.jsx)("svg",{className:"w-3 h-3 transform ".concat(s[e.id]?"rotate-180":""),"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 10 6",children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 4 4 4-4"})})]}),s[e.id]&&e.subRoutes&&(0,i.jsx)("ul",{className:"pl-8 mt-4 space-y-2",children:e.subRoutes.map((t=>(0,i.jsx)("li",{children:(0,i.jsxs)("a",{href:t.path,className:"flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",children:[(0,i.jsx)("span",{className:"".concat(t.icon),style:{color:"#FF735C"}}),(0,i.jsx)("span",{className:"ml-3",children:t.name})]})},"".concat(e.id,"-").concat(t.id))))})]},e.id)))})})})]})}}}]);
//# sourceMappingURL=100.4a35c686.chunk.js.map