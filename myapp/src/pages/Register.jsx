import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisclaimerModal from "../components/DisclaimerModal";
import { states } from "../data/states";

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
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* ✅ Updated State Dropdown */}
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <input
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            required
          />

          <select
            name="areaType"
            value={form.areaType}
            onChange={handleChange}
          >
            <option value="">Area Type</option>
            <option>Rural</option>
            <option>Urban</option>
          </select>

          <select
            name="incomeRange"
            value={form.incomeRange}
            onChange={handleChange}
          >
            <option value="">Income Range</option>
            <option>Below 1L</option>
            <option>1L - 3L</option>
            <option>3L - 5L</option>
            <option>Above 5L</option>
          </select>

          <select
            name="casteCategory"
            value={form.casteCategory}
            onChange={handleChange}
          >
            <option value="">Caste Category</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>

          <input
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
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