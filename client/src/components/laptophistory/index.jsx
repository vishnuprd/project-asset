import React, { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function LaptopHistory() {
  const [laptops, setLaptops] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [formData, setFormData] = useState({
    ram: "",
    processor: "",
    storage: "",
    ssdStorage: "",
    location: "",
    version: "",
    division: "",
    status: "",
    assignedTo: "",
    description: "",
  });
  const [oldFormData, setOldFormData] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    laptopId: "",
    assignedTo: "",
    serialNumber: "",
    location: "",
    division: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const statusOptions = ["Assigned", "Lost", "Scrap", "Available"];
  const divisionOptions = [
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
    "Lenatural",
    "Govt.school project",
    "Others",
  ];

  const handleOpenModal = (laptop) => {
    setSelectedLaptop(laptop);
    setFormData({
      ram: laptop.ram || "",
      processor: laptop.processor || "",
      storage: laptop.storage || "",
      ssdStorage: laptop.ssdStorage || "",
      location: laptop.location || "",
      version: laptop.version || "",
      division: laptop.division || "",
      status: laptop.status || "",
      assignedTo: laptop.assignedTo?._id || "",
      description: laptop.description || "",
    });
    setOldFormData({
      ram: laptop.ram || "",
      processor: laptop.processor || "",
      storage: laptop.storage || "",
      ssdStorage: laptop.ssdStorage || "",
      location: laptop.location || "",
      version: laptop.version || "",
      division: laptop.division || "",
      status: laptop.status || "",
      assignedTo: laptop.assignedTo?.employeeId
        ? `${laptop.assignedTo.employeeId} - ${laptop.assignedTo.employeeName}`
        : "N/A",
      description: laptop.description || "",
    });
    document.getElementById("my_modal_4").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("my_modal_4").close();
    setSelectedLaptop(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/asset/laptop/${selectedLaptop._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Laptop updated successfully");
        fetchLaptops();
        handleCloseModal();
      } else {
        toast.error(`Error updating laptop: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error during update:", error.response ? error.response.data : error.message);
      toast.error(`Error updating laptop: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchLaptops();
    fetchEmployeeData();
  }, []);

  const fetchLaptops = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/asset/laptop/all`
      );
      if (response.status === 200) {
        setLaptops(response.data);
      } else {
        alert(`Error fetching laptops: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error fetching laptops: ${error.message}`);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/employee`
      );
      if (response.status === 200) {
        setEmployeeData(response.data);
      } else {
        console.error("Error fetching employees:", response.data.message || response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching employees:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filteredLaptops = laptops.filter((laptop) => {
    const { laptopId, assignedTo, serialNumber, location, division, status } = searchFilters;

    const laptopIdMatch = !laptopId || laptop.laptopId.toLowerCase().includes(laptopId.toLowerCase().trim());
    const assignedToMatch =
      !assignedTo ||
      (laptop.assignedTo?.employeeName || "No employee assigned")
        .toLowerCase()
        .includes(assignedTo.toLowerCase().trim());
    const serialNumberMatch = !serialNumber || laptop.serialNumber.toLowerCase().includes(serialNumber.toLowerCase().trim());
    const locationMatch = !location || (laptop.location || "N/A").toLowerCase().includes(location.toLowerCase().trim());
    const divisionMatch = !division || (laptop.division || "N/A").toLowerCase().includes(division.toLowerCase().trim());
    const statusMatch = !status || laptop.status.toLowerCase().includes(status.toLowerCase().trim());

    return laptopIdMatch && assignedToMatch && serialNumberMatch && locationMatch && divisionMatch && statusMatch;
  });

  const paginatedData = filteredLaptops.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredLaptops.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex justify-end gap-4 mb-4">
            {["laptopId", "assignedTo", "serialNumber", "location", "division", "status"].map((filter) => (
              <select
                key={filter}
                value={searchFilters[filter]}
                onChange={(e) => setSearchFilters({ ...searchFilters, [filter]: e.target.value })}
                className="input input-bordered input-info w-full max-w-xs"
              >
                <option value="">{filter}</option>
                {filter === "assignedTo"
                  ? employeeData.map((employee) => (
                      <option key={employee._id} value={employee.employeeName}>
                        {employee.employeeId} - {employee.employeeName}
                      </option>
                    ))
                  : filter === "status"
                  ? statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  : Array.from(new Set(laptops.map((laptop) => laptop[filter] || "N/A"))).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
              </select>
            ))}
          </div>

          <h3 className="text-center font-bold" style={{ color: "#FF735C" }}>
            Laptop History / Update Laptop 📑
          </h3>
          <div className="overflow-x-auto py-9">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold" style={{ color: "#FF735C" }}>S.No</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Laptop ID</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Assigned To</th>
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
                      <td>{(page - 1) * pageSize + index + 1}</td>
                      <td>{laptop.laptopId}</td>
                      <td>{laptop.assignedTo?.employeeName || "No employee assigned"}</td>
                      <td style={{ color: !laptop.location || laptop.location === "N/A" ? "red" : "black" }}>
                        {laptop.location || "N/A"}
                      </td>
                      <td style={{ color: !laptop.division || laptop.division === "N/A" ? "red" : "black" }}>
                        {laptop.division || "N/A"}
                      </td>
                      <td style={{ color: laptop.status === "Available" ? "green" : "black" }}>
                        {laptop.status}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(laptop)}>
                          Edit
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

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
              Update Laptop Details
            </h4>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData).map((key) => (
                  <div key={key}>
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    {key === "assignedTo" ? (
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
                    ) : key === "status" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : key === "division" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      >
                        <option value="">Select Division</option>
                        {divisionOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
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
                          (Old: {oldFormData[key] || "N/A"})
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
                <button type="button" className="custom-btn" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </Layout>
  );
}
