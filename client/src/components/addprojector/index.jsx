import { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";

export default function AddProjector() {
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [formData, setFormData] = useState({});

  const Inputform = [
    {
      id: 1,
      name: "projectorId",
      label: "Projector ID",
      type: "text",
      placeholder: "Enter Projector Id",
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
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Under Maintenance", value: "Under Maintenance" },
      ],
    },
    {
      id: 4,
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter Model",
    },
    {
      id: 5,
      name: "serialNumber",
      label: "Serial Number",
      type: "text",
      placeholder: "Enter Serial Number",
    },
    {
      id: 6,
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter Location",
    },
    {
      id: 7,
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
      id: 8,
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter Description",
      required: false,
    },
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
        console.error("Error fetching employee data:", response.data.message || response.data);
        setEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.response ? error.response.data : error.message);
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

  
  const isHandledByDisabled = ["Inactive", "Under Maintenance"].includes(formData.status);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/projector/add`, formData);
        if (response.status === 201) {
          console.log("Projector added successfully:", response.data);
          alert("Projector added successfully!");
          setFormData({});
        } else {
          console.error("Unexpected response status:", response.status);
          
        }
      } catch (error) {
        console.error("Error adding projector:", error.response ? error.response.data : error.message);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    };
  

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
              Add Projector
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Inputform.map((input) => (
                    <div key={input.id} className="mb-4">
                      <label className="label">
                        <span className="label-text">{input.label}</span>
                      </label>
                      {input.type === "select" ? (
                        <select
                          name={input.name}
                          required={input.required}
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
                          required={input.required}
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
    </div>
  );
}
