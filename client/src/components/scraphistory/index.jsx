import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/layout.js";

export default function ScrapHistory() {
  const [scrapData, setScrapData] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [phones, setPhones] = useState([]);
  const [dongles, setDongles] = useState([]);
  const [tablets, setTabletData] = useState([]);
  const [printers, setPrinters] = useState([]);
  
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const totalPages = Math.ceil(scrapData.length / pageSize);
  const paginatedData = scrapData.slice((page - 1) * pageSize, page * pageSize);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scrap`);
      if (response.status === 200) {
        setScrapData(response.data);
      } else {
        console.error("Error fetching scrap data:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching scrap data:", err.message);
    }
  };

  const fetchLaptops = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      if (response.status === 200) {
        const scrapLaptops = response.data.filter(laptop => laptop.status === "scrap");
    
        setLaptops(scrapLaptops);
      } else {
        alert(`Error fetching laptops: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error fetching laptops: ${error.message}`);
    }
  };

  const fetchPhoneData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/phone/all`);
      if (response.status === 200) {
        const scrapPhones = response.data.filter(phone => phone.status === "scrap");
        setPhones(scrapPhones);
      } else {
        alert(`Error fetching phone data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching phone data:", error.message || error.response?.data);
      alert(`Error fetching phone data: ${error.response?.data?.message || error.message}`);
    }
  };


  const fetchDongleData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/dongle/all`);
      console.log(response.data);
      if (response.status === 200) {
        const scrapDongles = response.data.filter(dongle => dongle.status === "scrap");
        setDongles(scrapDongles);
      } else {
        alert(`Error fetching dongle data: ${response.data.message}`);
      }
    } catch (error) {
      alert('Error fetching dongle details');
      console.error(error);
    }
  };




  const fetchTabletData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/tablet/all`);
      if (response.status === 200) {
        const scrapTablets = response.data.filter(tablet => tablet.status === "scrap");
        setTabletData(scrapTablets);
      } else {
        alert(`Error fetching tablet data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching tablet data:", error.message || error.response?.data);
      alert(`Error fetching tablet data: ${error.response?.data?.message || error.message}`);
    }
  };




  const fetchPrinterData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/printer/all`);
      if (response.status === 200) {
        const scrapPrinters = response.data.filter(printer => printer.status === "scrap");
        setPrinters(scrapPrinters);
      } else {
        alert(`Error fetching printer data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching printer data:", error.message || error.response?.data);
      alert(`Error fetching printer data: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLaptops();
    fetchPhoneData();
    fetchDongleData();
    fetchTabletData();
    fetchPrinterData();
  }, []);
  useEffect(() => {
    fetchData();
    fetchLaptops();
    fetchPhoneData();
    fetchDongleData();
    fetchTabletData();
    fetchPrinterData();
  }, []);
  
  useEffect(() => {
    if (laptops.length > 0) {
      const updatedScrapData = [...scrapData, ...laptops];
      setScrapData(updatedScrapData);
    }
  }, [laptops]);
  
  useEffect(() => {
    if (phones.length > 0) {
      const updatedScrapData = [...scrapData, ...phones];
      setScrapData(updatedScrapData);
    }
  }, [phones]);

  useEffect(() => {
    if (dongles.length > 0) {
      const updatedScrapData = [...scrapData, ...dongles];
      setScrapData(updatedScrapData);
    }
  }, [dongles]);

  useEffect(() => {
    if (tablets.length > 0) {
      const updatedScrapData = [...scrapData, ...tablets];
      setScrapData(updatedScrapData);
    }
  }, [tablets]);

  useEffect(() => {
    if (printers.length > 0) {
      const updatedScrapData = [...scrapData, ...printers];
      setScrapData(updatedScrapData);
    }
  }, [printers]);

  return (
    <div>
      <Layout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-center font-bold" style={{ color: "#FF735C" }}>Scrap History</h3>
          <div className="overflow-x-auto py-9">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Scrap ID</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Type</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Brand</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Description</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((scrap, index) => (
                    <tr className="hover" key={scrap._id}>
                      <td>{(page - 1) * pageSize + index + 1}</td>
                      <td>{scrap.scrapID || "N/A"}</td>
                      <td>{scrap.type || "N/A"}</td>
                      <td>{scrap.brand || "N/A"}</td>
                      <td>{scrap.serialNumber || "N/A"}</td>
                      <td>{scrap.location || "N/A"}</td>
                      <td>{scrap.description || "N/A"}</td>
                      <td>{scrap.status || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No scrap data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage(page - 1)}
              className="custom-btn"
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              className="custom-btn"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
