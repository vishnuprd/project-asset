import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"; 

export default function LaptopReport() {
  const [laptops, setLaptops] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({ laptopId: "" });

  const fetchLaptops = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/laptop/all`);
      if (response.status === 200) {
        setLaptops(response.data);
      } else {
        alert(`Error fetching laptops: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error fetching laptops: ${error.message}`);
    }
  };

  const generatePDF = (laptop) => {
    const doc = new jsPDF();
    doc.text("Laptop Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Laptop ID", laptop.laptopId || "N/A"],
      ["Brand", laptop.brand || "N/A"],
      ["Model", laptop.model || "N/A"],
      ["Serial Number", laptop.serialNumber || "N/A"],
      ["Status", laptop.status || "N/A"],
      ["Description", laptop.description || "N/A"],
      ["Location", laptop.location || "N/A"],
      ["Admin Account", laptop.adminAccount || "N/A"],
      ["RAM", laptop.ram || "N/A"],
      ["Storage", laptop.storage || "N/A"],
      ["SSD Storage", laptop.ssdStorage || "N/A"],
      ["Version", laptop.version || "N/A"],
      ["Windows Software", laptop.windowSoftware || "N/A"],
      ["Antivirus", laptop.antivirus || "N/A"],
      ["MS Office", laptop.msOffice || "N/A"],
      ["Processor", laptop.processor || "N/A"],
    ];

    if (laptop.assignedTo) {
      tableRows.push(
        ["Assigned To", laptop.assignedTo.employeeName || "N/A"],
        ["Position", laptop.assignedTo.position || "N/A"],
        ["Employee ID", laptop.assignedTo.employeeId || "N/A"],
        ["Email", laptop.assignedTo.employeeEmail || "N/A"],
        ["Division", laptop.assignedTo.division || "N/A"],
        ["Location", laptop.assignedTo.location || "N/A"]
      );
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${laptop.laptopId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      laptops.map((laptop) => ({
        "Laptop ID": laptop.laptopId,
        Brand: laptop.brand,
        Model: laptop.model,
        "Serial Number": laptop.serialNumber,
        Status: laptop.status,
        Description: laptop.description,
        Location: laptop.location,
        "Admin Account": laptop.adminAccount,
        RAM: laptop.ram,
        Storage: laptop.storage,
        "SSD Storage": laptop.ssdStorage,
        Version: laptop.version,
        "Windows Software": laptop.windowSoftware,
        Antivirus: laptop.antivirus,
        "MS Office": laptop.msOffice,
        Processor: laptop.processor,
        "Assigned To": laptop.assignedTo?.employeeName || "N/A",
        Division: laptop.assignedTo?.division || "N/A",
        Position: laptop.assignedTo?.position || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laptop Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Laptop-Data.xlsx");
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  const filteredLaptops = laptops.filter((laptop) => {
    const { laptopId = "" } = searchFilters;
    return !laptopId || (laptop.laptopId && laptop.laptopId.toLowerCase().includes(laptopId.toLowerCase().trim()));
  });

  const totalPages = Math.ceil(filteredLaptops.length / pageSize);
  const paginatedData = filteredLaptops.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <select
                value={searchFilters.laptopId}
                onChange={(e) => setSearchFilters({ ...searchFilters, laptopId: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">All Laptop IDs</option>
                {laptops
                  .map((laptop) => laptop.laptopId)
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

            <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">Laptop Reports</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((laptop) => (
                <div key={laptop._id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold text-[#FF735C]">{laptop.laptopId || "N/A"}</h3>
                  <p>Brand: {laptop.brand || "N/A"}</p>
                  <p>Model: {laptop.model || "N/A"}</p>
                  <p>Status: {laptop.status || "N/A"}</p>
                  <p>Assigned To: {laptop.assignedTo?.employeeName || "N/A"}</p>
                  <button
                    onClick={() => generatePDF(laptop)}
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
