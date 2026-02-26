import { useState } from "react";

export default function DisclaimerModal({ onAccept }) {
  const [checks, setChecks] = useState({
    chk1: false,
    chk2: false,
    chk3: false,
  });

  const allChecked = checks.chk1 && checks.chk2 && checks.chk3;

  const handleChange = (e) => {
    setChecks({
      ...checks,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2 className="modal-title">
          ⚠️ Please Read Before <span className="warn">Proceeding</span>
        </h2>

        <p className="modal-subtitle">
          This tool helps you discover Indian Government Schemes.
          Read and acknowledge the following before using it.
        </p>

        
        <div className="disclaimer-section">
          <div className="sec-title">🚨 Fraud & Scam Awareness</div>
          <ul className="point-list">
            <li> Government schemes are <strong>always free</strong>. Never pay anyone.</li>
            <li> Beware of fake websites, apps, or agents promising guaranteed approval.</li>
            <li> Never share Aadhaar, bank account, OTP, or passwords.</li>
            <li> Apply only through official <strong>gov.in / nic.in</strong> domains.</li>
            <li> Report fraud: National Cybercrime Helpline <strong>1930</strong>.</li>
          </ul>
        </div>

        
        <div className="awareness-section">
          <div className="sec-title">💡 Important Awareness Points</div>
          <ul className="point-list">
            <li> This is an <strong>AI-powered informational tool only</strong>.</li>
            <li> Always verify scheme details on official government websites.</li>
            <li> Eligibility, benefits and procedures may change without notice.</li>
            <li> This tool is not affiliated with any government body.</li>
          </ul>
        </div>

        
        <div className="checks">
          <label className="check-row">
            <input
              type="checkbox"
              name="chk1"
              checked={checks.chk1}
              onChange={handleChange}
            />
            I understand this is an AI-based informational tool and not an official government service.
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              name="chk2"
              checked={checks.chk2}
              onChange={handleChange}
            />
            I will never pay anyone to apply for a government scheme.
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              name="chk3"
              checked={checks.chk3}
              onChange={handleChange}
            />
            I will verify all information on official government portals.
          </label>
        </div>

        <button
          className="proceed-btn"
          disabled={!allChecked}
          onClick={onAccept}
        >
          I Understand — Proceed
        </button>

      </div>
    </div>
  );
}