import React from "react";
import "../styles/landing.css";

const Features = () => {
  return (
    <div className="section">
      <h2 style={{color:"#0B3D91"}}>Platform Features</h2>

      <div className="cards" style={{marginTop:"40px"}}>
        <div className="card">
          <h3>🔎 Personalized Discovery</h3>
          <p>Smart filtering based on eligibility criteria.</p>
        </div>

        <div className="card">
          <h3>📋 Document Checklist</h3>
          <p>Know exactly what documents are required.</p>
        </div>

        <div className="card">
          <h3>🪜 Step-by-Step Instructions</h3>
          <p>Clear guidance from registration to submission.</p>
        </div>

        <div className="card">
          <h3>🌏 Regional Language Support</h3>
          <p>Assamese, Hindi, Bengali and more.</p>
        </div>

        <div className="card">
          <h3>📢 Official Links Included</h3>
          <p>Direct links to government portals.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;