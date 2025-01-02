import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function LaptopDetails() {
  const [laptops, setLaptops] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    laptopId: '',
    assignedTo: '',
    serialNumber: '',
    location: '',
    division: '',
    status: '',
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

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

  useEffect(() => {
    fetchLaptops();
  }, []);

  const filteredLaptops = laptops.filter((laptop) => {
    const {
      laptopId = '',
      assignedTo = '',
      serialNumber = '',
      location = '',
      division = '',
      status = '',
    } = searchFilters;

    const laptopIdMatch =
      !laptopId || (laptop.laptopId && laptop.laptopId.toLowerCase().includes(laptopId.toLowerCase().trim()));

    const assignedToMatch =
      !assignedTo ||
      (laptop.assignedTo?.employeeName || 'No employee assigned')
        .toLowerCase()
        .includes(assignedTo.toLowerCase().trim());

    const serialNumberMatch =
      !serialNumber || (laptop.serialNumber && laptop.serialNumber.toLowerCase().includes(serialNumber.toLowerCase().trim()));

    const locationMatch =
      !location || (laptop.location || 'N/A').toLowerCase().includes(location.toLowerCase().trim());

    const divisionMatch =
      !division || (laptop.division || 'N/A').toLowerCase().includes(division.toLowerCase().trim());

    const statusMatch =
      !status || (laptop.status && laptop.status.toLowerCase().includes(status.toLowerCase().trim()));

    return laptopIdMatch && assignedToMatch && serialNumberMatch && locationMatch && divisionMatch && statusMatch;
  });

  
  const totalPages = Math.ceil(filteredLaptops.length / pageSize);
  const paginatedData = filteredLaptops.slice((page - 1) * pageSize, page * pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (laptop) => {
    setSelectedLaptop(laptop);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLaptop(null);
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-end gap-4 mb-4">
              <select
                value={searchFilters.laptopId}
                onChange={(e) => setSearchFilters({ ...searchFilters, laptopId: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Laptop ID</option>
                {laptops
                  .sort((a, b) => a.laptopId - b.laptopId)
                  .map((laptop) => (
                    <option key={laptop._id} value={laptop.laptopId}>
                      {laptop.laptopId}
                    </option>
                  ))}
              </select>

              <select
                value={searchFilters.assignedTo}
                onChange={(e) => setSearchFilters({ ...searchFilters, assignedTo: e.target.value })}
                 className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Assigned To</option>
                {laptops
                  .filter((laptop) => laptop.assignedTo?.employeeName)
                  .map((laptop) => (
                    <option key={laptop._id} value={laptop.assignedTo?.employeeName}>
                      {laptop.assignedTo?.employeeName}
                    </option>
                  ))}
              </select>

              <select
                value={searchFilters.serialNumber}
                onChange={(e) => setSearchFilters({ ...searchFilters, serialNumber: e.target.value })}
                 className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Serial Number</option>
                {laptops.map((laptop) => (
                  <option key={laptop._id} value={laptop.serialNumber}>
                    {laptop.serialNumber}
                  </option>
                ))}
              </select>

              <select
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Location</option>
                {Array.from(new Set(laptops.map((laptop) => laptop.location || 'N/A'))).map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={searchFilters.division}
                onChange={(e) => setSearchFilters({ ...searchFilters, division: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Division</option>
                {Array.from(new Set(laptops.map((laptop) => laptop.division || 'N/A'))).map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>

              <select
                value={searchFilters.status}
                onChange={(e) => setSearchFilters({ ...searchFilters, status: e.target.value })}
                 className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Status</option>
                {['Assigned', 'Lost', 'Scrap', 'Available'].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <h3 className="text-center font-bold" style={{ color: "#FF735C" }}>List of Laptops 🧑‍💻</h3>
            <div className="overflow-x-auto py-9">
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Laptop ID</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Assigned To</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((laptop, index) => (
                      <tr className="hover" key={laptop._id}>
                      <td >{(page - 1) * pageSize + index + 1}</td>
                        <td>{laptop.laptopId}</td>
                        <td>{laptop.assignedTo?.employeeName || 'No employee assigned'}</td>
                        <td>{laptop.serialNumber}</td>
                        <td style={{ color: !laptop.location || laptop.location === 'N/A' ? 'red' : 'black' }}>
                          {laptop.location || 'N/A'}
                        </td>
                        <td style={{ color: !laptop.division || laptop.division === 'N/A' ? 'red' : 'black' }}>
                          {laptop.division || 'N/A'}
                        </td>
                        <td style={{ color: laptop.status === 'Available' ? 'green' : 'black' }}>
                          {laptop.status}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(laptop)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No laptops available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
           
            <div className="flex justify-between mt-4">
              <button onClick={handlePreviousPage} className="custom-btn" disabled={page === 1}>
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button onClick={handleNextPage} className="custom-btn" disabled={page === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>

        {modalOpen && selectedLaptop && (
          <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Laptop Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Laptop ID:</strong> {selectedLaptop.laptopId}</p>
                <p><strong>Brand:</strong> {selectedLaptop.brand}</p>
                <p><strong>Serial Number:</strong> {selectedLaptop.serialNumber}</p>
                <p><strong>Status:</strong> {selectedLaptop.status || 'N/A'}</p>
                <p><strong>Location:</strong> {selectedLaptop.location || 'N/A'}</p>
                <p><strong>Division:</strong> {selectedLaptop.division || 'N/A'}</p>
                <p><strong>Model:</strong> {selectedLaptop.modal || 'N/A'}</p>
                <p><strong>Version:</strong> {selectedLaptop.version || 'N/A'}</p>
                <p><strong>Processor:</strong> {selectedLaptop.processor || 'N/A'}</p>
                <p><strong>RAM:</strong> {selectedLaptop.ram || 'N/A'}</p>
                <p><strong>Storage:</strong> {selectedLaptop.storage || 'N/A'}</p>
                <p><strong>SSD Storage:</strong> {selectedLaptop.ssdStorage || 'N/A'}</p>
                <p><strong>Admin Account:</strong> {selectedLaptop.adminAccount || 'N/A'}</p>
                <p><strong>Window Software:</strong> {selectedLaptop.windowSoftware || 'N/A'}</p>
                <p><strong>Antivirus:</strong> {selectedLaptop.antivirus || 'N/A'}</p>
                <p><strong>MS Office:</strong> {selectedLaptop.msOffice || 'N/A'}</p>
                <p><strong>Description:</strong> {selectedLaptop.description || 'N/A'}</p>
              </div>
              <div className="modal-action flex justify-center">
                <button className="custom-btn" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </dialog>
        )}
        </div>
      </Layout>
    </div>
    
  );
}
