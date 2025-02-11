import {useState,useEffect,useRef} from 'react';
import Layout from "../layout/layout.js";
import axios from "axios";

export default function RouterDetails() {
    const [RouterData,setRouterData] = useState([]);
    const [searchFilters,setSearchFilters] = useState({});
    const [page,setPage]= useState(1);
    const [pageSize] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
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
    
        const LocationMatch =
            !location || router.location.toLowerCase().includes(location.toLowerCase().trim());
    
        const DivisionMatch =
            !division || router.division.toLowerCase().includes(division.toLowerCase().trim());
    
        const StorageMatch =
            !storage || router.storage.toLowerCase().includes(storage.toLowerCase().trim());
    
        const CoverageMatch =
            !coverage || router.coverage.toLowerCase().includes(coverage.toLowerCase().trim());
    
        return LocationMatch && DivisionMatch && StorageMatch && CoverageMatch;
    })

    const paginatedData = filteredRoutes.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredRoutes.length / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };


  
  const handleOpenModal = (projector) => {
    modalRef.current = projector;
    setModalOpen(true);
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



    <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Router Details</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-bold" style={{ color: "#FF735C" }}></th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Router Id</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Brand</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Coverage</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Speed</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                    <th className="font-bold" style={{ color: "#FF735C" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData
                  .map((router, index) => (
                    <tr className="hover" key={index}>
                    <td>{(page - 1) * pageSize + index + 1}</td>
                      <td>{router.routerId}</td>
                      <td>{router.brand}</td>
                      <td>{router.serialNumber}</td>
                      <td style={{ color: !router.location || router.location === 'N/A' ? 'red' : 'black' }}>
                          {router.location || 'N/A'}
                        </td>
                        <td style={{ color: !router.division || router.division === 'N/A' ? 'red' : 'black' }}>
                          {router.division || 'N/A'}
                        </td>
                        <td style={{ color: router.status === 'Available' ? 'green' : 'black' }}>
                          {router.status}
                        </td>
                      <td>
                        <button
                          className="btn btn-sm btn-grey"
                         
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {modalOpen && modalRef.current && (
              <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Router Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>Router ID:</strong> {modalRef.current.routerId || 'N/A'}</p>
                    <p><strong>Brand :</strong> {modalRef.current.brand || 'N/A'}</p>
                    <p><strong>Serial Number:</strong> {modalRef.current.serialNumber || 'N/A'}</p>
                    <p><strong>Coverage:</strong> {modalRef.current.coverage || 'N/A'}</p>
                    <p><strong>Speed:</strong> {modalRef.current.speed || 'N/A'}</p>
                    <p><strong>Storage:</strong> {modalRef.current.storage || 'N/A'}</p>
                    <p><strong>Location:</strong> {modalRef.current.location || 'N/A'}</p>
                    <p><strong>Division:</strong> {modalRef.current.division || 'N/A'}</p>
                    <p><strong>Status:</strong> {modalRef.current.status || 'N/A'}</p>
                    <p><strong>Description:</strong> {modalRef.current.description || 'N/A'}</p>
                  </div>
                  <div className="modal-action flex justify-center">
                    <button className="custom-btn" onClick={handleCloseModal}>Close</button>
                  </div>
                </div>
              </dialog>
            )}
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
                </div>
      
   
    
    </Layout>
    </div>
  )
}
