import React, { useState, useEffect, useRef } from 'react';
import Layout from '../layout/layout.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function PhoneHistory() {
  const [phoneData, setPhoneData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const [currentPhone, setCurrentPhone] = useState({});
  const modalRef = useRef(null);

  const fetchPhoneData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/phone/all`);
      if (response.status === 200) {
        setPhoneData(response.data || []);
      } else {
        alert('Error fetching phone data');
      }
    } catch (error) {
      console.error('Error fetching phone data:', error);
      alert('Error fetching phone data.');
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setEmployeeData(response.data);
        setAssignedToOptions(
          response.data.map((employee) => `${employee.employeeId} - ${employee.employeeName}`)
        );
      } else {
        setEmployeeData([]);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setEmployeeData([]);
    }
  };

  const handleOpenModal = (phone) => {
    setCurrentPhone(phone);
    modalRef.current = phone;
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentPhone({});
    modalRef.current = null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPhone({
      ...currentPhone,
      [name]: value,
    });
  };

  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    try {
      const phoneId = modalRef.current._id;
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/asset/phone/${phoneId}`,
        currentPhone
      );

      if (response.status === 200) {
        toast.success('Phone updated successfully!');
        fetchPhoneData();
        handleCloseModal();
      } else {
        toast.error('Error updating phone.');
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      toast.error('Error updating phone.');
    }
  };

  useEffect(() => {
    fetchPhoneData();
    fetchEmployeeData();
  }, []);
  const isHandledByDisabled = ["Lost", "Scrap", "Available"].includes(currentPhone.status);

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-center py-9 font-bold" style={{ color: '#FF735C' }}>
            Phone Details
          </h3>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold" style={{ color: "#FF735C" }}>#</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Phone ID</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Brand</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Model</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Status</th>
                  <th className="font-bold" style={{ color: "#FF735C" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {phoneData.map((phone, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{phone.phoneId}</td>
                    <td>{phone.brand}</td>
                    <td>{phone.model}</td>
                    <td>{phone.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-grey"
                        onClick={() => handleOpenModal(phone)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {modalOpen && currentPhone && (
            <dialog open={modalOpen} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h4 className="text-center font-bold" style={{ color: '#FF735C' }}>
                  Update Phone Details
                </h4>
                <form onSubmit={handleUpdatePhone}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">Phone ID</label>
                      <input
                        type="text"
                        className="input input-bordered"
                        name="phoneId"
                        value={currentPhone.phoneId || ''}
                        onChange={handleInputChange}
                       
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Brand</label>
                      <input
                        type="text"
                        className="input input-bordered"
                        name="brand"
                        value={currentPhone.brand || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">Model</label>
                      <input
                        type="text"
                        className="input input-bordered"
                        name="model"
                        value={currentPhone.model || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">Status</label>
                      <select
                        className="input input-bordered"
                        name="status"
                        value={currentPhone.status || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Lost">Lost</option>
                        <option value="Available">Available</option>
                        <option value="Scrap">Scrap</option>
                      </select>
                    </div>


                    <div className="form-control">
                      <label className="label">Handled By</label>
                      <select
                        className="input input-bordered"
                        name="handledBy"
                        value={currentPhone.handledBy || ''}
                        onChange={handleInputChange}
                        disabled={isHandledByDisabled}
                      >
                        <option value="">Select Employee</option>
                        {employeeData.map((emp) => (
                          <option
                            key={emp._id}
                            value={`${emp.employeeName} - ${emp.employeeId}`}
                          >
                            {emp.employeeName} - {emp.employeeId}
                          </option>
                        ))}
                      </select>
                    </div>


                    <div className="form-control">
                      <label className="label">Serial Number</label>
                      <input
                        type="text"
                        className="input input-bordered"
                        name="serialNumber"
                        value={currentPhone.serialNumber || ''}
                        onChange={handleInputChange}
                      />
                    </div>


                    <div className="form-control">
                      <label className="label">Location</label>
                      <input
                        type="text"
                        className="input input-bordered"
                        name="location"
                        value={currentPhone.location || ''}
                        onChange={handleInputChange}
                      />
                    </div>


                    <div className="form-control">
                      <label className="label">Division</label>
                      <select
                        className="input input-bordered"
                        name="division"
                        value={currentPhone.division || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Division</option>
                        {[
                          'Processing',
                          'Head-office',
                          'Garments',
                          'Spinning',
                          'Others',
                        ].map((division, index) => (
                          <option key={index} value={division}>
                            {division}
                          </option>
                        ))}
                      </select>
                    </div>
                    

                    
                    <div className="form-control">
                      <label className="label">Description</label>
                      <input
                        type="text"
                        className="input input-bordered"
                        name="description"
                        value={currentPhone.description || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="modal-action flex justify-center">
                    <button className="custom-btn" type="submit">
                      Save
                    </button>
                    <button
                      className="btn btn-grey"
                      type="button"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </Layout>
  );
}
