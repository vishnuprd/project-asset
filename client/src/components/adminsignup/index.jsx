import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../../assets/login.jpg";
import { useAuth } from "../../components/layout/authcontext.js";
import { ToastContainer, toast } from 'react-toastify';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
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
        toast.success("Login successful!");

        navigate("/dashboard");
      } else {
        toast.error(`Login Error: ${response.data.message}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong!";
      toast.error(`Login Error: ${errorMessage}`);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row md:flex-row sm:flex-col items-center">
        <img
          src={Login}
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg "
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
                  <div className="relative">
                    <input
                      id={input.name}
                      name={input.name}
                      type={
                        input.name === "password" && showPassword ? "text" : input.type
                      }
                      placeholder={input.placeholder}
                      value={formData[input.name]}
                      onChange={handleChange}
                      className="input input-bordered w-full"
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
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="custom-btn w-full sm:w-auto"
              >
                Get Started
              </button>
            </div>
          </form>

       
          <div className="mt-4">
            <span className="text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-500 hover:underline"
              >
                Signup here to get kicked started!
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
