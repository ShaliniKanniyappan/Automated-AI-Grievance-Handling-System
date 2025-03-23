import React, { useState } from "react";
import axios from "axios";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [petitionId, setPetitionId] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!file || !petitionId) {
      setMessage({ text: "⚠️ Please provide a valid Petition ID and select a file.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("petition_id", petitionId);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: `✅ ${res.data.message}`, type: "success" });
      setFile(null);
      setPetitionId("");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        text: error.response?.data?.error || "❌ Error uploading document. Try again.",
        type: "error",
      });
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
          <h2 className="text-2xl font-semibold mb-6">Upload Supporting Documents</h2>
          {message.text && (
            <p className={`mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="petitionId">
                Petition ID
              </label>
              <input
                type="text"
                placeholder="Enter Petition ID"
                value={petitionId}
                onChange={(e) => setPetitionId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="file">
                Upload File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Upload Document
            </button>
          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-cyan-500 text-white text-center p-4">
        © 2023 CMS All rights reserved.
      </footer>
    </div>
  );
};

export default DocumentUpload;