import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ProjectorReports() {
  const [projectorData, setProjectorData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    model: "",
  });

  const fetchProjectorDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/projector/all`);
      if (response.status === 200) {
        setProjectorData(response.data.data);
      } else {
        console.error(`Error fetching projector details: ${response.data.message}`);
        alert(`Error fetching projector details: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error fetching projector details: ${error.message}`);
      alert(`Error fetching projector details: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProjectorDetails();
  }, []);

  const filteredProjectorData = projectorData.filter((projector) => {
    const { location = "", division = "", model = "" } = searchFilters;
    return (
      (!location || projector.location?.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || projector.division?.toLowerCase().includes(division.toLowerCase().trim())) &&
      (!model || projector.model?.toLowerCase().includes(model.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredProjectorData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredProjectorData.length / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const generatePDF = (projector) => {
    const doc = new jsPDF();
    doc.text("Projector Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Projector ID", projector.projectorId || "N/A"],
      ["Model", projector.model || "N/A"],
      ["Serial Number", projector.serialNumber || "N/A"],
      ["Handled By", projector.handledBy || "N/A"],
      ["Location", projector.location || "N/A"],
      ["Division", projector.division || "N/A"],
      ["Status", projector.status || "N/A"],
      ["Description", projector.description || "N/A"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${projector.projectorId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      projectorData.map((projector) => ({
        "Projector ID": projector.projectorId || "N/A",
        Model: projector.model || "N/A",
        "Serial Number": projector.serialNumber || "N/A",
        "Handled By": projector.handledBy || "N/A",
        Location: projector.location || "N/A",
        Division: projector.division || "N/A",
        Status: projector.status || "N/A",
        Description: projector.description || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projector Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Projector-Data.xlsx");
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  {["location", "division", "model"].map((filter) => (
                    <select
                      key={filter}
                      value={searchFilters[filter]}
                      onChange={(e) =>
                        setSearchFilters({ ...searchFilters, [filter]: e.target.value })
                      }
                      className="input input-bordered input-info w-full max-w-xs"
                    >
                      <option value="">{`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}</option>
                      {[...new Set(projectorData.map((projector) => projector[filter]))]
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
                Projector Reports
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedData.map((projector) => (
                  <div key={projector._id} className="p-4 border rounded shadow-sm">
                    <h3 className="font-semibold text-[#FF735C]">{projector.model || "N/A"}</h3>
                    <p>Location: {projector.location || "N/A"}</p>
                    <p>Division: {projector.division || "N/A"}</p>
                    <p>Status: {projector.status || "N/A"}</p>
                    <button
                      onClick={() => generatePDF(projector)}
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
