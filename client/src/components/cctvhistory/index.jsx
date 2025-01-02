import React, { useState, useEffect,  } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function CctvHistory() {
  const [cctvData, setCctvData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCctv, setCurrentCctv] = useState({});
  const [page, setPage] = useState(1);
   const [pageSize] = useState(5);
   const [searchFilters, setSearchFilters] = useState({ location: "", division: "" });



  const handleOpenModal = (cctv) => {
    setCurrentCctv(cctv);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentCctv({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCctv((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCctvDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/cctv/all`);
      if (response.status === 200) {
        setCctvData(response.data.data);
      } else {
        console.error(`Error fetching CCTV details: ${response.data.message}`);
        if (alert && typeof alert.error === 'function') {
          alert.error(`Error fetching CCTV details: ${response.data.message}`);
        }
      }
    } catch (error) {
      console.error(`Error fetching CCTV details: ${error.message}`);
      if (alert && typeof alert.error === 'function') {
        alert.error(`Error fetching CCTV details: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchCctvDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/asset/update/${currentCctv._id}`, currentCctv);
      if (response.status === 200) {
        alert.success('CCTV details updated successfully!');
        fetchCctvDetails();
        handleCloseModal();
      } else {
        console.error(`Error updating CCTV details: ${response.data.message}`);
        alert.error(`Error updating CCTV details: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error updating CCTV details: ${error.message}`);
      alert.error(`Error updating CCTV details: ${error.message}`);
    }
  };



  const filteredCctvData = cctvData.filter((cctv) => {
    const { location = "", division = "" } = searchFilters;
    return (
      (!location || cctv.location?.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || cctv.division?.toLowerCase().includes(division.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredCctvData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredCctvData.length / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));


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
                      <th>#</th>
                      <th>CCTV ID</th>
                      <th>Model</th>
                      <th>Serial Number</th>
                      <th>IP Address</th>
                      <th>Location</th>
                      <th>Division</th>
                      <th>Actions</th>
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
                          <td>{cctv.location}</td>
                          <td>{cctv.division}</td>
                          <td>
                            <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(cctv)}>
                             Edit
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
                <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box w-11/12 max-w-5xl">
                    <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                      CCTV Update
                    </h4>
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="label">CCTV ID</label>
                        <input
                          type="text"
                          name="cctvId"
                          className="input input-bordered w-full"
                          value={currentCctv.cctvId || ''}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="label">Model</label>
                        <input
                          type="text"
                          name="model"
                          className="input input-bordered w-full"
                          value={currentCctv.model || ''}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="label">Serial Number</label>
                        <input
                          type="text"
                          name="serialNumber"
                          className="input input-bordered w-full"
                          value={currentCctv.serialNumber || ''}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="label">IP Address</label>
                        <input
                          type="text"
                          name="ipAddress"
                          className="input input-bordered w-full"
                          value={currentCctv.ipAddress || ''}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="label">Location</label>
                        <input
                          type="text"
                          name="location"
                          className="input input-bordered w-full"
                          value={currentCctv.division || ''}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
  <label className="label">Division</label>
  <select
    name="division"
    className="input input-bordered w-full"
    value={currentCctv.division || ''}
    onChange={handleChange}
  >
    <option value="">Select Division</option>
    {cctvData.map((option, index) => (
      <option key={index} value={option.division || 'N/A'}>
        {option.division || 'N/A'}
      </option>
    ))}
  </select>
</div>


<div>
  <label className="label">Status</label>
  <select
    name="status"
    className="input input-bordered w-full"
    value={currentCctv.status || ''}
    onChange={handleChange}
  >
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Under Maintenance">Under Maintenance</option>
  </select>
</div>


                      <div>
                        <label className="label">Description</label>
                        <input
                          type="text"
                          name="description"
                          className="input input-bordered w-full"
                          value={currentCctv.description || ''}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-2 flex justify-between gap-4">
                                        <button type="submit" className="btn w-1/2 custom-btn">
                                            Update CCTV
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="btn w-1/2"
                                        >
                                            Close
                                        </button>
                                        </div>
                    </form>
                  </div>
                </dialog>
              )}
            </div>
          </div>
     
      </Layout>
    </div>
  );
}
