"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[6779],{983:(e,s,a)=>{a.r(s),a.d(s,{default:()=>m});var l=a(9379),t=a(5043),n=a(2134),r=a(9722);const c=a.p+"static/media/login.9623b01baba9153bbcb6.jpg";var o=a(2115),i=a(579);function m(){const[e,s]=(0,t.useState)({email:"",password:""}),[a,m]=(0,t.useState)({}),d=(0,n.Zp)(),u=a=>{const{name:t,value:n}=a.target;s((0,l.A)((0,l.A)({},e),{},{[t]:n}))};return(0,i.jsx)("div",{className:"hero min-h-screen",children:(0,i.jsxs)("div",{className:"hero-content flex-col lg:flex-row md:flex-row sm:flex-col items-center",children:[(0,i.jsx)("img",{src:c,className:"max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg ",alt:"Login"}),(0,i.jsxs)("div",{className:"w-full md:w-1/2 sm:w-full p-4",children:[(0,i.jsx)("h1",{className:"",children:"Admin Login...!"}),(0,i.jsxs)("form",{onSubmit:async s=>{s.preventDefault();const a=(e=>{const s={};return e.email&&/\S+@\S+\.\S+/.test(e.email)||(s.email="Enter a valid email address."),(!e.password||e.password.length<6)&&(s.password="Password must be at least 6 characters."),s})(e);if(m(a),!(Object.keys(a).length>0))try{const s=await r.A.post("".concat("http://localhost:4500","/api/admin/login"),e);if(200===s.status){const{token:e,user:a}=s.data;localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(a)),o.oR.success("Login successful!"),d("/dashboard")}else o.oR.error("Login Error: ".concat(s.data.message))}catch(n){var l,t;const e=(null===(l=n.response)||void 0===l||null===(t=l.data)||void 0===t?void 0:t.message)||n.message||"Something went wrong!";o.oR.error("Login Error: ".concat(e))}},children:[(0,i.jsx)("div",{className:"form-control",children:[{id:1,name:"email",type:"email",placeholder:"Email",label:"Email",required:!0},{id:2,name:"password",type:"password",placeholder:"Password",label:"Password",required:!0}].map((s=>(0,i.jsxs)("div",{className:"mb-4",children:[(0,i.jsx)("label",{htmlFor:s.name,className:"label",children:(0,i.jsx)("span",{className:"label-text",children:s.label})}),(0,i.jsx)("input",{id:s.name,name:s.name,type:s.type,placeholder:s.placeholder,value:e[s.name],onChange:u,className:"input input-bordered w-full"}),a[s.name]&&(0,i.jsx)("span",{className:"text-red-500 text-sm",children:a[s.name]})]},s.id)))}),(0,i.jsx)("div",{className:"flex justify-center",children:(0,i.jsx)("button",{type:"submit",className:"custom-btn w-full sm:w-auto",children:"Get Started"})})]}),(0,i.jsx)("div",{className:"mt-4",children:(0,i.jsxs)("span",{className:"text-sm",children:["Don't have an account?"," ",(0,i.jsx)("a",{href:"/signup",className:"text-blue-500 hover:underline",children:"Signup here to get kicked started!"})]})})]})]})})}}}]);
//# sourceMappingURL=6779.0f8da0b1.chunk.js.map