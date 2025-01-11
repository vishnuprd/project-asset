import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function TabletHistory() {
  const [tabletData, setTabletData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    model: "",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [selectedTablet, setSelectedTablet] = useState(null);
  const modelRef = useRef(null);

  const fetchTabletData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/tablet/all`);
      console.log("API Response:", response.data);
      const data = Array.isArray(response.data) ? response.data : response.data?.data;
      if (Array.isArray(data)) {
        setTabletData(data);
      } else {
        console.error("Unexpected data format:", response.data);
        setTabletData([]);
      }
    } catch (error) {
      console.error("Error fetching tablet data:", error.message || error.response?.data);
      alert(`Error fetching tablet data: ${error.response?.data?.message || error.message}`);
      setTabletData([]);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200) {
        setEmployeeData(response.data);
      } else {
        alert("Failed to load employee data.");
      }
    } catch (error) {
      console.error("Error loading employee data:", error.message || error.response?.data);
      alert("Error loading employee data.");
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchTabletData();
  }, []);

  const handleModalOpen = (tablet) => {
    modelRef.current = tablet;
    setSelectedTablet(tablet);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTablet(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTablet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const tabletId = modelRef.current._id;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/asset/tablet/update/${tabletId}`,
        selectedTablet
      );

      if (response.status === 200) {
        toast.success("Tablet updated successfully!");
        fetchTabletData();
        handleModalClose();
      } else {
        toast.error(`Error updating tablet: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Error updating tablet: ${error.response?.data?.message || error.message}`);
    }
  };

  const filteredTablets = Array.isArray(tabletData)
    ? tabletData.filter((tablet) => {
        const { location, division, model } = searchFilters;
        const locationMatch =
          !location || tablet.location.toLowerCase().includes(location.toLowerCase().trim());
        const divisionMatch =
          !division || tablet.division.toLowerCase().includes(division.toLowerCase().trim());
        const modelMatch =
          !model || tablet.model.toLowerCase().includes(model.toLowerCase().trim());
        return locationMatch && divisionMatch && modelMatch;
      })
    : [];

  const paginatedData = filteredTablets.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredTablets.length / pageSize);

  const handlePreviousPage = () => page > 1 && setPage((prevPage) => prevPage - 1);
  const handleNextPage = () => page < totalPages && setPage((prevPage) => prevPage + 1);

  const isHandledByDisabled = selectedTablet && ["Lost", "Scrap", "Available"].includes(selectedTablet.status);

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
            Tablet History
          </h3>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tablet ID</th>
                  <th>Model</th>
                  <th>Serial Number</th>
                  <th>Location</th>
                  <th>Division</th>
                  <th>Handled By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((tablet, index) => (
                  <tr className="hover" key={index}>
                    <td>{(page - 1) * pageSize + index + 1}</td>
                    <td>{tablet.tabletId}</td>
                    <td>{tablet.model}</td>
                    <td>{tablet.serialNumber}</td>
                    <td>{tablet.location}</td>
                    <td>{tablet.division}</td>
                    <td>{tablet.handledBy}</td>
                    <td>
                      <button className="btn btn-sm btn-grey" onClick={() => handleModalOpen(tablet)}>
                        Edit
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

          {modalOpen && selectedTablet && (
            <dialog className="modal modal-bottom sm:modal-middle" open>
              <div className="modal-box">
              <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                  Update Tablet / Tablet History
                </h4>
                <form onSubmit={handleUpdate}>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Tablet ID (Read-only) */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Tablet ID</span>
                      </label>
                      <input
                        type="text"
                        name="tabletId"
                        value={selectedTablet.tabletId || ''}
                        readOnly
                        className="input input-bordered"
                      />
                    </div>

                    {/* Handled By */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Handled By</span>
                      </label>
                      <select
                        name="handledBy"
                        value={selectedTablet.handledBy || ''}
                        onChange={handleInputChange}
                        className="select select-bordered"
                        disabled={isHandledByDisabled}
                      >
                        <option value="">Select Employee</option>
                        {employeeData.map((employee, index) => (
                          <option key={index} value={`${employee.employeeId} - ${employee.employeeName}`}>
                            {employee.employeeId} - {employee.employeeName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Model */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Model</span>
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={selectedTablet.model || ''}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>

                   
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Brand</span>
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={selectedTablet.brand || ''}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>

                 
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Serial Number</span>
                      </label>
                      <input
                        type="text"
                        name="serialNumber"
                        value={selectedTablet.serialNumber || ''}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>

                  
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={selectedTablet.location || ''}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>

                  
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Status</span>
                      </label>
                      <select
                        name="status"
                        value={selectedTablet.status || ''}
                        onChange={handleInputChange}
                        className="select select-bordered"
                      >
                        <option value="">Select Status</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Lost">Lost</option>
                        <option value="Scrap">Scrap</option>
                        <option value="Available">Available</option>
                      </select>
                    </div>

                   
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Division</span>
                      </label>
                      <select
                        name="division"
                        value={selectedTablet.division || ''}
                        onChange={handleInputChange}
                        className="select select-bordered"
                      >
                        <option value="">Select Division</option>
                        {Array.from(new Set(tabletData.map((tablet) => tablet.division))).map(
                          (division, index) => (
                            <option key={index} value={division}>
                              {division}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={selectedTablet.description || ''}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>
                  </div>

                  <div className="modal-action flex justify-center">
                    <button className="custom-btn" type="submit">
                      Save
                    </button>
                    <button
                      className="btn btn-grey"
                      type="button"
                      onClick={handleModalClose}
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
  );
}
