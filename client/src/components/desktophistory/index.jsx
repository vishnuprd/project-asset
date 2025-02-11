import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function DesktopHistory() {
  const [desktops, setDesktops] = useState([]);
  const [selectedDesktop, setSelectedDesktop] = useState(null);
  const [formData, setFormData] = useState({
    ram: '',
    processor: '',
    storage: '',
    ssdStorage: '',
    location: '',
    version: '',
    division: '',
    status: '',
    assignedTo: '',
    description: '',
  });
  const [oldFormData, setOldFormData] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchFilters, setSearchFilters] = useState({
    desktopId: '',
    assignedTo: '',
    serialNumber: '',
    location: '',
    division: '',
    status: '',
  });

  const statusOptions = ["Assigned", "Lost", "Scrap", "Available"];
  const divisionOptions = [
    "Lamination", "Processing", "Garments", "Coating", "Bags",
    "EBO-Coimbatore", "EBO-Chennai", "Abirami-Eco-Plast",
    "Non-Woven(Garments-2)", "Head-office", "Spinning",
    "Fine-Garments(Garments-3)", "Firebird College", "Vedhanayagam Hospital",
    "LeNatural", "Govt.School Project", "Others",
  ];

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const fetchDesktops = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/desktop/all`);
      if (response.status === 200) {
        setDesktops(response.data);
      } else {
        alert(`Error fetching desktops: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error fetching desktops: ${error.message}`);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200) {
        setEmployeeData(response.data);
      } else {
        console.error('Error fetching employees:', response.data.message || response.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error.response ? error.response.data : error.message);
    }
  };

  const handleOpenModal = (desktop) => {
    setSelectedDesktop(desktop);
    setFormData({
      ram: desktop.ram || '',
      processor: desktop.processor || '',
      storage: desktop.storage || '',
      ssdStorage: desktop.ssdStorage || '',
      location: desktop.location || '',
      version: desktop.version || '',
      division: desktop.division || '',
      status: desktop.status || '',
      assignedTo: desktop.assignedTo?._id || '',
      description: desktop.description || '',
    });

    setOldFormData({
      ram: desktop.ram || '',
      processor: desktop.processor || '',
      storage: desktop.storage || '',
      ssdStorage: desktop.ssdStorage || '',
      location: desktop.location || '',
      version: desktop.version || '',
      division: desktop.division || '',
      status: desktop.status || '',
      assignedTo: desktop.assignedTo?.employeeId
        ? `${desktop.assignedTo.employeeId} - ${desktop.assignedTo.employeeName}`
        : 'N/A',
      description: desktop.description || '',
    });

    document.getElementById('my_modal_4').showModal();
  };

  const handleCloseModal = () => {
    document.getElementById('my_modal_4').close();
    setSelectedDesktop(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/asset/desktop/${selectedDesktop._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success('Desktop updated successfully');
        fetchDesktops();
        handleCloseModal();
      } else {
        toast.error(`Error updating desktop: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error during update:', error.response ? error.response.data : error.message);
      toast.error(`Error updating desktop: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchDesktops();
    fetchEmployeeData();
  }, []);

  const filteredDesktops = desktops.filter((desktop) => {
    const { desktopId, assignedTo, serialNumber, location, division, status } = searchFilters;

    const desktopIdMatch = !desktopId || desktop.desktopId.toLowerCase().includes(desktopId.toLowerCase().trim());
    const assignedToMatch =
      !assignedTo || (desktop.assignedTo?.employeeName || 'No employee assigned').toLowerCase().includes(assignedTo.toLowerCase().trim());
    const serialNumberMatch = !serialNumber || desktop.serialNumber.toLowerCase().includes(serialNumber.toLowerCase().trim());
    const locationMatch = !location || (desktop.location || 'N/A').toLowerCase().includes(location.toLowerCase().trim());
    const divisionMatch = !division || (desktop.division || 'N/A').toLowerCase().includes(division.toLowerCase().trim());
    const statusMatch = !status || desktop.status.toLowerCase().includes(status.toLowerCase().trim());

    return desktopIdMatch && assignedToMatch && serialNumberMatch && locationMatch && divisionMatch && statusMatch;
  });

  const paginatedData = filteredDesktops.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredDesktops.length / pageSize);

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="p-4">
              <div className="flex justify-end gap-4 mb-4">
                {['desktopId', 'assignedTo', 'serialNumber', 'location', 'division', 'status'].map((filter) => (
                  <select
                    key={filter}
                    value={searchFilters[filter]}
                    onChange={(e) => setSearchFilters({ ...searchFilters, [filter]: e.target.value })}
                    className="input input-bordered input-info w-full max-w-xs"
                  >
                    <option value="">{filter}</option>
                    {filter === 'assignedTo' ? (
                      desktops
                        .filter((desktop) => desktop.assignedTo?.employeeName)
                        .map((desktop) => (
                          <option key={desktop._id} value={desktop.assignedTo?.employeeName}>
                            {desktop.assignedTo?.employeeName}
                          </option>
                        ))
                    ) : filter === 'status' ? (
                      statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))
                    ) : filter === 'division' ? (
                      divisionOptions.map((division) => (
                        <option key={division} value={division}>
                          {division}
                        </option>
                      ))
                    ) : (
                      Array.from(new Set(desktops.map((desktop) => desktop[filter] || 'N/A'))).map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))
                    )}
                  </select>
                ))}
              </div>

              <h3 className="text-center font-bold" style={{ color: "#FF735C" }}>Desktop History / Update Desktop 📑</h3>
              <div className="overflow-x-auto py-9">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-bold" style={{ color: "#FF735C" }}>S.No</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Desktop ID</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Assigned To</th>
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
                          <td>{(page - 1) * pageSize + index + 1}</td>
                          <td>{desktop.desktopId}</td>
                          <td>{desktop.assignedTo?.employeeName || 'No employee assigned'}</td>
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
                        <td colSpan="6" className="text-center">
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
            </div>

            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Update Desktop Details</h4>
                <form onSubmit={handleUpdate}>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(formData).map((key) => (
                      <div key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        {key === 'assignedTo' ? (
                          <div className="flex justify-between">
                            <select
                              name={key}
                              value={formData[key]}
                              onChange={handleInputChange}
                              className="input input-bordered w-full"
                            >
                              <option value="">Select Employee</option>
                              {employeeData.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                  {employee.employeeId} - {employee.employeeName}
                                </option>
                              ))}
                            </select>
                            <span className="text-sm text-gray-500">
                              (Old: {oldFormData[key] || 'N/A'})
                            </span>
                          </div>
                        ) : key === 'status' || key === 'division' ? (
                          <div className="flex justify-between">
                            <select
                              name={key}
                              value={formData[key]}
                              onChange={handleInputChange}
                              className="input input-bordered w-full"
                            >
                              <option value="">Select {key}</option>
                              {(key === 'status' ? statusOptions : divisionOptions).map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <span className="text-sm text-gray-500">
                              (Old: {oldFormData[key] || 'N/A'})
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <input
                              type="text"
                              name={key}
                              value={formData[key]}
                              onChange={handleInputChange}
                              className="input input-bordered w-full"
                            />
                            <span className="text-sm text-gray-500">
                              (Old: {oldFormData[key] || 'N/A'})
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="modal-action justify-center">
                    <button type="submit" className="custom-btn">
                      Update
                    </button>
                    <button type="button" className="btn" onClick={handleCloseModal}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </Layout>
    </div>
  );
}
