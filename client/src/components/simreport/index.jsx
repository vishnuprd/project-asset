import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function SimReport() {
  const [simData, setSimData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    networkName: "",
  });

  const fetchSimData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/sim-card/all`);
      if (response.status === 200) setSimData(response.data.data);
    } catch (error) {
      console.error("Error fetching SIM data:", error.message || error.response?.data);
    }
  };

  useEffect(() => {
    fetchSimData();
  }, []);

  const filteredSimData = simData.filter((sim) => {
    const { location = "", division = "", networkName = "" } = searchFilters;
    return (
      (!location || sim.location?.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || sim.division?.toLowerCase().includes(division.toLowerCase().trim())) &&
      (!networkName || sim.networkName?.toLowerCase().includes(networkName.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredSimData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredSimData.length / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const generatePDF = (sim) => {
    const doc = new jsPDF();
    doc.text("SIM Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["SIM Card ID", sim.simCardId || "N/A"],
      ["Network Name", sim.networkName || "N/A"],
      ["Handled By", sim.handledBy || "N/A"],
      ["Location", sim.location || "N/A"],
      ["Division", sim.division || "N/A"],
      ["Status", sim.status || "N/A"],
      ["Description", sim.description || "N/A"],
    ];

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save(`${sim.simCardId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      simData.map((sim) => ({
        "SIM Card ID": sim.simCardId || "N/A",
        "Network Name": sim.networkName || "N/A",
        "Handled By": sim.handledBy || "N/A",
        "Location": sim.location || "N/A",
        "Division": sim.division || "N/A",
        "Status": sim.status || "N/A",
        "Description": sim.description || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SIM Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "SIM-Data.xlsx");
  };

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                {['location', 'division', 'networkName'].map((filter) => (
                  <select
                    key={filter}
                    value={searchFilters[filter]}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, [filter]: e.target.value })
                    }
                    className="input input-bordered input-info w-full max-w-xs"
                  >
                    <option value="">{`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}</option>
                    {[...new Set(simData.map((sim) => sim[filter]))]
                      .filter((value) => value)
                      .map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                      ))}
                  </select>
                ))}
              </div>
              <button onClick={downloadExcel} className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]">
                Download Excel
              </button>
            </div>
            <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">SIM Reports</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((sim) => (
                <div key={sim._id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold text-[#FF735C]">{sim.networkName || "N/A"}</h3>
                  <p>Location: {sim.location || "N/A"}</p>
                  <p>Division: {sim.division || "N/A"}</p>
                  <p>Status: {sim.status || "N/A"}</p>
                  <button onClick={() => generatePDF(sim)} className="mt-4 px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]">
                    Generate PDF
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handlePreviousPage} className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]" disabled={page === 1}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={handleNextPage} className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450]" disabled={page === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}