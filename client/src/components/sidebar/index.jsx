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
        { id: 1, name: "Add Employee", icon: "bx bx-user-plus", path: "/add-employee" },
        { id: 2, name: "Employee Details", icon: "bx bx-list-ul", path: "/employee-details" },
        { id: 3, name: "Employee Report", icon: "bx bx-history", path: "/employee-report" },
      ],
    },
    {
      id: 3,
      name: "Laptop",
      icon: "bx bx-group",
      subRoutes: [
        { id: 1, name: "Add Laptop", icon: "bx bx-devices", path: "/assets-laptop" },
        { id: 2, name: "Laptop Details", icon: "bx bx-history", path: "/laptop-details" },
        { id: 3, name: "Laptop History", icon: "bx bx-history", path: "/assets-laptop-history" },
        { id: 4, name: "Laptop Report", icon: "bx bxs-report", path: "/laptop-report" },
      ],
    },
    {
      id: 4,
      name: "Desktop",
      icon: "bx bx-group",
      subRoutes: [
        { id: 1, name: "Add Desktop", icon: "bx bx-desktop", path: "/assets-desktop" },
        { id: 2, name: "Desktop Details", icon: "bx bx-history", path: "/desktop-details" },
        { id: 3, name: "Desktop History", icon: "bx bx-history", path: "/assets/desktop-history" },
        { id: 4, name: "Desktop Report", icon: "bx bxs-report", path: "/desktop-report" },
      ],
    },
    {
      id: 5,
      name: "Scrap",
      icon: "bx bx-group",
      subRoutes: [
        { id: 1, name: "Add Scrap", icon: "bx bx-trash", path: "/scrap-items" },
        { id: 2, name: "Scrap History", icon: "bx bx-history", path: "/scrap-history" },
        { id: 3, name: "Scrap Report", icon: "bx bxs-report", path: "/scrap-report" },
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
        <div className="h-full px-3 py-24 overflow-y-auto">
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
