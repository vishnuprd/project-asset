import React from "react";
import AdminJpg from "../../assets/admin.jpg";
import HRJpg from "../../assets/hr.jpg";
import UserJpg from "../../assets/user.jpg";

export default function LandingPage() {

  const InputForm = [
    {
      id: 1,
      label: "Admin",
      image: AdminJpg,
    },
    {
      id: 2,
      label: "HR",
      image: HRJpg,
    },
    {
      id: 3,
      label: "Others",
      image: UserJpg,
    },
  ];

  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Asset Management System</h1>
        <p className="text-lg mb-6">A web-based application for managing assets</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {InputForm.map((input) => (
            <div key={input.id} className="card w-80 bg-base-100 shadow-xl">
              <figure>
                <img src={input.image} alt={input.label} className="h-54 w-full object-cover shadow-2xl" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{input.label}</h2>
                <p>{input.label} can log in here.</p>
                <div className="card-actions justify-center">
                <a href={`/login?role=${input.label.toLowerCase()}`} className="custom-btn">login</a>
                </div>
              </div>
            </div>

            
          ))}
        </div>
      </div>
    </div>
  );
}

