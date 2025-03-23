import React, { useState } from "react";
import axios from "axios";

const RegisterPetition = () => {
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    details: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/submit_petition",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setMessage({
          text: `✅ Petition submitted successfully! (Importance: ${response.data.importance})`,
          type: "success",
        });
        setFormData({ username: "", department: "", details: "" });
      } else {
        setMessage({ text: "⚠️ Failed to submit petition.", type: "error" });
      }
    } catch (error) {
      console.error("Error submitting petition:", error);
      setMessage({
        text: error.response?.data?.error || "❌ Server issue, try again later.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📝 Submit a Petition</h2>
      {message.text && (
        <p className={`mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Department</option>
            <option value="Education">📚 Education</option>
            <option value="Water">🚰 Water</option>
            <option value="Electricity">⚡ Electricity</option>
            <option value="Health">🏥 Health</option>
            <option value="Transport">🚌 Transport</option>
            <option value="Housing">🏠 Housing</option>
            <option value="Environment">🌱 Environment</option>
            <option value="Other">❓ Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Petition Details:</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          📩 Submit Petition
        </button>
      </form>
    </div>
  );
};

export default RegisterPetition;
