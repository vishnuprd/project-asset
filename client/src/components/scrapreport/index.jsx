import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"; 

export default function ScrapReport() {
  const [scraps, setScraps] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({ scrapID: "" });

  const fetchScraps = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scrap`);
      if (response.status === 200) {
        setScraps(response.data);
      } else {
        alert(`Error fetching scrap items: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error fetching scrap items: ${error.message}`);
    }
  };

  const generatePDF = (scrap) => {
    const doc = new jsPDF();
    doc.text("Scrap Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Scrap ID", scrap.scrapID || "N/A"],
      ["Type", scrap.type || "N/A"],
      ["Asset ID", scrap.assetID || "N/A"],
      ["Brand", scrap.brand || "N/A"],
      ["Serial Number", scrap.serialNumber || "N/A"],
      ["Location", scrap.location || "N/A"],
      ["Description", scrap.description || "N/A"],
      ["Date Scrapped", scrap.dateScrapped ? new Date(scrap.dateScrapped).toLocaleDateString() : "N/A"],
      ["Status", scrap.status || "N/A"],
      ["Admin Account", scrap.adminAccount || "N/A"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${scrap.scrapID}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      scraps.map((scrap) => ({
        "Scrap ID": scrap.scrapID,
        Type: scrap.type,
        "Asset ID": scrap.assetID,
        Brand: scrap.brand,
        "Serial Number": scrap.serialNumber,
        Location: scrap.location,
        Description: scrap.description,
        "Date Scrapped": scrap.dateScrapped ? new Date(scrap.dateScrapped).toLocaleDateString() : "N/A",
        Status: scrap.status,
        "Admin Account": scrap.adminAccount,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scrap Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Scrap-Data.xlsx");
  };

  useEffect(() => {
    fetchScraps();
  }, []);

  const filteredScraps = scraps.filter((scrap) => {
    const { scrapID = "" } = searchFilters;
    return !scrapID || (scrap.scrapID && scrap.scrapID.toLowerCase().includes(scrapID.toLowerCase().trim()));
  });

  const totalPages = Math.ceil(filteredScraps.length / pageSize);
  const paginatedData = filteredScraps.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <select
                value={searchFilters.scrapID}
                onChange={(e) => setSearchFilters({ ...searchFilters, scrapID: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">All Scrap IDs</option>
                {scraps
                  .map((scrap) => scrap.scrapID)
                  .sort((a, b) => a.localeCompare(b))
                  .map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
              </select>
              <button
                onClick={downloadExcel}
                className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
              >
                Download Excel
              </button>
            </div>

            <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">Scrap Reports</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((scrap) => (
                <div key={scrap._id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold text-[#FF735C]">{scrap.scrapID || "N/A"}</h3>
                  <p>Type: {scrap.type || "N/A"}</p>
                  <p>Asset ID: {scrap.assetID || "N/A"}</p>
                  <p>Status: {scrap.status || "N/A"}</p>
                  <button
                    onClick={() => generatePDF(scrap)}
                    className="mt-4 px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
                  >
                    Generate PDF
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]"
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
