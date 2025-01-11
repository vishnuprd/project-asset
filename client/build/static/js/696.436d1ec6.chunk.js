"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[696],{696:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var r=a(9379),o=a(5043),s=a(5748),n=a(9722),i=a(7762),l=(a(557),a(1238)),c=a(2450),d=a(579);function p(){const[e,t]=(0,o.useState)([]),[a,p]=(0,o.useState)(1),[x,h]=(0,o.useState)(6),[m,b]=(0,o.useState)({serverType:"",serverName:""});(0,o.useEffect)((()=>{(async()=>{try{const e=await n.A.get("".concat("http://localhost:4500","/api/domain/all"));console.log(e.data),200===e.status?t(e.data.data):alert("Error fetching domains: ".concat(e.data.message))}catch(e){alert("Error fetching domain details"),console.error(e)}})()}),[]);const u=e.filter((e=>{const{serverType:t="",serverName:a=""}=m;return!t||e.serverType&&e.serverType.toLowerCase().includes(t.toLowerCase().trim())||!a||e.serverName&&e.serverName.toLowerCase().includes(a.toLowerCase().trim())})),g=Math.ceil(u.length/x),N=u.slice((a-1)*x,a*x);return(0,d.jsx)("div",{children:(0,d.jsx)(s.A,{children:(0,d.jsx)("div",{className:"p-4 sm:ml-64",children:(0,d.jsx)("div",{className:"p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700",children:(0,d.jsxs)("div",{className:"p-4",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,d.jsxs)("select",{value:m.serverName,onChange:e=>b((0,r.A)((0,r.A)({},m),{},{serverName:e.target.value})),className:"input input-bordered input-info w-full max-w-xs",children:[(0,d.jsx)("option",{value:"",children:"Select Server Name"}),e.map((e=>e.serverName)).sort(((e,t)=>e.localeCompare(t))).map((e=>(0,d.jsx)("option",{value:e,children:e},e)))]}),(0,d.jsx)("button",{onClick:()=>{const t=l.Wp.json_to_sheet(e.map((e=>({"Domain ID":e._id||"N/A",Provider:e.provider||"N/A","Server Name":e.serverName||"N/A","Server Type":e.serverType||"N/A","Server IP":e.serverIp||"N/A","Server Url":e.serverUrl||"N/A",TLD:e.tld||"N/A","Registered Name":e.ownerName||"N/A","Registered Organization":e.registeredOrganization||"N/A","Cloud Flare":e.cloudFlare||"N/A","Google Authentication":e.googleAuthentication||"N/A","Register Email":e.registerEmail||"N/A","Purchase Date":e.purchaseDate?new Date(e.purchaseDate).toLocaleDateString():"N/A","Expiry Date":e.expiryDate?new Date(e.expiryDate).toLocaleDateString():"N/A","Last Backup Date":e.lastBackupDate?new Date(e.lastBackupDate).toLocaleDateString():"N/A","Next Maintenance Date":e.nextMaintenanceDate?new Date(e.nextMaintenanceDate).toLocaleDateString():"N/A","One Time Cost":e.oneTimeCost?"$".concat(e.oneTimeCost):"N/A",Description:e.description||"N/A"})))),a=l.Wp.book_new();l.Wp.book_append_sheet(a,t,"Domain Data");const r=l.M9(a,{bookType:"xlsx",type:"array"});(0,c.saveAs)(new Blob([r],{type:"application/octet-stream"}),"Domain-Data.xlsx")},className:"px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]",children:"Download Excel"})]}),(0,d.jsx)("h4",{className:"text-center text-[#FF735C] font-bold text-2xl mb-4",children:"Domain Reports"}),(0,d.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:N.map((e=>(0,d.jsxs)("div",{className:"p-4 border rounded shadow-sm",children:[(0,d.jsx)("h3",{className:"font-semibold text-[#FF735C]",children:e.provider||"N/A"}),(0,d.jsxs)("p",{children:["Server Name: ",e.serverName||"N/A"]}),(0,d.jsxs)("p",{children:["Server Type: ",e.serverType||"N/A"]}),(0,d.jsxs)("p",{children:["Server IP: ",e.serverIp||"N/A"]}),(0,d.jsxs)("p",{children:["Purchase Date: ",e.purchaseDate||"N/A"]}),(0,d.jsxs)("p",{children:["Expiry Date: ",e.expiryDate||"N/A"]}),(0,d.jsx)("button",{onClick:()=>(e=>{const t=new i.default;t.text("Domain Report",10,10);const a=[["Domain ID",e._id||"N/A"],["Provider",e.provider||"N/A"],["Server Name",e.serverName||"N/A"],["Server Type",e.serverType||"N/A"],["Server Ip",e.serverIp||"N/A"],["Server Url",e.serverUrl||"N/A"],["TLD",e.tld||"N/A"],["Registered Name",e.ownerName||"N/A"],["Registered Organization",e.registeredOrganization||"N/A"],["Cloud Flare",e.cloudFlare||"N/A"],["Google Authentication",e.googleAuthentication||"N/A"],["Register Email",e.registerEmail||"N/A"],["Purchase Date",e.purchaseDate?new Date(e.purchaseDate).toLocaleDateString():"N/A"],["Expiry Date",e.expiryDate?new Date(e.expiryDate).toLocaleDateString():"N/A"],["Last Backup Date",e.lastBackupDate?new Date(e.lastBackupDate).toLocaleDateString():"N/A"],["Next Maintenance Date",e.nextMaintenanceDate?new Date(e.nextMaintenanceDate).toLocaleDateString():"N/A"],["One Time Cost",e.oneTimeCost?"$".concat(e.oneTimeCost):"N/A"],["Description",e.description||"N/A"]];t.autoTable({head:[["Field","Value"]],body:a,startY:20}),t.save("".concat(e.serverName,"_Report.pdf"))})(e),className:"mt-4 px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]",children:"Generate PDF"})]},e._id)))}),(0,d.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,d.jsx)("button",{onClick:()=>p((e=>Math.max(e-1,1))),className:"px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]",disabled:1===a,children:"Previous"}),(0,d.jsxs)("span",{children:["Page ",a," of ",g]}),(0,d.jsx)("button",{onClick:()=>p((e=>Math.min(e+1,g))),className:"px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]",disabled:a===g,children:"Next"})]})]})})})})})}},5748:(e,t,a)=>{a.d(t,{A:()=>s});a(5043);var r=a(7511),o=a(579);function s(e){let{children:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.A,{}),(0,o.jsx)("main",{className:"flex-1 p-4",children:t})]})}},7511:(e,t,a)=>{a.d(t,{A:()=>c});var r=a(9379),o=a(5043),s=a(9722),n=a(2134),i=a(579);function l(){const[e,t]=(0,o.useState)(!1),a=(0,n.Zp)();return(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:"navbar bg-base-100",children:[(0,i.jsx)("div",{className:"flex-1",children:(0,i.jsx)("a",{className:"btn btn-ghost text-xl ml-0 ",style:{color:"#FF735C"},children:"Asset Management"})}),(0,i.jsx)("div",{className:"flex-none gap-2",children:(0,i.jsxs)("div",{className:"dropdown dropdown-end",children:[(0,i.jsx)("div",{tabIndex:0,role:"button",className:"btn btn-ghost btn-circle avatar",onClick:()=>{t(!e)},children:(0,i.jsx)("i",{className:"bx bx-cog text-xl",style:{color:"#FF735C"}})}),e&&(0,i.jsx)("ul",{tabIndex:0,className:"menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",children:(0,i.jsx)("li",{children:(0,i.jsx)("a",{onClick:async()=>{try{const e=await s.A.post("".concat("http://localhost:4500","/api/admin/logout"));200===e.status&&(localStorage.removeItem("token"),a("/"),alert(e.data.message))}catch(e){console.error("Error during logout:",e),alert("An error occurred while logging out")}},children:"Logout"})})})]})})]})})}function c(){const[e,t]=(0,o.useState)(!1),[a,s]=(0,o.useState)({});return(0,i.jsxs)("div",{children:[(0,i.jsxs)("button",{type:"button",className:"inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",onClick:()=>{t(!e)},children:[(0,i.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,i.jsx)("svg",{className:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{clipRule:"evenodd",fillRule:"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})})]}),(0,i.jsx)(l,{}),(0,i.jsx)("aside",{className:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform ".concat(e?"translate-x-0":"-translate-x-full"," sm:translate-x-0"),"aria-label":"Sidebar",children:(0,i.jsx)("div",{className:"h-full px-3 py-24 overflow-y-auto ",children:(0,i.jsx)("ul",{className:"space-y-2 font-medium",children:[{id:1,name:"Dashboard",icon:"bx bx-home",path:"/dashboard"},{id:2,name:"Employee",icon:"bx bx-user",subRoutes:[{id:1,name:"Add Employee",icon:"bx bx-plus",path:"/add-employee"},{id:2,name:"Employee Details",icon:"bx bx-list-ul",path:"/employee-details"},{id:3,name:"Employee Report",icon:"bx bx-history",path:"/employee-report"}]},{id:3,name:"Laptop",icon:"bx bx-laptop",subRoutes:[{id:1,name:"Add Laptop",icon:"bx bx-plus",path:"/assets-laptop"},{id:2,name:"Laptop Details",icon:"bx bx-list-ul",path:"/laptop-details"},{id:3,name:"Laptop History",icon:"bx bx-history",path:"/assets-laptop-history"},{id:4,name:"Laptop Report",icon:"bx bxs-report",path:"/laptop-report"}]},{id:4,name:"Desktop",icon:"bx bx-desktop",subRoutes:[{id:1,name:"Add Desktop",icon:"bx bx-plus",path:"/assets-desktop"},{id:2,name:"Desktop Details",icon:"bx bx-list-ul",path:"/desktop-details"},{id:3,name:"Desktop History",icon:"bx bx-history",path:"/assets/desktop-history"},{id:4,name:"Desktop Report",icon:"bx bxs-report",path:"/desktop-report"}]},{id:5,name:"Scrap",icon:"bx bx-trash",subRoutes:[{id:1,name:"Add Scrap",icon:"bx bx-trash",path:"/scrap-items"},{id:2,name:"Scrap History",icon:"bx bx-history",path:"/scrap-history"},{id:3,name:"Scrap Report",icon:"bx bxs-report",path:"/scrap-report"}]},{id:6,name:"Domain",icon:"bx bx-network-chart",subRoutes:[{id:1,name:"Add Domain",icon:"bx bx-plus",path:"/add-domain"},{id:2,name:"Domain Details",icon:"bx bx-list-ul",path:"/domain-details"},{id:3,name:"Domain History",icon:"bx bx-history",path:"/domain-history"},{id:4,name:"Domain Report",icon:"bx bxs-report",path:"/domain-report"}]},{id:7,name:"CCTV",icon:"bx bx-camera",subRoutes:[{id:1,name:"Add CCTV",icon:"bx bx-plus",path:"/add-cctv"},{id:2,name:"CCTV Details",icon:"bx bx-detail",path:"/cctv-details"},{id:3,name:"CCTV History",icon:"bx bx-history",path:"/cctv-history"},{id:4,name:"CCTV Report",icon:"bx bxs-report",path:"/cctv-report"}]},{id:8,name:"Dongle",icon:"bx bx-plug",subRoutes:[{id:1,name:"Add Dongle",icon:"bx bx-plug",path:"/add-dongle"},{id:2,name:"Dongle Details",icon:"bx bx-detail",path:"/dongle-details"},{id:3,name:"Dongle History",icon:"bx bx-history",path:"/dongle-history"},{id:4,name:"Dongle Report",icon:"bx bxs-report",path:"/dongle-report"}]},{id:9,name:"Printer",icon:"bx bx-printer",subRoutes:[{id:1,name:"Add Printer",icon:"bx bx-printer",path:"/add-printer"},{id:2,name:"Printer Details",icon:"bx bx-detail",path:"/printer-details"},{id:3,name:"Printer History",icon:"bx bx-history",path:"/printer-history"},{id:4,name:"Printer Report",icon:"bx bxs-report",path:"/printer-report"}]},{id:10,name:"Projector",icon:"bx bx-tv",subRoutes:[{id:1,name:"Add Projector",icon:"bx bx-plus",path:"/add-projector"},{id:2,name:"Projector Details",icon:"bx bx-info-circle",path:"/projector-details"},{id:3,name:"Projector History",icon:"bx bx-history",path:"/projector-history"},{id:4,name:"Projector Report",icon:"bx bx-bar-chart-alt",path:"/projector-report"}]},{id:11,name:"Tablet",icon:"bx bx-tab",subRoutes:[{id:1,name:"Add Tablet",icon:"bx bx-plus",path:"/add-tablet"},{id:2,name:"Tablet Details",icon:"bx bx-info-circle",path:"/tablet-details"},{id:3,name:"Tablet History",icon:"bx bx-history",path:"/tablet-history"},{id:4,name:"Tablet Report",icon:"bx bx-bar-chart-alt",path:"/tablet-report"}]},{id:12,name:"Phone",icon:"bx bx-phone",subRoutes:[{id:1,name:"Add Phone",icon:"bx bx-plus",path:"/add-phone"},{id:2,name:"Phone Details",icon:"bx bx-detail",path:"/phone-details"},{id:3,name:"Phone History",icon:"bx bx-history",path:"/phone-history"},{id:4,name:"Phone Report",icon:"bx bxs-report",path:"/phone-report"}]}].map((e=>(0,i.jsxs)("li",{children:[(0,i.jsxs)("a",{href:e.path,className:"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",onClick:()=>{return e.subRoutes&&(t=e.id,void s((e=>(0,r.A)((0,r.A)({},e),{},{[t]:!e[t]}))));var t},children:[(0,i.jsx)("span",{className:"".concat(e.icon),style:{color:"#FF735C"}}),(0,i.jsx)("span",{className:"flex-1 ml-3 whitespace-nowrap",children:e.name}),e.subRoutes&&(0,i.jsx)("svg",{className:"w-3 h-3 transform ".concat(a[e.id]?"rotate-180":""),"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 10 6",children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 4 4 4-4"})})]}),a[e.id]&&e.subRoutes&&(0,i.jsx)("ul",{className:"pl-8 mt-4 space-y-2",children:e.subRoutes.map((t=>(0,i.jsx)("li",{children:(0,i.jsxs)("a",{href:t.path,className:"flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",children:[(0,i.jsx)("span",{className:"".concat(t.icon),style:{color:"#FF735C"}}),(0,i.jsx)("span",{className:"ml-3",children:t.name})]})},"".concat(e.id,"-").concat(t.id))))})]},e.id)))})})})]})}}}]);
//# sourceMappingURL=696.436d1ec6.chunk.js.map