import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "../../assets/signup.jpg";
import { useAuth } from "../../components/layout/authcontext.js";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const Inputform = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const formValidation = (values) => {
    const errors = {};
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
    setFormData({
      ...formData,
      [name]: value,
    });
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
        `${process.env.REACT_APP_API_URL}/api/admin/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        login(token); 
        alert("Login successful!");

        navigate("/dashboard"); 
      } else {
        alert(`Login Error: ${response.data.message}`); 
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong!";
      alert(`Login Error: ${errorMessage}`);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row md:flex-row sm:flex-col items-center">
        <img
          src={Signup}
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl"
          alt="Login"
        />
        <div className="w-full md:w-1/2 sm:w-full p-4">
          <h1 className="">Admin Login...!</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              {Inputform.map((input) => (
                <div key={input.id} className="mb-4">
                  <label htmlFor={input.name} className="label">
                    <span className="label-text">{input.label}</span>
                  </label>
                  <input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                  {errors[input.name] && (
                    <span className="text-red-500 text-sm">{errors[input.name]}</span>
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="custom-btn w-full sm:w-auto">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
