import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout/layout.js";
import { ToastContainer, toast } from 'react-toastify';

export default function AddTablet() {
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [employeeData, setEmployeeData] = useState([]);

  const Inputform = [
    {
      id: 1,
      name: "tabletId",
      label: "Tablet ID",
      type: "text",
      placeholder: "Tablet Id",
    },
    {
      id: 2,
      name: "handledBy",
      label: "Handled By",
      type: "select",
      options: assignedToOptions,
    },
    {
      id: 3,
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Assigned", value: "Assigned" },
        { label: "Lost", value: "Lost" },
        { label: "Scrap", value: "Scrap" },
        { label: "Available", value: "Available" },
      ],
    },
    {
      id: 4,
      name: "brand",
      label: "Brand",
      type: "text",
      placeholder: "Enter Brand",
    },
    {
      id: 5,
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter Model",
    },
    {
      id: 6,
      name: "serialNumber",
      label: "Serial Number",
      type: "text",
      placeholder: "Enter Serial Number",
    },
    {
      id: 7,
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter Location",
    },
    {
      id: 8,
      name: "division",
      label: "Division",
      type: "select",
      options: [
        "Lamination",
        "Processing",
        "Garments",
        "Coating",
        "Bags",
        "EBO",
        "Abirami-Eco-Plast",
        "Non-Oven(Garments-2)",
        "Head-office",
        "Spinning",
        "Fine-Garments(Garments-3)",
        "Fire-bird",
        "Vedhanayagam Hospital",
        "Le Natural",
        "Govt. School Project",
        "Others",
      ],
    },
    {
      id: 9,
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter Description",
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/employee`
      );
      if (response.status === 200 && response.data.length > 0) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data.map(
            (employee) => `${employee.employeeId} - ${employee.employeeName}`
          )
        );
      } else {
        console.error(
          "Error fetching employee data:",
          response.data.message || response.data
        );
        setEmployeeData([]);
      }
    } catch (error) {
      console.error(
        "Error fetching employee data:",
        error.response ? error.response.data : error.message
      );
      setEmployeeData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isHandledByDisabled = ["Lost", "Scrap", "Available"].includes(formData.status);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/asset/tablet/add`, 
        formData
      );
  
      if (response.status === 201) {
        toast.success("Data Added Successfully");
        setFormData({}); 
      } else {
        toast.error("Data Not Added");
      }
    } catch (error) {
      console.error("Server error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };








  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
            Add Tablet ✔️
          </h3>
          <form  onSubmit={handleSubmit}>
            <div className="form-control">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Inputform.map((input) => (
                  <div key={input.id}>
                    <label className="block text-gray-700">{input.label}</label>
                    {input.type === "select" ? (
                      <select
                        name={input.name}
                        value={formData[input.name] || ""}
                        onChange={handleChange}
                        disabled={input.name === "handledBy" && isHandledByDisabled}
                        className="input input-bordered w-full max-w-xs"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {input.options.map((option, index) =>
                          typeof option === "object" ? (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ) : (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        value={formData[input.name] || ""}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
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
    </Layout>
  );
}
