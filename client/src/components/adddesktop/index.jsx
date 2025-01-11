import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function AddDesktop() {
  const [employeeData, setEmployeeData] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [formData, setFormData] = useState({});

  const Inputform = [
    { id: 1, name: "desktopId", label: "Desktop ID", required: true },
    { id: 2, name: "status", label: "Status", options: ["Assigned", "Lost", "Scrap", "Available"], required: true },
    { id: 3, name: "assignedTo", label: "Assigned To", options: assignedToOptions },
    { id: 4, name: "monitor", label: "Monitor", required: true },
    { id: 5, name: "cpu", label: "CPU", required: true },
    { id: 6, name: "model", label: "Model", required: true },
    { id: 7, name: "serialNumber", label: "Serial Number", required: true },
    { id: 8, name: "ram", label: "RAM", required: true },
    { id: 9, name: "processor", label: "Processor", required: true },
    { id: 10, name: "storage", label: "Storage", required: true },
    { id: 11, name: "ssdStorage", label: "SSD Storage", required: true },
    { id: 12, name: "location", label: "Location", required: true },
    {
      id: 13,
      name: "division",
      label: "Division",
      options: [
        "Lamination", "Processing", "Garments", "Coating", "Bags",
        "EBO-Coimbatore", "EBO-Chennai", "Abirami-Eco-Plast",
        "Non-Oven(Garments-2)", "Head-office", "Spinning",
        "Fine-Garments(Garments-3)", "Fire-bird", "Vedhanayagam Hospital",
        "LeNatural", "Govt.School Project", "Others",
      ],
      required: true,
    },
    { id: 14, name: "adminAccount", label: "Admin Account", options: ["Yes", "No"], required: true },
    { id: 15, name: "version", label: "Version", options: ["Windows-XP", "Vista", "7-32 bit", "7-64 bit", "8", "8.1", "10", "10 Pro", "10 Edu", "11", "12", "13"], required: true },
    { id: 16, name: "windowSoftware", label: "Window Software Installed", options: ["Yes", "No"], required: true },
    { id: 17, name: "antivirus", label: "Antivirus", options: ["Installed", "Not Installed"], required: true },
    { id: 18, name: "msOffice", label: "Ms-Office", options: ["Yes", "No"], required: true },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && response.data.length > 0) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data.map((employee) => `${employee.employeeId} - ${employee.employeeName}`)
        );
      } else {
        console.error("Error fetching employee:", response.data.message || response.data);
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee:", error.response?.data || error.message);
      setEmployeeData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const isAssignedToDisabled = () => {
    const { status } = formData;
    return status === "Lost" || status === "Scrap" || status === "Available";
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/desktop`, formData);
      if (response.status === 201) {
        toast.success("Desktop Data Added Successfully");
        setFormData({});
      }
    } catch (error) {
      console.error("Server error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h3 className="text-center py-2 font-bold" style={{ color: "#FF735C" }}>Add Desktop Details 🖥️</h3>

            <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Inputform.map((input) => (
      <div className="col-span-1" key={input.id}>
        <label htmlFor={input.name} className="label">
          <span className="label-text">{input.label}</span>
        </label>
        {input.options ? (
          <select
            name={input.name}
            className="input input-bordered w-full max-w-xs"
            required={input.required}
            value={formData[input.name] || ""}
            onChange={handleChange}
            disabled={input.name === "assignedTo" ? isAssignedToDisabled() : false} 
          >
            <option value="" disabled>
              Select {input.label}
            </option>
            {input.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder={input.label}
            name={input.name}
            className="input input-bordered w-full max-w-xs"
            required={input.required}
            value={formData[input.name] || ""}
            onChange={handleChange}
          />
        )}
      </div>
    ))}
  </div>

  <div className="form-control flex-row mt-4 flex justify-center space-x-2">
    <button type="submit" className="btn btn-grey">Save</button>
    <button
      type="button"
      className="custom-btn"
      onClick={() => setFormData({})}
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
