import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../layout/layout.js";
import { ToastContainer, toast } from 'react-toastify';

export default function EmployeeDetails() {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        employeeId: "",
        location: "",
        division: "",
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const modalRef = useRef(null);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

    const handlePreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage((prevPage) => prevPage + 1);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
            if (response.status === 200) {
                setEmployeeData(response.data);
                setFilteredData(response.data);
            } else {
                alert("Failed to load data.");
            }
        } catch (error) {
            alert("Error loading data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const { employeeId, location, division } = searchFilters;
    
        const filtered = employeeData.filter((employee) => {
            const employeeIdMatch =
                !employeeId ||
                (employee.employeeId &&
                    employee.employeeId.toLowerCase().includes(employeeId.toLowerCase().trim()));
    
            const employeeLocationMatch =
                !location ||
                (employee.location &&
                    employee.location.toLowerCase().includes(location.toLowerCase().trim()));
    
            const employeeDivisionMatch =
                !division ||
                (employee.division &&
                    employee.division.toLowerCase().includes(division.toLowerCase().trim()));
    
            return employeeIdMatch && employeeLocationMatch && employeeDivisionMatch;
        });
    
        setFilteredData(filtered);
        setPage(1); 
    }, [searchFilters, employeeData]);
    

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setFormData({ ...employee });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEmployee(null);
        setFormData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        if (!formData.position || !formData.gender) {
            toast.error("Please fill in all required fields (Position, Gender).");
            return;
        }

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/employee/${selectedEmployee._id}`,
                formData
            );

            if (response.status === 200) {
                toast.success("Employee updated successfully!");
                fetchData();
                handleCloseModal();
            } else {
                toast.error("Error updating employee.");
            }
        } catch (error) {
                toast.error("Error updating employee.");
        }
    };

    return (
        <div>
            <Layout>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Employee Details 🧑‍💻</h3>

                        <div className="flex justify-end gap-4 mb-4">
                            <select
                                name="employeeId"
                              className="input input-bordered input-info w-full max-w-xs"
                                value={searchFilters.employeeId}
                                onChange={handleFilterChange}
                            >
                                <option value="">Search by Employee ID</option>
                                {employeeData.map((employee) => (
                                    <option key={employee.id} value={employee.employeeId}>
                                        {employee.employeeId} - {employee.employeeName}
                                    </option>
                                ))}
                            </select>

                            <select
    name="location"
    className="input input-bordered input-info w-full max-w-xs"
    value={searchFilters.location}
    onChange={handleFilterChange}
>
    <option value="">Search by Location</option>
   
    {[...new Set(employeeData.map((employee) => employee.location))].map((location, index) => (
        location && (
            <option key={index} value={location}>
                {location}
            </option>
        )
    ))}
</select>

<select
    name="division"
   className="input input-bordered input-info w-full max-w-xs"
    value={searchFilters.division}
    onChange={handleFilterChange}
>
    <option value="">Search by Division</option>
   
    {[...new Set(employeeData.map((employee) => employee.division))].map((division, index) => (
        division && (
            <option key={index} value={division}>
                {division}
            </option>
        )
    ))}
</select>

                        </div>

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Employee ID</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Name</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Email</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Position</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Location</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                                        <th className="font-bold" style={{ color: "#FF735C" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((employee, index) => (
                                            <tr key={employee.id}>
                                                <td>{(page - 1) * pageSize + index + 1}</td>
                                                <td>{employee.employeeId}</td>
                                                <td>{employee.employeeName}</td>
                                                <td>{employee.employeeEmail}</td>
                                                <td>{employee.position}</td>
                                                <td>{employee.location}</td>
                                                <td
                                                    className={
                                                        employee.status === "Left"
                                                            ? "text-secondary"
                                                            : "text-success"
                                                    }
                                                >
                                                    {employee.status}
                                                </td>

                                             

                                                <td>
                                                    <button
                                                        className="text-blue-500"
                                                        onClick={() => handleOpenModal(employee)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                No employees found
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


                        {modalOpen && (
    <dialog ref={modalRef} open className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <h2 className="text-center mb-4">Edit Employee</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId || ""}
                            onChange={handleInputChange}
                         
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input
                            type="text"
                            name="employeeName"
                            value={formData.employeeName || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Employee Email</label>
                        <input
                            type="email"
                            name="employeeEmail"
                            value={formData.employeeEmail || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Division</label>
                        <input
                            type="text"
                            name="division"
                            value={formData.division || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
    <label className="block mb-2 text-sm font-medium text-gray-900">Status</label>
    <select
        name="status"
        value={formData.status || ""}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
    >
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
    </select>
</div>
{/* 
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Date of Joining</label>
                        <input
                            type="date"
                            name="dateOfJoining"
                            value={formData.dateOfJoining || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div> */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Admin Account</label>
                        <input
                            type="text"
                            name="adminAccount"
                            value={formData.adminAccount || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    <button type="submit" className="custom-btn">
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="btn btn-grey"
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
        </div>
    );
}
