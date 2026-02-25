import React from "react";
import "../styles/landing.css";

const Disclaimer = () => {
  return (
    <div className="section" style={{background:"#eee"}}>
      <h3>⚠ Disclaimer</h3>
      <p>
        This platform provides informational guidance based on publicly
        available government data.
      </p>
      <p>
        We do NOT guarantee eligibility. We do NOT submit applications
        on behalf of users.
      </p>
      <p>
        Always verify details on official government websites before applying.
      </p>
    </div>
  );
};

export default Disclaimer;