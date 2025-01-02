import { useRef, useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function PrinterHistory() {
  const [printerData, setprinterData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    model: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const modalRef = useRef(null);

  const fetchprinterData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/printer/all`);
      if (response.status === 200) {
        setprinterData(Array.isArray(response.data) ? response.data : []);
      } else {
        alert(`Error fetching printer data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching printer data:", error.message || error.response?.data);
      alert(`Error fetching printer data: ${error.response?.data?.message || error.message}`);
    }
  };
  

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && response.data.length > 0) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data.map((employee) => `${employee.employeeId} - ${employee.employeeName}`)
        );
      } else {
        console.error("Error fetching employee data:", response.data.message || response.data);
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.response ? error.response.data : error.message);
      setEmployeeData([]);
    }
  };

  const handleUpdatePrinter = async (e) => {
    e.preventDefault();
    try {
      const printerId = modalRef.current._id;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/asset/printer/update/${printerId}`,
        printerData
      );

      if (response.status === 200) {
        console.log("Printer updated successfully:", response.data);
        alert("Printer updated successfully!");
        fetchprinterData();
        handleCloseModal();
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Error updating printer. Please try again.");
      }
    } catch (error) {
      console.error("Error updating printer:", error.response ? error.response.data : error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleOpenModal = (printer) => {
    modalRef.current = printer;
    setprinterData(printer);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    modalRef.current = null;
    setprinterData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setprinterData({
      ...printerData,
      [name]: value,
    });
  };

  const isHandledByDisabled = ["Inactive", "Scrap", "Available"].includes(printerData.status);

  useEffect(() => {
    fetchprinterData();
    fetchEmployeeData();
  }, []);

  const filteredPrinters = Array.isArray(printerData) ? printerData.filter((printer) => {
    const { location = "", division = "", model = "" } = searchFilters;
  
    const locationMatch =
      !location || printer.location.toLowerCase().includes(location.toLowerCase().trim());
    const divisionMatch =
      !division || printer.division.toLowerCase().includes(division.toLowerCase().trim());
    const modelMatch =
      !model || printer.model.toLowerCase().includes(model.toLowerCase().trim());
  
    return locationMatch && divisionMatch && modelMatch;
  }) : [];
  

  const paginatedData = filteredPrinters.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredPrinters.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="p-4">
            <div className="flex justify-end gap-4 mb-4">
              {["location", "division", "model"].map((filter) => (
                <select
                  key={filter}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, [filter]: e.target.value })
                  }
                  className="input input-bordered input-info w-full max-w-xs"
                >
                 <option value="">
  {`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
</option>
{Array.isArray(printerData) && printerData
  .map((printer) => printer[filter]) 
  .filter((value, index, self) => self.indexOf(value) === index) 
  .map((value, index) => (
    <option key={index} value={value}>
      {value}
    </option>
  ))}
                </select>
              ))}
            </div>
  
            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
              Update Printer Details
            </h3>
  
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Printer Id</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Model</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {paginatedData.map((printer, index) => (
                    <tr className="hover" key={index}>
                    <td>{(page - 1) * pageSize + index + 1}</td>
                      <td>{printer.printerId}</td>
                      <td>{printer.model}</td>
                      <td>{printer.serialNumber}</td>
                      <td>{printer.location}</td>
                      <td>{printer.division}</td>
                      <td>
                          <button
                            className="btn btn-sm btn-grey"
                            onClick={() => handleOpenModal(printer)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
  
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                className="custom-btn"
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className="custom-btn"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
  
          {modalOpen && printerData && (
            <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                  Printer Details
                </h4>
                <form onSubmit={handleUpdatePrinter}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Printer Id</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Printer Id"
                        className="input input-bordered"
                        name="printerId"
                        value={printerData.printerId || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Model</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Model"
                        className="input input-bordered"
                        name="model"
                        value={printerData.model || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Serial Number</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Serial Number"
                        className="input input-bordered"
                        name="serialNumber"
                        value={printerData.serialNumber || ""}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-control">
  <label className="label">
    <span className="label-text">Handled By</span>
  </label>
  <select
    className="input input-bordered"
    name="handledBy"
    value={printerData.handledBy || ""}
    onChange={handleInputChange}
    disabled={isHandledByDisabled} 
  >
    <option value="">Select Handled By</option>
    {employeeData.map((item) => (
      <option key={item._id} value={`${item.employeeName} - ${item.employeeId}`}>
        {item.employeeName} - {item.employeeId}
      </option>
    ))}
  </select>
</div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Location"
                        className="input input-bordered"
                        name="location"
                        value={printerData.location || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Division</span>
                      </label>
                      <select
                        className="input input-bordered"
                        value={printerData.division || ""}
                        onChange={handleInputChange}
                        name="division"
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
                          "Lenatural",
                          "Govt.school Project",
                          "Others",
                        ].map((division, index) => (
                          <option key={index} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Status</span>
                      </label>
                      <select
                        className="input input-bordered"
                        name="status"
                        value={printerData.status || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Scrap">Scrap</option>
                        <option value="Available">Available</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Description"
                        className="input input-bordered"
                        name="description"
                        value={printerData.description || ""}
                        onChange={handleInputChange}
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
                      onClick={handleCloseModal}
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
  </>
  
  );
}
