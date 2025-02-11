import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Stats() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [laptopCount, setLaptopCount] = useState(0);
  const [desktopCount, setDesktopCount] = useState(0);
  const [scrapCount, setScrapCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);
  const [cctvCount, setCctvCount] = useState(0);
  const [printerCount,setPrinterCount] = useState(0);
  const [projectorCount, setProjectorCount] = useState(0);
  const [tabletCount, setTabletCount] = useState(0); 
  const [phoneCount, setPhoneCount] = useState(0); 
  const [dongleCount, setDongleCount] = useState(0);  
  const [routerCount, setRouterCount] = useState(0);
  const [simCount, setSimCount] = useState(0);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      setEmployeeCount(response.status === 200 ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployeeCount(0);
    }
  };

  const fetchLaptopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      setLaptopCount(response.status === 200 ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching laptops:", error);
      setLaptopCount(0);
    }
  };

  const fetchDesktopData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      setDesktopCount(response.status === 200 ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching desktops:", error);
      setDesktopCount(0);
    }
  };

  const fetchScrapData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scrap`);
      setScrapCount(response.status === 200 ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching scrap data:", error);
      setScrapCount(0);
    }
  };

  const fetchDomainData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/domain/all`);
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setDomainCount(response.data.data.length);
      } else {
        setDomainCount(0);
      }
    } catch (error) {
      console.error("Error fetching domain details:", error);
      setDomainCount(0);
    }
  };

  const fetchCctvData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/cctv/all`);
      setCctvCount(response.status === 200 && Array.isArray(response.data.data) ? response.data.data.length : 0);
    } catch (error) {
      console.error("Error fetching CCTV details:", error);
      setCctvCount(0);
    }
  };

  const fetchPrinterDetails = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/asset/printer/all`;
      console.log("Fetching printer details from:", url);
  
      const response = await axios.get(url);
  
      if (response.status === 200 && Array.isArray(response.data)) {
        console.log("Printer data fetched successfully:", response.data);
        setPrinterCount(response.data.length);
      } else {
        console.error(`Error fetching printer details: ${response.data.message || "Unexpected response structure"}`);
        alert(`Error fetching printer details: ${response.data.message || "Unexpected response structure"}`);
        setPrinterCount(0); 
      }
    } catch (error) {
      console.error("Error fetching printer details:", error.response?.data || error.message);
      alert("Error fetching printer details. Check console for details.");
      setPrinterCount(0); 
    }
  };
  

  const fetchProjectorData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/projector/all`);
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setProjectorCount(response.data.data.length);
      } else {
        setProjectorCount(0);
      }
    } catch (error) {
      console.error("Error fetching projector data:", error);
      setProjectorCount(0);
    }
  };


  const fetchTabletData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/tablet/all`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setTabletCount(response.data.length);
      } else {
        setTabletCount(0);
      }
    } catch (error) {
      console.error("Error fetching tablet data:", error);
      setTabletCount(0);
    }
  };


  const fetchPhoneData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/phone/all`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setPhoneCount(response.data.length);
      } else {
        setPhoneCount(0);
      }
    } catch (error) {
      console.error("Error fetching phone data:", error);
      setPhoneCount(0);
    }
  };

  const fetchDongleData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/dongle/all`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setDongleCount(response.data.length);
      } else {
        setDongleCount(0);
      }
    } catch (error) {
      console.error("Error fetching dongle data:", error);
      setDongleCount(0);
    }
  };


  const fetchRouterData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/router/all`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setRouterCount(response.data.length);
      } else {
        setRouterCount(0);
      }
    } catch (error) {
      console.error("Error fetching router data:", error);
      setRouterCount(0);
    }
  };



  const fetchSimData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/sim-card/all`);
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setSimCount(response.data.data.length);
      } else {
        setSimCount(0);
      }
    } catch (error) {
      console.error("Error fetching SIM data:", error.message || error.response?.data);
      setSimCount(0);
    }
  };



  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchEmployeeData(),
        fetchLaptopData(),
        fetchDesktopData(),
        fetchScrapData(),
        fetchDomainData(),
        fetchCctvData(),
        fetchPrinterDetails(),
        fetchProjectorData(),
        fetchTabletData(),
        fetchPhoneData(),
        fetchDongleData(),
        fetchRouterData(),
        fetchSimData()
      ]);
    };
    fetchAllData();
  }, []);


  
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <h3 className="text-center col-span-4 font-bold" style={{ color: "#FF735C" }}>Asset Details Dashboard</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        
<Card title="Employees" count={employeeCount} iconClass="bi-person-circle" bgColor="blue" />
<Card title="Laptops" count={laptopCount} iconClass="bi-laptop" bgColor="green" />
<Card title="Desktops" count={desktopCount} iconClass="bi-desktop" bgColor="yellow" />
{/* <Card title="Scrap Items" count={scrapCount} iconClass="bi-trash" bgColor="red" /> */}
<Card title="Domain" count={domainCount} iconClass="bi-diagram-3" bgColor="purple" />
<Card title="CCTV" count={cctvCount} iconClass="bi-camera-video" bgColor="orange" />
<Card title="Printer" count={printerCount} iconClass="bi-printer" bgColor="pink" />
<Card title="Projector" count={projectorCount} iconClass="bi-display" bgColor="blue" />
<Card title="Tablet" count={tabletCount} iconClass="bi-tablet" bgColor="cyan" />
<Card title="Phone" count={phoneCount} iconClass="bi-phone" bgColor="gray" />
<Card title="Dongle" count={dongleCount} iconClass="bi-wifi" bgColor="lightyellow" />
<Card title="Router" count={routerCount} iconClass="bi-wifi" bgColor="pink" />
<Card title="SIM Card" count={simCount} iconClass="bi-phone" bgColor="cyan" />

        </div>
      </div>
    </div>
  );
}

