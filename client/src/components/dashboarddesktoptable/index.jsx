import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardDesktopTable() {
  const [desktopData, setDesktopData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      if (response.status === 200) {
      
        const sortedDesktops = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        setDesktopData(sortedDesktops.slice(0, 5));
      } else {
        alert.error(`Error fetching desktops: ${response.data.message}`);
      }
    } catch (error) {
      alert.error("Error fetching desktop details");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

   
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <h3 className="text-center text-2xl font-bold" style={{ color: "#FF735C" }}>Recently Added Desktops</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Desktop ID</th>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Assigned To</th>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Model</th>
                <th className="px-4 py-2 text-center" style={{ color: "#FF735C" }}>Serial Number</th>
              </tr>
            </thead>
            <tbody>
              {desktopData.length > 0 ? (
                desktopData.map((desktop) => (
                  <tr key={desktop._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-center">{desktop.desktopId}</td>
                    <td className="px-4 py-2 text-center bi bi-desktop text-yellow-600  rounded-lg">
  {desktop.assignedTo
    ? `${desktop.assignedTo.employeeId}, ${desktop.assignedTo.employeeName}`
    : 'No employee assigned To This Desktop'}
</td>

                    <td className="px-4 py-2 text-center">{desktop.model}</td>
                    <td className="px-4 py-2 text-center">{desktop.serialNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    No desktops available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </>
    
  );
}
