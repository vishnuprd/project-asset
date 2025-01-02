import { useState, useEffect, useRef } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function DongleDetails() {
  const [dongleData, setDongleData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const modalRef = useRef(null);

  const fetchDongleData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/dongle/all`);
      console.log(response.data);
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

  const filteredDongle = Array.isArray(dongleData)
    ? dongleData.filter((dongle) => {
        const { handledBy = "", location = "", division = "" } = searchFilters;

        const handledByMatch =
          !handledBy || (dongle.handledBy || 'N/A').toLowerCase().includes(handledBy.toLowerCase().trim());

        const locationMatch =
          !location || (dongle.location || 'N/A').toLowerCase().includes(location.toLowerCase().trim());

        const divisionMatch =
          !division || (dongle.division || 'N/A').toLowerCase().includes(division.toLowerCase().trim());

        return handledByMatch && locationMatch && divisionMatch;
      })
    : [];

  const totalPages = Math.ceil(filteredDongle.length / pageSize);
  const paginatedData = filteredDongle.slice((page - 1) * pageSize, page * pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (dongle) => {
    setModalOpen(true);
    modalRef.current = dongle;
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    modalRef.current = null;
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="flex justify-end gap-4 mb-4">
              <select
                value={searchFilters.handledBy || ''}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    handledBy: e.target.value,
                  })
                }
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Handled By</option>
                {Array.from(new Set(dongleData.map((dongle) => dongle.handledBy || 'N/A'))).map((handledBy, index) => (
                  <option key={index} value={handledBy}>
                    {handledBy}
                  </option>
                ))}
              </select>

              <select
                value={searchFilters.location || ''}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    location: e.target.value,
                  })
                }
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Location</option>
                {Array.from(new Set(dongleData.map((dongle) => dongle.location || 'N/A'))).map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={searchFilters.division || ''}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    division: e.target.value,
                  })
                }
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">Division</option>
                {Array.from(new Set(dongleData.map((dongle) => dongle.division || 'N/A'))).map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            <h3 className="text-center font-bold" style={{ color: '#FF735C' }}>
              Dongle Details
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      #
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Dongle ID
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Handled By
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Serial Number
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Location
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Division
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Status
                    </th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((dongle, index) => (
                      <tr key={dongle.dongleId}>
                        <td>{index + 1 + (page - 1) * pageSize}</td>
                        <td>{dongle.dongleId}</td>
                        <td>{dongle.handledBy}</td>
                        <td>{dongle.serialNumber}</td>
                        <td style={{ color: !dongle.location || dongle.location === 'N/A' ? 'red' : 'black' }}>
                          {dongle.location || 'N/A'}
                        </td>
                        <td style={{ color: !dongle.division || dongle.division === 'N/A' ? 'red' : 'black' }}>
                          {dongle.division || 'N/A'}
                        </td>
                        <td style={{ color: dongle.status === 'Available' ? 'green' : 'black' }}>
                          {dongle.status}
                        </td>
                       
                        
                        <td>
                          <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(dongle)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No dongle data available</td>
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

            {modalOpen && (
              <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h4 className="text-center font-bold" style={{ color: '#FF735C' }}>
                    Dongle Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>Dongle ID:</strong> {modalRef.current?.dongleId || 'N/A'}</p>
                    <p><strong>Handled By:</strong> {modalRef.current?.handledBy || 'N/A'}</p>
                    <p><strong>Brand:</strong> {modalRef.current?.brand || 'N/A'}</p>
                    <p><strong>Model:</strong> {modalRef.current?.model || 'N/A'}</p>
                    <p><strong>Serial Number:</strong> {modalRef.current?.serialNumber || 'N/A'}</p>
                    <p><strong>Status:</strong> {modalRef.current?.status || 'N/A'}</p>
                    <p><strong>Location:</strong> {modalRef.current?.location || 'N/A'}</p>
                    <p><strong>Division:</strong> {modalRef.current?.division || 'N/A'}</p>
                    <p><strong>Description:</strong> {modalRef.current?.description || 'N/A'}</p>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn" onClick={handleCloseModal}>
                        Close
                      </button>
                    </form>
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
