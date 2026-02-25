import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { translations } from "../i18n";
import heroImage from "../assets/hero.png";
import logo from "../assets/yojana-logo1.png";

export default function Home() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  const t = translations[lang];

  return (
    <div className="container">
      <div className="left">
        <img src={heroImage} alt="Citizens" />
      </div>
        
      <div className="right">
         <div className="landing-logo">
    <img src={logo} alt="Yojana.Search Logo" />
  </div>
        <div className="lang-toggle">
          <span onClick={() => setLang("en")}>Eng</span> |{" "}
          <span onClick={() => setLang("as")}>অসমীয়া</span>
        </div>*

        <h1>{t.title}</h1>

        <p>{t.noAccount}</p>
        <button onClick={() => navigate("/register")}>
          {t.register}
        </button>

        <p>{t.already}</p>
        <button onClick={() => navigate("/login")}>
          {t.login}
        </button>
      </div>
    </div>
  );
}