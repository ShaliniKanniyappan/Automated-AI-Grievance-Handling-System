import React, { useEffect, useState } from "react";
import axios from "axios";

const PetitionList = () => {
  const [petitions, setPetitions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_petitions");
        setPetitions(response.data);
      } catch (err) {
        console.error("Error fetching petitions:", err.response?.data || err.message);
        setError("❌ Failed to fetch petitions. Please try again later.");
      }
    };

    fetchPetitions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📜 Petition List</h2>
      {error && <p className="text-red-500">{error}</p>}
      {petitions.length === 0 ? (
        <p>No petitions found.</p>
      ) : (
        <ul>
          {petitions.map((petition) => (
            <li key={petition.id} className="border-b py-3">
              <strong className="text-lg">{petition.username}</strong> - <span className="font-semibold">{petition.department}</span>
              <p className="text-gray-700">{petition.details}</p>
              <span 
                className={`font-semibold ${
                  petition.importance === "High" ? "text-red-500" :
                  petition.importance === "Medium" ? "text-yellow-500" : "text-green-500"
                }`}
              >
                🔥 {petition.importance}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PetitionList;
