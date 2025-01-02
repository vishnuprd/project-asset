import React, { useState, useEffect, useRef } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function CctvDetails() {
  const [cctvData, setCctvData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: ""
  });
  
  const modalRef = useRef(null);
  
  const handleOpenModal = (cctv) => {
    modalRef.current = cctv;
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    modalRef.current = null; 
    setModalOpen(false);
  };

  const fetchCctvDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/cctv/all`);
      if (response.status === 200) {
        setCctvData(response.data.data);
      } else {
        console.error(`Error fetching CCTV details: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error fetching CCTV details: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCctvDetails();
  }, []);

  const filteredCctvData = cctvData.filter((cctv) => {
    const { location = "", division = "" } = searchFilters;

    const cctvLocationMatch = !location || cctv.location.toLowerCase().includes(location.toLowerCase().trim());
    const cctvDivisionMatch = !division || cctv.division.toLowerCase().includes(division.toLowerCase().trim());

    return cctvLocationMatch && cctvDivisionMatch;
  });

  const paginatedData = filteredCctvData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredCctvData.length / pageSize);

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <h3 className="text-center py-2 font-bold py-9" style={{ color: '#FF735C' }}>
                CCTV Details 📹
              </h3>

              <div className="flex justify-end gap-4 mb-4">

              <select
  name="division"
  className="input input-bordered input-info w-full max-w-xs"
  value={searchFilters.division || ''}
  onChange={(e) => setSearchFilters({ ...searchFilters, division: e.target.value })}
>
  <option value="">Select Division</option>
  {[...new Map(
    cctvData.map((option) => [option.division.toLowerCase(), option.division])
  ).values()].map((division, index) => (
    <option key={index} value={division}>
      {division}
    </option>
  ))}
</select>



  <select
    name="location"
    className="input input-bordered input-info w-full max-w-xs"
    value={searchFilters.location || ''}
    onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
  >
    <option value="">Select Location</option>
    {[...new Set(cctvData.map((option) => option.location))].map((location, index) => (
      <option key={index} value={location}>
        {location}
      </option>
    ))}
  </select>
</div>



              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>CCTV ID</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Model</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>IP Address</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((cctv, index) => (
                        <tr key={index}>
                        <td>{index + 1 + (page - 1) * pageSize}</td>
                          <td>{cctv.cctvId}</td>
                          <td>{cctv.model}</td>
                          <td>{cctv.serialNumber}</td>
                          <td>{cctv.ipAddress}</td>
                          <td style={{ color: !cctv.location || cctv.location === 'N/A' ? 'red' : 'black' }}>
                          {cctv.location || 'N/A'}
                        </td>
                        <td style={{ color: !cctv.division || cctv.division === 'N/A' ? 'red' : 'black' }}>
                          {cctv.division || 'N/A'}
                        </td>
                        <td style={{ color: cctv.status === 'Inactive' ? 'red' : 'black' }}>
                          {cctv.status}
                        </td>
                          <td>
                            <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(cctv)}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No CCTV data available.
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

              {modalOpen && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                      CCTV Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>CCTV ID:</strong> {modalRef.current?.cctvId || 'N/A'}</p>
                      <p><strong>Model:</strong> {modalRef.current?.model || 'N/A'}</p>
                      <p><strong>Serial Number:</strong> {modalRef.current?.serialNumber || 'N/A'}</p>
                      <p><strong>IP Address:</strong> {modalRef.current?.ipAddress || 'N/A'}</p>
                      <p><strong>Location:</strong> {modalRef.current?.location || 'N/A'}</p>
                      <p><strong>Division:</strong> {modalRef.current?.division || 'N/A'}</p>
                      <p><strong>Status:</strong> {modalRef.current?.status || 'N/A'}</p>
                      <p><strong>Description:</strong> {modalRef.current?.description || 'N/A'}</p>
                    </div>
                    <div className="modal-action flex justify-center">
                      <button className="custom-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                  </div>
                </dialog>
              )}
            </div>
      </div>
      </Layout>
    </div>
  );
}
