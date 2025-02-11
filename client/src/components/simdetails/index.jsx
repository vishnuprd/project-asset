import React, { useState, useEffect, useRef } from 'react';
import Layout from '../layout/layout.js';
import axios from "axios";

export default function SimCardDetails() {
    
    const [simCardData, setSimCardData] = useState([]);
    const [searchFilters, setSearchFilters] = useState({});
    const [modalOpen, setModalOpen] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const fetchSimCardData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/sim-card/all`);
            if (response.status === 200) {
                setSimCardData(response.data.data);
            } else {
                alert(`Error fetching sim data: ${response.data.message || "Unexpected response"}`);
            }
        } catch (error) {
            console.error("Error fetching sim data:", error.message || error.response?.data);
            alert(`Error fetching sim data: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        fetchSimCardData();
    }, []);

    const filteredRoutes = simCardData.filter((simCard) => {
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

    const handleOpenModal = (simCard) => {
        setModalOpen(simCard);
    };

    const handleCloseModal = () => {
        setModalOpen(null);
    };

    return (
        <div>
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
                                    {Array.isArray(simCardData) && simCardData
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

                        <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Sim card Details</h3>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="font-bold" style={{ color: "#FF735C" }}></th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>SimCard Id</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Network Name</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Handled By</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map((simCard, index) => (
                                        <tr className="hover" key={index}>
                                            <td>{(page - 1) * pageSize + index + 1}</td>
                                            <td>{simCard.simCardId}</td>
                                            <td>{simCard.networkName}</td>
                                            <td>{simCard.handledBy}</td>
                                            <td>{simCard.location || 'N/A'}</td>
                                            <td>{simCard.division || 'N/A'}</td>
                                            <td style={{ color: simCard.status === 'active' ? 'green' : 'black' }}>
                                                {simCard.status}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(simCard)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {modalOpen && (
                            <dialog open className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>SimCard Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <p><strong>SimCard ID:</strong> {modalOpen.simCardId || 'N/A'}</p>
                                        <p><strong>Network Name:</strong> {modalOpen.networkName || 'N/A'}</p>
                                        <p><strong>Handled By:</strong> {modalOpen.handledBy || 'N/A'}</p>
                                        <p><strong>Location:</strong> {modalOpen.location || 'N/A'}</p>
                                        <p><strong>Division:</strong> {modalOpen.division || 'N/A'}</p>
                                        <p><strong>Status:</strong> {modalOpen.status || 'N/A'}</p>
                                        <p><strong>Description:</strong> {modalOpen.description || 'N/A'}</p>
                                    </div>
                                    <div className="modal-action flex justify-center">
                                        <button className="custom-btn" onClick={handleCloseModal}>Close</button>
                                    </div>
                                </div>
                            </dialog>
                        )}

                        <div className="flex justify-between mt-4">
                            <button className="custom-btn" onClick={handlePreviousPage}>Previous</button>
                            <span>Page {page} of {totalPages}</span>
                            <button className="custom-btn" onClick={handleNextPage}>Next</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
