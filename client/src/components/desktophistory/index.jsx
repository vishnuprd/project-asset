import React from "react";
import Layout from "../layout/layout.js";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DesktopHistory() {
  const [desktopData, setDesktopData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchFilters, setSearchFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDesktop, setSelectedDesktop] = useState(null);
  const [oldFormData, setOldFormData] = useState({});
  const [formData, setFormData] = useState({});

  const handleOpenModal = (desktop) => {
    setSelectedDesktop(desktop);
    setFormData({
      ram: desktop.ram || '',
      processor: desktop.processor || '',
      storage: desktop.storage || '',
      ssdStorage: desktop.ssdStorage || '',
      location: desktop.location || '',
      version: desktop.version || '',
      division: desktop.division || '',
      status: desktop.status || '',
      assignedTo: desktop.assignedTo?._id || '',
      description: desktop.description || '',
    });

    setOldFormData({
      ram: desktop.ram || '',
      processor: desktop.processor || '',
      storage: desktop.storage || '',
      ssdStorage: desktop.ssdStorage || '',
      location: desktop.location || '',
      version: desktop.version || '',
      division: desktop.division || '',
      status: desktop.status || '',
      assignedTo: desktop.assignedTo?.employeeId
        ? `${desktop.assignedTo.employeeId} - ${desktop.assignedTo.employeeName}`
        : 'N/A',
      description: desktop.description || '',
    });
    document.getElementById('my_modal_4').showModal();
  };

  const handleCloseModal = () => {
    setSelectedDesktop(null);
    setModalOpen(false);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/asset/desktop/all`
      );
      if (response.status === 200) {
        setDesktopData(response.data);
      } else {
        alert(`Error fetching desktops: ${response.data.message}`);
      }
    } catch (error) {
      alert("Error fetching desktops details");
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const filteredDesktops = desktopData.filter((desktop) => {
    const {
      desktopId = "",
      assignedTo = "",
      serialNumber = "",
      location = "",
      division = "",
      status = "",
    } = searchFilters;

    const desktopIdMatch =
      !desktopId ||
      (desktop.desktopId &&
        desktop.desktopId
          .toLowerCase()
          .includes(desktopId.toLowerCase().trim()));

    const assignedToMatch =
      !assignedTo ||
      (
        (desktop.assignedTo && desktop.assignedTo.employeeName) ||
        "No employee assigned"
      )
        .toLowerCase()
        .includes(assignedTo.toLowerCase().trim());

    const serialNumberMatch =
      !serialNumber ||
      (desktop.serialNumber &&
        desktop.serialNumber
          .toLowerCase()
          .includes(serialNumber.toLowerCase().trim()));

    const locationMatch =
      !location ||
      (desktop.location || "N/A")
        .toLowerCase()
        .includes(location.toLowerCase().trim());

    const divisionMatch =
      !division ||
      (desktop.division || "N/A")
        .toLowerCase()
        .includes(division.toLowerCase().trim());

    const statusMatch =
      !status ||
      (desktop.status &&
        desktop.status.toLowerCase().includes(status.toLowerCase().trim()));

    return (
      desktopIdMatch &&
      assignedToMatch &&
      serialNumberMatch &&
      locationMatch &&
      divisionMatch &&
      statusMatch
    );
  });

  const paginatedData = filteredDesktops.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredDesktops.length / pageSize);

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="p-4">
              <div className="flex justify-end gap-4 mb-4">
                <select
                  value={searchFilters.desktopId}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      desktopId: e.target.value,
                    })
                  }
                   className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Desktop ID</option>
                  {desktopData
                    .sort((a, b) => a.desktopId - b.desktopId)
                    .map((desktop) => (
                      <option key={desktop._id} value={desktop.desktopId}>
                        {desktop.desktopId}
                      </option>
                    ))}
                </select>

                <select
                  value={searchFilters.assignedTo}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      assignedTo: e.target.value,
                    })
                  }
                   className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Assigned To</option>
                  {desktopData
                    .filter((desktop) => desktop.assignedTo?.employeeName)
                    .map((desktop) => (
                      <option
                        key={desktop._id}
                        value={desktop.assignedTo?.employeeName}
                      >
                        {desktop.assignedTo?.employeeName}
                      </option>
                    ))}
                </select>

                <select
                  value={searchFilters.serialNumber}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      serialNumber: e.target.value,
                    })
                  }
                   className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Serial Number</option>
                  {desktopData.map((desktop) => (
                    <option key={desktop._id} value={desktop.serialNumber}>
                      {desktop.serialNumber}
                    </option>
                  ))}
                </select>

                <select
                  value={searchFilters.location}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      location: e.target.value,
                    })
                  }
                  className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Location</option>
                  {Array.from(
                    new Set(
                      desktopData.map((desktop) => desktop.location || "N/A")
                    )
                  ).map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>

                <select
                  value={searchFilters.division}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      division: e.target.value,
                    })
                  }
                   className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Division</option>
                  {Array.from(
                    new Set(
                      desktopData.map((desktop) => desktop.division || "N/A")
                    )
                  ).map((division, index) => (
                    <option key={index} value={division}>
                      {division}
                    </option>
                  ))}
                </select>

                <select
                  value={searchFilters.status}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      status: e.target.value,
                    })
                  }
                  className="input input-bordered input-info w-full max-w-xs"
                >
                  <option value="">Status</option>
                  {["Assigned", "Lost", "Scrap", "Available"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>
                Desktop History / update Desktop 📑
              </h4>
              <div className="overflow-x-auto py-9">
                <table className="table">
                  <thead>
                    <tr className="hover">
                      <th className="font-bold" style={{ color: "#FF735C" }}>S.No</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Desktop ID</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Assigned To</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Division</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                      <th className="font-bold" style={{ color: "#FF735C" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((desktop, index) => (
                        <tr className="hover" key={desktop._id}>
                          <td>{index + 1}</td>
                          <td>{desktop.desktopId || "N/A"}</td>
                          <td>
                            {desktop.assignedTo?.employeeName ||
                              "No employee assigned"}
                          </td>
                          <td
                            style={{
                              color:
                                !desktop.location || desktop.location === "N/A"
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {desktop.location || "N/A"}
                          </td>
                          <td
                            style={{
                              color:
                                !desktop.division || desktop.division === "N/A"
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {desktop.division || "N/A"}
                          </td>
                          <td
                            style={{
                              color:
                                desktop.status === "Available"
                                  ? "green"
                                  : "black",
                            }}
                          >
                            {desktop.status}
                          </td>
                          <td>
                            <button className="btn btn-grey mr-2" onClick={() => handleOpenModal(desktop)}>Edit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No desktops found.
                        </td>
                      </tr>
                    )}
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
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h4 className="text-center">Update Desktop Details</h4>
                <form>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(formData).map((key) => (
                      <div key={key}>
                        <label>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <div className="flex justify-between">
                          <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="input input-bordered w-full"
                          />
                          <span className="text-sm text-gray-500">
                            (Old: {oldFormData[key] || 'N/A'})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="modal-action justify-center">
                  
                    <button type="submit" className="custom-btn">
                      Update
                    </button>
                    <button
                      type="button"
                      className="custom-btn"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </Layout>
    </div>
  );
}
