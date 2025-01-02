import { useState, useEffect,useRef} from "react";
import Layout from "../layout/layout.js";
import axios from "axios";

export default function ProjectorHistory() {
  const [projectorData, setProjectorData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    division: "",
    model: "",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
         const modelRef = useRef(null);


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
    fetchData();
  }, []);

  useEffect(() => {
    fetchProjectorData();
  }, []);

  const filteredProjectors = Array.isArray(projectorData)
    ? projectorData.filter((projector) => {
        const { location = "", division = "", model = "" } = searchFilters;
        const locationMatch =
          !location || projector.location.toLowerCase().includes(location.toLowerCase().trim());
        const divisionMatch =
          !division || projector.division.toLowerCase().includes(division.toLowerCase().trim());
        const modelMatch =
          !model || projector.model.toLowerCase().includes(model.toLowerCase().trim());
        return locationMatch && divisionMatch && modelMatch;
      })
    : [];

  const paginatedData = filteredProjectors.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredProjectors.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handleModalOpen = (projector) => {
    modelRef.current = projector; // Store the projector for reference
    setProjectorData({ ...projector }); // Set the projector data in the state
    setModalOpen(true);
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
    modelRef.current = null;
    setProjectorData({});
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const projectorId = modelRef.current._id;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/asset/projector/update/${projectorId}`,
        projectorData
      );
  
      if (response.status === 200) {
        console.log("Projector updated successfully:", response.data);
        alert("Projector updated successfully!");
        fetchProjectorData();
        handleModalClose();
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Error updating projector. Please try again.");
      }
    } catch (error) {
      console.error("Error updating projector:", error); 
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Error: ${error.response.data.message || error.message}`);
      } else {
        alert("Error: " + error.message);
      }
    }
  };
  
  



  const isHandledByDisabled = ["Inactive", "Under Maintenance"].includes(projectorData.status);

  return (
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
                  <option value="">{`Select ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}</option>
                  {Array.isArray(projectorData) &&
                    projectorData
                      .map((projector) => projector[filter])
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
              Projector History
            </h3>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>#</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Projector Id</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Model</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                    <th  className="font-bold" style={{ color: "#FF735C" }}>Division</th>
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
                      <td>{projector.location}</td>
                      <td>{projector.division}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-grey"
                          onClick={() => handleModalOpen(projector)}
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

          {modalOpen && projectorData && (
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
              <div className="modal-box">
                <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                  Update Projector / Projector History
                </h4>
                <form onSubmit={handleUpdate}>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Projector ID</span>
                    </label>
                    <input
                      type="text"
                      name="projectorId"
                      value={projectorData.projectorId || ""}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Model</span>
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={projectorData.model || ""}
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
                        value={projectorData.serialNumber || ""}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Handled By</span>
                      </label>
                      <select
                        name="handledBy"
                        value={projectorData.handledBy || ""}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        disabled={isHandledByDisabled}
                      >
                        <option value="">Select Handled By</option>
                        {employeeData.map((item) => (
                          <option key={item._id} value={`${item.employeeId} - ${item.employeeName}`}>
                            {`${item.employeeId} - ${item.employeeName}`}
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
                        name="location"
                        value={projectorData.location || ""}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Division</span>
                      </label>
                      <select
                        name="division"
                        value={projectorData.division || ""}
                        onChange={handleInputChange}
                        className="input input-bordered"
                      >
                        <option value="">Select Division</option>
                        {[
                          "Lamination", "Processing", "Garments", "Coating", "Bags", "EBO-Coimbatore",
                          "EBO-Chennai", "Abirami-Eco-Plast", "Non-Oven(Garments-2)", "Head-office", "Spinning",
                          "Fine-Garments(Garments-3)", "Fire-bird", "Vedhanayagam Hospital", "Lenatural",
                          "Govt.school Project", "Others"
                        ].map((division, index) => (
                          <option key={index} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Status</span>
                    </label>
                    <select
                      name="status"
                      value={projectorData.status || ""}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    >
                      <option value="">Select Status</option>
                      {["Inactive", "Active", "Under Maintenance"].map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      name="description"
                      value={projectorData.description || ""}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered"
                    />
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
