import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
const ModalForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    salary: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* <button 
          className="text-black-500 hover:text-gray-700 absolute top-2 right-2"
          onClick={onClose}
        >
          X
        </button> */}
          <IoMdClose  className="text-4xl float-end text-black-500 hover:cursor-pointer  right-2 "
          onClick={onClose} />
        
        <h2 className="text-2xl font-bold mb-4">Create New Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Image URL:</label>
            <input
              type="text"
              name="image"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
