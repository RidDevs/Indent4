import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SchemeCard from "../components/SchemeCard";

export default function Search() {
  const [params, setParams] = useState({
    keyword: "",
    age: "",
    state: "",
    gender: null,
    occupation: null,
    incomeRange: null,
  });

  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const toggleParam = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      setResults(data.schemes);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h2>AI Scheme Search</h2>

        {/* BASIC INPUT FIELDS */}
        <div className="search-inputs">

          <input
            type="text"
            name="keyword"
            placeholder="Search by Scheme Name / Keyword"
            value={params.keyword}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={params.age}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="state"
            placeholder="Enter State"
            value={params.state}
            onChange={handleInputChange}
          />

        </div>

        {/* TOGGLES */}

        <div className="toggle-container">

          {/* Gender */}
          <div className="toggle-group">
            <p>Gender</p>
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                className={params.gender === g ? "active" : ""}
                onClick={() => toggleParam("gender", g)}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Occupation */}
          <div className="toggle-group">
            <p>Occupation</p>
            {[
              "Farmer",
              "Student",
              "Unemployed",
              "Self Employed",
              "Private Employee",
              "Government Employee",
              "Daily Wage Worker",
              "Entrepreneur",
              "Senior Citizen",
              "Widow",
              "Disabled",
              "Homemaker",
            ].map((job) => (
              <button
                key={job}
                className={params.occupation === job ? "active" : ""}
                onClick={() => toggleParam("occupation", job)}
              >
                {job}
              </button>
            ))}
          </div>

          {/* Income */}
          <div className="toggle-group">
            <p>Income</p>
            {["Below 1L", "1-4L", "4-8L", "Above 8L"].map((inc) => (
              <button
                key={inc}
                className={params.incomeRange === inc ? "active" : ""}
                onClick={() => toggleParam("incomeRange", inc)}
              >
                {inc}
              </button>
            ))}
          </div>

        </div>

        {/* SEARCH BUTTON */}
        <button className="predict-btn" onClick={handleSearch}>
          Search Schemes
        </button>

        {/* RESULTS */}
        <div className="schemes-list">
          {results.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

      </div>
    </div>
  );
}