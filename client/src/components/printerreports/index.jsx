import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function PrinterReports() {
  const [printerData, setPrinterData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    model: "",
  });

  const fetchPrinterDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/printer/all`);
      if (response.status === 200) {
        setPrinterData(response.data);
      } else {
        console.error(`Error fetching printer details: ${response.data.message}`);
        alert(`Error fetching printer details: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error fetching printer details: ${error.message}`);
      alert(`Error fetching printer details: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPrinterDetails();
  }, []);

  const filteredPrinterData = printerData.filter((printer) => {
    const { location = "", division = "", model = "" } = searchFilters;
    return (
      (!location || printer.location?.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || printer.division?.toLowerCase().includes(division.toLowerCase().trim())) &&
      (!model || printer.model?.toLowerCase().includes(model.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredPrinterData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPrinterData.length / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const generatePDF = (printer) => {
    const doc = new jsPDF();
    doc.text("Printer Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Printer ID", printer.printerId || "N/A"],
      ["Model", printer.model || "N/A"],
      ["Serial Number", printer.serialNumber || "N/A"],
      ["Handled By", printer.handledBy || "N/A"],
      ["Location", printer.location || "N/A"],
      ["Division", printer.division || "N/A"],
      ["Status", printer.status || "N/A"],
      ["Description", printer.description || "N/A"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${printer.printerId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      printerData.map((printer) => ({
        "Printer ID": printer.printerId || "N/A",
        Model: printer.model || "N/A",
        "Serial Number": printer.serialNumber || "N/A",
        "Handled By": printer.handledBy || "N/A",
        Location: printer.location || "N/A",
        Division: printer.division || "N/A",
        Status: printer.status || "N/A",
        Description: printer.description || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Printer Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Printer-Data.xlsx");
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
                      <option value="">
                        {`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                      </option>
                      {[...new Set(printerData.map((printer) => printer[filter]))]
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
                Printer Reports
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedData.map((printer) => (
                  <div key={printer._id} className="p-4 border rounded shadow-sm">
                    <h3 className="font-semibold text-[#FF735C]">
                      {printer.model || "N/A"}
                    </h3>
                    <p>Location: {printer.location || "N/A"}</p>
                    <p>Division: {printer.division || "N/A"}</p>
                    <p>Status: {printer.status || "N/A"}</p>
                    <button
                      onClick={() => generatePDF(printer)}
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
