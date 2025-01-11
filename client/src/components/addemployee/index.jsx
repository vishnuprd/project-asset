import React, { useState } from 'react';
import Layout from "../layout/layout.js";
import axios from 'axios';  
import { ToastContainer, toast } from 'react-toastify';

export default function AddEmployee() {
    const Inputform = [
        {
            id: "1",
            label: "Employee ID",
            name: "employeeId",
            placeholder: "EMP-xxx",
            required: true,
            type: "text"
        },
        {
            id: "2",
            label: "Employee Name",
            name: "employeeName",
            placeholder: "Employee Name",
            required: true,
            type: "text"
        },
        {
            id: "3",
            label: "Employee Email",
            name: "employeeEmail",
            placeholder: "Employee Email",
            required: true,
            type: "email"
        },
        {
            id: "4",
            label: "Position",
            name: "position",
            placeholder: "Position",
            required: true,
            type: "text"
        },
        {
            id: "5",
            label: "Gender",
            name: "gender",
            placeholder: "Gender",
            required: true,
            type: "text"
        },
        {
            id: "6",
            label: "Location",
            name: "location",
            placeholder: "Location",
            required: true,
            type: "text"
        },
        {
            id: "7",
            label: "Division",
            name: "division",
            required: true,
            type: "select",
            options: [
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
                "spinning",
                "Fine-Garments(Garments-3)",
                "Fire-bird",
                "vedhanayagam hospital",
                "lenatural",
                "Govt.school project",
                "others",
            ]
        },
        {
            id: "8",
            label: "Status",
            name: "status",
            required: true,
            type: "select",
            options: ["Active", "Inactive"]
        },
        {
            id: "9",
            label: "Date of Joining",
            name: "dateOfJoining",
            placeholder: "Date of Joining",
            required: true,
            type: "date"
        },
        {
            id: "10",
            label: "Admin Account",
            name: "adminAccount",
            placeholder: "Admin Account",
            required: true,
            type: "text"
        },
        {
            id: "11",
            label: "Description",
            name: "description",
            placeholder: "Description",
            required: false,
            type: "text"
        }
    ];

    const [employeeData, setEmployeeData] = useState({
        employeeId: "",
        employeeName: "",
        employeeEmail: "",
        position: "",
        gender: "",
        location: "",
        division: "",
        status: "",
        dateOfJoining: "",
        adminAccount: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/employee`, employeeData);
            toast.success("Employee added successfully!");
        
          
            setEmployeeData({
                employeeId: "",
                employeeName: "",
                employeeEmail: "",
                position: "",
                gender: "",
                location: "",
                division: "",
                status: "",
                dateOfJoining: "",
                adminAccount: "",
                description: "",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add employee. Please check the form values.";
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <Layout>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>Add Employee Details Here ✔️</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Inputform.map((input) => (
                                    <div key={input.id} className="form-control">
                                        <label htmlFor={input.name}>{input.label}</label>
                                        {input.type === 'select' ? (
                                            <select
                                                name={input.name}
                                                required={input.required}
                                                value={employeeData[input.name]}  
                                                onChange={handleChange} 
                                                className="input input-bordered w-full max-w-xs"
                                            >
                                                <option value="">Choose {input.label}</option>
                                                {input.options.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                name={input.name}
                                                required={input.required}
                                                value={employeeData[input.name]} 
                                                onChange={handleChange}  
                                                className="input input-bordered w-full max-w-xs"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="modal-action justify-center custom-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
