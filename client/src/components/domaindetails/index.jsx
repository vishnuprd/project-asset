import React, { useEffect, useState, useRef } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";

export default function DomainDetails() {
    const [domainData, setDomainData] = useState([]);
    const [searchFilters, setSearchFilters] = useState({});
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const modalRef = useRef(null);

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

    console.log(domainData);

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
        modalRef.current = domain;
    };

    const handleCloseModal = () => {
        setModal(false);
        modalRef.current = null;
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
                                        <th className="font-bold" style={{ color: "#FF735C" }}>TLD</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Server Type</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Expiry Date</th>
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
                                                    <td>{domain.tld}</td>
                                                    <td>{domain.serverType}</td>
                                                    <td>{expiryDate.toLocaleDateString()}</td>
                                                    <td className={daysStyle}>{daysDifference} days</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-grey" onClick={() => handleOpenModal(domain)}>
                                                           View
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

                        {modal && (
                            <dialog open={modal} className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Domain Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <p><strong>Provider:</strong> {modalRef.current?.provider || 'N/A'}</p>
                                        <p><strong>Server Name:</strong> {modalRef.current?.serverName || 'N/A'}</p>
                                        <p><strong>Server Type:</strong> {modalRef.current?.serverType || 'N/A'}</p>
                                        <p><strong>Purchase Date:</strong> {new Date(modalRef.current?.purchaseDate).toLocaleDateString() || 'N/A'}</p>
                                        <p><strong>Expiry Date:</strong> {new Date(modalRef.current?.expiryDate).toLocaleDateString() || 'N/A'}</p>
                                        <p><strong>Server Ip:</strong> {modalRef.current?.serverIp || 'N/A'}</p>

                                        <p><strong>Server URL:</strong> {modalRef.current?.serverUrl || 'N/A'}</p> 
                                        <p><strong>TLD:</strong> {modalRef.current?.tld || 'N/A'}</p>
                                        <p><strong>Registered Name(Owner Name):</strong> {modalRef.current?.ownerName || 'N/A'}</p>
                                        <p><strong>Registered organization:</strong> {modalRef.current?.registeredOrganization || 'N/A'}</p>

                                        <p><strong>Cloud Flare:</strong> {modalRef.current?.cloudflare|| 'N/A'}</p>
                                        <p><strong>Google Authentication Token:</strong> {modalRef.current?.googleAuthenticatoion || 'N/A'}</p>
                                        <p><strong>Registered organization:</strong> {modalRef.current?.registeredOrganization || 'N/A'}</p>


                                        <p><strong>Register Email-Id(Support Email):</strong> {modalRef.current?.registerEmail || 'N/A'}</p>
                                        <p><strong>Registered organization:</strong> {modalRef.current?.registeredOrganization || 'N/A'}</p>

                                        <p><strong>One Time Cost:</strong> {modalRef.current?.oneTimeCost|| 'N/A'}</p>

                                       
                            
                                    </div>
                                    <div className="modal-action flex justify-center">
                                        <button className="custom-btn" onClick={handleCloseModal}>Close</button>
                                    </div>
                                </div>
                            </dialog>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
