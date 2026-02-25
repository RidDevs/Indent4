import React from "react";
import "../styles/landing.css";

const Navbar = () => {
  return (
    <div style={{padding:"20px 8%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <h3 style={{color:"#0B3D91"}}>SchemeGuide 🇮🇳</h3>

      <div>
        <span style={{marginRight:"20px", cursor:"pointer"}}>EN</span>
        <span style={{marginRight:"20px", cursor:"pointer"}}>অসমীয়া</span>
        <span style={{cursor:"pointer"}}>हिंदी</span>
      </div>
    </div>
  );
};

export default Navbar;