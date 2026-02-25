import React from "react";
import "../styles/landing.css";

const HowItWorks = () => {
  return (
    <div className="section">
      <h2 style={{color:"#0B3D91"}}>How It Works</h2>

      <div className="cards" style={{marginTop:"40px"}}>
        <div className="card">
          <h3>📝 Enter Basic Details</h3>
          <p>Age, income range, occupation, location</p>
        </div>

        <div className="card">
          <h3>🔎 Get Matching Schemes</h3>
          <p>Filtered using transparent eligibility rules</p>
        </div>

        <div className="card">
          <h3>📂 Follow Application Guide</h3>
          <p>Document checklist + Official links</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;