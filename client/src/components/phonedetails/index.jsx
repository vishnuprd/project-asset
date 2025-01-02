import { useState, useEffect, useRef } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function PhoneDetails() {
  const [phoneData, setPhoneData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const fetchPhoneData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/phone/all`);
      if (response.status === 200) {
        setPhoneData(response.data);
      } else {
        alert(`Error fetching phone data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching phone data:", error.message || error.response?.data);
      alert(`Error fetching phone data: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchPhoneData();
  }, []);

  const handleOpenModal = (phone) => {
    modalRef.current = phone;
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    modalRef.current = null;
  };

  const filteredPhones = phoneData.filter((phone) => {
    const { location = "", division = "", model = "" } = searchFilters;

    const locationMatch =
      !location || phone.location.toLowerCase().includes(location.toLowerCase().trim());

    const divisionMatch =
      !division || phone.division.toLowerCase().includes(division.toLowerCase().trim());

    const modelMatch =
      !model || phone.model.toLowerCase().includes(model.toLowerCase().trim());

    return locationMatch && divisionMatch && modelMatch;
  });

  const paginatedData = filteredPhones.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPhones.length / pageSize);

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
            <div className="flex justify-end gap-4 mb-4">
              {['location', 'division', 'model'].map((filter) => (
                <select
                  key={filter}
                  onChange={(e) => setSearchFilters({ ...searchFilters, [filter]: e.target.value })}
                  className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">{`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}</option>
                  {phoneData
                    .map((phone) => phone[filter])
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                </select>
              ))}
            </div>

            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
              Phone Details
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-bold" style={{ color: "#FF735C" }}></th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Phone ID</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Brand</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Model</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((phone, index) => (
                    <tr className="hover" key={index}>
                      <td>{(page - 1) * pageSize + index + 1}</td>
                      <td>{phone.phoneId}</td>
                      <td>{phone.brand}</td>
                      <td>{phone.model}</td>
                      <td>{phone.serialNumber}</td>
                      <td>{phone.location}</td>
                      <td>{phone.division}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-grey"
                          onClick={() => handleOpenModal(phone)}
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
                <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Phone Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Phone ID:</strong> {modalRef.current.phoneId || 'N/A'}</p>
                  <p><strong>Brand:</strong> {modalRef.current.brand || 'N/A'}</p>
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
      </Layout>
    </div>
  );
}
