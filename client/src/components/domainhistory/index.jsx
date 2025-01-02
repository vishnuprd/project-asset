import React, { useState, useEffect } from "react";
import Layout from '../layout/layout.js';
import axios from "axios";

export default function DomainHistory() {
    const [domainData, setDomainData] = useState([]);
    const [searchFilters, setSearchFilters] = useState({});
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [modalData, setModalData] = useState(null);  

    const fetchDomainData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/domain/all`);
            console.log(response.data);
            if (response.status === 200) {
                setDomainData(response.data.data);
            } else {
                alert(`Error fetching domains: ${response.data.message}`);
            }
        } catch (error) {
            alert("Error fetching domain details");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDomainData();
    }, []);

    const filteredDomain = Array.isArray(domainData)
        ? domainData.filter((domain) => {
            const { provider = "", serverType = "", expiryDate = "" } = searchFilters;

            const providerMatch =
                !provider ||
                (domain.provider || "N/A")
                    .toLowerCase()
                    .includes(provider.toLowerCase().trim());

            const serverTypeMatch =
                !serverType ||
                (domain.serverType || "N/A")
                    .toLowerCase()
                    .includes(serverType.toLowerCase().trim());

            const expiryDateMatch =
                !expiryDate ||
                new Date(domain.expiryDate).toLocaleDateString().includes(expiryDate.trim());

            return providerMatch && serverTypeMatch && expiryDateMatch;
        })
        : [];

    const totalPages = Math.ceil(filteredDomain.length / pageSize);
    const paginatedData = filteredDomain.slice((page - 1) * pageSize, page * pageSize);

    const handlePreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage((prevPage) => prevPage + 1);
    };

    const handleOpenModal = (domain) => {
        setModal(true);
        setModalData({ ...domain });  
    };

    const handleCloseModal = () => {
        setModal(false);
        setModalData(null); 
    };

    const handleUpdateDomain = async (updatedDomain) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/domain/update/${updatedDomain._id}`, updatedDomain);
            console.log(response.data);
            if (response.status === 200) {
                fetchDomainData();
                handleCloseModal();
            } else {
                alert(`Error updating domain: ${response.data.message}`);
            }
        } catch (error) {
            alert("Error updating domain");
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({ ...prevData, [name]: value })); 
    };

    return (
        <div>
            <Layout>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <div className="flex justify-end gap-4 mb-4">
                            <select
                                value={searchFilters.provider || ""}
                                onChange={(e) =>
                                    setSearchFilters({
                                        ...searchFilters,
                                        provider: e.target.value,
                                    })
                                }
                                className="input input-bordered input-info w-full max-w-xs"
                            >
                                <option value="">Provider</option>
                                {Array.from(new Set(domainData.map((domain) => domain.provider || "N/A"))).map((provider, index) => (
                                    <option key={index} value={provider}>
                                        {provider}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={searchFilters.serverType || ""}
                                onChange={(e) =>
                                    setSearchFilters({
                                        ...searchFilters,
                                        serverType: e.target.value,
                                    })
                                }
                                className="input input-bordered input-info w-full max-w-xs"
                            >
                                <option value="">Server Type</option>
                                {Array.from(new Set(domainData.map((domain) => domain.serverType || "N/A"))).map((serverType, index) => (
                                    <option key={index} value={serverType}>
                                        {serverType}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <h3 className="text-center font-bold" style={{ color: "#FF735C" }}>Domain Details</h3>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Provider</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Server Name</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Server Type</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Purchase Date</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Expiry Date</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Last Backup Date</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Days Between</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((domain, index) => {
                                            const purchaseDate = new Date(domain.purchaseDate);
                                            const expiryDate = new Date(domain.expiryDate);
                                            const daysDifference = Math.ceil(
                                                (expiryDate - purchaseDate) / (1000 * 3600 * 24)
                                            );
                                            const daysStyle =
                                                daysDifference > 20
                                                    ? "text-green-600"
                                                    : daysDifference >= 10
                                                    ? "text-orange-600"
                                                    : "text-red-600";

                                            return (
                                                <tr key={domain._id}>
                                                    <td>{index + 1 + (page - 1) * pageSize}</td>
                                                    <td>{domain.provider}</td>
                                                    <td>{domain.serverName}</td>
                                                    <td>{domain.serverType}</td>
                                                    <td>{purchaseDate.toLocaleDateString()}</td>
                                                    <td>{expiryDate.toLocaleDateString()}</td>
                                                    <td>{new Date(domain.lastBackupDate).toLocaleDateString()}</td>
                                                    <td className={daysStyle}>{daysDifference} days</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(domain)}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="9">No data available</td>
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

                    {modal && modalData && (
                        <dialog open={modal} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Update Domain</h4>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdateDomain(modalData);
                                    }}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div className="col-span-2">
                                        <label className="label">
                                            <span className="label-text">Provider</span>
                                        </label>
                                        <select
                                            name="provider"
                                            value={modalData.provider}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">Select Provider</option>
                                            {Array.from(new Set(domainData.map((domain) => domain.provider || "N/A"))).map((provider, index) => (
                                                <option key={index} value={provider}>
                                                    {provider}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Server Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="serverName"
                                            value={modalData.serverName}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Server Type</span>
                                        </label>
                                        <select
                                            name="serverType"
                                            value={modalData.serverType}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">Select Server Type</option>
                                            {Array.from(new Set(domainData.map((domain) => domain.serverType || "N/A"))).map((serverType, index) => (
                                                <option key={index} value={serverType}>
                                                    {serverType}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Server URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="serverIp"
                                            value={modalData.serverUrl}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    
                                    <div>
                                        <label className="label">
                                            <span className="label-text">TLD</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="tld"
                                            value={modalData.tld}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">CloudFlare</span>
                                        </label>
                                        <select
                                            name="cloudFlare"
                                            value={modalData.cloudFlare}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">Select CloudFlare</option>
                                            {Array.from(new Set(domainData.map((domain) => domain.serverType || "N/A"))).map((cloudFlare, index) => (
                                                <option key={index} value={cloudFlare}>
                                                  {cloudFlare}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div>
                                        <label className="label">
                                            <span className="label-text">Google Authentication</span>
                                        </label>
                                        <select
                                            name="googleAuthentication"
                                            value={modalData.googleAuthentication}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        >
                                            <option value="">Select Google Authentication</option>
                                            {Array.from(new Set(domainData.map((domain) => domain.serverType || "N/A"))).map((googleAuthentication, index) => (
                                                <option key={index} value={googleAuthentication}>
                                                  {googleAuthentication}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div>
                                        <label className="label">
                                            <span className="label-text">Server IP</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="serverIp"
                                            value={modalData.serverIp}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">one Time Cost</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="oneTimeCost"
                                            value={modalData.oneTimeCost}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>


                                    <div>
                                        <label className="label">
                                            <span className="label-text">purchase Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="purchaseDate"
                                            value={modalData.purchaseDate}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>


                                    <div>
                                        <label className="label">
                                            <span className="label-text">Expiry Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="expiryDate"
                                            value={modalData.expiryDate}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Last Backup Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="lastBackupDate"
                                            value={modalData.lastBackupDate}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Next Maintenance Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="nextMaintenanceDate"
                                            value={modalData.nextMaintenanceDate}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                  

                                    <div className="col-span-2 flex justify-between gap-4">
                                        <button type="submit" className="btn w-1/2 custom-btn">
                                            Update Domain
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="btn w-1/2"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    )}
                </div>
            </Layout>
        </div>
    );
}
