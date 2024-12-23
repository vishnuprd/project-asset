import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardDesktopTable from "../dashboarddesktoptable/index.jsx";


export default function DashboardLaptopTable() {
  const [laptopData, setLaptopData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      if (response.status === 200) {
        const sortedLaptops = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLaptopData(sortedLaptops.slice(0, 5));
      } else {
        alert.error(`Error fetching laptops: ${response.data.message}`);
      }
    } catch (error) {
      alert.error(`Error fetching laptops: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <h3 className="text-center text-2xl font-bold"style={{ color: "#FF735C" }}>Recently Added Laptops</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Laptop ID</th>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Assigned To</th>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Model</th>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Serial Number</th>
              </tr>
            </thead>
            <tbody>
              {laptopData.length > 0 ? (
                laptopData.map((laptop) => (
                  <tr key={laptop._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-center ">{laptop.laptopId}</td>
                    <td className="px-4 py-2 text-center bi bi-laptop text-green-600">
                      {laptop.assignedTo
                        ? `${laptop.assignedTo.employeeId}, ${laptop.assignedTo.employeeName}`
                        : 'No employee assigned To This Laptop'}
                    </td>
                    <td className="px-4 py-2 text-center">{laptop.model}</td>
                    <td className="px-4 py-2 text-center">{laptop.serialNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    No laptops available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        
        </div>
        <DashboardDesktopTable/>
      </div>
    </div>
  );
}
