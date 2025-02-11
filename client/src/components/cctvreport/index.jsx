import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function CCTVReport() {
  const [cctvData, setCctvData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({ location: "", division: "",storageType:"",});

  const fetchCctvDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/cctv/all`);
      if (response.status === 200) {
        setCctvData(response.data.data);
      } else {
        console.error(`Error fetching CCTV details: ${response.data.message}`);
        alert(`Error fetching CCTV details: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error fetching CCTV details: ${error.message}`);
      alert(`Error fetching CCTV details: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCctvDetails();
  }, []);

  const filteredCctvData = cctvData.filter((cctv) => {
    const { location = "", division = "", storageType = "", } = searchFilters;
    return (
      (!location || cctv.location?.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || cctv.division?.toLowerCase().includes(division.toLowerCase().trim())) &&
      (!storageType || cctv.storageType?.toLowerCase().includes(storageType.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredCctvData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredCctvData.length / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const generatePDF = (cctv) => {
    const doc = new jsPDF();
    doc.text("CCTV Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["CCTV ID", cctv.cctvId || "N/A"],
      ["Type", cctv.model || "N/A"],
      ["Asset ID", cctv.serialNumber || "N/A"],
      ["Location", cctv.location || "N/A"],
      ["Division", cctv.division || "N/A"],
      ["Storage Type", cctv.storageType || "N/A"],
      ["Storage Size", cctv.storageSize || "N/A"],
      ["Storage Date", cctv.storageDate || "N/A"],
      ["Status", cctv.status || "N/A"],
      ["Description", cctv.description || "N/A"],
      ["IP Address", cctv.ipAddress || "N/A"],

    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${cctv.cctvId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      cctvData.map((cctv) => ({
        "CCTV ID": cctv.cctvId || "N/A",
        Type: cctv.model || "N/A",
        "Asset ID": cctv.serialNumber || "N/A",
        Location: cctv.location || "N/A",
        Division: cctv.division || "N/A",
        "Storage Type": cctv.storageType || "N/A",
        "Storage Size": cctv.storageSize || "N/A",
        "Storage Date": cctv.storageDate || "N/A",
        Status: cctv.status || "N/A",
        Description: cctv.description || "N/A",
        "IP Address": cctv.ipAddress || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CCTV Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "CCTV-Data.xlsx");
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <select
                    value={searchFilters.location}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, location: e.target.value })
                    }
                    className="input input-bordered input-info w-full max-w-xs"
                  >
                    <option value="">Select Location</option>
                    {[...new Set(cctvData.map((cctv) => cctv.location))].map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>

                  <select
                    value={searchFilters.division}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, division: e.target.value })
                    }
                    className="input input-bordered input-info w-full max-w-xs"
                  >
                    <option value="">Select Division</option>
                    {[...new Set(cctvData.map((cctv) => cctv.division))].map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
              
                   <select
                  value={searchFilters.storageType}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, storageType: e.target.value })
                  }
                  className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Select Storage Type</option>
                  {[...new Set(cctvData.map((cctv) => cctv.storageType))].map((storageType) => (
                    <option key={storageType} value={storageType}>
                      {storageType}
                    </option>
                  ))}
                </select>
              </div>
              </div>

              <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">
                CCTV Reports
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedData.map((cctv) => (
                  <div key={cctv.cctvId} className="p-4 border rounded shadow-sm">
                    <h3 className="font-semibold text-[#FF735C]">
                      {cctv.model || "N/A"}
                    </h3>
                    <p>Location: {cctv.location || "N/A"}</p>
                    <p>Division: {cctv.division || "N/A"}</p>
                    <p>Status: {cctv.status || "N/A"}</p>
                    <button
                      onClick={() => generatePDF(cctv)}
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
    </div>
  );
}
