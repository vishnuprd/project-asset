import React, { useState } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';

export default function AddDomain() {

  const Inputform = [
    {
        id: "1",
        name: "provider",
        label: "Provider",
        select: [
            { id: "Go-daddy", label: "Go-daddy" },
            { id: "ernet", label: "ernet" },
            { id: "Aws", label: "AWS" }
        ],
        required: true,
    },
    {
        id: "2",
        name: "serverName",
        label: "Server Name",
        type: "text",
        required: true,
    },
    {
        id: "3",
        name: "serverType",
        label: "Server Type",
        select: [
            { id: "Shared Hosting", label: "Shared Hosting" },
            { id: "VPS", label: "VPS" },
            { id: "Cloud Hosting", label: "Cloud Hosting" },
            { id: "Dedicated Server", label: "Dedicated Server" }
        ],
        required: true,
    },
    {
        id: "4",
        name: "serverIp",
        label: "Server IP",
        type: "text",
        required: true,
        validation: {
            pattern: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/,
            message: "Invalid IP address format",
        }
    },
    {
        id: "5",
        name: "serverUrl",
        label: "Server URL",
        type: "text",
    },
    {
        id: "6",
        name: "tld",
        label: "TLD",
        type: "text",
    },
    {
        id: "7",
        name: "ownerName",
        label: "Owner Name",
        type: "text",
        required: true,
    },
    {
        id: "8",
        name: "registeredOrganization",
        label: "Registered Organization",
        type: "text",
        required: true,
    },
    {
        id: "9",
        name: "cloudFlare",
        label: "CloudFlare",
        select: [
            { id: "yes", label: "Yes" },
            { id: "no", label: "No" }
        ]
    },
    {
        id: "10",
        name: "googleAuthentication",
        label: "Google Authentication",
        select: [
            { id: "yes", label: "Yes" },
            { id: "no", label: "No" }
        ]
    },
    {
        id: "11",
        name: "registerEmail",
        label: "Register Email",
        type: "email",
        required: true,
    },
    {
        id: "12",
        name: "purchaseDate",
        label: "Purchase Date",
        type: "date",
        required: true,
    },
    {
        id: "13",
        name: "expiryDate",
        label: "Expiry Date",
        type: "date",
        required: true,
    },
    {
        id: "14",
        name: "paymentMethod",
        label: "Payment Method",
        select: [
            { id: "Credit Card", label: "Credit Card" },
            { id: "Bank Transfer", label: "Bank Transfer" },
            { id: "PayPal", label: "PayPal" },
            { id: "Other", label: "Other" }
        ],
        required: true,
    },
    {
        id: "15",
        name: "oneTimeCost",
        label: "One Time Cost",
        type: "string",
    },
    {
        id: "16",
        name: "lastBackupDate",
        label: "Last Backup Date",
        type: "date",
    },
    {
        id: "17",
        name: "nextMaintenanceDate",
        label: "Next Maintenance Date",
        type: "date",
    },
    {
        id: "18",
        name: "description",
        label: "Description",
        type: "textarea",
        maxLength: 500,
    }
  ];

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    console.log("Form Data Before Submit:", formData); 
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/domain/add`, formData);
      console.log("Response:", response.data);
      if (alert && typeof alert.success === "function") {
        alert.success("Domain added successfully!");

      }
      
      setFormData({});
    } catch (error) {
      console.error("Error adding domain:", error.response ? error.response.data : error.message);
      if (alert && typeof alert.error === "function") {
        alert.error("Error adding domain. Please try again.");
      }
    }
  };
  

  const handleCancel = () => {
    setFormData({});
  };

  return (
    <div>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h3 className="text-center py-9 font-bold" style={{ color: "#FF735C" }}>
              Add Domain Here ✔️
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 gap-4">
                {Inputform.map((input) => (
                  <div key={input.id} className="col-span-1">
                    <label className="block mb-2">{input.label}</label>
                    {input.select ? (
                        <select
  name={input.name}
  value={formData[input.name] || ''}  
  onChange={handleChange}
  className="input input-bordered w-full max-w-xs"
>
  <option value="">Select {input.label}</option> 
  {input.select.map((option) => (
    <option key={option.id} value={option.id}> 
      {option.label}
    </option>
  ))}
</select>

                    ) : (
                      <input
                        type={input.type || "text"}
                        name={input.name}
                        value={formData[input.name] || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                        placeholder={input.label}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="submit"
                  className="custom-btn rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn rounded-lg"
                >
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
