import { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function AddPhone() {
  const [formData, setFormData] = useState({});
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && response.data.length > 0) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data.map((employee) => ({
            value: employee.employeeId,
            label: `${employee.employeeId} - ${employee.employeeName}`,
          }))
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

  const Inputform = [
    { id: 1, name: "phoneId", label: "Phone ID", type: "text", required: true, placeholder: "Enter Phone ID" },
    {
      id: 2,
      name: "handledBy",
      label: "Assigned To",
      type: "select",
      options: assignedToOptions,
      required: true,
    },
    {
      id: 3,
      name: "status",
      label: "Status",
      type: "select",
      options: ["Assigned", "Lost", "Scrap", "Available"],
    },
    { id: 4, name: "brand", label: "Brand", type: "text", required: true, placeholder: "Enter Brand" },
    { id: 5, name: "model", label: "Model", type: "text", required: true, placeholder: "Enter Model" },
    { id: 6, name: "serialNumber", label: "Serial Number", type: "text", required: true, placeholder: "Enter Serial Number" },
    { id: 7, name: "location", label: "Location", type: "text", required: true, placeholder: "Enter Location" },
    {
      id: 8,
      label: "Division",
      name: "division",
      required: true,
      type: "select",
      options: [
        "Lamination", "Processing", "Garments", "Coating", "Bags",
        "EBO-Coimbatore", "EBO-Chennai", "Abirami-Eco-Plast",
        "Non-Woven(Garments-2)", "Head-office", "Spinning",
        "Fine-Garments(Garments-3)", "Firebird College", "Vedhanayagam Hospital",
        "LeNatural", "Govt.School Project", "Others",
      ],
    },
    { id: 9, name: "description", label: "Description", type: "text", required: false, placeholder: "Enter Description" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/phone/add`, formData);
      if (response.status === 201) {
        toast.success("Phone added successfully!");
        setFormData({});
      }
    } catch (error) {
      console.error("Error adding phone:", error.response ? error.response.data : error.message);
      toast.error("Failed to add phone. Please try again.");
    }
  };


  const isHandledByDisabled = ["Lost", "Scrap", "Available"].includes(formData.status);

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <h3 className="text-center py-2 font-bold" style={{ color: "#FF735C" }}>
                Add Phone Details 🧑‍💻
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Inputform.map((input) => (
                      <div key={input.id}>
                        <label className="label" htmlFor={input.name}>
                          {input.label}
                        </label>
                        {input.type === "select" ? (
                          <select
                            className="input input-bordered w-full max-w-xs"
                            id={input.name}
                            name={input.name}
                            required={input.required}
                            onChange={handleChange}
                            disabled={isHandledByDisabled === true && input.name === "handledBy"}
                          >
                            <option value="">Select {input.label}</option>
                            {input.options.map((option, idx) =>
                              typeof option === "string" ? (
                                <option key={idx} value={option}>
                                  {option}
                                </option>
                              ) : (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <input
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            required={input.required}
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChange}
                            value={formData[input.name] || ""}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-control flex-row mt-4 flex justify-center space-x-2">
                <button type="submit" className="custom-btn">
                  Save
                </button>
                <button type="button" className="btn btn-grey">
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
