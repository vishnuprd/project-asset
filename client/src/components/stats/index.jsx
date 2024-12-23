import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Stats() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [laptopCount, setLaptopCount] = useState(0);
  const [desktopCount, setDesktopCount] = useState(0);
  const [scrapCount, setScrapCount] = useState(0);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200) {
        setEmployeeCount(response.data.length);
      } else {
        console.error("Error fetching employees:", response.data.message || response.data);
        setEmployeeCount(0);
      }
    } catch (error) {
      console.error("Error fetching employees:", error.response ? error.response.data : error.message);
      setEmployeeCount(0);
    }
  };

  const fetchLaptopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      if (response.status === 200) {
        setLaptopCount(response.data.length);
      } else {
        console.error("Error fetching laptops:", response.data.message || response.data);
        setLaptopCount(0);
      }
    } catch (error) {
      console.error("Error fetching laptops:", error.response ? error.response.data : error.message);
      setLaptopCount(0);
    }
  };

  const fetchDesktopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      if (response.status === 200) {
        setDesktopCount(response.data.length);
      } else {
        console.error("Error fetching desktops:", response.data.message || response.data);
        setDesktopCount(0);
      }
    } catch (error) {
      console.error("Error fetching desktops:", error.response ? error.response.data : error.message);
      setDesktopCount(0);
    }
  };

  const fetchScrapData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scrap`);
      if (response.status === 200) {
        setScrapCount(response.data.length);
      } else {
        console.error("Error fetching scrap data:", response.data.message || response.data);
        setScrapCount(0);
      }
    } catch (error) {
      console.error("Error fetching scrap data:", error.response ? error.response.data : error.message);
      setScrapCount(0);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchLaptopData();
    fetchDesktopData();
    fetchScrapData();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <h3 className="text-center col-span-4 font-bold" style={{ color: "#FF735C" }}>Asset Details Dashboard</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle text-blue-600" viewBox="0 0 16 16">
                <path d="M8 0a7.999 7.999 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6z"/>
                <path d="M5.216 10.944a4.992 4.992 0 0 1 5.568 0C9.94 11.637 8.012 12 8 12c-.012 0-1.94-.363-2.784-1.056z"/>
              </svg>
            </div>
            <h5 className="text-xl font-bold">Employees</h5>
            <p className="text-2xl">{employeeCount}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-laptop text-green-600" viewBox="0 0 16 16">
                <path d="M8 12.5a1 1 0 0 0 1-1V9.5a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1z"/>
                <path d="M5.5 8A2.5 2.5 0 0 1 8 5.5A2.5 2.5 0 0 1 10.5 8A2.5 2.5 0 0 1 8 10.5A2.5 2.5 0 0 1 5.5 8z"/>
                <path d="M2 7.5A1.5 1.5 0 0 1 3.5 6h9A1.5 1.5 0 0 1 14 7.5v5A1.5 1.5 0 0 1 12.5 14h-9A1.5 1.5 0 0 1 2 12.5v-5z"/>
              </svg>
            </div>
            <h5 className="text-xl font-bold">Laptops</h5>
            <p className="text-2xl">{laptopCount}</p>
          </div>

         
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-desktop text-yellow-600" viewBox="0 0 16 16">
                <path d="M4 0h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zM3 11V1h10v10H3z"/>
                <path d="M1 12h14v2H1z"/>
              </svg>
            </div>
            <h5 className="text-xl font-bold">Desktops</h5>
            <p className="text-2xl">{desktopCount}</p>
          </div>

       
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-trash text-red-600" viewBox="0 0 16 16">
                <path d="M5.5 0a1 1 0 0 1 1 1v1h4V1a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v1H1V3a1 1 0 0 1 1-1h2V1a1 1 0 0 1 1-1h1zM1 4h14v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4z"/>
              </svg>
            </div>
            <h5 className="text-xl font-bold">Scrap Items</h5>
            <p className="text-2xl">{scrapCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
