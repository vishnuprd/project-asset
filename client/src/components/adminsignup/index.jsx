import React, { useState } from "react";
import Signup from "../../assets/signup.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AdminSignup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "admin" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const Inputform = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Your Name",
      label: "Name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const formValidation = (values) => {
    const errors = {};
    if (!values.name || values.name.length <= 6) {
      errors.name = "Enter a valid name, must be more than 6 characters.";
    }
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!values.password || values.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = formValidation(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/signup`,
        formData
      );
      console.log('Sign up Form Data:', formData);

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Signup successful! 😍");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(`Signup Error: ${response.data.message || "Please try again."} 😒`);
      }
    } catch (error) {
      toast.error(`Signup Error: ${error.response?.data?.message || error.message || "Something went wrong! 😒"}`);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row md:flex-row sm:flex-col items-center">
        <img
          src={Signup}
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
          alt="Signup"
        />
        <div className="w-full md:w-1/2 sm:w-full p-4">
          <h1>Admin Signup..!</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              {Inputform.map((input) => (
                <div key={input.id} className="mb-4 relative">
                  <label htmlFor={input.name} className="label">
                    <span className="label-text">{input.label}</span>
                  </label>
                  <div className="relative">
                    <input
                      id={input.name}
                      name={input.name}
                      type={input.name === "password" ? (showPassword ? "text" : "password") : input.type}
                      placeholder={input.placeholder}
                      value={formData[input.name]}
                      onChange={handleChange}
                      className="input input-bordered w-full pr-10"
                    />
                    {input.name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-3 text-sm text-gray-500 focus:outline-none"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>
                  {errors[input.name] && (
                    <span className="text-red-500 text-sm">{errors[input.name]}</span>
                  )}
                </div>
              ))}
              <div className="mb-4">
                <label htmlFor="role" className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                >
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                  <option value="other">User</option>
                </select>
                {errors.role && (
                  <span className="text-red-500 text-sm">{errors.role}</span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="custom-btn w-full sm:w-auto">
                Get Started
              </button>
            </div>
            <div className="mt-4">
              <span className="text-sm">
                Already have an account? {" "}
                <a href="/" className="text-blue-500 hover:underline">
                  Click here to get started!
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
