import { useState, useEffect} from "react";
import Layout from "../layout/layout.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AddRouter() {

 const [formData, setFormData] = useState({});
  const RouterInputs = [
    {
      id: 1,
      label: "Router ID",
      name: "routerId",
      type: "text",
      placeholder: "Enter Router ID",
      required: true,
    },
    {
      id: 2,
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Enter Brand",
      required: true,
    },
    {
      id: 3,
      label: "Serial Number",
      name: "serialNumber",
      type: "text",
      placeholder: "Enter serial number",
      required: true,
    },
    {
      id: 4,
      label: "Coverage",
      name: "coverage",
      type: "text",
      placeholder: "Enter Coverage",
      required: true,
    },
    {
      id: 5,
      label: "Speed",
      name: "speed",
      type: "text",
      placeholder: "Enter Speed",
      required: true,
    },
    {
      id: 6,
      label: "Storage",
      name: "storage",
      type: "text",
      placeholder: "Enter Storage",
      required: true,
    },
    {
      id: 7,
      label: "Location",
      name: "location",
      type: "text",
      placeholder: "Enter Location",
      required: true,
    },
    {
      id: 8,
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
      id: 9,
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "Active" },
        { label: "Not-In-Use", value: "Not-In-Use" },
        { label: "Under-Maintenance", value: "Under-Maintenance" },
        { label: "Scrap", value: "Scrap" },
        { label: "Lost", value: "Lost" },
      ],
      required: true,
    },
    {
      id: 10,
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter Description",
      required: true,
    },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData); 
  };
  
  useEffect(() => {
    setFormData({});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset/add/router`, formData);
        if (response.status === 200) {
          console.log("Access-point / Router added successfully:", response.data);
          toast.success("Access-point / Router added successfully!");
          setFormData({});
        } else {
          console.error("Unexpected response status:", response.status);
          
        }
      } catch (error) {
        console.error("Error adding Access-point / Router:", error.response ? error.response.data : error.message);
        toast(`Error: ${error.response?.data?.message || error.message}`);
      }
    };
  

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
              Add Access-point / Router ✔️
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {RouterInputs.map((input) => (
                    <div key={input.id} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {input.label}
                      </label>
                      {input.type === "select" ? (
                        <select
                          id={input.name}
                          name={input.name}
                          value={formData[input.name] || ""}
                          onChange={handleChange}
                          className="input input-bordered w-full max-w-xs"
                          required={input.required}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {input.options.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={input.type}
                          id={input.name}
                          name={input.name}
                          value={formData[input.name] || ""}
                          onChange={handleChange}
                          className="input input-bordered w-full max-w-xs"
                          placeholder={input.placeholder}
                          required={input.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
           
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="custom-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}
