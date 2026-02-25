import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SchemeCard from "../components/SchemeCard";

export default function Search() {
  const [params, setParams] = useState({
    age: null,
    gender: null,
    occupation: null,
    incomeRange: null,
  });

  const [results, setResults] = useState([]);

  const toggleParam = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const sendToModel = async () => {
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
      console.error("Model Error:", error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h2>AI Scheme Search</h2>

        <div className="toggle-container">

          <div className="toggle-group">
            <p>Gender</p>
            <button
              className={params.gender === "Male" ? "active" : ""}
              onClick={() => toggleParam("gender", "Male")}
            >
              Male
            </button>
            <button
              className={params.gender === "Female" ? "active" : ""}
              onClick={() => toggleParam("gender", "Female")}
            >
              Female
            </button>
          </div>

          <div className="toggle-group">
            <p>Occupation</p>
            <button
              className={params.occupation === "Farmer" ? "active" : ""}
              onClick={() => toggleParam("occupation", "Farmer")}
            >
              Farmer
            </button>
            <button
              className={params.occupation === "Student" ? "active" : ""}
              onClick={() => toggleParam("occupation", "Student")}
            >
              Student
            </button>
          </div>

          <div className="toggle-group">
            <p>Income</p>
            <button
              className={params.incomeRange === "Below 1L" ? "active" : ""}
              onClick={() => toggleParam("incomeRange", "Below 1L")}
            >
              Below 1L
            </button>
            <button
              className={params.incomeRange === "Above 5L" ? "active" : ""}
              onClick={() => toggleParam("incomeRange", "Above 5L")}
            >
              Above 5L
            </button>
          </div>

        </div>

        <button className="predict-btn" onClick={sendToModel}>
          Get AI Recommendations
        </button>

        <div className="schemes-list">
          {results.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
}