import React from "react";
import "../styles/landing.css";

const Footer = () => {
  return (
    <div className="footer">
      <h3>SchemeGuide 🇮🇳</h3>

      <p>Data sourced from official portals such as india.gov.in and respective ministry websites.</p>

      <div style={{marginTop:"20px"}}>
        <a href="#">About Us</a> |{" "}
        <a href="#">Data Sources</a> |{" "}
        <a href="#">Privacy Policy</a> |{" "}
        <a href="#">Terms of Use</a> |{" "}
        <a href="#">Contact</a>
      </div>

      <p style={{marginTop:"20px"}}>© 2026 Civic Tech Hackathon Prototype</p>
    </div>
  );
};

export default Footer;