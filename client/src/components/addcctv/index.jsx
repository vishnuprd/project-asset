import React, { useState } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Addcctv() {
    const Inputform = [
        { id: "1", name: "cctvId", label: "CCTV ID", type: "text", placeholder: "Enter CCTV ID"},
        { id: "2", name: "model", label: "Model", type: "text", placeholder: "Enter Model" },
        { id: "3", name: "serialNumber", label: "Serial Number", type: "text", placeholder: "Enter Serial Number" },
        { id: "4", name: "ipAddress", label: "IP Address", type: "text", placeholder: "Enter IP Address" },
        { id: "5", name: "location", label: "Location", type: "text", placeholder: "Enter Location" },
        { 
            id: "6", name: "division", label: "Division", type: "select",
            options: [
                { id: "Lamination", label: "Lamination" },
                { id: "Processing", label: "Processing" },
                { id: "Garments", label: "Garments" },
                { id: "Coating", label: "Coating" },
                { id: "Head-office", label: "Head-office" },
                { id: "Fine-Garments(Garments-3)", label: "Fine-Garments(Garments-3)" },
                { id: "Spinning", label: "Spinning" },
                { id: "Non-Woven(Garments-2)", label: "Non-Woven(Garments-2)" },
                { id: "Abirami-Eco-Plast", label: "Abirami-Eco-Plast" },
                { id: "EBO-Coimbatore", label: "EBO-Coimbatore" },
                { id: "EBO-Chennai", label: "EBO-Chennai" },
                { id: "Firebird College", label: "Firebird College" },
                { id: "Vedhanayagam Hospital", label: "Vedhanayagam Hospital" },
                { id: "LeNatural", label: "LeNatural" },
                  {id:"Govt.School Project",label:"Govt.School Project"},
                { id: "Bags", label: "Bags" },
                { id: "Others", label: "Others" },
            ],
         
        },
        {
            id: "7", name: "storageType", label: "Storage Type", type: "select",
            options: [
                { id: "DVR", label: "DVR" },
                { id: "NVR", label: "NVR" },
                { id: "NAS", label: "NAS" },
                { id: "cloud", label: "Cloud" },
                { id: "others", label: "Others" },
            ]
        },
        { id: "8", name: "storageSize", label: "Storage Size", type: "text", placeholder: "Enter Storage Size" },
        { id: "9", name: "storageDate", label: "Number of Days Data stored", type: "text", placeholder: "Enter Number of Days Data stored" },
        {
            id: "10", name: "status", label: "Status", type: "select",
            options: [
                { id: "Active", label: "Active" },
                { id: "Inactive", label: "Inactive" },
                { id: "Under Maintenance", label: "Under Maintenance" },
            ],
        },
        { id: "11", name: "description", label: "Description", type: "text", placeholder: "Enter Description" },
    ];

    const [formData, setFormData] = useState({
        cctvId: "", model: "", serialNumber: "", ipAddress: "", location: "", 
        division: "", status: "", description: "", storageType: "", 
        storageSize: "", storageDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/add`, formData);
            toast.success("CCTV added successfully!");
            setFormData({ cctvId: "", model: "", serialNumber: "", ipAddress: "", location: "", 
                division: "", status: "", description: "", storageType: "", storageSize: "", storageDate: "" 
            });
        } catch (error) {
            console.error("Error adding CCTV:", error.response ? error.response.data : error.message);
            toast.error("Error adding CCTV. Please try again.");
        }
    };

    const handleCancel = () => {
        setFormData({ cctvId: "", model: "", serialNumber: "", ipAddress: "", location: "", 
            division: "", status: "", description: "", storageType: "", storageSize: "", storageDate: "" 
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Inputform.map((input) => (
                                        <div key={input.id}>
                                            <label className="block">{input.label}</label>
                                            {input.type === "select" ? (
                                                <select
                                                    name={input.name}
                                                    value={formData[input.name]}
                                                    onChange={handleChange}
                                                    className="select select-bordered w-full max-w-xs"
                                                >
                                                    <option value="">Select {input.label}</option>
                                                    {input.options.map((option) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={input.type}
                                                    name={input.name}
                                                    value={formData[input.name]}
                                                    onChange={handleChange}
                                                    placeholder={input.placeholder}
                                                    className="input input-bordered w-full max-w-xs"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center gap-4 mt-6">
                                    <button type="submit" className="custom-btn rounded-lg">
                                        Save
                                    </button>
                                    <button type="button" onClick={handleCancel} className="btn rounded-lg">
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
