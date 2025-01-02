import React, { useState } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function Addcctv() {
    const Inputform = [
        {
            id: "1",
            name: "cctvId",
            label: "CCTV ID",
            type: "text",
            placeholder: "Enter CCTV ID",
        },
        {
            id: "2",
            name: "model",
            label: "Model",
            type: "text",
            placeholder: "Enter Model",
        },
        {
            id: "3",
            name: "serialNumber",
            label: "Serial Number",
            type: "text",
            placeholder: "Enter Serial Number",
        },
        {
            id: "4",
            name: "ipAddress",
            label: "IP Address",
            type: "text",
            placeholder: "Enter IP Address",
        },
        {
            id: "5",
            name: "location",
            label: "Location",
            type: "text",
            placeholder: "Enter Location",
        },
        {
            id: "6",
            name: "division",
            label: "Division",
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
            ],
        },
        {
            id: "7",
            name: "status",
            label: "Status",
            select: [
                { id: "Active", label: "Active" },
                { id: "Inactive", label: "Inactive" },
                { id: "Under Maintenance", label: "Under Maintenance" },
            ],
        },
        {
            id: "8",
            name: "description",
            label: "Description",
            type: "text",
            placeholder: "Enter Description",
        },
    ];

    const [formData, setFormData] = useState({
        cctvId: '',
        model: '',
        serialNumber: '',
        ipAddress: '',
        location: '',
        division: '',
        status: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/add`, formData);
            console.log("Response:", response.data);
            if (alert && typeof alert.success === "function") {
                alert.success("CCTV added successfully!");
            }
            setFormData({
                cctvId: '',
                model: '',
                serialNumber: '',
                ipAddress: '',
                location: '',
                division: '',
                status: '',
                description: '',
            });
        } catch (error) {
            console.error("Error adding CCTV:", error.response ? error.response.data : error.message);
            if (alert && typeof alert.error === "function") {
                alert.error("Error adding CCTV. Please try again.");
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            cctvId: '',
            model: '',
            serialNumber: '',
            ipAddress: '',
            location: '',
            division: '',
            status: '',
            description: '',
        });
    };

    return (
        <div>
            <Layout>
                <div className="p-4 sm:ml-64">
                    <div className="p-4">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                            <h3 className="text-center py-2 font-bold py-9" style={{ color: "#FF735C" }}>Add CCTV 📹</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {Inputform.map((input) => (
                                            <div key={input.id}>
                                                {input.options ? (
                                                    <>
                                                        <label className="block">{input.label}</label>
                                                        <select
                                                            name={input.name}
                                                            value={formData[input.name]}
                                                            onChange={handleChange}
                                                            className="select select-bordered w-full max-w-xs"
                                                        >
                                                            <option value="">Select {input.label}</option>
                                                            {input.options.map((option, index) => (
                                                                <option key={index} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </>
                                                ) : input.select ? (
                                                    <>
                                                        <label className="block">{input.label}</label>
                                                        <select
                                                            name={input.name}
                                                            value={formData[input.name]}
                                                            onChange={handleChange}
                                                            className="select select-bordered w-full max-w-xs"
                                                        >
                                                            {input.select.map((option) => (
                                                                <option key={option.id} value={option.id}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className="block">{input.label}</label>
                                                        <input
                                                            type={input.type}
                                                            name={input.name}
                                                            value={formData[input.name]}
                                                            onChange={handleChange}
                                                            placeholder={input.placeholder}
                                                            className="input input-bordered w-full max-w-xs"
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className="custom-btn rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
