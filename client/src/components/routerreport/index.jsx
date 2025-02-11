import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function RouterReport() {
  const [routerData, setRouterData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    brand: "",
  });

  const fetchRouterDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/router/all`);
      if (response.status === 200) {
        setRouterData(response.data);
      } else {
        console.error(`Error fetching router details: ${response.data.message}`);
        alert(`Error fetching router details: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error fetching router details: ${error.message}`);
      alert(`Error fetching router details: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchRouterDetails();
  }, []);

  const filteredRouterData = routerData.filter((router) => {
    const { location = "", division = "", brand = "" } = searchFilters;
    return (
      (!location || router.location?.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || router.division?.toLowerCase().includes(division.toLowerCase().trim())) &&
      (!brand || router.brand?.toLowerCase().includes(brand.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredRouterData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredRouterData.length / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const generatePDF = (router) => {
    const doc = new jsPDF();
    doc.text("Router Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Router ID", router.routerId || "N/A"],
      ["Brand", router.brand || "N/A"],
      ["Serial Number", router.serialNumber || "N/A"],
      ["Coverage", router.coverage || "N/A"],
      ["Speed", router.speed || "N/A"],
      ["Storage", router.storage || "N/A"],
      ["Location", router.location || "N/A"],
      ["Division", router.division || "N/A"],
      ["Status", router.status || "N/A"],
      ["Description", router.description || "N/A"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${router.routerId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      routerData.map((router) => ({
        "Router ID": router.routerId || "N/A",
        Brand: router.brand || "N/A",
        "Serial Number": router.serialNumber || "N/A",
        Coverage: router.coverage || "N/A",
        Speed: router.speed || "N/A",
        Storage: router.storage || "N/A",
        Location: router.location || "N/A",
        Division: router.division || "N/A",
        Status: router.status || "N/A",
        Description: router.description || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Router Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Router-Data.xlsx");
  };

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                {["location", "division", "brand"].map((filter) => (
                  <select
                    key={filter}
                    value={searchFilters[filter]}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, [filter]: e.target.value })
                    }
                    className="input input-bordered input-info w-full max-w-xs"
                  >
                    <option value="">
                      {`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                    </option>
                    {[...new Set(routerData.map((router) => router[filter]))]
                      .filter((value) => value)
                      .map((value, index) => (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      ))}
                  </select>
                ))}
              </div>

              <button
                onClick={downloadExcel}
                className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
              >
                Download Excel
              </button>
            </div>

            <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">
              Router Reports
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((router) => (
                <div key={router._id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold text-[#FF735C]">{router.brand || "N/A"}</h3>
                  <p>Location: {router.location || "N/A"}</p>
                  <p>Division: {router.division || "N/A"}</p>
                  <p>Status: {router.status || "N/A"}</p>
                  <button
                    onClick={() => generatePDF(router)}
                    className="mt-4 px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
                  >
                    Generate PDF
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
