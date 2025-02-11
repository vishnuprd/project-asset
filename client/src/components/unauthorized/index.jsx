import React from "react";
import { Link } from "react-router-dom";
import ForbiddenJpg from "../../assets/forbidden.jpg";


export default function Unauthorized() {
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <img
          src={ForbiddenJpg}
          className="w-40 mx-auto mb-4"
          alt="Access Denied"
        />
        <h1 className="text-9xl md:text-[200px] font-bold leading-none">
          <span>4</span>
          <span>0</span>
          <span className="text-red-600">3</span>
        </h1>
        <h4 className="text-xl font-semibold mt-2">Access Denied!</h4>
        <p className="text-gray-600 mt-2">
          You don’t have access to this area. Please contact your administrator.
        </p>
        <p className="text-gray-500 mt-1">
          You can go back to the{" "}
          <Link to="/" className="text-blue-500 underline hover:text-blue-700">
            Home Page
          </Link>.
        </p>
      </div>
    </div>
  );
}
