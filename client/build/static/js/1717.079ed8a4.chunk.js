"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[1717],{1717:(e,a,t)=>{t.r(a),t.d(a,{default:()=>d});var o=t(9379),s=t(5043),n=t(5748),r=t(9722),i=t(2115),l=t(579);function d(){const[e,a]=(0,s.useState)([]),[t,d]=(0,s.useState)([]),[c,p]=(0,s.useState)({}),x=[{id:1,name:"projectorId",label:"Projector ID",type:"text",placeholder:"Enter Projector Id"},{id:2,name:"handledBy",label:"Handled By",type:"select",options:e},{id:3,name:"status",label:"Status",type:"select",options:[{label:"Active",value:"Active"},{label:"Inactive",value:"Inactive"},{label:"Under Maintenance",value:"Under Maintenance"}]},{id:4,name:"model",label:"Model",type:"text",placeholder:"Enter Model"},{id:5,name:"serialNumber",label:"Serial Number",type:"text",placeholder:"Enter Serial Number"},{id:6,name:"location",label:"Location",type:"text",placeholder:"Enter Location"},{id:7,name:"division",label:"Division",type:"select",options:["Lamination","Processing","Garments","Coating","Bags","EBO","Abirami-Eco-Plast","Non-Oven(Garments-2)","Head-office","Spinning","Fine-Garments(Garments-3)","Fire-bird","Vedhanayagam Hospital","Le Natural","Govt. School Project","Others"]},{id:8,name:"description",label:"Description",type:"text",placeholder:"Enter Description",required:!1}];(0,s.useEffect)((()=>{(async()=>{try{const e=await r.A.get("".concat("http://localhost:4500","/api/employee"));200===e.status&&e.data.length>0?(d(e.data),a(e.data.map((e=>"".concat(e.employeeId," - ").concat(e.employeeName))))):(console.error("Error fetching employee data:",e.data.message||e.data),d([]))}catch(e){console.error("Error fetching employee data:",e.response?e.response.data:e.message),d([])}})()}),[]);const b=e=>{const{name:a,value:t}=e.target;p((e=>(0,o.A)((0,o.A)({},e),{},{[a]:t})))},m=["Inactive","Under Maintenance"].includes(c.status);return(0,l.jsx)("div",{children:(0,l.jsx)(n.A,{children:(0,l.jsx)("div",{className:"p-4 sm:ml-64",children:(0,l.jsxs)("div",{className:"p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700",children:[(0,l.jsx)("h3",{className:"text-center py-9 font-bold",style:{color:"#FF735C"},children:"Add Projector"}),(0,l.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),console.log("Form Data Submitted:",c),e.preventDefault();try{const e=await r.A.post("".concat("http://localhost:4500","/api/asset/projector/add"),c);201===e.status?(console.log("Projector added successfully:",e.data),(0,i.oR)("Projector added successfully!"),p({})):console.error("Unexpected response status:",e.status)}catch(o){var a,t;console.error("Error adding projector:",o.response?o.response.data:o.message),(0,i.oR)("Error: ".concat((null===(a=o.response)||void 0===a||null===(t=a.data)||void 0===t?void 0:t.message)||o.message))}},children:[(0,l.jsx)("div",{className:"form-control",children:(0,l.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:x.map((e=>(0,l.jsxs)("div",{className:"mb-4",children:[(0,l.jsx)("label",{className:"label",children:(0,l.jsx)("span",{className:"label-text",children:e.label})}),"select"===e.type?(0,l.jsxs)("select",{name:e.name,required:e.required,value:c[e.name]||"",onChange:b,disabled:"handledBy"===e.name&&m,className:"input input-bordered w-full max-w-xs",children:[(0,l.jsx)("option",{value:"",disabled:!0,children:"Select an option"}),e.options.map(((e,a)=>"object"===typeof e?(0,l.jsx)("option",{value:e.value,children:e.label},a):(0,l.jsx)("option",{value:e,children:e},a)))]}):(0,l.jsx)("input",{type:e.type,name:e.name,placeholder:e.placeholder,value:c[e.name]||"",onChange:b,required:e.required,className:"input input-bordered w-full max-w-xs"})]},e.id)))})}),(0,l.jsxs)("div",{className:"form-control flex-row mt-4 flex justify-center space-x-2",children:[(0,l.jsx)("button",{type:"submit",className:"custom-btn",children:"Save"}),(0,l.jsx)("button",{type:"button",className:"btn btn-grey",children:"Cancel"})]})]})]})})})})}},5748:(e,a,t)=>{t.d(a,{A:()=>n});t(5043);var o=t(7511),s=t(579);function n(e){let{children:a}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.A,{}),(0,s.jsx)("main",{className:"flex-1 p-4",children:a})]})}},7511:(e,a,t)=>{t.d(a,{A:()=>d});var o=t(9379),s=t(5043),n=t(9722),r=t(2134),i=t(579);function l(){const[e,a]=(0,s.useState)(!1),t=(0,r.Zp)();return(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:"navbar bg-base-100",children:[(0,i.jsx)("div",{className:"flex-1",children:(0,i.jsx)("a",{className:"btn btn-ghost text-xl ml-0 ",style:{color:"#FF735C"},children:"Asset Management"})}),(0,i.jsx)("div",{className:"flex-none gap-2",children:(0,i.jsxs)("div",{className:"dropdown dropdown-end",children:[(0,i.jsx)("div",{tabIndex:0,role:"button",className:"btn btn-ghost btn-circle avatar",onClick:()=>{a(!e)},children:(0,i.jsx)("i",{className:"bx bx-cog text-xl",style:{color:"#FF735C"}})}),e&&(0,i.jsx)("ul",{tabIndex:0,className:"menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",children:(0,i.jsx)("li",{children:(0,i.jsx)("a",{onClick:async()=>{try{const e=await n.A.post("".concat("http://localhost:4500","/api/admin/logout"));200===e.status&&(localStorage.removeItem("token"),t("/"),alert(e.data.message))}catch(e){console.error("Error during logout:",e),alert("An error occurred while logging out")}},children:"Logout"})})})]})})]})})}function d(){const[e,a]=(0,s.useState)(!1),[t,n]=(0,s.useState)({});return(0,i.jsxs)("div",{children:[(0,i.jsxs)("button",{type:"button",className:"inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",onClick:()=>{a(!e)},children:[(0,i.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,i.jsx)("svg",{className:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{clipRule:"evenodd",fillRule:"evenodd",d:"M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"})})]}),(0,i.jsx)(l,{}),(0,i.jsx)("aside",{className:"fixed top-0 left-0 z-40 w-64 h-screen transition-transform ".concat(e?"translate-x-0":"-translate-x-full"," sm:translate-x-0"),"aria-label":"Sidebar",children:(0,i.jsx)("div",{className:"h-full px-3 py-24 overflow-y-auto ",children:(0,i.jsx)("ul",{className:"space-y-2 font-medium",children:[{id:1,name:"Dashboard",icon:"bx bx-home",path:"/dashboard"},{id:2,name:"Employee",icon:"bx bx-user",subRoutes:[{id:1,name:"Add Employee",icon:"bx bx-plus",path:"/add-employee"},{id:2,name:"Employee Details",icon:"bx bx-list-ul",path:"/employee-details"},{id:3,name:"Employee Report",icon:"bx bx-history",path:"/employee-report"}]},{id:3,name:"Laptop",icon:"bx bx-laptop",subRoutes:[{id:1,name:"Add Laptop",icon:"bx bx-plus",path:"/assets-laptop"},{id:2,name:"Laptop Details",icon:"bx bx-list-ul",path:"/laptop-details"},{id:3,name:"Laptop History",icon:"bx bx-history",path:"/assets-laptop-history"},{id:4,name:"Laptop Report",icon:"bx bxs-report",path:"/laptop-report"}]},{id:4,name:"Desktop",icon:"bx bx-desktop",subRoutes:[{id:1,name:"Add Desktop",icon:"bx bx-plus",path:"/assets-desktop"},{id:2,name:"Desktop Details",icon:"bx bx-list-ul",path:"/desktop-details"},{id:3,name:"Desktop History",icon:"bx bx-history",path:"/assets/desktop-history"},{id:4,name:"Desktop Report",icon:"bx bxs-report",path:"/desktop-report"}]},{id:5,name:"Scrap",icon:"bx bx-trash",subRoutes:[{id:1,name:"Add Scrap",icon:"bx bx-trash",path:"/scrap-items"},{id:2,name:"Scrap History",icon:"bx bx-history",path:"/scrap-history"},{id:3,name:"Scrap Report",icon:"bx bxs-report",path:"/scrap-report"}]},{id:6,name:"Domain",icon:"bx bx-network-chart",subRoutes:[{id:1,name:"Add Domain",icon:"bx bx-plus",path:"/add-domain"},{id:2,name:"Domain Details",icon:"bx bx-list-ul",path:"/domain-details"},{id:3,name:"Domain History",icon:"bx bx-history",path:"/domain-history"},{id:4,name:"Domain Report",icon:"bx bxs-report",path:"/domain-report"}]},{id:7,name:"CCTV",icon:"bx bx-camera",subRoutes:[{id:1,name:"Add CCTV",icon:"bx bx-plus",path:"/add-cctv"},{id:2,name:"CCTV Details",icon:"bx bx-detail",path:"/cctv-details"},{id:3,name:"CCTV History",icon:"bx bx-history",path:"/cctv-history"},{id:4,name:"CCTV Report",icon:"bx bxs-report",path:"/cctv-report"}]},{id:8,name:"Dongle",icon:"bx bx-plug",subRoutes:[{id:1,name:"Add Dongle",icon:"bx bx-plug",path:"/add-dongle"},{id:2,name:"Dongle Details",icon:"bx bx-detail",path:"/dongle-details"},{id:3,name:"Dongle History",icon:"bx bx-history",path:"/dongle-history"},{id:4,name:"Dongle Report",icon:"bx bxs-report",path:"/dongle-report"}]},{id:9,name:"Printer",icon:"bx bx-printer",subRoutes:[{id:1,name:"Add Printer",icon:"bx bx-printer",path:"/add-printer"},{id:2,name:"Printer Details",icon:"bx bx-detail",path:"/printer-details"},{id:3,name:"Printer History",icon:"bx bx-history",path:"/printer-history"},{id:4,name:"Printer Report",icon:"bx bxs-report",path:"/printer-report"}]},{id:10,name:"Projector",icon:"bx bx-tv",subRoutes:[{id:1,name:"Add Projector",icon:"bx bx-plus",path:"/add-projector"},{id:2,name:"Projector Details",icon:"bx bx-info-circle",path:"/projector-details"},{id:3,name:"Projector History",icon:"bx bx-history",path:"/projector-history"},{id:4,name:"Projector Report",icon:"bx bx-bar-chart-alt",path:"/projector-report"}]},{id:11,name:"Tablet",icon:"bx bx-tab",subRoutes:[{id:1,name:"Add Tablet",icon:"bx bx-plus",path:"/add-tablet"},{id:2,name:"Tablet Details",icon:"bx bx-info-circle",path:"/tablet-details"},{id:3,name:"Tablet History",icon:"bx bx-history",path:"/tablet-history"},{id:4,name:"Tablet Report",icon:"bx bx-bar-chart-alt",path:"/tablet-report"}]},{id:12,name:"Phone",icon:"bx bx-phone",subRoutes:[{id:1,name:"Add Phone",icon:"bx bx-plus",path:"/add-phone"},{id:2,name:"Phone Details",icon:"bx bx-detail",path:"/phone-details"},{id:3,name:"Phone History",icon:"bx bx-history",path:"/phone-history"},{id:4,name:"Phone Report",icon:"bx bxs-report",path:"/phone-report"}]}].map((e=>(0,i.jsxs)("li",{children:[(0,i.jsxs)("a",{href:e.path,className:"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",onClick:()=>{return e.subRoutes&&(a=e.id,void n((e=>(0,o.A)((0,o.A)({},e),{},{[a]:!e[a]}))));var a},children:[(0,i.jsx)("span",{className:"".concat(e.icon),style:{color:"#FF735C"}}),(0,i.jsx)("span",{className:"flex-1 ml-3 whitespace-nowrap",children:e.name}),e.subRoutes&&(0,i.jsx)("svg",{className:"w-3 h-3 transform ".concat(t[e.id]?"rotate-180":""),"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 10 6",children:(0,i.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 4 4 4-4"})})]}),t[e.id]&&e.subRoutes&&(0,i.jsx)("ul",{className:"pl-8 mt-4 space-y-2",children:e.subRoutes.map((a=>(0,i.jsx)("li",{children:(0,i.jsxs)("a",{href:a.path,className:"flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",children:[(0,i.jsx)("span",{className:"".concat(a.icon),style:{color:"#FF735C"}}),(0,i.jsx)("span",{className:"ml-3",children:a.name})]})},"".concat(e.id,"-").concat(a.id))))})]},e.id)))})})})]})}}}]);
//# sourceMappingURL=1717.079ed8a4.chunk.js.map