function Card({ title, count, iconClass, bgColor }) {
  const bgColorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
    gray: "bg-gray-100 text-gray-600",
    cyan:"bg-cyan-100 text-cyan-600",
    lightyellow: "bg-yellow-200 text-yellow-800",
  };

  const colorClass = bgColorClasses[bgColor] || "bg-gray-100 text-gray-600";

  return (
    <div className={`${colorClass} p-4 rounded-lg text-center`}>
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className={`bi ${iconClass}`}
          viewBox="0 0 16 16"
        >
      
          {getSvgIcon(iconClass)}
        </svg>
      </div>
      <h5 className="text-xl font-bold">{title}</h5>
      <p className="text-2xl">{count}</p>
    </div>
  );
}


function getSvgIcon(iconClass) {
  switch (iconClass) {
    case "bi-person-circle":
      return (
        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 12.146c-2.025 0-4.29-1.222-4.29-3.433a4.29 4.29 0 1 1 8.58 0c0 2.211-2.265 3.433-4.29 3.433zM8 5.659A2.159 2.159 0 1 0 10.159 8 2.159 2.159 0 0 0 8 5.659z" />
      );
    case "bi-laptop":
      return (
        <path d="M2 3a1 1 0 0 0-1 1v7h14V4a1 1 0 0 0-1-1H2zm0 9H1a1 1 0 0 0-1 1v1h16v-1a1 1 0 0 0-1-1h-1H2z" />
      );
    case "bi-desktop":
      return (
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5v2h1.5a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1H7v-2H2a2 2 0 0 1-2-2V4z" />
      );
    case "bi-trash":
      return (
        <path d="M5.5 5a.5.5 0 0 1 .5-.5H9a.5.5 0 0 1 0 1H6v9.5a.5.5 0 0 1-1 0V5z" />
      );
    case "bi-diagram-3":
      return (
        <path d="M7.5 2a.5.5 0 0 1 .5.5v3.55a1.5 1.5 0 0 1 .4 0V2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v3.85a1.5 1.5 0 0 1-.4 0V2h-4v3.5a.5.5 0 0 1-.5.5H6V9.5a.5.5 0 0 1-.5.5H3V10a1.5 1.5 0 0 1-.4 0v-.5a.5.5 0 0 1 .5-.5H5V6H3.5a.5.5 0 0 1-.5-.5v-4A.5.5 0 0 1 3.5 1h4a.5.5 0 0 1 .5.5z" />
      );
    case "bi-camera-video":
      return (
        <path d="M6.5 3A1.5 1.5 0 0 0 5 4.5v5A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-5A1.5 1.5 0 0 0 9.5 3h-3zM1 4a1 1 0 0 0 1-1h9a1 1 0 0 0-1 1H1z" />
      );
    case "bi-printer":
      return (
        <path d="M6 1v2h4V1H6zM2 4a2 2 0 0 0-2 2v6h2v2h12v-2h2V6a2 2 0 0 0-2-2H2zm1 2h10v6H3V6zm2 1v4h6V7H5z" />
      );
    case "bi-display":
      return (
        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C10 6.48 5.52 2 2 2zm0 6.5a2.5 2.5 0 1 1 0 5A2.5 2.5 0 0 1 12 9.5z" />
      );
    case "bi-tablet":
      return (
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm0 1h12v10H2V2z" />
      );
      case "bi-phone":
        return (
          <path d="M3 1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V1zm2 1v12h8V2H5zm6 10H7v1h4v-1z" />
        );
      
      case "bi-wifi":
        return (
          <path d="M5.05 11.314a.678.678 0 0 1 .896.112 5.003 5.003 0 0 1 6.108 0 .678.678 0 0 1 .896-.112 7.003 7.003 0 0 0-7.9 0zM1.05 7.05a.678.678 0 0 1 .896.112 10.045 10.045 0 0 1 13.108 0 .678.678 0 0 1 .896-.112 11.065 11.065 0 0 0-14.9 0zM8 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        );
    default:
      return <path className="bg-gray-100 text-gray-600" />;
  }
}

