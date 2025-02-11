import { useState, useEffect,useRef} from "react";
import axios from "axios";
import Layout from "../layout/layout.js";
import { ToastContainer, toast } from 'react-toastify';

export default function RouterHistory() {
  const [RouterData, setRouterData] = useState([]);
  const [searchFilters, setSearchFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRouter, setSelectedRouter] = useState(null);


  const modalRef = useRef(null);

  const fetchRouterData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/router/all`);
      if (response.status === 200) {
        setRouterData(response.data);
      } else {
        alert(`Error fetching router data: ${response.data.message || "Unexpected response"}`);
      }
    } catch (error) {
      console.error("Error fetching router data:", error.message || error.response?.data);
      alert(`Error fetching router data: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchRouterData();
  }, []);

  const filteredRoutes = RouterData.filter((router) => {
    const { location = "", division = "", storage = "", coverage = "" } = searchFilters;
    return (
      (!location || router.location.toLowerCase().includes(location.toLowerCase().trim())) &&
      (!division || router.division.toLowerCase().includes(division.toLowerCase().trim())) &&
      (!storage || router.storage.toLowerCase().includes(storage.toLowerCase().trim())) &&
      (!coverage || router.coverage.toLowerCase().includes(coverage.toLowerCase().trim()))
    );
  });

  const paginatedData = filteredRoutes.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredRoutes.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (phone) => {
    setSelectedRouter(phone);
    modalRef.current = phone;
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRouter(null);
    modalRef.current = null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRouter((prev) => ({
        ...prev,
        [name]: value
    }));
};

const handleUpdateRouter = async (e) => {
    e.preventDefault();

    if (!selectedRouter || !selectedRouter._id) {
        toast.error('Router ID is missing.');
        return;
    }

    try {
        const routerId = selectedRouter._id; 
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/asset/router/update/${routerId}`;

        console.log("Updating router with ID:", routerId);
        console.log("API URL:", apiUrl); 

        const response = await axios.put(apiUrl, selectedRouter);

        if (response.status === 200) {
            toast.success('Router updated successfully!');
            fetchRouterData(); 
            handleCloseModal(); 
        } else {
            toast.error(`Error updating router: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating router:', error.response ? error.response.data : error.message);
        toast.error(`Error updating router: ${error.response?.data?.message || error.message}`);
    }
};

  return (
    <>
<Layout>


    <div className="p-4 sm:ml-64">

    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
   <div className="flex justify-end gap-4 mb-4">
              {["location", "division", "storage","coverage"].map((filter) => (
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
{Array.isArray(RouterData) && RouterData
  .map((router) => router[filter]) 
  .filter((value, index, self) => self.indexOf(value) === index) 
  .map((value, index) => (
    <option key={index} value={value}>
      {value}
    </option>
  ))}
                </select>
              ))}
            </div>


            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Update Router Details</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Router ID</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Brand</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                <th className="font-bold" style={{ color: "#FF735C" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((router, index) => (
                <tr className="hover" key={router.routerId}>
                  <td>{(page - 1) * pageSize + index + 1}</td>
                  <td>{router.routerId}</td>
                  <td>{router.brand}</td>
                  <td>{router.serialNumber}</td>
                  <td style={{ color: !router.location || router.location === "N/A" ? "red" : "black" }}>
                    {router.location || "N/A"}
                  </td>
                  <td style={{ color: !router.division || router.division === "N/A" ? "red" : "black" }}>
                    {router.division || "N/A"}
                  </td>
                  <td style={{ color: router.status === "Not-In-Use" ? "red" : "black" }}>
                    {router.status}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(router)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
  <div className="flex justify-between mt-4">
              <button className="custom-btn" onClick={handlePreviousPage} >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button className="custom-btn" onClick={handleNextPage} >
                Next
              </button>
            </div>

        {modalOpen && selectedRouter && (
          <dialog  ref={modalRef} isOpen={modalOpen} className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box">
              <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                Update Router Details
              </h4>
             
              <form onSubmit={handleUpdateRouter}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    
   
    <div className="flex flex-col">
      <label>Router ID:</label>
      <input
        type="text"
        name="routerId"
        value={selectedRouter.routerId}
        className="input input-bordered"
        readOnly
      />
    </div>

  
    <div className="flex flex-col">
      <label>Brand:</label>
      <input
        type="text"
        name="brand"
        value={selectedRouter.brand}
        onChange={handleInputChange}
        className="input input-bordered"
      />
    </div>

   
    <div className="flex flex-col">
      <label>Serial Number:</label>
      <input
        type="text"
        name="serialNumber"
        value={selectedRouter.serialNumber}
        onChange={handleInputChange}
        className="input input-bordered"
      />
    </div>

    <div className="flex flex-col">
      <label>Coverage:</label>
      <input
        type="text"
        name="coverage"
        value={selectedRouter.coverage}
        onChange={handleInputChange}
        className="input input-bordered"
      />
    </div>

    <div className="flex flex-col">
      <label>Speed:</label>
      <input
        type="text"
        name="speed"
        value={selectedRouter.speed}
        onChange={handleInputChange}
        className="input input-bordered"
      />
    </div>


  
    <div className="flex flex-col">
      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={selectedRouter.location}
        onChange={handleInputChange}
        className="input input-bordered"
      />
    </div>

  
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Division</span>
      </label>
      <select
        className="input input-bordered"
        value={selectedRouter.division || ""}
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
        value={selectedRouter.status}
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
      <input
        type="text"
        name="description"
        value={selectedRouter.description}
        onChange={handleInputChange}
        className="input input-bordered"
      />
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
