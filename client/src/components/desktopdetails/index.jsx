import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function DesktopDetails() {
  const [desktopData, setDesktopData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDesktop, setSelectedDesktop] = useState(null);

  const filteredDesktops = desktopData.filter((desktop) => {
    const { desktopId = '', assignedTo = '', serialNumber = '', location = '', division = '', status = '' } = searchFilters;

    const desktopIdMatch =
      !desktopId || (desktop.desktopId && desktop.desktopId.toLowerCase().includes(desktopId.toLowerCase().trim()));

    const assignedToMatch =
      !assignedTo ||
      ((desktop.assignedTo && desktop.assignedTo.employeeName) || 'No employee assigned')
        .toLowerCase()
        .includes(assignedTo.toLowerCase().trim());

    const serialNumberMatch =
      !serialNumber || (desktop.serialNumber && desktop.serialNumber.toLowerCase().includes(serialNumber.toLowerCase().trim()));

    const locationMatch =
      !location || (desktop.location || 'N/A').toLowerCase().includes(location.toLowerCase().trim());

    const divisionMatch =
      !division || (desktop.division || 'N/A').toLowerCase().includes(division.toLowerCase().trim());

    const statusMatch =
      !status || (desktop.status && desktop.status.toLowerCase().includes(status.toLowerCase().trim()));

    return desktopIdMatch && assignedToMatch && serialNumberMatch && locationMatch && divisionMatch && statusMatch;
  });

  const paginatedData = filteredDesktops.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredDesktops.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (desktop) => {
    setSelectedDesktop(desktop);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDesktop(null);
    setModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      if (response.status === 200) {
        setDesktopData(response.data);
      } else {
        alert(`Error fetching desktops: ${response.data.message}`);
      }
    } catch (error) {
      alert('Error fetching desktops details');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="p-4">
              <div className="flex justify-end gap-4 mb-4">
                <select
                  value={searchFilters.desktopId}
                  onChange={(e) => setSearchFilters({ ...searchFilters, desktopId: e.target.value })}
                  className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Desktop ID</option>
                  {desktopData
                    .sort((a, b) => a.desktopId - b.desktopId)
                    .map((desktop) => (
                      <option key={desktop._id} value={desktop.desktopId}>
                        {desktop.desktopId}
                      </option>
                    ))}
                </select>

                <select
                value={searchFilters.assignedTo}
                onChange={(e) => setSearchFilters({ ...searchFilters, assignedTo: e.target.value })}
                 className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Assigned To</option>
                {desktopData
                  .filter((desktop) => desktop.assignedTo?.employeeName)
                  .map((desktop) => (
                    <option key={desktop._id} value={desktop.assignedTo?.employeeName}>
                      {desktop.assignedTo?.employeeName}
                    </option>
                  ))}
              </select>

              <select
                value={searchFilters.serialNumber}
                onChange={(e) => setSearchFilters({ ...searchFilters, serialNumber: e.target.value })}
                 className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Serial Number</option>
                {desktopData.map((desktop) => (
                  <option key={desktop._id} value={desktop.serialNumber}>
                    {desktop.serialNumber}
                  </option>
                ))}
              </select>

              <select
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                 className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Location</option>
                {Array.from(new Set(desktopData.map((desktop) => desktop.location || 'N/A'))).map((location, index) => (
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
                {Array.from(new Set(desktopData.map((desktop) => desktop.division || 'N/A'))).map((division, index) => (
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
              <h3 className="text-center mb-4 font-bold" style={{ color: "#FF735C" }}>List of Desktops 🧑‍💻</h3>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Desktop ID</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Assigned To</th>
                      <th className="font-bold" style={{ color: "#FF735C" }} >Serial Number</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((desktop, index) => (
                        <tr className="hover" key={desktop._id}>
                          <td >{index + 1}</td>
                          <td>{desktop.desktopId || 'N/A'}</td>
                          <td>{desktop.assignedTo?.employeeName}</td>
                          <td>{desktop.serialNumber || 'N/A'}</td>
                          <td style={{ color: !desktop.location || desktop.location === 'N/A' ? 'red' : 'black' }}>
                            {desktop.location || 'N/A'}
                          </td>
                          <td style={{ color: !desktop.division || desktop.division === 'N/A' ? 'red' : 'black' }}>
                            {desktop.division || 'N/A'}
                          </td>
                          <td style={{ color: desktop.status === 'Available' ? 'green' : 'black' }}>
                            {desktop.status}
                          </td>
                          <td>
                            <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(desktop)}>
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No desktops available.
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

              {modalOpen && selectedDesktop && (
                <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Desktop Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>Desktop ID:</strong> {selectedDesktop.desktopId}</p>
                      <p><strong>Assigned To:</strong> {selectedDesktop.assignedTo?.employeeName || 'N/A'}</p>
                      <p><strong>Serial Number:</strong> {selectedDesktop.serialNumber || 'N/A'}</p>
                      <p><strong>Location:</strong> {selectedDesktop.location || 'N/A'}</p>
                      <p><strong>Division:</strong> {selectedDesktop.division || 'N/A'}</p>
                      <p><strong>Status:</strong> {selectedDesktop.status || 'N/A'}</p>
                      <p><strong>Description:</strong> {selectedDesktop.description || 'N/A'}</p>
                    </div>
                    <div className="modal-action">
                      <button className="custom-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
