import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function EmployeeReport() {
  const [employeeData, setEmployeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({ name: "", division: "", location: "" });

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200) {
        setEmployeeData(response.data);
        setFilteredData(response.data);
      } else {
        alert("Failed to load data.");
      }
    } catch (error) {
      alert("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const filtered = employeeData.filter((employee) => {
      const { name, division, location } = searchFilters;
      return (
        (!name || employee.employeeName.toLowerCase().includes(name.toLowerCase())) &&
        (!division || employee.division.toLowerCase().includes(division.toLowerCase())) &&
        (!location || employee.location.toLowerCase().includes(location.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  }, [searchFilters, employeeData]);

  const generatePDF = (employee) => {
    const doc = new jsPDF();
    doc.text("Employee Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Employee ID", employee.employeeId || "N/A"],
      ["Name", employee.employeeName || "N/A"],
      ["Email", employee.employeeEmail || "N/A"],
      ["Position", employee.position || "N/A"],
      ["Division", employee.division || "N/A"],
      ["Location", employee.location || "N/A"],
      ["Description", employee.description || "N/A"],
      ["Date of Joining", employee.dateOfJoining || "N/A"],
      ["Admin Account", employee.adminAccount || "N/A"],
      ["Status", employee.status || "N/A"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${employee.employeeId}_Report.pdf`);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((employee) => ({
        "Employee ID": employee.employeeId,
        Name: employee.employeeName,
        Email: employee.employeeEmail,
        Position: employee.position,
        Division: employee.division,
        Location: employee.location,
        Description: employee.description,
        "Date of Joining": formatDate(employee.dateOfJoining),
        "Admin Account": employee.adminAccount,
        Status: employee.status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Employee-Data.xlsx");
  };

  const uniqueDivisions = [...new Set(employeeData.map((employee) => employee.division))];
  const uniqueLocations = [...new Set(employeeData.map((employee) => employee.location))];
  const uniqueNames = [...new Set(employeeData.map((employee) => employee.employeeName))];

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select
                value={searchFilters.name}
                onChange={(e) => setSearchFilters({ ...searchFilters, name: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Search by Name</option>
                {uniqueNames
                  .sort((a, b) => a.localeCompare(b))
                  .map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
              <select
                value={searchFilters.division}
                onChange={(e) => setSearchFilters({ ...searchFilters, division: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Search by Division</option>
                {uniqueDivisions
                  .sort((a, b) => a.localeCompare(b))
                  .map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
              </select>
              <select
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Search by Location</option>
                {uniqueLocations
                  .sort((a, b) => a.localeCompare(b))
                  .map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
              <button
                onClick={downloadExcel}
                className="px-4 py-2 bg-[#FF735C] text-white rounded hover:bg-[#e06450] w-full max-w-xs"
              >
                Download Excel
              </button>
            </div>

            <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">Employee Reports</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((employee) => (
                <div key={employee._id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-semibold text-[#FF735C]">{employee.employeeName || "N/A"}</h3>
                  <p>Position: {employee.position || "N/A"}</p>
                  <p>Division: {employee.division || "N/A"}</p>
                  <p>Location: {employee.location || "N/A"}</p>
                  <button
                    onClick={() => generatePDF(employee)}
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
