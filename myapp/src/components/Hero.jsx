import React from "react";
import "../styles/landing.css";

const Hero = () => {
  return (
    <div className="section hero">
      <div className="hero-text">
        <div className="badge">Built Using Official Government Data</div>

        <h1>
          Discover Government Schemes You're Eligible For — In Minutes
        </h1>

        <p>
          Answer a few simple questions and get personalised scheme suggestions,
          required documents, and step-by-step application guidance —
          in your preferred language.
        </p>

        <div style={{marginTop:"30px"}}>
          <button className="btn-primary" style={{marginRight:"15px"}}>
            Check My Eligibility
          </button>

          <button className="btn-outline">
            Learn How It Works
          </button>
        </div>
      </div>

      <div>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="Citizen using phone"
          width="300"
        />
      </div>
    </div>
  );
};

export default Hero;