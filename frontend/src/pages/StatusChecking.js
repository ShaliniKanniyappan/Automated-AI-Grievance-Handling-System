import React, { useEffect, useState } from "react";
import axios from "axios";

const StatusChecking = () => {
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_petitions")
      .then((response) => {
        setPetitions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching petitions:", error);
        setError("Failed to load petitions. Please try again.");
        setLoading(false);
      });
  }, []);

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

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Complaint Status</h2>
          {loading ? (
            <p className="text-center text-blue-600">Loading petitions...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : petitions.length === 0 ? (
            <p className="text-center text-gray-600">No petitions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">User</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Details</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Importance</th>
                  </tr>
                </thead>
                <tbody>
                  {petitions.map((petition, index) => (
                    <tr
                      key={petition.id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border p-2 text-center">{petition.id}</td>
                      <td className="border p-2">{petition.username}</td>
                      <td className="border p-2">{petition.department}</td>
                      <td className="border p-2">{petition.details}</td>
                      <td
                        className={`border p-2 font-semibold ${
                          petition.status === "Approved"
                            ? "text-green-600"
                            : petition.status === "Rejected"
                            ? "text-red-600"
                            : "text-orange-600"
                        }`}
                      >
                        {petition.status}
                      </td>
                      <td
                        className={`border p-2 ${
                          petition.importance === "High"
                            ? "text-red-500"
                            : petition.importance === "Medium"
                            ? "text-orange-500"
                            : "text-green-500"
                        }`}
                      >
                        {petition.importance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default StatusChecking;