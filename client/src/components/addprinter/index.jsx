import React, { useState, useEffect } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function AddPrinter() {
    const [employeeData, setEmployeeData] = useState([]);
    const [assignedToOptions, setAssignedToOptions] = useState([]);
    const [printerData, setPrinterData] = useState({
      printerId: "",
      handledBy: "",
      model: "",
      serialNumber: "",
      location: "",
      division: "",
      status: "",
      description: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPrinterData({
        ...printerData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/printer/add`, printerData);
        if (response.status === 201) {
          console.log("Printer added successfully:", response.data);
          toast("Printer added successfully!");
        } else {
          console.error("Unexpected response status:", response.status);
          toast("Error adding printer. Please try again.");
        }
      } catch (error) {
        console.error("Error adding printer:", error.response ? error.response.data : error.message);
        toast(`Error: ${error.response?.data?.message || error.message}`);
      }
    };
  
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
        console.error("Error fetching employee:", error.response ? error.response.data : error.message);
        setEmployeeData([]);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const Inputform = [
      { id: 1, name: "printerId", label: "Printer ID", type: "text", required: true, placeholder: "Enter Printer ID" },
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
        required: true,
      },
      { id: 4, name: "model", label: "Model", type: "text", required: true, placeholder: "Enter Model" },
      { id: 5, name: "serialNumber", label: "Serial Number", type: "text", required: true, placeholder: "Enter Serial Number" },
      { id: 6, name: "location", label: "Location", type: "text", required: true, placeholder: "Enter Location" },
      {
        id: 7,
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
             "EBO",
            "Abirami-Eco-Plast",
            "Non-Oven(Garments-2)",
            "Head-office",
            "spinning",
            "Fine-Garments(Garments-3)",
            "Fire-bird",
            "vedhanayagam hospital",
            "lenatural",
            "Govt.school project",
            "others"
        ]
      },
     
      { id: 8, name: "description", label: "Description", type: "text", required: false, placeholder: "Enter Description" },
    ];
  
    const isHandledByDisabled = ["Lost", "Scrap", "Available"].includes(printerData.status);
  
    return (
      <div>
        <Layout>
          <div className="p-4 sm:ml-64">
            <div className="p-4">
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h3 className="text-center py-2 font-bold" style={{ color: "#FF735C" }}>Add printer details 🧑‍💻</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-control">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Inputform.map((input) => (
                        <div key={input.id}>
                          <label className="label">
                            <span className="label-text">{input.label}</span>
                          </label>
                          {input.type === "select" ? (
                            <select
                              name={input.name}
                              value={printerData[input.name] || ""}
                              onChange={handleChange}
                              className="input input-bordered w-full max-w-xs"
                              required={input.required}
                              disabled={input.name === "handledBy" && isHandledByDisabled} 
                            >
                              <option value="" disabled>
                                Select an option
                              </option>
                              {input.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={input.type}
                              name={input.name}
                              placeholder={input.placeholder}
                              required={input.required}
                              value={printerData[input.name] || ""}
                              onChange={handleChange}
                              className="input input-bordered w-full max-w-xs"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-control flex-row mt-4 flex justify-center space-x-2">
                    <button type="submit" className="custom-btn">Save</button>
                    <button type="button" className="btn btn-grey">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
  