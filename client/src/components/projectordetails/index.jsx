import { useState, useEffect, useRef } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function ProjectorDetails() {
  const [projectorData, setProjectorData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const fetchProjectorData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/projector/all`);
      if (response.status === 200) {
        setProjectorData(response.data.data.length > 0 ? response.data.data : []);
      } else {
        alert(`Error fetching projector data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching projector data:", error.message || error.response?.data);
      alert(`Error fetching projector data: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchProjectorData();
  }, []);

  const handleOpenModal = (projector) => {
    modalRef.current = projector;
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    modalRef.current = null;
  };

  const filteredProjectors = projectorData.filter((projector) => {
    const { location = "", division = "", model = "" } = searchFilters;

    const locationMatch = 
      !location || projector.location.toLowerCase().includes(location.toLowerCase().trim());

    const divisionMatch = 
      !division || projector.division.toLowerCase().includes(division.toLowerCase().trim());

    const modelMatch = 
      !model || projector.model.toLowerCase().includes(model.toLowerCase().trim());

    return locationMatch && divisionMatch && modelMatch;
  });

  const paginatedData = filteredProjectors.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredProjectors.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="p-4">
              <div className="flex justify-end gap-4 mb-4">
                {['location', 'division', 'model'].map((filter) => (
                  <select
                    key={filter}
                    onChange={(e) => setSearchFilters({ ...searchFilters, [filter]: e.target.value })}
                    className="input input-bordered input-info w-full max-w-xs"
                  >
                    <option value="">{`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}</option>
                    {projectorData
                      .map((projector) => projector[filter])
                      .filter((value, index, self) => self.indexOf(value) === index)
                      .map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                  </select>
                ))}
              </div>

              <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Projector Details</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th  className="font-bold" style={{ color: "#FF735C" }}></th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Projector Id</th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Model</th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                      <th  className="font-bold" style={{ color: "#FF735C" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((projector, index) => (
                      <tr className="hover" key={index}>
                        <td>{(page - 1) * pageSize + index + 1}</td>
                        <td>{projector.projectorId}</td>
                        <td>{projector.model}</td>
                        <td>{projector.serialNumber}</td>
                        <td style={{ color: !projector.location || projector.location === 'N/A' ? 'red' : 'black' }}>
                          {projector.location || 'N/A'}
                        </td>
                        <td style={{ color: !projector.division || projector.division === 'N/A' ? 'red' : 'black' }}>
                          {projector.division || 'N/A'}
                        </td>
                        <td style={{ color: projector.status === 'Inactive' ? 'red' : 'black' }}>
                          {projector.status}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-grey"
                            onClick={() => handleOpenModal(projector)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
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

            {modalOpen && modalRef.current && (
              <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Projector Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>Projector ID:</strong> {modalRef.current.projectorId || 'N/A'}</p>
                    <p><strong>Model:</strong> {modalRef.current.model || 'N/A'}</p>
                    <p><strong>Serial Number:</strong> {modalRef.current.serialNumber || 'N/A'}</p>
                    <p><strong>Handled By:</strong> {modalRef.current.handledBy || 'N/A'}</p>
                    <p><strong>Location:</strong> {modalRef.current.location || 'N/A'}</p>
                    <p><strong>Division:</strong> {modalRef.current.division || 'N/A'}</p>
                    <p><strong>Status:</strong> {modalRef.current.status || 'N/A'}</p>
                    <p><strong>Description:</strong> {modalRef.current.description || 'N/A'}</p>
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
