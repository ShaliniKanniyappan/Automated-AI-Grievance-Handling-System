import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import RegisterPetition from "./pages/ComplaintRegistration"; // Changed to match earlier form
import StatusChecking from "./pages/StatusChecking";
import DocumentUpload from "./pages/DocumentUpload";
import PetitionList from "./components/petitionList"; // Fixed import

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-blue-600 p-4 text-white shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">📌 Grievance Dashboard</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">🏠 Home</Link>
              <Link to="/register" className="hover:underline">📝 Register Petition</Link>
              <Link to="/status" className="hover:underline">📊 Check Status</Link>
              <Link to="/upload" className="hover:underline">📂 Upload Document</Link>
              <Link to="/petitions" className="hover:underline">📜 View Petitions</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPetition />} /> {/* Fixed naming */}
            <Route path="/status" element={<StatusChecking />} />
            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/petitions" element={<PetitionList />} /> {/* Fixed import */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
