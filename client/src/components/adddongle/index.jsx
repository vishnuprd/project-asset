import { useState, useEffect } from "react";
import Layout from "../layout/layout.js";
import axios from "axios";

export default function AddDongle() {
  const [employeeData, setEmployeeData] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [dongleForm, setDongleForm] = useState({});

  const Inputform = [
    {
      id: "1",
      name: "dongleId",
      label: "Dongle ID",
      type: "text",
      placeholder: "Enter Dongle ID",
    },
    {
      id: "2",
      name: "handledBy",
      label: "Handled By",
      type: "select",
      options: assignedToOptions,
    },
    {
      id: "3",
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
      id: "4",
      name: "brand",
      label: "Brand",
      type: "text",
      placeholder: "Enter Brand Name",
    },
    {
        id:"5",
        name:"model",
        label:"Model",
        type:"text",
        placeholder:"Enter the Model Name",
    },
    {
      id: "6",
      name: "serialNumber",
      label: "Serial Number",
      type: "text",
      placeholder: "Enter Serial Number",
    },
    {
      id: "7",
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter Location",
    },
    {
      id: "8",
      name: "division",
      label: "Division",
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
        "Spinning",
        "Fine-Garments(Garments-3)",
        "Fire-bird",
        "Vedhanayagam Hospital",
        "LeNatural",
        "Govt. School Project",
        "Others",
      ],
    },
    {
      id: "9",
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter Description",
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && response.data.length > 0) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data.map((employee) => ({
            label: `${employee.employeeId} - ${employee.employeeName}`,
            value: `${employee.employeeId} - ${employee.employeeName}`,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDongleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/asset/dongle/add`,
        dongleForm
      );

      if (response.status === 201) {
        alert("Data Added Successfully");
        setDongleForm({});
      }
    } catch (error) {
      console.error("Server error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const isHandledByDisabled = ["Lost", "Scrap", "Available"].includes(dongleForm.status);

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
              Add Dongle Here ✔️
            </h3>
            <form onSubmit={handleSubmit}> 
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Inputform.map((input) => (
                  <div className="col-span-1" key={input.id}>
                    <label htmlFor={input.name} className="label">
                      <span className="label-text">{input.label}</span>
                    </label>
                    {input.type === "select" ? (
                      <select
                        name={input.name}
                        className="select select-bordered w-full"
                        onChange={handleChange}
                        value={dongleForm[input.name] || ""}
                        disabled={input.name === "handledBy" ? isHandledByDisabled : false}
                      >
                        <option value="">Select</option>
                        {input.options.map((option, index) => {
                          const label = typeof option === "string" ? option : option.label;
                          const value = typeof option === "string" ? option : option.value;
                          return (
                            <option key={index} value={value}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={dongleForm[input.name] || ""}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="form-control flex-row mt-4 flex justify-center space-x-2">
                <button type="submit" className="custom-btn">Save</button> {/* Ensure it's type="submit" */}
                <button type="button" className="btn btn-grey">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}
