import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/index.jsx';


export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  
 
  const userRole = localStorage.getItem("userRole") || " ";

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmenuToggle = (id) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  
  
  // console.log("Admin Routes:", filteredRoutes("admin"));
  // console.log("HR Routes:", filteredRoutes("hr"));
  // console.log("Others Routes:", filteredRoutes("others"));
  // console.log("Unknown Role:", filteredRoutes("unknown"));

  
  const Inputform = [
    { id: 1, name: "Dashboard", icon: "bx bx-home",   path: userRole ? `/${userRole}/dashboard` : "/dashboard",roles: ["admin", "hr","other"]  },
    
    {
      id: 2,
      name: "Employee",
      icon: "bx bx-user",
      subRoutes: [
        { id: 1, name: "Add Employee", icon: "bx bx-plus", path: "/add-employee",roles: ["admin", "hr"]  },
        { id: 2, name: "Employee Details", icon: "bx bx-list-ul", path: "/employee-details",roles: ["admin", "hr"] },
        { id: 3, name: "Employee Report", icon: "bx bx-history", path: "/employee-report",roles: ["admin", "hr"] },
      ],
    },
    {
      id: 3,
      name: "Laptop",
      icon: "bx bx-laptop",  
      subRoutes: [
        { id: 1, name: "Add Laptop", icon: "bx bx-plus", path: "/assets-laptop",roles: ["admin",]  },
        { id: 2, name: "Laptop Details", icon: "bx bx-list-ul", path: "/laptop-details",roles: ["admin","hr","other"]  },
        { id: 3, name: "Laptop History", icon: "bx bx-history", path: "/assets-laptop-history",roles:["admin"]   },
        { id: 4, name: "Laptop Report", icon: "bx bxs-report", path: "/laptop-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 4,
      name: "Desktop",
      icon: "bx bx-desktop",  
      subRoutes: [
        { id: 1, name: "Add Desktop", icon: "bx bx-plus", path: "/assets-desktop",roles: ["admin"]  },
        { id: 2, name: "Desktop Details", icon: "bx bx-list-ul", path: "/desktop-details",roles: ["admin","hr","other"]  },
        { id: 3, name: "Desktop History", icon: "bx bx-history", path: "/assets/desktop-history",roles: ["admin"]  },
        { id: 4, name: "Desktop Report", icon: "bx bxs-report", path: "/desktop-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 5,
      name: "Scrap",
      icon: "bx bx-trash",  
      subRoutes: [
        { id: 1, name: "Add Scrap", icon: "bx bx-trash", path: "/scrap-items",roles: ["admin"]  },
        { id: 2, name: "Scrap History", icon: "bx bx-history", path: "/scrap-history",roles: ["admin"] },
        { id: 3, name: "Scrap Report", icon: "bx bxs-report", path: "/scrap-report",roles: ["admin"]  },
      ],
    },
    {
      id: 6,
      name: "Domain",
      icon: "bx bx-network-chart", 
      subRoutes: [
        { id: 1, name: "Add Domain", icon: "bx bx-plus", path: "/add-domain",roles: ["admin"]  },
        { id: 2, name: "Domain Details", icon: "bx bx-list-ul", path: "/domain-details",roles: ["admin",]  },
        { id: 3, name: "Domain History", icon: "bx bx-history", path: "/domain-history",roles: ["admin"]  },
        { id: 4, name: "Domain Report", icon: "bx bxs-report", path: "/domain-report",roles: ["admin"]  },
      ],
    },
    {
      id: 7,
      name: "CCTV",
      icon: "bx bx-camera",  
      subRoutes: [
        { id: 1, name: "Add CCTV", icon: "bx bx-plus", path: "/add-cctv",roles: ["admin"]  },
        { id: 2, name: "CCTV Details", icon: "bx bx-detail", path: "/cctv-details",roles: ["admin","hr","other"]  },
        { id: 3, name: "CCTV History", icon: "bx bx-history", path: "/cctv-history",roles:["admin"]  },
        { id: 4, name: "CCTV Report", icon: "bx bxs-report", path: "/cctv-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 8,
      name: "Dongle",
      icon: "bx bx-plug",  
      subRoutes: [
        { id: 1, name: "Add Dongle", icon: "bx bx-plug", path: "/add-dongle",roles: ["admin", "hr"] },
        { id: 2, name: "Dongle Details", icon: "bx bx-detail", path: "/dongle-details",roles: ["admin", "hr","other"] },
        { id: 3, name: "Dongle History", icon: "bx bx-history", path: "/dongle-history",roles: ["admin", "hr"]   },
        { id: 4, name: "Dongle Report", icon: "bx bxs-report", path: "/dongle-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 9,
      name: "Printer",
      icon: "bx bx-printer",  
      subRoutes: [
        { id: 1, name: "Add Printer", icon: "bx bx-printer", path: "/add-printer",roles: ["admin"]  },
        { id: 2, name: "Printer Details", icon: "bx bx-detail", path: "/printer-details",roles: ["admin","hr","other"]   },
        { id: 3, name: "Printer History", icon: "bx bx-history", path: "/printer-history",roles: ["admin"]   },
        { id: 4, name: "Printer Report", icon: "bx bxs-report", path: "/printer-report",roles: ["admin", "hr","other"]},
      ],
    },
    {
      id: 10,
      name: "Projector",
      icon: "bx bx-tv",  
      subRoutes: [
        { id: 1, name: "Add Projector", icon: "bx bx-plus", path: "/add-projector",roles: ["admin"]  },
        { id: 2, name: "Projector Details", icon: "bx bx-info-circle", path: "/projector-details",roles: ["admin","hr","other"]  },
        { id: 3, name: "Projector History", icon: "bx bx-history", path: "/projector-history",roles: ["admin",]   },
        { id: 4, name: "Projector Report", icon: "bx bx-bar-chart-alt", path: "/projector-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 11,
      name: "Tablet",
      icon: "bx bx-tab",  
      subRoutes: [
        { id: 1, name: "Add Tablet", icon: "bx bx-plus", path: "/add-tablet",roles: ["admin"]  },
        { id: 2, name: "Tablet Details", icon: "bx bx-info-circle", path: "/tablet-details",roles: ["admin","hr","other"]  },
        { id: 3, name: "Tablet History", icon: "bx bx-history", path: "/tablet-history",roles:["admin",]  },
        { id: 4, name: "Tablet Report", icon: "bx bx-bar-chart-alt", path: "/tablet-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 12,
      name: "Phone",
      icon: "bx bx-phone",  
      subRoutes: [
        { id: 1, name: "Add Phone", icon: "bx bx-plus", path: "/add-phone",roles: ["admin", "hr"]  },
        { id: 2, name: "Phone Details", icon: "bx bx-detail", path: "/phone-details" ,roles: ["admin", "hr","other"] },
        { id: 3, name: "Phone History", icon: "bx bx-history", path: "/phone-history",roles: ["admin", "hr"]  },
        { id: 4, name: "Phone Report", icon: "bx bxs-report", path: "/phone-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 13,
      name: "Access Points/Router",
      icon: "bx bx-wifi",  
      subRoutes: [
        { id: 1, name: "Add router", icon: "bx bx-plus", path: "/add-router",roles: ["admin"]  },
        { id: 2, name: "Router Details", icon: "bx bx-detail", path: "/router-details",roles: ["admin","hr","other"]  },
        { id: 3, name: "Router History", icon: "bx bx-history", path: "/router-history",roles: ["admin"]  },
        { id: 4, name: "Router Report", icon: "bx bxs-report", path: "/router-report",roles: ["admin", "hr","other"] },
      ],
    },
    {
      id: 14,
      name: "Sim Card",
      icon: "bx bx-card",  
      subRoutes: [
        { id: 1, name: "Add Sim Card", icon: "bx bx-plus", path: "/add-sim-card",roles: ["admin", "hr"]  },
        { id: 2, name: "Sim Card Details", icon: "bx bx-detail", path: "/sim-card-details",roles:["admin", "hr","other"]    },
        { id: 3, name: "Sim Card History", icon: "bx bx-history", path: "/sim-card-history",roles: ["admin", "hr"]   },
        { id: 4, name: "Sim Card Report", icon: "bx bxs-report", path: "/sim-card-report",roles: ["admin", "hr","other"] },
      ],
    },
  ]



 


  const filteredMenuItems = Inputform.filter((menuItem) => {
    // Check if the main menu item has roles and matches the userRole
    const hasAccessToMainMenu = menuItem.roles?.includes(userRole);
  
    // Check if at least one sub-menu item has access
    const hasAccessibleSubRoutes = menuItem.subRoutes?.some(
      (subItem) => subItem.roles.includes(userRole)
    );
  
    return hasAccessToMainMenu || hasAccessibleSubRoutes;
  });
  
 

  return (
    <div>
    <button
      type="button"
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
      onClick={handleSidebarToggle}
    >
      <span className="sr-only">Open sidebar</span>
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        />
      </svg>
    </button>

    <Navbar />

    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="h-full px-3 py-24 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {filteredMenuItems.map((item) => (
            <li key={item.id}>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => item.subRoutes && handleSubmenuToggle(item.id)}
              >
                <i className={`${item.icon} text-orange-600`}></i>
                <span className="flex-1 ml-3">{item.name}</span>
                {item.subRoutes && (
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openSubmenus[item.id] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                )}
              </div>

              {openSubmenus[item.id] && item.subRoutes && (
  <ul className="pl-8 mt-2 space-y-2">
    {item.subRoutes
      .filter((subItem) => subItem.roles.includes(userRole)) 
      .map((subItem) => (
        <li key={subItem.id}>
          <Link
            to={subItem.path} 
            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
          >
            <i className={`${subItem.icon} text-[14px]`} style={{ color: "#FF735C" }}></i>
            <span className="ml-3 text-black">{subItem.name}</span>
          </Link>
        </li>
      ))}
  </ul>
)}



            </li>
          ))}
        </ul>
      </div>
    </aside>
  </div>
);
}