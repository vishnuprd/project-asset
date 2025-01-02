import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function DongleReport() {
  const [dongleData, setDongleData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchFilters, setSearchFilters] = useState({
    status: '',
    location: '',
    division: '',
    handledBy: '',
  });

  const fetchDongleData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/dongle/all`);
      if (response.status === 200) {
        setDongleData(response.data);
      } else {
        alert(`Error fetching dongle data: ${response.data.message}`);
      }
    } catch (error) {
      alert('Error fetching dongle details');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDongleData();
  }, []);

  const generatePDF = (dongle) => {
    const doc = new jsPDF();
    doc.text("Dongle Report", 10, 10);

    const tableColumn = ["Field", "Value"];
    const tableRows = [
      ["Dongle ID", dongle.dongleId || "N/A"],
      ["Brand", dongle.brand || "N/A"],
      ["Model", dongle.model || "N/A"],
      ["Location", dongle.location || "N/A"],
      ["Division", dongle.division || "N/A"],
      ["Serial Number", dongle.serialNumber || "N/A"],
      ["Handled By", dongle.handledBy || "N/A"],
      ["Status", dongle.status || "N/A"],
      ["Description", dongle.description || "N/A"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`${dongle.dongleId}_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      dongleData.map((dongle) => ({
        "Dongle ID": dongle.dongleId || "N/A",
        Brand: dongle.brand || "N/A",
        Model: dongle.model || "N/A",
        Location: dongle.location || "N/A",
        Division: dongle.division || "N/A",
        "Serial Number": dongle.serialNumber || "N/A",
        "Handled By": dongle.handledBy || "N/A",
        Status: dongle.status || "N/A",
        Description: dongle.description || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dongle Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Dongle-Data.xlsx");
  };

  const filteredDongle = Array.isArray(dongleData)
    ? dongleData.filter((dongle) => {
        const { status = '', location = '', division = '', handledBy = '' } = searchFilters;

        const statusMatch =
          !status || (dongle.status || 'N/A').toLowerCase().includes(status.toLowerCase().trim());

        const locationMatch =
          !location || (dongle.location || 'N/A').toLowerCase().includes(location.toLowerCase().trim());

        const divisionMatch =
          !division || (dongle.division || 'N/A').toLowerCase().includes(division.toLowerCase().trim());

        return statusMatch && locationMatch && divisionMatch;
      })
    : [];

  const totalPages = Math.ceil(filteredDongle.length / pageSize);
  const paginatedData = filteredDongle.slice((page - 1) * pageSize, page * pageSize);

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
                      {[...new Set(dongleData.map((dongle) => dongle[filter]))]
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

              <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">Dongle Reports</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedData.map((dongle) => (
                  <div key={dongle._id} className="p-4 border rounded shadow-sm">
                    <h3 className="font-semibold text-[#FF735C]">{dongle.dongleId || "N/A"}</h3>
                    <p>Brand: {dongle.brand || "N/A"}</p>
                    <p>Model: {dongle.model || "N/A"}</p>
                    <p>Status: {dongle.status || "N/A"}</p>
                    <p>Location: {dongle.location || "N/A"}</p>

                    <button
                      onClick={() => generatePDF(dongle)}
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
    </div>
  );
}
