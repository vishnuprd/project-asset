import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function Navbar() {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const navigate = useNavigate(); 

  const handleSettingsClick = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = async () => {
    try {
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/logout`);
      
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/');
        toast.sucess(response.data.message); 
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred while logging out');
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl ml-0 " style={{ color: "#FF735C" }}>
            Asset Management
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={handleSettingsClick}
            >
              <i className="bx bx-cog text-xl" style={{ color: "#FF735C" }} ></i>
            </div>
            {isLogoutVisible && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={handleLogout} style={{ color: "#FF735C" }}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
