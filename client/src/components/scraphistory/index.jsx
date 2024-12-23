import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/layout.js";

export default function ScrapHistory() {
    const [scrapData, setScrapData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const totalPages = Math.ceil(scrapData.length / pageSize);
    const paginatedData = scrapData.slice((page - 1) * pageSize, page * pageSize);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/scrap`);
            if (response.status === 200) {
                setScrapData(response.data);
            } else {
                console.error("Error fetching scrap data:", response.data.message);
            }
        } catch (err) {
            console.error("Error fetching scrap data:", err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Layout />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <h3 className="text-center font-bold" style={{ color: "#FF735C" }}>Scrap History</h3>
                    <div className="overflow-x-auto py-9">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>#</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Scrap ID</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Type</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Brand</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Serial Number</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Description</th>
                                    <th  className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((scrap, index) => (
                                        <tr className="hover" key={scrap._id}>
                                            <td>{(page - 1) * pageSize + index + 1}</td>
                                            <td>{scrap.scrapID || "N/A"}</td>
                                            <td>{scrap.type || "N/A"}</td>
                                            <td>{scrap.brand || "N/A"}</td>
                                            <td>{scrap.serialNumber || "N/A"}</td>
                                            <td>{scrap.location || "N/A"}</td>
                                            <td>{scrap.description || "N/A"}</td>
                                            <td>{scrap.status || "N/A"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No scrap data found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setPage(page - 1)}
                            className="custom-btn"
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            className="custom-btn"
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
