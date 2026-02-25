import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisclaimerModal from "../components/DisclaimerModal";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    areaType: "",
    incomeRange: "",
    casteCategory: "",
    occupation: "",
    password: "",
    confirmPassword: "",
  });

  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check duplicate email
    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = existingUsers.some(
      (user) => user.email === form.email
    );

    if (emailExists) {
      setError("An account with this email already exists.");
      return;
    }

    setShowDisclaimer(true);
  };

  const handleAcceptDisclaimer = () => {
    const { confirmPassword, ...userData } = form;

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    existingUsers.push(userData);

    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    setShowDisclaimer(false);
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>

        <form onSubmit={handleContinue}>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            required
          />

          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
          />

          <input
            name="district"
            placeholder="District"
            onChange={handleChange}
            required
          />

          <select name="areaType" onChange={handleChange}>
            <option value="">Area Type</option>
            <option>Rural</option>
            <option>Urban</option>
          </select>

          <select name="incomeRange" onChange={handleChange}>
            <option value="">Income Range</option>
            <option>Below 1L</option>
            <option>1L - 3L</option>
            <option>3L - 5L</option>
            <option>Above 5L</option>
          </select>

          <select name="casteCategory" onChange={handleChange}>
            <option value="">Caste Category</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>

          <input
            name="occupation"
            placeholder="Occupation"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Create Password"
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="register-btn">
            Continue
          </button>
        </form>
      </div>

      {showDisclaimer && (
        <DisclaimerModal onAccept={handleAcceptDisclaimer} />
      )}

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-box success-box">
            <h2>✅ Successfully Registered</h2>
            <p>Redirecting you to the login page...</p>
          </div>
        </div>
      )}
    </div>
  );
}