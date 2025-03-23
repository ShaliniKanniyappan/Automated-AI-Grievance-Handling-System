import React, { useState } from "react";
import axios from "axios";

const PetitionForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    details: "",
    department: "Electricity",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/submit_petition", formData);
      setMessage(`✅ ${res.data.message} (Importance: ${res.data.importance})`);
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      setMessage(`❌ Error: ${error.response?.data?.error || "Failed to submit petition."}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">COMPLAINT MANAGEMENT SYSTEM</h1>
        <button className="bg-cyan-500 text-white px-4 py-2 rounded">Logout</button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 p-4">
          <div className="flex items-center mb-6">
            <img alt="User avatar" className="rounded-full mr-4" src="https://placehold.co/50x50" />
            <div>
              <h2 className="text-lg font-semibold">Viraj Narendra Bhutada</h2>
            </div>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <a className="flex items-center text-gray-300 hover:text-white" href="#">
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-gray-300 hover:text-white" href="#">
                  <i className="fas fa-cog mr-2"></i>
                  Account Setting
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-gray-300 hover:text-white" href="#">
                  <i className="fas fa-edit mr-2"></i>
                  Lodge Complaint
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-gray-300 hover:text-white" href="#">
                  <i className="fas fa-history mr-2"></i>
                  Complaint History
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Form */}
        <main className="flex-1 p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Register Complaint</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700" htmlFor="username">
                  Your Name
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="department">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Electricity">Electricity</option>
                  <option value="Transport">Transport</option>
                  <option value="Education">Education</option>
                  <option value="Water">Water</option>
                  <option value="Health">Health</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="details">
                Complaint Details (max 2000 words)
              </label>
              <textarea
                name="details"
                placeholder="Enter petition details"
                value={formData.details}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="6"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
          {message && (
            <p className={`mt-4 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-cyan-500 text-white text-center p-4">
        © 2023 CMS All rights reserved.
      </footer>
    </div>
  );
};

export default PetitionForm;