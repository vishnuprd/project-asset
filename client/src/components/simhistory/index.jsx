import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../layout/layout.js";
import { ToastContainer, toast } from 'react-toastify';

export default function SimHistory() {
  const [SimData, setSimData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSim, setSelectedSim] = useState(null);
  const modalRef = useRef(null);
    const [searchFilters, setSearchFilters] = useState({});
const [page, setPage] = useState(1);
    const pageSize = 5;

  useEffect(() => {
    fetchSimData();
    fetchEmployeeData();
  }, []);

  const fetchSimData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/sim-card/all`);
      if (response.status === 200) setSimData(response.data.data);
    } catch (error) {
      console.error("Error fetching SIM data:", error.message || error.response?.data);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setEmployeeData(response.data);
      } else {
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setEmployeeData([]);
    }
  };

  const handleOpenModal = (sim) => {
    setSelectedSim(sim);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSim(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSim((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateRouter = async (e) => {
    e.preventDefault();
    if (!selectedSim || !selectedSim._id) {
      toast.error('Router ID is missing.');
      return;
    }
    try {
      const simId = selectedSim._id;
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/asset/sim-card/update/${simId}`;
      const response = await axios.put(apiUrl, selectedSim);
      if (response.status === 200) {
        toast.success('SIM updated successfully!');
        fetchSimData();
        handleCloseModal();
      } else {
        toast.error(`Error updating SIM: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating SIM:', error.response ? error.response.data : error.message);
      toast.error(`Error updating SIM: ${error.response?.data?.message || error.message}`);
    }
  };



  const filteredRoutes = SimData.filter((simCard) => {
    const { location = "", division = "", handledBy = "" } = searchFilters;

    const LocationMatch =
        !location || simCard.location.toLowerCase().includes(location.toLowerCase().trim());

    const DivisionMatch =
        !division || simCard.division.toLowerCase().includes(division.toLowerCase().trim());

    const handledByMatch =
        !handledBy || simCard.handledBy.toLowerCase().includes(handledBy.toLowerCase().trim());

    return LocationMatch && DivisionMatch && handledByMatch;
});

const paginatedData = filteredRoutes.slice((page - 1) * pageSize, page * pageSize);
const totalPages = Math.ceil(filteredRoutes.length / pageSize);

const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
};

const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
};

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
         
        <div className="flex justify-end gap-4 mb-4">
                            {["location", "division", "handledBy"].map((filter) => (
                                <select
                                    key={filter}
                                    onChange={(e) =>
                                        setSearchFilters({ ...searchFilters, [filter]: e.target.value })
                                    }
                                    className="input input-bordered input-info w-full max-w-xs"
                                >
                                    <option value="">{`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}</option>
                                    {Array.isArray(SimData) && SimData
                                        .map((simCard) => simCard[filter])
                                        .filter((value, index, self) => self.indexOf(value) === index)
                                        .map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                </select>
                            ))}
                        </div>
         
         
         
         
          <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>SIM History</h3>
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th>#</th>
                  <th>SIM Card ID</th>
                  <th>Network Operator</th>
                  <th>Assigned To</th>
                  <th>Location</th>
                  <th>Division</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((sim, index) => (
                  <tr key={sim.simId} className="hover:bg-gray-100">
                    <td>{index + 1}</td>
                    <td>{sim.simCardId}</td>
                    <td>{sim.networkName}</td>
                    <td>{sim.handledBy}</td>
                    <td>{sim.location}</td>
                    <td>{sim.division}</td>
                    <td className={sim.status === "Inactive" ? "text-red-500" : "text-black"}>{sim.status}</td>
                    <td>
                      <button className="btn btn-sm btn-gray-500" onClick={() => handleOpenModal(sim)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         
          <div className="flex justify-between mt-4">
                            <button className="custom-btn" onClick={handlePreviousPage}>Previous</button>
                            <span>Page {page} of {totalPages}</span>
                            <button className="custom-btn" onClick={handleNextPage}>Next</button>
                        </div>
                        </div>

          {modalOpen && selectedSim && (
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle" open>
              <div className="modal-box">
          <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Update SIM History</h3>
                
                <form onSubmit={handleUpdateRouter}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="flex flex-col">
                      <label>SIM ID:</label>
                      <input type="text" name="simId" value={selectedSim.simCardId} className="input input-bordered"  />
                    </div>

                    <div className="flex flex-col">
                      <label>Network Operator:</label>
                      <input type="text" name="networkName" value={selectedSim.networkName} onChange={handleInputChange} className="input input-bordered" />
                    </div>

                    <div className="flex flex-col">
                      <label>Handled By:</label>
                      <select name="handledBy" value={selectedSim.handledBy || ""} onChange={handleInputChange} className="input input-bordered w-full">
                        <option value="">Select Handled By</option>
                        {employeeData.map((employee) => (
                          <option key={employee.employeeId} value={`${employee.employeeId}-${employee.employeeName}`}>{employee.employeeId} - {employee.employeeName}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label>Location:</label>
                      <input type="text" name="location" value={selectedSim.location || ""} onChange={handleInputChange} className="input input-bordered" />
                    </div>

                    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Division</span>
      </label>
      <select
        className="input input-bordered"
        value={selectedSim.division || ""}
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

                   

                    <div className="flex flex-col">
      <label>Status:</label>
      <select
        name="status"
        value={selectedSim.status}
        onChange={handleInputChange}
        className="input input-bordered"
      >
        <option value="Active">Active</option>
        <option value="Not-In-Use">Not-In-Use</option>
        <option value="Under-Maintenance">Under-Maintenance</option>
        <option value="Scrap">Scrap</option>
        <option value="Lost">Lost</option>
      </select>
    </div>

    <div className="flex flex-col">
                      <label>Description:</label>
                      <input type="text" name="description" value={selectedSim.description} onChange={handleInputChange} className="input input-bordered" />
                    </div>

                  </div>
                  <div className="modal-action flex justify-center">
                    <button type="submit" className="btn custom-btn">Save</button>
                    <button type="button" className="btn btn-gray-500" onClick={handleCloseModal}>Close</button>
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
