import React, { useState } from 'react';
import Navbar from '../navbar/index.jsx';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const Inputform = [
    { id: 1, name: "Dashboard", icon: "bx bx-home", path: "/dashboard" },
    {
      id: 2,
      name: "Employee",
      icon: "bx bx-user",
      subRoutes: [
        { id: 1, name: "Add Employee", icon: "bx bx-plus", path: "/add-employee" },
        { id: 2, name: "Employee Details", icon: "bx bx-list-ul", path: "/employee-details" },
        { id: 3, name: "Employee Report", icon: "bx bx-history", path: "/employee-report" },
      ],
    },
    {
      id: 3,
      name: "Laptop",
      icon: "bx bx-laptop",  
      subRoutes: [
        { id: 1, name: "Add Laptop", icon: "bx bx-plus", path: "/assets-laptop" },
        { id: 2, name: "Laptop Details", icon: "bx bx-list-ul", path: "/laptop-details" },
        { id: 3, name: "Laptop History", icon: "bx bx-history", path: "/assets-laptop-history" },
        { id: 4, name: "Laptop Report", icon: "bx bxs-report", path: "/laptop-report" },
      ],
    },
    {
      id: 4,
      name: "Desktop",
      icon: "bx bx-desktop",  
      subRoutes: [
        { id: 1, name: "Add Desktop", icon: "bx bx-plus", path: "/assets-desktop" },
        { id: 2, name: "Desktop Details", icon: "bx bx-list-ul", path: "/desktop-details" },
        { id: 3, name: "Desktop History", icon: "bx bx-history", path: "/assets/desktop-history" },
        { id: 4, name: "Desktop Report", icon: "bx bxs-report", path: "/desktop-report" },
      ],
    },
    {
      id: 5,
      name: "Scrap",
      icon: "bx bx-trash",  
      subRoutes: [
        { id: 1, name: "Add Scrap", icon: "bx bx-trash", path: "/scrap-items" },
        { id: 2, name: "Scrap History", icon: "bx bx-history", path: "/scrap-history" },
        { id: 3, name: "Scrap Report", icon: "bx bxs-report", path: "/scrap-report" },
      ],
    },
    {
      id: 6,
      name: "Domain",
      icon: "bx bx-network-chart", 
      subRoutes: [
        { id: 1, name: "Add Domain", icon: "bx bx-plus", path: "/add-domain" },
        { id: 2, name: "Domain Details", icon: "bx bx-list-ul", path: "/domain-details" },
        { id: 3, name: "Domain History", icon: "bx bx-history", path: "/domain-history" },
        { id: 4, name: "Domain Report", icon: "bx bxs-report", path: "/domain-report" },
      ],
    },
    {
      id: 7,
      name: "CCTV",
      icon: "bx bx-camera",  
      subRoutes: [
        { id: 1, name: "Add CCTV", icon: "bx bx-plus", path: "/add-cctv" },
        { id: 2, name: "CCTV Details", icon: "bx bx-detail", path: "/cctv-details" },
        { id: 3, name: "CCTV History", icon: "bx bx-history", path: "/cctv-history" },
        { id: 4, name: "CCTV Report", icon: "bx bxs-report", path: "/cctv-report" },
      ],
    },
    {
      id: 8,
      name: "Dongle",
      icon: "bx bx-plug",  
      subRoutes: [
        { id: 1, name: "Add Dongle", icon: "bx bx-plug", path: "/add-dongle" },
        { id: 2, name: "Dongle Details", icon: "bx bx-detail", path: "/dongle-details" },
        { id: 3, name: "Dongle History", icon: "bx bx-history", path: "/dongle-history" },
        { id: 4, name: "Dongle Report", icon: "bx bxs-report", path: "/dongle-report" },
      ],
    },
    {
      id: 9,
      name: "Printer",
      icon: "bx bx-printer",  
      subRoutes: [
        { id: 1, name: "Add Printer", icon: "bx bx-printer", path: "/add-printer" },
        { id: 2, name: "Printer Details", icon: "bx bx-detail", path: "/printer-details" },
        { id: 3, name: "Printer History", icon: "bx bx-history", path: "/printer-history" },
        { id: 4, name: "Printer Report", icon: "bx bxs-report", path: "/printer-report" },
      ],
    },
    {
      id: 10,
      name: "Projector",
      icon: "bx bx-tv",  
      subRoutes: [
        { id: 1, name: "Add Projector", icon: "bx bx-plus", path: "/add-projector" },
        { id: 2, name: "Projector Details", icon: "bx bx-info-circle", path: "/projector-details" },
        { id: 3, name: "Projector History", icon: "bx bx-history", path: "/projector-history" },
        { id: 4, name: "Projector Report", icon: "bx bx-bar-chart-alt", path: "/projector-report" },
      ],
    },
    {
      id: 11,
      name: "Tablet",
      icon: "bx bx-tab",  
      subRoutes: [
        { id: 1, name: "Add Tablet", icon: "bx bx-plus", path: "/add-tablet" },
        { id: 2, name: "Tablet Details", icon: "bx bx-info-circle", path: "/tablet-details" },
        { id: 3, name: "Tablet History", icon: "bx bx-history", path: "/tablet-history" },
        { id: 4, name: "Tablet Report", icon: "bx bx-bar-chart-alt", path: "/tablet-report" },
      ],
    },
    {
      id: 12,
      name: "Phone",
      icon: "bx bx-phone",  
      subRoutes: [
        { id: 1, name: "Add Phone", icon: "bx bx-plus", path: "/add-phone" },
        { id: 2, name: "Phone Details", icon: "bx bx-detail", path: "/phone-details" },
        { id: 3, name: "Phone History", icon: "bx bx-history", path: "/phone-history" },
        { id: 4, name: "Phone Report", icon: "bx bxs-report", path: "/phone-report" },
      ],
    },
  ];
  
  

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmenuToggle = (id) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={handleSidebarToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
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
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-24 overflow-y-auto ">
          <ul className="space-y-2 font-medium">
            {Inputform.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => item.subRoutes && handleSubmenuToggle(item.id)}
                >
                  <span className={`${item.icon}`} style={{ color: "#FF735C" }}></span>
                  <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                  {item.subRoutes && (
                    <svg
                      className={`w-3 h-3 transform ${
                        openSubmenus[item.id] ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  )}
                </a>

                {openSubmenus[item.id] && item.subRoutes && (
                  <ul className="pl-8 mt-4 space-y-2">
                    {item.subRoutes.map((subItem) => (
                      <li key={`${item.id}-${subItem.id}`}>
                        <a
                          href={subItem.path}
                          className="flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <span className={`${subItem.icon}`} style={{ color: "#FF735C" }}></span>
                          <span className="ml-3">{subItem.name}</span>
                        </a>
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
