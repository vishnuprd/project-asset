import React, { useState } from "react";
import Login from "../../assets/login.jpg";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
export default function AdminSignup() {
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
      type: "password",
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
    if (!values.email || values.email.length <= 6 || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Enter a valid email, must be more than 6 characters and properly formatted.";
    }
    if (!values.password || values.password.length <= 6) {
      errors.password = "Enter a valid password, must be more than 6 characters.";
    }
    return errors;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

//   const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
  
    // try {
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_URL}/api/admin/signup`,
    //     formData
    //   );
  
    //   if (response.status === 201) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //    alert.success("Signup successful!..😍");
    //     setTimeout(() => navigate("/"), 2000);
    //   } else {
    //     alert.error(`Signup Error: ${response.data.message}..😒`);
    //   }
    // } catch (error) {
    //   alert.error(`Signup Error: ${error.message}..😒`);
    //   setTimeout(() => navigate("/"), 2000);
    // }
  };
  

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row md:flex-row sm:flex-col items-center">
     
      <img
        src={Login}
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl"
        alt="Login"
      />
  
    
      <div className="w-full md:w-1/2 sm:w-full p-4">
        <h1 className="">
          Admin Signup..!
        </h1>
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
          <div className="flex justify-center">
  <button
    type="submit"
    className="custom-btn w-full sm:w-auto"
  >
    Get Started
  </button>
</div>

        </form>
      </div>
    </div>
  </div>
  
  );
}
