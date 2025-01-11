import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from "../layout/layout.js";
import { ToastContainer, toast } from 'react-toastify';

export default function DongleHistory() {
  const [dongleData, setDongleData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [employeeData, setEmployeeData] = useState([]);
  const [modalFormData, setModalFormData] = useState({
    dongleId: '',
    handledBy: '',
    status: '',
    location: '',
    division: '',
    description: '',
    serialNumber: ''
  });
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200) {
        setEmployeeData(response.data);
      } else {
        alert("Failed to load data.");
      }
    } catch (error) {
      alert("Error loading data.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDongleData();
    fetchData();
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
    setModalFormData({
      dongleId: dongle.dongleId || '',
      handledBy: dongle.handledBy || '',
      status: dongle.status || '',
      location: dongle.location || '',
      division: dongle.division || '',
      description: dongle.description || '',
      serialNumber: dongle.serialNumber || ''
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'handledBy' && value) {
      const [employeeId, employeeName] = value.split('-');
      setModalFormData((prevState) => ({
        ...prevState,
        [name]: value,
        handledById: employeeId,
        handledByName: employeeName
      }));
    } else {
      setModalFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const isHandledByDisabled = ["Lost", "Scrap", "Available"].includes(modalFormData.status);


 const handleUpdate = async (e) => {
  e.preventDefault();

  if (!modalFormData.dongleId) {
    toast.success("Dongle ID is required");
    return;
  }

  if (!modalFormData.status) {
    toast.error("Status is required");
    return;
  }

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/asset/update/${modalFormData.dongleId}`,
      modalFormData
    );

    if (response.status === 200) {
      toast.success("Dongle details updated successfully!");
      fetchDongleData();  
      handleCloseModal(); 
    } else {
      console.error(`Error updating dongle details: ${response.data.message}`);
      toast.error(`Error updating dongle details: ${response.data.message}`);
    }
  } catch (error) {
    console.error(`Error updating dongle details: ${error.message}`);
    toast.error(`Error updating dongle details: ${error.message}`);
  }
};


  
  
  

  return (
    <>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="flex justify-end gap-4 mb-4">
              <select
                value={searchFilters.handledBy || ''}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    handledBy: e.target.value
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
                    location: e.target.value
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
                    division: e.target.value
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
                    <th className="font-bold" style={{ color: '#FF735C' }}>#</th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>Dongle ID</th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>Handled By</th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>Serial Number</th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>Location</th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>Division</th>
                    <th className="font-bold" style={{ color: '#FF735C' }}>Action</th>
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
                        <td>{dongle.location}</td>
                        <td>{dongle.division}</td>
                        <td>
                          <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(dongle)}>
                            Edit
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
                    Dongle History / Dongle Update
                  </h4>
                  <form className="grid grid-cols-2 gap-4" onSubmit={handleUpdate}>
                    <div className="col-span-2">
                      <label className="label">
                        <span className="label-text">Dongle ID</span>
                      </label>
                      <input
                        type="text"
                        value={modalFormData.dongleId}
                        className="input input-bordered w-full"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Handled By</span>
                      </label>
                      <select
                        name="handledBy"
                        value={modalFormData.handledBy}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        disabled={isHandledByDisabled}
                      >
                        <option value="">Select Handled By</option>
                        {employeeData.map((employee) => (
                          <option key={employee.employeeId} value={`${employee.employeeId}-${employee.employeeName}`}>
                            {employee.employeeId} - {employee.employeeName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Status</span>
                      </label>
                      <select
                        name="status"
                        value={modalFormData.status}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      >
                        <option value="">Select Status</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Lost">Lost</option>
                        <option value="Scrap">Scrap</option>
                        <option value="Available">Available</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        value={modalFormData.location}
                        onChange={handleInputChange}
                        name="location"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Division</span>
                      </label>
                      <select
                        name="division"
                        value={modalFormData.division}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      >
                        <option value="">Select Division</option>
                        {[
                          "Lamination",
                          "Processing",
                          "Garments",
                          "Coating",
                          "Bags",
                          "EBO-Coimbatore",
                          "EBO-Chennai",
                          "Abirami-Eco-Plast",
                          "Non-Oven(Garments-2)",
                          "Head-office",
                          "Spinning",
                          "Fine-Garments(Garments-3)",
                          "Fire-bird",
                          "Vedhanayagam Hospital",
                          "LeNatural",
                          "Govt. School Project",
                          "Others",
                        ].map((division, index) => (
                          <option key={index} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <input
                        value={modalFormData.description}
                        onChange={handleInputChange}
                        name="description"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Serial Number</span>
                      </label>
                      <input
                        type="text"
                        value={modalFormData.serialNumber}
                        onChange={handleInputChange}
                        name="serialNumber"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="col-span-2 flex justify-between gap-4">
                      <button type="submit" className="btn w-1/2 custom-btn">Save</button>
                      <button type="button" className="btn w-1/2 custom-btn" onClick={handleCloseModal}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
