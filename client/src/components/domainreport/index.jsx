import React, { useState, useEffect } from "react";
import Layout from '../layout/layout.js';
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function DomainReport() {

    const [domainData, setDomainData] = useState([]);
      const [page, setPage] = useState(1);
      const [pageSize, setPageSize] = useState(6);
      const [searchFilters, setSearchFilters] = useState({ serverType: "", serverName: "" });

    
    const fetchDomainData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/domain/all`);
            console.log(response.data);
            if (response.status === 200) {
                setDomainData(response.data.data); 
            } else {
                alert(`Error fetching domains: ${response.data.message}`);
            }
        } catch (error) {
            alert("Error fetching domain details");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDomainData();
    }, []);


    const generatePDF = (domain) => {
        const doc = new jsPDF();
        doc.text("Domain Report", 10, 10);
      
        const tableColumn = ["Field", "Value"];
        const tableRows = [
          ["Domain ID", domain._id || "N/A"],
          ["Provider", domain.provider || "N/A"],
          ["Server Name", domain.serverName || "N/A"],
          ["Server Type", domain.serverType || "N/A"],
          ["Server Ip", domain.serverIp || "N/A"],
          ["Server Url", domain.serverUrl || "N/A"],
          ["TLD", domain.tld || "N/A"],
          ["Registered Name", domain.ownerName || "N/A"],
          ["Registered Organization", domain.registeredOrganization || "N/A"],
          ["Cloud Flare", domain.cloudFlare || "N/A"],
          ["Google Authentication", domain.googleAuthentication || "N/A"],
          ["Register Email", domain.registerEmail || "N/A"],
          ["Purchase Date", domain.purchaseDate ? new Date(domain.purchaseDate).toLocaleDateString() : "N/A"],
          ["Expiry Date", domain.expiryDate ? new Date(domain.expiryDate).toLocaleDateString() : "N/A"],
          ["Last Backup Date", domain.lastBackupDate ? new Date(domain.lastBackupDate).toLocaleDateString() : "N/A"],
          ["Next Maintenance Date", domain.nextMaintenanceDate ? new Date(domain.nextMaintenanceDate).toLocaleDateString() : "N/A"],
          ["One Time Cost", domain.oneTimeCost ? `$${domain.oneTimeCost}` : "N/A"],
          ["Description", domain.description || "N/A"],
        ];
      
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
        });
      
        doc.save(`${domain.serverName}_Report.pdf`);
      };
      
      const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
          domainData.map((domain) => ({
            "Domain ID": domain._id || "N/A",
            Provider: domain.provider || "N/A",
            "Server Name": domain.serverName || "N/A",
            "Server Type": domain.serverType || "N/A",
            "Server IP": domain.serverIp || "N/A",
            "Server Url": domain.serverUrl || "N/A",
            TLD: domain.tld || "N/A",
            "Registered Name": domain.ownerName || "N/A",
            "Registered Organization": domain.registeredOrganization || "N/A",
            "Cloud Flare": domain.cloudFlare || "N/A",
            "Google Authentication": domain.googleAuthentication || "N/A",
            "Register Email": domain.registerEmail || "N/A",
            "Purchase Date": domain.purchaseDate ? new Date(domain.purchaseDate).toLocaleDateString() : "N/A",
            "Expiry Date": domain.expiryDate ? new Date(domain.expiryDate).toLocaleDateString() : "N/A",
            "Last Backup Date": domain.lastBackupDate ? new Date(domain.lastBackupDate).toLocaleDateString() : "N/A",
            "Next Maintenance Date": domain.nextMaintenanceDate ? new Date(domain.nextMaintenanceDate).toLocaleDateString() : "N/A",
            "One Time Cost": domain.oneTimeCost ? `$${domain.oneTimeCost}` : "N/A",
            Description: domain.description || "N/A",
          }))
        );
      
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Domain Data");
      
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Domain-Data.xlsx");
      };
      

      const filteredDomain = domainData.filter((domain) => {
        const { serverType = "", serverName = "" } = searchFilters;
        return !serverType || (domain.serverType && domain.serverType.toLowerCase().includes(serverType.toLowerCase().trim()))
            || !serverName || (domain.serverName && domain.serverName.toLowerCase().includes(serverName.toLowerCase().trim()));
      });
    
      const totalPages = Math.ceil(filteredDomain.length / pageSize);
      const paginatedData = filteredDomain.slice((page - 1) * pageSize, page * pageSize);


  return (
    <div>
    <Layout>
    <div className="p-4 sm:ml-64">
  <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
       
        <select
          value={searchFilters.serverName}
          onChange={(e) => setSearchFilters({ ...searchFilters, serverName: e.target.value })}
          className="input input-bordered input-info w-full max-w-xs"
        >
          <option value="">Select Server Name</option>
          {domainData
            .map((domain) => domain.serverName)
            .sort((a, b) => a.localeCompare(b))
            .map((serverName) => (
              <option key={serverName} value={serverName}>
                {serverName}
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

      <h4 className="text-center text-[#FF735C] font-bold text-2xl mb-4">Domain Reports</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedData.map((domain) => (
          <div key={domain._id} className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold text-[#FF735C]">{domain.provider || "N/A"}</h3>
            <p>Server Name: {domain.serverName || "N/A"}</p>
            <p>Server Type: {domain.serverType || "N/A"}</p>
            <p>Server IP: {domain.serverIp || "N/A"}</p>
            <p>Purchase Date: {domain.purchaseDate || "N/A"}</p>
            <p>Expiry Date: {domain.expiryDate || "N/A"}</p>

            
            <button
              onClick={() => generatePDF(domain)}
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
  )
}
