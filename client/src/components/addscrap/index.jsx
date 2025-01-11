import React, { useState } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function AddScrap() {
  const [formState, setFormState] = useState({
    scrapID: "SCRAP-ID-9999",
    type: "",
    assetID: "",
    brand: "",
    serialNumber: "",
    description: "",
    dateScrapped: "",
    location: "",
    status: "",
    adminAccount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/scrap`, formState);
      console.log("Response:", response.data);
      toast.success("Data successfully submitted.");
      setFormState({
        scrapID: "SCRAP-ID-9999",
        type: "",
        assetID: "",
        brand: "",
        serialNumber: "",
        description: "",
        dateScrapped: "",
        location: "",
        status: "",
        adminAccount: "",
      });
    } catch (error) {
      console.error("Error adding scrap:", error.response ? error.response.data : error);
      const errorMessage = error.response?.data?.message || "An error occurred while submitting the data. Please try again.";
      toast.error(errorMessage);
    }
  };

  const scrapFields = [
    { label: "Scrap ID", name: "scrapID", disabled: true },
    {
      label: "Type",
      type: "select",
      name: "type",
      options: ["Laptop", "Desktop", "Tablet", "Printer", "CCTV", "Projector", "Dongle", "Phone","Others"],
      placeholder: "Select the type",
      required: true,
    },
    {
      label: "Asset ID",
      type: "text",
      name: "assetID",
      placeholder: "Enter Asset ID",
      required: true,
    },
    { label: "Brand", type: "text", name: "brand", placeholder: "Enter Brand", required: true },
    {
      label: "Serial Number",
      type: "text",
      name: "serialNumber",
      placeholder: "Enter Serial Number",
      required: true,
    },
    {
      label: "Location",
      type: "text",
      name: "location",
      placeholder: "Enter Location",
      required: true,
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      placeholder: "Enter Description",
      required: true,
    },
    {
      label: "Date Scrapped",
      type: "date",
      name: "dateScrapped",
      placeholder: "Enter Date Scrapped",
      required: true,
    },
    {
      label: "Status",
      type: "select",
      name: "status",
      options: ["Scrapped", "Not scrapped", "Lost"],
      placeholder: "Select Status",
      required: true,
    },
    {
      label: "Admin Account",
      type: "select",
      name: "adminAccount",
      options: ["Yes", "No"],
      placeholder: "Select Admin Account",
      required: true,
    },
  ];

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h4 className="text-center font-bold" style={{ color: "#FF735C" }}>Add New Scrap 🗑️</h4>
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {scrapFields.map(({ label, type, name, placeholder, required, options, disabled }) => (
                <div className="form-control" key={name}>
                  <label className="label">
                    <span className="label-text">{label}</span>
                  </label>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={formState[name]}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required={required}
                    >
                      <option value="" disabled>{placeholder}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formState[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="input input-bordered w-full"
                      required={required}
                      disabled={disabled}
                    />
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="custom-btn mt-4 justify-center">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}