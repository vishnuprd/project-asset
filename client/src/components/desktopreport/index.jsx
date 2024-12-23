import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function DesktopReport() {
  const [desktops, setDesktops] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({ desktopId: "" });

  const fetchDesktops = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      if (response.status === 200) {
        setDesktops(response.data);
      } else {
        alert(`Error fetching desktops: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error fetching desktops: ${error.message}`);
    }
  };

  const generatePDF = (desktop) => {
    const doc = new jsPDF();
    doc.text("Desktop Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Desktop ID", desktop.desktopId || "N/A"],
      ["Monitor", desktop.monitor || "N/A"],
      ["CPU", desktop.cpu || "N/A"],
      ["Brand", desktop.brand || "N/A"],
      ["Model", desktop.model || "N/A"],
      ["Serial Number", desktop.serialNumber || "N/A"],
      ["Status", desktop.status || "N/A"],
      ["Description", desktop.description || "N/A"],
      ["Location", desktop.location || "N/A"],
      ["Admin Account", desktop.adminAccount || "N/A"],
      ["RAM", desktop.ram || "N/A"],
      ["Storage", desktop.storage || "N/A"],
      ["SSD Storage", desktop.ssdStorage || "N/A"],
      ["Version", desktop.version || "N/A"],
      ["Windows Software", desktop.windowSoftware || "N/A"],
      ["Antivirus", desktop.antivirus || "N/A"],
      ["MS Office", desktop.msOffice || "N/A"],
      ["Processor", desktop.processor || "N/A"],
    ];

    if (desktop.assignedTo) {
      tableRows.push(
        ["Assigned To", desktop.assignedTo.employeeName || "N/A"],
        ["Position", desktop.assignedTo.position || "N/A"],
        ["Employee ID", desktop.assignedTo.employeeId || "N/A"],
        ["Email", desktop.assignedTo.employeeEmail || "N/A"],
        ["Division", desktop.assignedTo.division || "N/A"],
        ["Location", desktop.assignedTo.location || "N/A"]
      );
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${desktop.desktopId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      desktops.map((desktop) => ({
        "Desktop ID": desktop.desktopId,
        Monitor: desktop.monitor,
        Cpu: desktop.cpu,
        Brand: desktop.brand,
        Model: desktop.model,
        "Serial Number": desktop.serialNumber,
        Status: desktop.status,
        Description: desktop.description,
        Location: desktop.location,
        "Admin Account": desktop.adminAccount,
        RAM: desktop.ram,
        Storage: desktop.storage,
        "SSD Storage": desktop.ssdStorage,
        Version: desktop.version,
        "Windows Software": desktop.windowSoftware,
        Antivirus: desktop.antivirus,
        "MS Office": desktop.msOffice,
        Processor: desktop.processor,
        "Assigned To": desktop.assignedTo?.employeeName || "N/A",
        Division: desktop.assignedTo?.division || "N/A",
        Position: desktop.assignedTo?.position || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Desktop Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Desktop-Data.xlsx");
  };

  useEffect(() => {
    fetchDesktops();
  }, []);

  const filteredDesktops = desktops.filter((desktop) => {
    const { desktopId = "" } = searchFilters;
    return !desktopId || (desktop.desktopId && desktop.desktopId.toLowerCase().includes(desktopId.toLowerCase().trim()));
  });

  const totalPages = Math.ceil(filteredDesktops.length / pageSize);
  const paginatedData = filteredDesktops.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <select
                value={searchFilters.desktopId}
                onChange={(e) => setSearchFilters({ ...searchFilters, desktopId: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">All Desktop IDs</option>
                {desktops
                  .map((desktop) => desktop.desktopId)
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

            <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">Desktop Reports</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((desktop) => (
                <div key={desktop._id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold text-[#FF735C]">{desktop.desktopId || "N/A"}</h3>
                  <p>Brand: {desktop.brand || "N/A"}</p>
                  <p>Model: {desktop.model || "N/A"}</p>
                  <p>Status: {desktop.status || "N/A"}</p>
                  <p>Assigned To: {desktop.assignedTo?.employeeName || "N/A"}</p>
                  <button
                    onClick={() => generatePDF(desktop)}
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
