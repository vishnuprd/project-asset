import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/layout.js";
import { ToastContainer, toast } from "react-toastify";

export default function AddSim() {
  const [employeeData, setEmployeeData] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [formData, setFormData] = useState({
    simCardId: "",
    networkName: "",
    handledBy: "",
    assignedNumber: "",
    status: "",
    location: "",
    division: "",
    description: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && response.data.length > 0) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data?.map((employee) => ({
            label: `${employee.employeeId} - ${employee.employeeName}`,
            value: employee.employeeId || "",
          })) || []
        );
      } else {
        console.error("Error fetching employee:", response.data.message || response.data);
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee:", error.response ? error.response.data : error.message);
      setEmployeeData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  const isHandledByDisabled = ["Inactive", "Lost", "Damaged", "Others", "Non-Assigned"].includes(formData.status);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "status" && ["inactive", "lost", "damaged", "others", "non-assigned"].includes(value.toLowerCase())) {
        updatedData.handledBy = "";
      }
      

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/add/sim-card`, formData);
      if (response.status === 200) {
        toast.success("Sim card added successfully!");
        setFormData({});
      }
    } catch (error) {
      console.error("Error adding Sim card:", error.response ? error.response.data : error.message);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const Inputform = [
    { id: 1, label: "Sim ID", name: "simCardId", type: "text", placeholder: "Enter SimCard ID", required: true },
    {
      id: 2,
      label: "Network Name",
      name: "networkName",
      type: "select",
      options: [
        { label: "Jio", value: "jio" },
        { label: "Airtel", value: "airtel" },
        { label: "Vodafone", value: "vodafone" },
        { label: "Others", value: "others" },
      ],
    },
    {
      id: 3,
      name: "handledBy",
      label: "Handled By",
      type: "select",
      options: assignedToOptions,
    },
    { id: 4, name: "assignedNumber", label: "Assigned Number", type: "text", placeholder: "Enter Number" },
    { id: 5, label: "Location", name: "location", type: "text", placeholder: "Enter Location", required: true },
    {
      id: 6,
      name: "division",
      label: "Division",
      type: "select",
      options: [
        { value: "Lamination", label: "Lamination" },
        { value: "Processing", label: "Processing" },
        { value: "Garments", label: "Garments" },
        { value: "Coating", label: "Coating" },
        { value: "Head-office", label: "Head-office" },
        { value: "Fine-Garments(Garments-3)", label: "Fine-Garments(Garments-3)" },
        { value: "Spinning", label: "Spinning" },
        { value: "Non-Woven(Garments-2)", label: "Non-Woven(Garments-2)" },
        { value: "Abirami-Eco-Plast", label: "Abirami-Eco-Plast" },
        { value: "EBO-Coimbatore", label: "EBO-Coimbatore" },
        { value: "EBO-Chennai", label: "EBO-Chennai" },
        { value: "Firebird College", label: "Firebird College" },
        { value: "Vedhanayagam Hospital", label: "Vedhanayagam Hospital" },
        { value: "LeNatural", label: "LeNatural" },
        { value: "Govt.School Project", label: "Govt.School Project" },
        { value: "Bags", label: "Bags" },
        { value: "Others", label: "Others" },
      ],
    },
    {
      id: 7,
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Non-Assigned", value: "non-assigned" },
        { label: "Inactive", value: "inactive" },
        { label: "Lost", value: "lost" },
        { label: "Damaged", value: "damaged" },
        { label: "Others", value: "others" },
      ],
    },
    { id: 8, name: "description", label: "Notes", type: "textarea", placeholder: "Enter any notes", rows: "3" },
  ];

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
            Add Sim Card Details Here ✔️
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Inputform.map((input) => (
                  <div key={input.id}>
                    <label className="label">{input.label}</label>
                    {input.name === "handledBy" ? (
                      <select
                        name={input.name}
                        className="select select-bordered w-full"
                        onChange={handleChange}
                        value={formData[input.name] || ""}
                        disabled={["inactive", "lost", "damaged", "others", "non-assigned"].includes((formData.status || "").toLowerCase())}
 
                      >
                        <option value="">Select</option>
                        {assignedToOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : input.type === "select" ? (
                      <select name={input.name} className="select select-bordered w-full" onChange={handleChange} value={formData[input.name] || ""}>
                        <option value="">Select</option>
                        {input.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input type={input.type} name={input.name} className="input input-bordered w-full" onChange={handleChange} value={formData[input.name] || ""} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="custom-btn mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
