import React from "react";
import "../styles/landing.css";

const WhyPlatform = () => {
  return (
    <div className="section" style={{background:"#F5F7FA"}}>
      <h2 style={{color:"#0B3D91"}}>Why This Platform?</h2>

      <p style={{marginTop:"20px", maxWidth:"800px"}}>
        Government schemes like PM Awas Yojana, PM-KISAN,
        Ayushman Bharat and state-level programs are available —
        but information is often scattered and difficult to understand.
        Our platform simplifies official data into clear, actionable guidance —
        without making false promises.
      </p>
    </div>
  );
};

export default WhyPlatform;