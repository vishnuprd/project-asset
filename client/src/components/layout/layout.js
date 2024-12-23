import React from "react";
import Sidebar from "../sidebar/index.jsx";



export default function Layout({ children }) {
    return (
       <>
                  <Sidebar/>
                <main className="flex-1 p-4">
                    {children}
                </main>
       </> 
       
    );
}